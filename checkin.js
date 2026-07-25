/* fb40 · /js/core/dates.js · v0.2.0 · 2026-07-25 */
export const APP_TIME_ZONE = 'America/Chicago';
const DAY_MS = 86_400_000;

export function localDateISO(date = new Date(), timeZone = APP_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function parseDateOnly(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date;
}

export function shiftDate(value, amount) {
  const date = parseDateOnly(value);
  if (!date) return null;
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function daysBetween(start, end) {
  const startDate = parseDateOnly(start);
  const endDate = parseDateOnly(end);
  if (!startDate || !endDate) return 0;
  return Math.round((endDate.getTime() - startDate.getTime()) / DAY_MS);
}

export function dateRange(start, end) {
  const distance = daysBetween(start, end);
  if (distance < 0) return [];
  return Array.from({ length: distance + 1 }, (_, index) => shiftDate(start, index));
}

export function laterDate(...values) {
  return values.filter(Boolean).sort().at(-1) ?? null;
}

export function isDateAfter(value, floor) {
  const candidate = parseDateOnly(value);
  const minimum = parseDateOnly(floor);
  return Boolean(candidate && minimum && candidate.getTime() > minimum.getTime());
}

export function formatDate(value, { includeYear = true } = {}) {
  const date = parseDateOnly(value);
  if (!date) return 'Not set';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    ...(includeYear ? { year: 'numeric' } : {}),
    timeZone: 'UTC'
  }).format(date);
}

export function formatShortDate(value) {
  const date = parseDateOnly(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
}

export function hoursSince(isoDateTime, now = Date.now()) {
  const value = Date.parse(isoDateTime || '');
  if (!Number.isFinite(value)) return Infinity;
  return Math.max(0, (now - value) / 3_600_000);
}

export function backupDateStamp(date = new Date()) {
  return localDateISO(date).replaceAll('-', '');
}
