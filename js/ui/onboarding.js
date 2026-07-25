/* fb40 · /js/ui/onboarding.js · v0.1.0 · 2026-07-25 */
import { atomicPut, putRecord } from '../core/db.js';
import { formatDate, isDateAfter, localDateISO } from '../core/dates.js';
import { escapeHtml, inputField, textareaField } from './components/field.js';
import { button } from './components/button.js';

let questionsPromise;
function loadQuestions() {
  questionsPromise ??= fetch(new URL('../../data/prologue-questions.json', import.meta.url)).then((response) => {
    if (!response.ok) throw new Error('The Prologue questions could not be loaded.');
    return response.json();
  });
  return questionsPromise;
}

function draftFromForm(form, questions) {
  return {
    pilgrimName: form.pilgrimName.value.trim(),
    finaleDate: form.finaleDate.value,
    declaration: form.declaration.value.trim(),
    answers: questions.map((question) => ({
      questionId: question.id,
      questionVersion: question.version,
      questionText: question.text,
      answer: form[`answer-${question.id}`].value.trim(),
      answeredOn: localDateISO(),
      amendedOn: null
    }))
  };
}

function validateDraft(draft, campaignStart) {
  const errors = [];
  if (draft.pilgrimName.length < 2) errors.push('The pilgrim’s name is required.');
  if (!isDateAfter(draft.finaleDate, campaignStart)) errors.push('The fortieth birthday must fall after the campaign begins.');
  for (const answer of draft.answers) if (answer.answer.length < 10) errors.push('Each answer must contain at least ten characters.');
  return errors;
}

export async function renderOnboarding({ state, setView, router, refreshState }) {
  const questions = await loadQuestions();
  const draft = state.draft ?? { pilgrimName: state.meta.pilgrimName || 'Robert', finaleDate: state.meta.finaleDate || '', declaration: '', answers: [] };
  const answerMap = Object.fromEntries((draft.answers ?? []).map((entry) => [entry.questionId, entry.answer]));
  setView(`<section aria-labelledby="prologue-title"><div class="prologue-progress" aria-label="Prologue foundation"><span class="is-complete"></span><span></span><span></span><span></span><span></span></div><p class="eyebrow">Before the road</p><h1 id="prologue-title">The Steward opens the book.</h1><p class="lede">The campaign start was stamped ${formatDate(state.meta.campaignStart)}. That date will not move.</p><form id="prologue-form" class="stack" novalidate><div class="surface stack">${inputField({ id: 'pilgrimName', label: 'The pilgrim’s name', value: draft.pilgrimName || 'Robert', required: true })}${inputField({ id: 'finaleDate', label: 'The morning of the fortieth birthday', type: 'date', value: draft.finaleDate || '', min: state.meta.campaignStart, required: true, hint: 'Every later chapter calculation will derive from this date.' })}</div><div class="surface surface--raised stack"><p class="eyebrow">The three answers</p>${questions.map((question) => textareaField({ id: `answer-${question.id}`, label: question.text, value: answerMap[question.id] ?? '', required: true, maxlength: 1200 })).join('')}</div><div class="surface stack">${inputField({ id: 'declaration', label: 'House words', value: draft.declaration || '', hint: 'Optional. A short declaration carried into the settlement.' })}</div><p id="prologue-status" class="status-line" role="status"></p>${button({ label: 'Set the record', type: 'submit', variant: 'primary', block: true })}</form></section>`);

  const form = document.querySelector('#prologue-form');
  const status = document.querySelector('#prologue-status');
  let saveTimer;
  const saveDraft = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try {
        await putRecord(state.db, 'campaign', { key: 'onboardingDraft', value: draftFromForm(form, questions) });
        status.textContent = 'Draft held on this device.';
      } catch (error) { status.textContent = error.message; }
    }, 300);
  };
  form.addEventListener('input', saveDraft);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const finalDraft = draftFromForm(form, questions);
    const errors = validateDraft(finalDraft, state.meta.campaignStart);
    if (errors.length) { status.textContent = errors[0]; return; }
    status.textContent = 'Writing the record.';
    try {
      await atomicPut(state.db, [
        { store: 'meta', record: { key: 'pilgrimName', value: finalDraft.pilgrimName } },
        { store: 'meta', record: { key: 'finaleDate', value: finalDraft.finaleDate } },
        { store: 'meta', record: { key: 'finaleDateHistory', value: [{ value: finalDraft.finaleDate, changedOn: new Date().toISOString(), source: 'prologue' }] } },
        { store: 'meta', record: { key: 'onboardingStatus', value: 'complete' } },
        { store: 'campaign', record: { key: 'state', value: { chapterId: 'prologue', beatIndex: 0, flags: {}, prologueAnswers: finalDraft.answers, declaration: finalDraft.declaration, initializedOn: new Date().toISOString() } } },
        { store: 'campaign', record: { key: 'onboardingDraft', value: finalDraft } }
      ]);
      await refreshState();
      await router.navigate('/', { replace: true });
    } catch (error) { status.textContent = error.message; }
  });
}
