/* fb40 · /js/core/events.js · v0.1.0 · 2026-07-25 */
export class EventBus {
  #target = new EventTarget();

  on(type, listener, options) {
    this.#target.addEventListener(type, listener, options);
    return () => this.#target.removeEventListener(type, listener, options);
  }

  emit(type, detail = {}) {
    this.#target.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

export const events = new EventBus();
