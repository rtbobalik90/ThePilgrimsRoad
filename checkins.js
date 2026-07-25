/* fb40 · /js/ui/sheet.js · v0.2.0 · 2026-07-25 */
export function openSheet({ title, content, onClose = null }) {
  const root = document.querySelector('#sheet-root');
  root.innerHTML = `<div class="sheet-backdrop" role="presentation"><section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div class="sheet__handle"></div><div class="sheet__header"><h2 id="sheet-title">${title}</h2><button class="sheet__close" type="button" aria-label="Close">Close</button></div><div class="sheet__content">${content}</div></section></div>`;
  let closed = false;
  const escape = (event) => { if (event.key === 'Escape') close(); };
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', escape);
    root.innerHTML = '';
    onClose?.();
  };
  root.querySelector('.sheet__close').addEventListener('click', close);
  root.querySelector('.sheet-backdrop').addEventListener('click', (event) => { if (event.target.classList.contains('sheet-backdrop')) close(); });
  document.addEventListener('keydown', escape);
  root.querySelector('.sheet__close').focus();
  return close;
}
