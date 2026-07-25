/* fb40 · /js/core/router.js · v0.1.0 · 2026-07-25 */
export class Router {
  #routes = new Map();
  #fallback = null;
  #basePath;
  #onBeforeRoute;

  constructor({ basePath = '/', onBeforeRoute = null } = {}) {
    this.#basePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
    this.#onBeforeRoute = onBeforeRoute;
  }

  register(path, handler) { this.#routes.set(path, handler); return this; }
  fallback(handler) { this.#fallback = handler; return this; }

  resolvePathname(pathname = window.location.pathname) {
    const cleanBase = this.#basePath === '/' ? '' : this.#basePath.replace(/\/$/, '');
    const stripped = pathname.startsWith(cleanBase) ? pathname.slice(cleanBase.length) : pathname;
    return `/${stripped.replace(/^\/+/, '')}`.replace(/\/$/, '') || '/';
  }

  url(path) {
    const route = path === '/' ? '' : path.replace(/^\//, '');
    return `${this.#basePath}${route}`;
  }

  navigate(path, { replace = false } = {}) {
    const target = this.url(path);
    history[replace ? 'replaceState' : 'pushState']({}, '', target);
    return this.render(path);
  }

  async render(path = this.resolvePathname()) {
    const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
    if (this.#onBeforeRoute) {
      const redirect = await this.#onBeforeRoute(normalized);
      if (redirect && redirect !== normalized) return this.navigate(redirect, { replace: true });
    }
    const handler = this.#routes.get(normalized) ?? this.#fallback;
    if (!handler) throw new Error(`No route registered for ${normalized}`);
    await handler({ path: normalized, router: this });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  start() {
    window.addEventListener('popstate', () => this.render());
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-route]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      this.navigate(link.dataset.route);
    });
    return this.render();
  }
}
