/* fb40 · /js/ui/components/button.js · v0.1.0 · 2026-07-25 */
export function button({ label, type = 'button', variant = '', id = '', block = false, disabled = false } = {}) {
  const classes = ['button', variant && `button--${variant}`, block && 'button--block'].filter(Boolean).join(' ');
  return `<button class="${classes}" type="${type}"${id ? ` id="${id}"` : ''}${disabled ? ' disabled' : ''}>${label}</button>`;
}
