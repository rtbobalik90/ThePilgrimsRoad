/* fb40 · /js/game/exploration.js · Sprint 01 · 2026-09-05 */

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export function explorationMarkup({
  id,
  label,
  image = '',
  imageAlt = '',
  restored = false,
  hotspots = []
}) {
  return `<div class="exploration-stage ${restored ? 'is-restored' : ''}" id="${id}" tabindex="0" role="application" aria-label="${label}">
    ${image ? `<img class="exploration-stage__art" src="${image}" alt="${imageAlt}">` : '<div class="exploration-stage__fallback" aria-hidden="true"></div>'}
    <div class="exploration-stage__shade" aria-hidden="true"></div>
    ${hotspots.map((hotspot) => `<button class="world-hotspot world-hotspot--${hotspot.kind || 'object'}" type="button" data-hotspot-id="${hotspot.id}" style="--hotspot-x:${hotspot.x}%;--hotspot-y:${hotspot.y}%" aria-label="${hotspot.label}"><span>${hotspot.mark || '•'}</span><small>${hotspot.label}</small></button>`).join('')}
    <div class="pilgrim-token" data-player aria-label="Pilgrim"><span aria-hidden="true">◆</span></div>
    <div class="world-prompt" aria-live="polite" data-world-prompt>Explore the area.</div>
  </div>
  <div class="exploration-controls" aria-label="Exploration controls">
    <div class="move-pad" aria-label="Movement pad">
      <button type="button" data-move="up" aria-label="Move up">▲</button>
      <button type="button" data-move="left" aria-label="Move left">◀</button>
      <button type="button" data-move="down" aria-label="Move down">▼</button>
      <button type="button" data-move="right" aria-label="Move right">▶</button>
    </div>
    <button class="button button--primary world-action" type="button" data-world-action disabled>Interact</button>
  </div>
  <p class="micro exploration-hint">Keyboard: arrow keys or WASD. Move near a marker and choose Interact. Markers can also be selected directly for accessibility.</p>`;
}

export function mountExploration({
  root,
  start = { x: 50, y: 80 },
  hotspots = [],
  step = 4,
  onInteract
}) {
  if (!root) return null;
  const player = root.querySelector('[data-player]');
  const prompt = root.querySelector('[data-world-prompt]');
  const controls = root.nextElementSibling;
  const action = controls?.querySelector('[data-world-action]');
  const state = { x: start.x, y: start.y, nearest: null };
  let destroyed = false;

  function nearestHotspot() {
    return hotspots
      .map((hotspot) => ({ hotspot, d: distance(state, hotspot) }))
      .sort((a, b) => a.d - b.d)[0] ?? null;
  }

  function render() {
    if (destroyed || !player?.isConnected) return;
    player.style.left = `${state.x}%`;
    player.style.top = `${state.y}%`;
    const candidate = nearestHotspot();
    const active = candidate && candidate.d <= (candidate.hotspot.radius ?? 14) ? candidate.hotspot : null;
    state.nearest = active;
    if (prompt) prompt.textContent = active ? `${active.label} is within reach.` : 'Explore the area.';
    if (action) {
      action.disabled = !active;
      action.textContent = active ? `Interact: ${active.label}` : 'Interact';
    }
    root.querySelectorAll('[data-hotspot-id]').forEach((node) => node.classList.toggle('is-near', node.dataset.hotspotId === active?.id));
  }

  function move(dx, dy) {
    state.x = clamp(state.x + dx, 4, 96);
    state.y = clamp(state.y + dy, 4, 96);
    render();
  }

  async function interact(hotspot = state.nearest) {
    if (!hotspot || destroyed) return;
    await onInteract?.(hotspot, { ...state });
  }

  const directionMap = {
    up: [0, -step],
    down: [0, step],
    left: [-step, 0],
    right: [step, 0]
  };

  controls?.querySelectorAll('[data-move]').forEach((button) => {
    button.addEventListener('click', () => {
      const [dx, dy] = directionMap[button.dataset.move];
      move(dx, dy);
      root.focus({ preventScroll: true });
    });
  });
  action?.addEventListener('click', () => interact());
  root.querySelectorAll('[data-hotspot-id]').forEach((button) => {
    button.addEventListener('click', () => interact(hotspots.find((hotspot) => hotspot.id === button.dataset.hotspotId)));
  });
  root.addEventListener('keydown', (event) => {
    const keyMap = {
      ArrowUp: 'up', w: 'up', W: 'up',
      ArrowDown: 'down', s: 'down', S: 'down',
      ArrowLeft: 'left', a: 'left', A: 'left',
      ArrowRight: 'right', d: 'right', D: 'right'
    };
    const direction = keyMap[event.key];
    if (direction) {
      event.preventDefault();
      const [dx, dy] = directionMap[direction];
      move(dx, dy);
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && state.nearest) {
      event.preventDefault();
      interact();
    }
  });

  render();
  return {
    move,
    interact,
    getState: () => ({ ...state }),
    destroy() { destroyed = true; }
  };
}
