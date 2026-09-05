/* fb40 · /js/ui/chapel.js · v0.2.0 · 2026-09-05 */
import { escapeHtml } from './components/field.js';
import { acceptFirstFlame, completeFirstFlame, loadChapelState } from '../systems/chapel.js';

function dialogueFor(chapelState) {
  if (chapelState.quest.state === 'complete') {
    return 'The flame remembers what you brought here. Keep returning to the light you have been given.';
  }
  if (chapelState.quest.state === 'accepted') {
    return 'Do not hurry it. Give the hour your full attention, then return when the prayer is finished.';
  }
  return 'A chapel is not restored by stone alone. Begin with one faithful hour, and we will see what answers.';
}

function chapelMarkup({ state, chapelState }) {
  const name = escapeHtml(state.meta.pilgrimName || 'Pilgrim');
  const restored = chapelState.scene.restorationTier >= 1;
  const accepted = chapelState.quest.state === 'accepted';
  const complete = chapelState.quest.state === 'complete';
  const xp = chapelState.pillar.xp ?? 0;
  return `<section class="chapel ${restored ? 'chapel--restored' : ''}" aria-labelledby="chapel-title">
    <div class="chapel__hero surface">
      <p class="eyebrow">The Keep · The Height</p>
      <h1 id="chapel-title">The Chapel</h1>
      <p class="lede">${restored ? 'A first candle burns near the altar. The room is still worn, but no longer dormant.' : 'Dust lies along the pews. One unlit candle waits beside the lectern.'}</p>
      <div class="chapel__light" aria-hidden="true"><span></span></div>
    </div>

    <article class="surface surface--raised keeper-card">
      <p class="eyebrow">Aldous · Keeper of the Chapel</p>
      <h2>${name}</h2>
      <p class="keeper-dialogue">“${dialogueFor(chapelState)}”</p>
      ${complete ? '<p class="status-line">Aldous now speaks from the restored state.</p>' : accepted ? '<button class="button button--quiet" id="first-flame-accepted" disabled>Quest accepted</button>' : '<button class="button button--primary" id="accept-first-flame">Accept The First Flame</button>'}
    </article>

    <article class="surface faith-object">
      <p class="eyebrow">Interactive Faith object</p>
      <h2>The Prayer Bench</h2>
      <p>This is the bridge to the real-life Faith activity. For Sprint 01, the existing app has no production Faith tracker wired in, so this action is explicitly running in demo mode.</p>
      <div class="demo-badge">DEMO ACTIVITY · Replaceable by real Faith data</div>
      <dl class="definition-list">
        <dt>Activity</dt><dd>Quiet Hour</dd>
        <dt>Reward</dt><dd>10 Faith XP</dd>
        <dt>Faith XP</dt><dd>${xp}</dd>
        <dt>Chapel</dt><dd>${restored ? 'First Flame restored' : 'Dormant'}</dd>
      </dl>
      ${complete ? '<button class="button button--quiet button--block" disabled>Quiet Hour completed today</button>' : accepted ? '<button class="button button--primary button--block" id="complete-faith-activity">Complete demo Quiet Hour</button>' : '<button class="button button--quiet button--block" disabled>Speak with Aldous first</button>'}
      <p class="status-line" id="chapel-status" aria-live="polite"></p>
    </article>

    <a class="button button--quiet button--block" href="../" data-route="/">Return to The Keep</a>
  </section>`;
}

export async function renderChapel({ state, setView, router, refreshState }) {
  let chapelState = await loadChapelState(state.db);

  async function redraw(message = '') {
    await refreshState();
    chapelState = await loadChapelState(state.db);
    setView(chapelMarkup({ state, chapelState }));
    bind();
    if (message) document.querySelector('#chapel-status').textContent = message;
  }

  function bind() {
    document.querySelector('#accept-first-flame')?.addEventListener('click', async () => {
      await acceptFirstFlame(state.db);
      await redraw('The First Flame has been accepted.');
    });

    document.querySelector('#complete-faith-activity')?.addEventListener('click', async () => {
      const button = document.querySelector('#complete-faith-activity');
      button.disabled = true;
      const result = await completeFirstFlame(state.db, { source: 'demo' });
      await redraw(result.duplicate ? 'This Quiet Hour was already recorded. No additional XP was awarded.' : 'Quiet Hour recorded. The first flame has been lit.');
    });
  }

  setView(chapelMarkup({ state, chapelState }));
  bind();
}
