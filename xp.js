/* fb40 · /js/ui/checkin.js · v0.2.0 · 2026-07-25 */
import { formatDate, hoursSince, laterDate, localDateISO, shiftDate } from '../core/dates.js';
import { getCheckin, HONEST_LINE_MAX, saveCheckin } from '../systems/checkins.js';
import { deriveWorldState } from '../systems/worldstate.js';
import { isExplicitMark, MARK } from '../systems/xp.js';
import { PILLAR_BY_ID, PILLAR_DEFINITIONS } from '../data/pillars.js';
import { escapeHtml } from './components/field.js';
import { renderMap } from './map.js';
import { openSheet } from './sheet.js';

const HONEST_PROMPTS = [
  'What did you not want to write here today?',
  'Where did your intentions and your actions separate?',
  'What is true about today without explanation?',
  'Which part of the settlement did you avoid?',
  'What was asked of you that you resisted?',
  'What held when the day became difficult?',
  'Name the thing that followed you through the gate.'
];

function promptForDate(date) {
  const seed = [...date].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return HONEST_PROMPTS[seed % HONEST_PROMPTS.length];
}

function markLabel(value) {
  return value === MARK.KEPT ? 'Kept' : value === MARK.PARTIAL ? 'Partial' : value === MARK.MISSED ? 'Missed' : 'Unanswered';
}

function triStateMarkup(pillar, selected, disabled) {
  return `<div class="checkin-row" data-pillar-row="${pillar.id}"><div class="checkin-row__heading"><div><strong>${escapeHtml(pillar.building)}</strong><span>${escapeHtml(pillar.domain)}</span></div><output data-mark-output="${pillar.id}">${markLabel(selected)}</output></div><div class="tri-state" role="group" aria-label="${escapeHtml(pillar.building)} status">${[
    [MARK.KEPT, 'Kept'], [MARK.PARTIAL, 'Partial'], [MARK.MISSED, 'Missed']
  ].map(([value, label]) => `<button type="button" data-mark="${value}" data-pillar="${pillar.id}" aria-pressed="${selected === value}"${disabled ? ' disabled' : ''}>${label}</button>`).join('')}</div></div>`;
}

function currentMarks(form) {
  const marks = {};
  form.querySelectorAll('[data-pillar-row]').forEach((row) => {
    const active = row.querySelector('[data-mark][aria-pressed="true"]');
    if (active) marks[row.dataset.pillarRow] = Number(active.dataset.mark);
  });
  return marks;
}

function checkinMarkup({ date, record, focusIds, minDate, today, locked }) {
  const marks = record?.marks ?? {};
  const focus = focusIds.map((id) => PILLAR_BY_ID[id]).filter(Boolean);
  const rest = PILLAR_DEFINITIONS.filter(({ id }) => !focusIds.includes(id));
  const confession = record?.confession ?? null;
  const answeredCount = Object.values(marks).filter(isExplicitMark).length;
  return `<form id="daily-checkin-form" class="checkin-form stack" novalidate>
    <div class="checkin-date-row"><label for="checkin-date">Day</label><input id="checkin-date" type="date" min="${minDate}" max="${today}" value="${date}"><span>${date === today ? 'Today' : 'Backfill'}</span></div>
    ${locked ? `<p class="notice notice--strong">This entry’s 48-hour editing window has closed. It remains part of the record.</p>` : ''}
    <div class="checkin-section"><p class="eyebrow">Asked today</p>${focus.map((pillar) => triStateMarkup(pillar, marks[pillar.id], locked)).join('')}</div>
    ${rest.length ? `<details class="settlement-rest"${answeredCount > focus.length ? ' open' : ''}><summary>The rest of the settlement (${rest.length})</summary><div>${rest.map((pillar) => triStateMarkup(pillar, marks[pillar.id], locked)).join('')}</div></details>` : ''}
    <div class="field honest-field"><label for="honest-line">The honest line</label><span class="field__hint">${escapeHtml(promptForDate(date))}</span><textarea id="honest-line" maxlength="${HONEST_LINE_MAX}"${locked ? ' disabled' : ''}>${escapeHtml(record?.honestLine ?? '')}</textarea><div class="honest-field__count"><span>Twenty characters earns weight in the record.</span><output id="honest-count">${String(record?.honestLine ?? '').length}/${HONEST_LINE_MAX}</output></div></div>
    <div class="confession-block"><label class="confession-toggle"><input id="confession-toggle" type="checkbox"${confession ? ' checked' : ''}${locked ? ' disabled' : ''}><span>Something happened.</span></label><div id="confession-fields"${confession ? '' : ' hidden'}><fieldset><legend>Where should it be carried?</legend><label><input type="radio" name="confession-pillar" value="watchtower"${confession?.pillarId !== 'chapel' ? ' checked' : ''}${locked ? ' disabled' : ''}> Watchtower</label><label><input type="radio" name="confession-pillar" value="chapel"${confession?.pillarId === 'chapel' ? ' checked' : ''}${locked ? ' disabled' : ''}> Chapel</label></fieldset><div class="field"><label for="confession-text">Say it plainly</label><textarea id="confession-text" maxlength="800"${locked ? ' disabled' : ''}>${escapeHtml(confession?.text ?? '')}</textarea></div></div></div>
    <p id="checkin-status" class="status-line" role="status">${record?.backfilled ? 'This entry was backfilled.' : ''}</p>
    <button class="button button--primary button--block" type="submit"${locked ? ' disabled' : ''}>${record ? 'Update the record' : 'Set the day'}</button>
  </form>`;
}

export async function renderCheckin({ state, setView, router, refreshState }) {
  renderMap({ state, setView, router });
  const today = localDateISO();
  const requestedDate = sessionStorage.getItem('fb40:checkin-date');
  sessionStorage.removeItem('fb40:checkin-date');
  const minDate = laterDate(state.meta.campaignStart, shiftDate(today, -7));
  let selectedDate = requestedDate && requestedDate >= minDate && requestedDate <= today ? requestedDate : today;

  const close = openSheet({
    title: 'Daily Check-In',
    content: '<p class="status-line">Opening the ledger.</p>',
    onClose: () => router.navigate('/', { replace: true })
  });
  const content = document.querySelector('.sheet__content');

  async function renderDate(date) {
    if (!date || date < minDate || date > today) date = today;
    selectedDate = date;
    const record = await getCheckin(state.db, date);
    const world = deriveWorldState({ days: state.days, pillars: state.pillars, campaignStart: state.meta.campaignStart, today, dimThreshold: state.config?.DIM_THRESHOLD_DAYS ?? 14 });
    const locked = Boolean(record && hoursSince(record.ts) >= 48);
    content.innerHTML = checkinMarkup({ date, record, focusIds: world.focusIds, minDate, today, locked });
    const form = content.querySelector('#daily-checkin-form');
    const status = content.querySelector('#checkin-status');
    const honest = content.querySelector('#honest-line');

    content.querySelector('#checkin-date').addEventListener('change', (event) => renderDate(event.target.value));
    content.querySelectorAll('[data-mark]').forEach((control) => control.addEventListener('click', () => {
      const row = control.closest('[data-pillar-row]');
      row.querySelectorAll('[data-mark]').forEach((button) => button.setAttribute('aria-pressed', String(button === control)));
      row.querySelector('[data-mark-output]').textContent = markLabel(Number(control.dataset.mark));
    }));
    honest?.addEventListener('input', () => { content.querySelector('#honest-count').textContent = `${honest.value.length}/${HONEST_LINE_MAX}`; });
    content.querySelector('#confession-toggle')?.addEventListener('change', (event) => { content.querySelector('#confession-fields').hidden = !event.target.checked; });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (locked) return;
      const marks = currentMarks(form);
      const unanswered = world.focusIds.filter((id) => !isExplicitMark(marks[id]));
      if (unanswered.length) {
        status.textContent = `${PILLAR_BY_ID[unanswered[0]].building} still needs an answer.`;
        return;
      }
      const confessionEnabled = content.querySelector('#confession-toggle').checked;
      const confessionText = content.querySelector('#confession-text')?.value.trim() ?? '';
      if (confessionEnabled && confessionText.length < 10) {
        status.textContent = 'Say the thing plainly before setting the day.';
        return;
      }
      const now = new Date().toISOString();
      const nextRecord = {
        date: selectedDate,
        marks,
        honestLine: honest.value.trim(),
        confession: confessionEnabled ? {
          pillarId: form.elements['confession-pillar'].value,
          text: confessionText,
          ts: record?.confession?.ts ?? now
        } : null,
        completed: true,
        backfilled: selectedDate !== today,
        ts: record?.ts ?? now,
        updatedAt: now
      };
      status.textContent = 'Writing the day.';
      try {
        await saveCheckin(state.db, nextRecord);
        await refreshState();
        sessionStorage.setItem('fb40:flash', 'Logged.');
        close();
      } catch (error) {
        status.textContent = error.message;
      }
    });
  }

  await renderDate(selectedDate);
}
