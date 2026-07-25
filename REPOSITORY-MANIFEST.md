.map-header { display: grid; gap: 4px; margin-bottom: 14px; }
.chapter-plate {
  display: inline-flex;
  width: fit-content;
  border: 1px solid var(--edge);
  background: var(--iron);
  padding: 5px 8px;
  color: var(--ember);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.settlement-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--edge);
  border-radius: var(--radius);
  background: var(--iron);
  aspect-ratio: 390 / 620;
  isolation: isolate;
}
.settlement-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 600ms linear, opacity 600ms linear;
}
.settlement-frame::after {
  content: '';
  position: absolute;
  z-index: 6;
  inset: 0;
  pointer-events: none;
  border: 8px solid rgba(14, 11, 7, .38);
}
.settlement-weather { position: absolute; z-index: 2; inset: 0; pointer-events: none; transition: background 600ms linear; }
.weather-storm img { filter: grayscale(.72) brightness(.52) contrast(1.15); }
.weather-storm .settlement-weather { background: rgba(34, 28, 21, .48); }
.weather-overcast img { filter: grayscale(.35) brightness(.68) contrast(1.06); }
.weather-overcast .settlement-weather { background: rgba(34, 28, 21, .25); }
.weather-clear img { filter: saturate(.82) brightness(.83) contrast(1.04); }
.weather-clear .settlement-weather { background: rgba(201, 138, 46, .04); }
.weather-dawn-gold img { filter: sepia(.18) saturate(1.02) brightness(.96) contrast(1.02); }
.weather-dawn-gold .settlement-weather { background: rgba(201, 138, 46, .08); animation: ember-breathe 4s ease-in-out infinite; }
@keyframes ember-breathe { 0%, 100% { opacity: .92; } 50% { opacity: 1; } }
.map-caption { display: grid; gap: 2px; margin-top: 10px; color: var(--parchment-dim); font-size: 14px; }
.building-node {
  position: absolute;
  z-index: 5;
  left: var(--node-x);
  top: var(--node-y);
  display: grid;
  justify-items: center;
  gap: 2px;
  min-width: 44px;
  padding: 0;
  transform: translate(-50%, -50%);
  border: 0;
  background: transparent;
  color: var(--parchment);
  cursor: pointer;
}
.building-node__mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 1px solid var(--ember-low);
  border-radius: 2px;
  background: rgba(14, 11, 7, .9);
  color: var(--ember);
  font-family: var(--font-display);
  font-size: 11px;
}
.building-node__label {
  max-width: 76px;
  border: 1px solid rgba(58, 47, 32, .85);
  border-radius: 2px;
  background: rgba(14, 11, 7, .88);
  padding: 1px 4px;
  color: var(--parchment);
  font-family: var(--font-display);
  font-size: 8px;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
}
.building-node.is-dimmed { opacity: .45; }
.building-node.is-dimmed .building-node__mark { border-color: var(--edge); color: var(--parchment-dim); }
.map-ledger {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  margin-top: 14px;
}
.map-ledger h2 { margin-bottom: 4px; font-size: 18px; }
.world-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 12px;
  border: 1px solid var(--edge);
  background: var(--iron);
}
.world-summary div { display: grid; gap: 1px; padding: 9px 5px; text-align: center; border-left: 1px solid var(--edge); }
.world-summary div:first-child { border-left: 0; }
.world-summary strong { color: var(--parchment); font-family: var(--font-display); font-size: 13px; font-weight: 500; }
.world-summary span { color: var(--parchment-dim); font-size: 11px; }
.map-section { margin-top: 26px; }
.map-section > h2 { margin-bottom: 12px; }
.building-records, .history-list { border: 1px solid var(--edge); }
.building-record {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  width: 100%;
  border: 0;
  border-top: 1px solid var(--edge);
  border-radius: 0;
  background: var(--iron);
  padding: 10px 11px;
  text-align: left;
  cursor: pointer;
}
.building-record:first-child { border-top: 0; }
.building-record.is-dimmed { opacity: .45; }
.building-record__level {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--edge);
  color: var(--ember);
  font-family: var(--font-display);
}
.building-record__body { display: grid; min-width: 0; }
.building-record__body strong { font-family: var(--font-display); font-size: 13px; font-weight: 500; letter-spacing: .03em; }
.building-record__body > span:not(.xp-track) { color: var(--parchment-dim); font-size: 12px; }
.building-record__state { color: var(--parchment-dim); font-size: 12px; text-align: right; }
.xp-track { display: block; width: 100%; height: 4px; margin-top: 5px; background: var(--night); overflow: hidden; }
.xp-track > span { display: block; height: 100%; background: var(--ember); transition: width 600ms linear; }
.history-row {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 12px;
  width: 100%;
  border: 0;
  border-top: 1px solid var(--edge);
  border-radius: 0;
  background: var(--iron);
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
}
.history-row:first-child { border-top: 0; }
.history-row > span { display: grid; }
.history-row strong { font-family: var(--font-display); font-size: 12px; font-weight: 500; }
.history-row small { line-height: 1.35; }
.history-row > span:last-child { color: var(--parchment-dim); font-style: italic; font-size: 14px; }
.building-detail__level { display: grid; grid-template-columns: 52px 1fr; gap: 13px; align-items: start; }
.building-detail__level > span {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid var(--ember-low);
  color: var(--ember);
  font-family: var(--font-display);
  font-size: 20px;
}
.building-detail__level p { margin: 2px 0 6px; color: var(--parchment-dim); }
.building-detail__level small { display: block; margin-top: 4px; }
@media (max-width: 370px) {
  .building-node__label { font-size: 7px; max-width: 64px; }
  .map-ledger { grid-template-columns: 1fr; }
  .map-ledger .button { width: 100%; }
  .world-summary strong { font-size: 11px; }
  .history-row { grid-template-columns: 96px 1fr; }
}
