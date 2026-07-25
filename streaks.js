/* fb40 · /js/ui/map.js · v0.2.0 · 2026-07-25 */
import { formatDate, formatShortDate, localDateISO } from '../core/dates.js';
import { PILLAR_BY_ID, PILLAR_DEFINITIONS } from '../data/pillars.js';
import { levelProgress, TIER_LABELS } from '../systems/levels.js';
import { deriveWorldState } from '../systems/worldstate.js';
import { isExplicitMark } from '../systems/xp.js';
import { escapeHtml } from './components/field.js';
import { openSheet } from './sheet.js';

function normalizedPillars(state) {
  const records = new Map((state.pillars ?? []).map((pillar) => [pillar.id, pillar]));
  return PILLAR_DEFINITIONS.map((definition) => ({
    ...definition,
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    graceUsedOn: null,
    lastLogDate: null,
    favor: 0,
    ...records.get(definition.id)
  }));
}

function buildingNode(building) {
  return `<button class="building-node${building.dimmed ? ' is-dimmed' : ''}" type="button" data-building-id="${building.id}" style="--node-x:${building.map.x}%;--node-y:${building.map.y}%" aria-label="Open ${escapeHtml(building.building)} record"><span class="building-node__mark">${building.level}</span><span class="building-node__label">${escapeHtml(building.building)}</span></button>`;
}

function buildingRow(building) {
  const progress = levelProgress(building.xp);
  return `<button class="building-record${building.dimmed ? ' is-dimmed' : ''}" type="button" data-building-id="${building.id}"><span class="building-record__level">${building.level}</span><span class="building-record__body"><strong>${escapeHtml(building.building)}</strong><span>${escapeHtml(building.keeper)}</span><span class="xp-track" aria-label="${progress.percent}% toward the next level"><span style="width:${progress.percent}%"></span></span></span><span class="building-record__state">${building.dimmed ? `${building.idleDays} days unlit` : `Tier ${building.tier}`}</span></button>`;
}

function historyMarkup(days) {
  const recent = [...days].filter(({ completed }) => completed).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);
  if (!recent.length) return '<p class="lede">No days have been set.</p>';
  return `<div class="history-list">${recent.map((day) => {
    const answered = Object.values(day.marks ?? {}).filter(isExplicitMark).length;
    const line = String(day.honestLine ?? '').trim();
    return `<button class="history-row" type="button" data-history-date="${day.date}"><span><strong>${formatShortDate(day.date)}</strong><small>${answered} places answered${day.backfilled ? ' · backfilled' : ''}</small></span><span>${line ? `“${escapeHtml(line.slice(0, 58))}${line.length > 58 ? '…' : ''}”` : 'No honest line.'}</span></button>`;
  }).join('')}</div>`;
}

export function mapMarkup(state) {
  const today = localDateISO();
  const pillars = normalizedPillars(state);
  const world = deriveWorldState({ days: state.days ?? [], pillars, campaignStart: state.meta.campaignStart, today, dimThreshold: state.config?.DIM_THRESHOLD_DAYS ?? 14 });
  const buildings = world.buildings;
  const name = escapeHtml(state.meta.pilgrimName || 'Pilgrim');
  const todayRecord = (state.days ?? []).find((day) => day.date === today && day.completed);
  const answered = todayRecord ? Object.values(todayRecord.marks ?? {}).filter(isExplicitMark).length : 0;
  const focusNames = world.focusIds.map((id) => PILLAR_BY_ID[id]?.building).filter(Boolean).join(' · ');
  const flash = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('fb40:flash') : null;
  if (flash && typeof sessionStorage !== 'undefined') sessionStorage.removeItem('fb40:flash');

  return `<section aria-labelledby="map-title">
    <div class="map-header"><span class="chapter-plate">Prologue · The Road In</span><p class="eyebrow">The settlement</p><h1 id="map-title">The walls answer the record.</h1><p class="lede">${name}, what is set down here changes what remains lit.</p></div>
    ${flash ? `<p class="notice notice--strong" role="status">${escapeHtml(flash)}</p>` : ''}
    <figure><div class="settlement-frame weather-${world.weather}" data-weather="${world.weather}"><img id="settlement-image" src="assets/settlement/settlement-shell.webp" data-fallback="assets/settlement/settlement-shell-fallback.svg" alt="A half-ruined walled settlement on a hill, with the Gate below and the Chapel and Watchtower above."><div class="settlement-weather" aria-hidden="true"></div>${buildings.map(buildingNode).join('')}</div><figcaption class="map-caption"><span>${world.weatherLabel}. ${world.completedDays} of the last ${world.elapsedDays} days recorded.</span><span>Campaign began ${formatDate(state.meta.campaignStart)}.</span></figcaption></figure>
    <div class="map-ledger surface surface--raised"><div><p class="eyebrow">Today’s ledger</p><h2>${todayRecord ? `${answered} places answered.` : 'The day is not set.'}</h2><p class="lede">Asked now: ${escapeHtml(focusNames)}.</p></div><a class="button button--primary" href="./checkin" data-route="/checkin">${todayRecord ? 'Reopen' : 'Check in'}</a></div>
    <div class="world-summary" aria-label="Settlement state"><div><strong>${world.weatherLabel}</strong><span>Sky</span></div><div><strong>${buildings.length - world.dimmedCount}</strong><span>Lit</span></div><div><strong>${world.dimmedCount}</strong><span>Dimmed</span></div><div><strong>${Math.round(world.composite * 100)}</strong><span>World state</span></div></div>
    <section class="map-section" aria-labelledby="places-title"><p class="eyebrow">The ten places</p><h2 id="places-title">The settlement by pillar.</h2><div class="building-records">${buildings.map(buildingRow).join('')}</div></section>
    <section class="map-section" aria-labelledby="history-title"><p class="eyebrow">The road behind</p><h2 id="history-title">Recent days.</h2>${historyMarkup(state.days ?? [])}</section>
  </section>`;
}

function buildingDetailMarkup(building) {
  const progress = levelProgress(building.xp);
  const lastLog = building.lastLogDate ? formatDate(building.lastLogDate) : 'No answer recorded';
  const grace = building.graceUsedOn ? formatDate(building.graceUsedOn) : 'Unspent';
  return `<div class="building-detail stack"><p class="eyebrow">${escapeHtml(building.keeper)}</p><p>${escapeHtml(building.domain)}</p><div class="building-detail__level"><span>${building.level}</span><div><strong>Level ${building.level} · Tier ${building.tier}</strong><p>${escapeHtml(TIER_LABELS[building.tier])}</p><span class="xp-track"><span style="width:${progress.percent}%"></span></span><small>${progress.level >= 10 ? `${building.xp} XP · complete tier` : `${progress.current} of ${progress.required} XP`}</small></div></div><dl class="definition-list"><dt>Current streak</dt><dd>${building.streak} days</dd><dt>Best streak</dt><dd>${building.bestStreak} days</dd><dt>Last answered</dt><dd>${lastLog}</dd><dt>Grace</dt><dd>${grace}</dd><dt>Light</dt><dd>${building.dimmed ? 'Dimmed' : 'Lit'}</dd></dl><p class="notice">The keeper’s station is still closed. Daily answers already shape this place.</p><a class="button button--primary button--block" href="./checkin" data-route="/checkin">Answer today</a></div>`;
}

export function renderMap({ state, setView, router }) {
  setView(mapMarkup(state));
  const image = document.querySelector('#settlement-image');
  image?.addEventListener('error', () => {
    if (image.src.endsWith('settlement-shell-fallback.svg')) return;
    image.src = image.dataset.fallback;
  });

  const today = localDateISO();
  const pillars = normalizedPillars(state);
  const world = deriveWorldState({ days: state.days ?? [], pillars, campaignStart: state.meta.campaignStart, today, dimThreshold: state.config?.DIM_THRESHOLD_DAYS ?? 14 });
  const byId = Object.fromEntries(world.buildings.map((building) => [building.id, building]));
  document.querySelectorAll('[data-building-id]').forEach((control) => control.addEventListener('click', () => {
    const building = byId[control.dataset.buildingId];
    if (!building) return;
    openSheet({ title: building.building, content: buildingDetailMarkup(building) });
  }));
  document.querySelectorAll('[data-history-date]').forEach((control) => control.addEventListener('click', () => {
    sessionStorage.setItem('fb40:checkin-date', control.dataset.historyDate);
    router.navigate('/checkin');
  }));
}
