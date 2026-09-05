/* fb40 · /js/ui/map.js · v0.2.0 · 2026-09-05 */
import { formatDate } from '../core/dates.js';
import { escapeHtml } from './components/field.js';
import { loadChapelState } from '../systems/chapel.js';

export function mapMarkup(state, chapelState = null) {
  const name = escapeHtml(state.meta.pilgrimName || 'Pilgrim');
  const chapelRestored = chapelState?.scene?.restorationTier >= 1;
  return `<section aria-labelledby="map-title"><div class="map-header"><span class="chapter-plate">The Keep</span><p class="eyebrow">Sprint 01 · The First Flame</p><h1 id="map-title">The walls are visible.</h1><p class="lede">${name}, the Keep is beginning to answer to what is done beyond its walls.</p></div><figure><div class="settlement-frame"><img id="settlement-image" src="assets/settlement/settlement-shell.webp" data-fallback="assets/settlement/settlement-shell-fallback.svg" alt="A half-ruined walled settlement on a hill, with the Gate below and the Chapel and Watchtower above."><a class="keep-node" href="./chapel" data-route="/chapel" aria-label="Enter the Chapel"><span class="keep-node__mark">${chapelRestored ? '✦' : '†'}</span><span class="keep-node__label">Chapel</span></a></div><figcaption class="map-caption">Campaign began ${formatDate(state.meta.campaignStart)}. ${chapelRestored ? 'A first light now burns at the Chapel.' : 'The Chapel remains quiet on the Height.'}</figcaption></figure><div class="district-list" aria-label="Settlement districts"><div class="district-row"><strong>The Gate</strong><span>The road beyond remains closed.</span></div><div class="district-row"><strong>Lower Yard</strong><span>Training Yard and Granary.</span></div><div class="district-row"><strong>The Common</strong><span>Great Hall and Hearth.</span></div><div class="district-row"><strong>The Works</strong><span>Forge and Treasury.</span></div><div class="district-row"><strong>The Green</strong><span>The Garden.</span></div><div class="district-row"><strong>The Height</strong><span>${chapelRestored ? 'The Chapel bears the First Flame. Watchtower remains sealed.' : 'Chapel is open for the first vertical slice. Watchtower remains sealed.'}</span></div></div><div class="surface map-primary"><p class="eyebrow">Available now</p><h2>Climb to the Chapel.</h2><p class="lede">Enter the Chapel, speak with Aldous, inspect the Faith object, and complete the first real-life activity bridge.</p><a class="button button--primary button--block" href="./chapel" data-route="/chapel">Enter the Chapel</a></div></section>`;
}

export async function renderMap({ state, setView }) {
  const chapelState = await loadChapelState(state.db);
  setView(mapMarkup(state, chapelState));
  const image = document.querySelector('#settlement-image');
  image?.addEventListener('error', () => {
    if (image.src.endsWith('settlement-shell-fallback.svg')) return;
    image.src = image.dataset.fallback;
  });
}
