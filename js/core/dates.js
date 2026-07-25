/* fb40 · /js/core/dates.js · v0.1.0 · 2026-07-25 */
export const APP_TIME_ZONE = 'America/Chicago';

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

export function isDateAfter(value, floor) {
  const candidate = parseDateOnly(value);
  const minimum = parseDateOnly(floor);
  return Boolean(candidate && minimum && candidate.getTime() > minimum.getTime());
}

export function formatDate(value) {
  const date = parseDateOnly(value);
  if (!date) return 'Not set';
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export function backupDateStamp(date = new Date()) {
  return localDateISO(date).replaceAll('-', '');
}
