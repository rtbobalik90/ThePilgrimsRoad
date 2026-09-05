/* fb40 · /js/main.js · v0.2.0 · 2026-09-05 */
import { openDatabase } from './core/db.js';
import { ensureFirstBootMetadata, loadAppState, saveLastRoute } from './core/state.js';
import { Router } from './core/router.js';
import { log } from './core/log.js';
import { renderShell, setActiveNavigation, setView } from './ui/shell.js';
import { renderOnboarding } from './ui/onboarding.js';
import { renderMap } from './ui/map.js';
import { renderChapel } from './ui/chapel.js';
import { renderLocked } from './ui/locked.js';
import { renderSettings } from './ui/settings.js';

const APP_BASE_PATH = new URL('../', import.meta.url).pathname;
let state;
let router;

async function refreshState() {
  state = await loadAppState(state.db);
  document.querySelector('#app').dataset.onboarding = state.meta.onboardingStatus ?? 'draft';
  return state;
}

async function routeGuard(path) {
  if (state.meta.onboardingStatus !== 'complete' && path !== '/prologue') return '/prologue';
  setActiveNavigation(path);
  if (state.meta.onboardingStatus === 'complete') await saveLastRoute(state.db, path);
  return null;
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  try { await navigator.serviceWorker.register(new URL('../sw.js', import.meta.url), { scope: APP_BASE_PATH }); }
  catch (error) { log.warn('Service worker registration failed.', error); }
}

async function boot() {
  const redirectedRoute = sessionStorage.getItem('fb40:redirect-route');
  if (redirectedRoute) {
    sessionStorage.removeItem('fb40:redirect-route');
    history.replaceState({}, '', `${APP_BASE_PATH}${redirectedRoute.replace(/^\//, '')}`);
  }

  const db = await openDatabase();
  await ensureFirstBootMetadata(db);
  state = await loadAppState(db);

  router = new Router({
    basePath: APP_BASE_PATH,
    onBeforeRoute: routeGuard
  });

  renderShell({ router, state });
  const currentRoute = router.resolvePathname();
  const restorableRoutes = new Set(['/', '/chapel', '/settings', '/checkin', '/review', '/chronicle']);
  if (state.meta.onboardingStatus === 'complete' && currentRoute === '/' && state.meta.lastRoute && restorableRoutes.has(state.meta.lastRoute)) {
    history.replaceState({}, '', router.url(state.meta.lastRoute));
  }
  router
    .register('/', () => renderMap({ state, setView, router }))
    .register('/chapel', () => renderChapel({ state, setView, router, refreshState }))
    .register('/prologue', () => renderOnboarding({ state, setView, router, refreshState }))
    .register('/settings', () => renderSettings({ state, setView, refreshState, router }))
    .register('/checkin', ({ path }) => renderLocked({ path, setView, router }))
    .register('/review', ({ path }) => renderLocked({ path, setView, router }))
    .register('/chronicle', ({ path }) => renderLocked({ path, setView, router }))
    .fallback(({ path }) => renderLocked({ path, setView, router }));

  await router.start();
  await registerServiceWorker();
}

boot().catch((error) => {
  log.error('Boot failed.', error);
  document.querySelector('#app').innerHTML = `<main class="noscript"><p class="eyebrow">The record did not open</p><h1>Nothing was written.</h1><p>${error.message}</p><button class="button" onclick="location.reload()">Try again</button></main>`;
});
