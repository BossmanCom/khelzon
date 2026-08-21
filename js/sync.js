const BACKUP_VERSION = 1;
const PROFILES_KEY = 'khelzon_profiles';
const THEME_KEY = 'khelzon_theme';

import { storage } from './storage.js';

export function buildBackup() {
  return {
    version: BACKUP_VERSION,
    app: 'KhelZon',
    exportedAt: new Date().toISOString(),
    profiles: storage._getProfilesRaw(),
    theme: localStorage.getItem(THEME_KEY),
  };
}

export function exportBackupFile() {
  const payload = buildBackup();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `khelzon-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseBackupFile(text) {
  const data = JSON.parse(text);
  if (!data || data.app !== 'KhelZon' || !data.profiles?.users) {
    throw new Error('Invalid KhelZon backup file.');
  }
  if (data.version !== BACKUP_VERSION) {
    throw new Error('Unsupported backup version.');
  }
  return data;
}

export function importBackup(data, mode = 'merge') {
  if (mode === 'replace') {
    storage._applyProfiles(data.profiles);
    if (data.theme === 'light' || data.theme === 'dark') {
      localStorage.setItem(THEME_KEY, data.theme);
      document.documentElement.setAttribute('data-theme', data.theme);
    }
    storage._notifyExternal();
    return { merged: 0, replaced: true };
  }

  return storage.mergeProfiles(data.profiles, data.theme);
}

export function renderSyncPanelHTML() {
  return `
    <div class="sync-panel">
      <h3 class="sync-panel-title">Backup &amp; sync</h3>
      <p class="sync-panel-desc">
        Scores never leave your device unless <strong>you</strong> export them.
        Download a backup to move players to another PC or browser — still no account required.
      </p>
      <div class="sync-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-sync-export>Export backup</button>
        <button type="button" class="btn btn-secondary btn-sm" data-sync-import>Import backup</button>
        <input type="file" data-sync-import-input accept=".json,application/json" hidden />
      </div>
      <p class="sync-panel-note">
        <strong>Same device:</strong> open KhelZon in two tabs — changes sync automatically.<br />
        <strong>Other devices:</strong> export here, import there. Optional: enable browser sync in Chrome/Firefox settings to sync site data across your signed-in devices.
      </p>
    </div>
  `;
}

export function bindSyncPanel(container, onRefresh) {
  if (!container) return;

  const exportBtn = container.querySelector('[data-sync-export]');
  const importBtn = container.querySelector('[data-sync-import]');
  const fileInput = container.querySelector('[data-sync-import-input]');

  exportBtn?.addEventListener('click', () => exportBackupFile());

  importBtn?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const data = parseBackupFile(text);
      const mode = confirm(
        'Merge with existing players?\n\nOK = Merge (keep both, best scores win)\nCancel = Replace all data on this device'
      ) ? 'merge' : 'replace';

      importBackup(data, mode);
      alert(mode === 'merge' ? 'Backup merged successfully.' : 'Backup imported — previous data replaced.');
      onRefresh?.();
    } catch (err) {
      alert(err.message || 'Could not import backup.');
    }
  });
}

export function initCrossTabSync(onRefresh) {
  window.addEventListener('storage', e => {
    if (e.key === PROFILES_KEY || e.key === THEME_KEY) {
      if (e.key === THEME_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        document.documentElement.setAttribute('data-theme', e.newValue);
        import('./theme.js').then(m => m.syncThemeToggleUI()).catch(() => {});
      }
      storage.reloadFromDisk();
      onRefresh?.();
    }
  });
}

// Cross-device: export/import JSON. Same browser: storage event syncs tabs.
