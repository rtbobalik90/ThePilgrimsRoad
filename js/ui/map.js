/* fb40 · /js/ui/map.js · v0.1.0 · 2026-07-25 */
import { formatDate } from '../core/dates.js';
import { escapeHtml } from './components/field.js';

export function mapMarkup(state) {
  const name = escapeHtml(state.meta.pilgrimName || 'Pilgrim');
  return `<section aria-labelledby="map-title"><div class="map-header"><span class="chapter-plate">Before the Reckoning</span><p class="eyebrow">The settlement</p><h1 id="map-title">The walls are visible.</h1><p class="lede">${name}, the ground has been inherited. Nothing has been counted yet.</p></div><figure><div class="settlement-frame"><img id="settlement-image" src="assets/settlement/settlement-shell.webp" data-fallback="assets/settlement/settlement-shell-fallback.svg" alt="A half-ruined walled settlement on a hill, with the Gate below and the Chapel and Watchtower above."></div><figcaption class="map-caption">Campaign began ${formatDate(state.meta.campaignStart)}. The fortieth morning is ${formatDate(state.meta.finaleDate)}.</figcaption></figure><div class="district-list" aria-label="Settlement districts"><div class="district-row"><strong>The Gate</strong><span>The only way in.</span></div><div class="district-row"><strong>Lower Yard</strong><span>Training Yard and Granary.</span></div><div class="district-row"><strong>The Common</strong><span>Great Hall and Hearth.</span></div><div class="district-row"><strong>The Works</strong><span>Forge and Treasury.</span></div><div class="district-row"><strong>The Green</strong><span>The Garden.</span></div><div class="district-row"><strong>The Height</strong><span>Chapel and Watchtower.</span></div></div><div class="surface map-primary"><p class="eyebrow">Phase 0</p><h2>The record is open.</h2><p class="lede">The buildings do not answer yet. The daily loop opens in Phase 1.</p><a class="button button--quiet button--block" href="./checkin" data-route="/checkin">Approach the sealed ledger</a></div></section>`;
}

export function renderMap({ state, setView }) {
  setView(mapMarkup(state));
  const image = document.querySelector('#settlement-image');
  image?.addEventListener('error', () => {
    if (image.src.endsWith('settlement-shell-fallback.svg')) return;
    image.src = image.dataset.fallback;
  });
}
