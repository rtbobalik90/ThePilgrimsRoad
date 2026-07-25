/* fb40 · /js/ui/settings.js · v0.1.0 · 2026-07-25 */
import { atomicPut, closeDatabase, deleteDatabase } from '../core/db.js';
import { formatDate, isDateAfter } from '../core/dates.js';
import { BUILD_STAMP, MIGRATION_VERSION, SCHEMA_VERSION } from '../core/version.js';
import { createBackupEnvelope, downloadBackup, inspectBackupFile } from '../data/backup.js';
import { escapeHtml, inputField } from './components/field.js';
import { openSheet } from './sheet.js';

export function renderSettings({ state, setView, refreshState, router }) {
  setView(`<section aria-labelledby="settings-title"><p class="eyebrow">Provisions</p><h1 id="settings-title">What the pilgrim carries.</h1><div class="surface stack"><h2>The campaign</h2><dl class="definition-list"><dt>Began</dt><dd>${formatDate(state.meta.campaignStart)}</dd><dt>Status</dt><dd>${state.meta.onboardingStatus === 'complete' ? 'The record is set.' : 'The Prologue is unfinished.'}</dd><dt>Timezone</dt><dd>${escapeHtml(state.meta.timeZone || 'America/Chicago')}</dd><dt>Last backup</dt><dd>${state.meta.lastBackupAt ? new Date(state.meta.lastBackupAt).toLocaleString('en-US') : 'None recorded'}</dd></dl><form id="campaign-settings" class="stack">${inputField({ id: 'settings-name', label: 'Pilgrim name', value: state.meta.pilgrimName || 'Robert' })}${inputField({ id: 'settings-finale', label: 'Fortieth birthday', type: 'date', value: state.meta.finaleDate || '', min: state.meta.campaignStart, hint: 'Changing this date will alter later chapter timing. The change is recorded.' })}<button class="button" type="submit">Record changes</button><p id="settings-status" class="status-line" role="status"></p></form></div><div class="surface stack"><h2>The local record</h2><p class="lede">The full database can be exported now. Import remains inspection-only until the restore system is approved in Phase 7.</p><div class="cluster"><button class="button" id="backup-export" type="button">Export backup</button><label class="button button--quiet" for="backup-inspect">Inspect backup</label><input class="sr-only" id="backup-inspect" type="file" accept="application/json,.json"></div><p id="backup-status" class="status-line" role="status"></p></div><div class="surface stack"><h2>Build</h2><dl class="definition-list"><dt>Release</dt><dd>${BUILD_STAMP}</dd><dt>Migration</dt><dd>${MIGRATION_VERSION}</dd><dt>Schema</dt><dd>${SCHEMA_VERSION}</dd></dl></div><div class="surface stack"><h2>Danger zone</h2><p class="lede">Erasing the record removes all local campaign data from this browser. It cannot be undone without a backup.</p><button class="button button--quiet" id="erase-record" type="button">Erase the local record</button></div></section>`);

  const form = document.querySelector('#campaign-settings');
  const status = document.querySelector('#settings-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.querySelector('#settings-name').value.trim();
    const finaleDate = form.querySelector('#settings-finale').value;
    if (name.length < 2) { status.textContent = 'The pilgrim’s name is required.'; return; }
    if (!isDateAfter(finaleDate, state.meta.campaignStart)) { status.textContent = 'The fortieth birthday must fall after the campaign begins.'; return; }
    const history = Array.isArray(state.meta.finaleDateHistory) ? [...state.meta.finaleDateHistory] : [];
    if (finaleDate !== state.meta.finaleDate) history.push({ value: finaleDate, changedOn: new Date().toISOString(), source: 'settings' });
    await atomicPut(state.db, [
      { store: 'meta', record: { key: 'pilgrimName', value: name } },
      { store: 'meta', record: { key: 'finaleDate', value: finaleDate } },
      { store: 'meta', record: { key: 'finaleDateHistory', value: history } }
    ]);
    await refreshState();
    state.meta.pilgrimName = name;
    state.meta.finaleDate = finaleDate;
    state.meta.finaleDateHistory = history;
    status.textContent = 'Recorded.';
  });

  document.querySelector('#backup-export').addEventListener('click', async () => {
    const backupStatus = document.querySelector('#backup-status');
    backupStatus.textContent = 'Gathering the record.';
    try {
      downloadBackup(await createBackupEnvelope(state.db));
      const exportedAt = new Date().toISOString();
      await atomicPut(state.db, [{ store: 'meta', record: { key: 'lastBackupAt', value: exportedAt } }]);
      state.meta.lastBackupAt = exportedAt;
      backupStatus.textContent = 'Backup prepared.';
    }
    catch (error) { backupStatus.textContent = error.message; }
  });

  document.querySelector('#backup-inspect').addEventListener('change', async (event) => {
    const backupStatus = document.querySelector('#backup-status');
    const file = event.target.files?.[0];
    if (!file) return;
    const result = await inspectBackupFile(file);
    backupStatus.textContent = result.valid ? `Readable backup. Exported ${new Date(result.envelope.exportedAt).toLocaleString('en-US')}. No data was imported.` : result.errors[0];
    event.target.value = '';
  });

  document.querySelector('#erase-record').addEventListener('click', () => {
    const close = openSheet({
      title: 'Erase the local record',
      content: `<p>This removes the campaign from this browser.</p><div class="field"><label for="erase-confirm">Type ERASE</label><input id="erase-confirm" autocomplete="off"></div><p id="erase-status" class="status-line"></p><button class="button button--quiet button--block" id="erase-confirm-button" type="button">Erase</button>`
    });
    document.querySelector('#erase-confirm-button').addEventListener('click', async () => {
      const eraseStatus = document.querySelector('#erase-status');
      if (document.querySelector('#erase-confirm').value !== 'ERASE') { eraseStatus.textContent = 'The word does not match.'; return; }
      try {
        closeDatabase(state.db);
        await deleteDatabase();
        if ('caches' in window) await Promise.all((await caches.keys()).filter((key) => key.startsWith('fb40-')).map((key) => caches.delete(key)));
        close();
        window.location.assign(router.url('/'));
      } catch (error) { eraseStatus.textContent = error.message; }
    });
  });
}
