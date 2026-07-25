.checkin-form { padding-top: 8px; }
.checkin-date-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--edge);
  background: var(--iron);
  padding: 9px 10px;
}
.checkin-date-row label { color: var(--parchment-dim); }
.checkin-date-row input { min-width: 0; border: 1px solid var(--edge); background: var(--night); color: var(--parchment); padding: 7px 8px; }
.checkin-date-row span { color: var(--ember-low); font-family: var(--font-display); font-size: 10px; text-transform: uppercase; }
.checkin-section { display: grid; gap: 8px; }
.checkin-row { border: 1px solid var(--edge); background: var(--iron); padding: 10px; }
.checkin-row__heading { display: flex; align-items: start; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
.checkin-row__heading > div { display: grid; }
.checkin-row__heading strong { font-family: var(--font-display); font-size: 13px; font-weight: 500; }
.checkin-row__heading span { color: var(--parchment-dim); font-size: 12px; }
.checkin-row__heading output { color: var(--ember-low); font-size: 12px; }
.tri-state { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--edge); }
.tri-state button {
  min-height: 38px;
  border: 0;
  border-left: 1px solid var(--edge);
  border-radius: 0;
  background: var(--iron);
  color: var(--parchment-dim);
  cursor: pointer;
}
.tri-state button:first-child { border-left: 0; }
.tri-state button[data-mark='2'][aria-pressed='true'] { background: var(--ember); color: var(--night); }
.tri-state button[data-mark='1'][aria-pressed='true'] { color: var(--ember); outline: 1px solid var(--ember); outline-offset: -1px; background: transparent; }
.tri-state button[data-mark='0'][aria-pressed='true'] { background: var(--iron-raised); color: var(--parchment-dim); }
.tri-state button:disabled { cursor: default; opacity: .65; }
.settlement-rest { border: 1px solid var(--edge); background: var(--iron-raised); }
.settlement-rest summary { cursor: pointer; padding: 11px 12px; color: var(--parchment-dim); font-family: var(--font-display); font-size: 12px; letter-spacing: .03em; }
.settlement-rest[open] summary { border-bottom: 1px solid var(--edge); color: var(--ember); }
.settlement-rest > div { display: grid; gap: 8px; padding: 8px; }
.honest-field { border-top: 1px solid var(--edge); padding-top: 14px; }
.honest-field textarea { min-height: 88px; }
.honest-field__count { display: flex; justify-content: space-between; gap: 10px; color: var(--parchment-dim); font-size: 12px; }
.confession-block { border: 1px solid var(--edge); background: var(--iron); padding: 11px; }
.confession-toggle { display: flex; gap: 9px; align-items: center; cursor: pointer; }
.confession-toggle input { accent-color: var(--ember); }
#confession-fields { display: grid; gap: 12px; padding-top: 12px; }
#confession-fields fieldset { display: flex; gap: 16px; margin: 0; border: 1px solid var(--edge); padding: 10px; }
#confession-fields legend { color: var(--parchment-dim); font-size: 13px; padding: 0 5px; }
#confession-fields label { color: var(--parchment-dim); }
#confession-fields input { accent-color: var(--ember); }
#confession-fields textarea { min-height: 92px; }
