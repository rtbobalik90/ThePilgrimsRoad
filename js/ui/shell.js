/* fb40 · /js/ui/shell.js · v0.1.0 · 2026-07-25 */
import { BUILD_STAMP } from '../core/version.js';

const NAV_ITEMS = [
  ['/', 'Map'], ['/checkin', 'Check-in'], ['/review', 'Review'], ['/chronicle', 'Chronicle']
];

export function renderShell({ router, state }) {
  const app = document.querySelector('#app');
  app.innerHTML = `<div class="app-shell"><header class="app-header"><a class="wordmark" href="${router.url('/')}" data-route="/"><span class="wordmark__overline">Full by 40</span><span class="wordmark__title">The Pilgrim's Road</span></a><a class="header-action" href="${router.url('/settings')}" data-route="/settings">Provisions</a></header><main class="app-main" id="view"></main><nav class="app-nav" aria-label="Primary"><div class="app-nav__inner">${NAV_ITEMS.map(([path, label]) => `<a class="nav-link" href="${router.url(path)}" data-route="${path}" data-nav-path="${path}">${label}</a>`).join('')}</div></nav></div>`;
  app.dataset.build = BUILD_STAMP;
  app.dataset.onboarding = state.meta.onboardingStatus ?? 'draft';
}

export function setActiveNavigation(path) {
  document.querySelectorAll('[data-nav-path]').forEach((link) => {
    if (link.dataset.navPath === path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

export function setView(html) {
  const view = document.querySelector('#view');
  view.style.animation = 'none';
  view.innerHTML = html;
  requestAnimationFrame(() => { view.style.animation = ''; });
}
