/* fb40 · /js/core/log.js · v0.1.0 · 2026-07-25 */
const PREFIX = '[fb40]';
export const log = {
  info(message, detail) { console.info(PREFIX, message, detail ?? ''); },
  warn(message, detail) { console.warn(PREFIX, message, detail ?? ''); },
  error(message, detail) { console.error(PREFIX, message, detail ?? ''); }
};
