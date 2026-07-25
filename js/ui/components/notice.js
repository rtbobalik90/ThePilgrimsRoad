/* fb40 · /js/ui/components/notice.js · v0.1.0 · 2026-07-25 */
export function notice(text, { strong = false } = {}) {
  return `<p class="notice${strong ? ' notice--strong' : ''}">${text}</p>`;
}
