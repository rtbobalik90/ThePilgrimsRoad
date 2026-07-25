/* fb40 · /js/ui/components/field.js · v0.1.0 · 2026-07-25 */
export function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

export function inputField({ id, label, type = 'text', value = '', hint = '', required = false, min = '', max = '' } = {}) {
  return `<div class="field"><label for="${id}">${escapeHtml(label)}</label><input id="${id}" name="${id}" type="${type}" value="${escapeHtml(value)}"${required ? ' required' : ''}${min ? ` min="${min}"` : ''}${max ? ` max="${max}"` : ''}>${hint ? `<span class="field__hint">${escapeHtml(hint)}</span>` : ''}</div>`;
}

export function textareaField({ id, label, value = '', hint = '', required = false, maxlength = 1200 } = {}) {
  return `<div class="field"><label for="${id}">${escapeHtml(label)}</label><textarea id="${id}" name="${id}" maxlength="${maxlength}"${required ? ' required' : ''}>${escapeHtml(value)}</textarea>${hint ? `<span class="field__hint">${escapeHtml(hint)}</span>` : ''}</div>`;
}
