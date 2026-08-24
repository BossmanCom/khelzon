import { gameRegistry, getTotalPlays, getGamesPlayedCount } from './gameRegistry.js';
import { storage } from './storage.js';
import { renderUserListHTML, escapeHtml } from './users.js';
import { renderToolPair, syncThemeToggleUI } from './theme.js';
import { renderInstallButton, refreshInstallButtons } from './pwa.js';
import { renderSyncPanelHTML, bindSyncPanel } from './sync.js';

const FOOTER = '© 2026 KHELZON. ALL RIGHTS RESERVED.';

export function isLobbyRoute() {
  const first = location.hash.slice(1).replace(/^\/?/, '').split('/').filter(Boolean)[0];
  return !first || first === 'lobby';
}

export function getLobbyView() {
  const parts = location.hash.slice(1).split('/').filter(Boolean);
  if (parts[0] !== 'lobby') return 'main';
  return parts[1] || 'main';
}

function lobbyShell(content) {
  return `
    <div class="lobby-page">
      <div class="lobby-top-bar">
        ${renderToolPair('tool-btn--lobby')}
      </div>
      ${content}
      <footer class="lobby-footer">${FOOTER}</footer>
    </div>
  `;
}

function lobbyBackBar(title) {
  return `
    <div class="lobby-subhead">
      <button type="button" class="lobby-back" id="lobbyBack" aria-label="Back to lounge">
        <span aria-hidden="true">←</span> Back
      </button>
      <h2 class="lobby-subtitle">${title}</h2>
    </div>
  `;
}

export function renderLobbyMain() {
  const player = storage.getActiveUserName();
  const featured = gameRegistry[Math.floor(Math.random() * gameRegistry.length)];
  const online = navigator.onLine;

  return lobbyShell(`
    <div class="lobby-grid">
      <section class="lobby-hero">
        <p class="lobby-eyebrow">Arcade Gateway</p>
        <h1 class="lobby-title">KHEL<span>ZON</span></h1>
        <p class="lobby-desc">
          Play solo arcade games instantly in your browser. High scores are saved
          <strong>per player on this device</strong> — offline-ready, zero downloads, no accounts.
        </p>
        <div class="lobby-actions">
          <button type="button" class="btn btn-lobby-enter" id="lobbyEnter">Enter Arcade</button>
          <button type="button" class="btn btn-lobby-outline" id="lobbyAbout">
            <span class="lobby-btn-icon" aria-hidden="true">ⓘ</span> About
          </button>
          ${renderInstallButton()}
          <button type="button" class="btn btn-lobby-square" id="lobbyPlayers" title="Players">
            <span aria-hidden="true">👤</span>
          </button>
        </div>
        <p class="lobby-player-line">Signed in as <strong>${escapeHtml(player)}</strong></p>
      </section>

      <aside class="lobby-deck" aria-label="Session status">
        <div class="lobby-deck-frame">
          <div class="lobby-deck-header">
            <span class="lobby-deck-label">Session Deck</span>
            <span class="lobby-deck-live ${online ? '' : 'offline'}">${online ? '● Online' : '○ Offline'}</span>
          </div>
          <div class="lobby-deck-screen">
            <div class="lobby-deck-icon-wrap">
              <span class="lobby-deck-icon">${featured.icon}</span>
            </div>
            <p class="lobby-deck-brand">KHELZON TERMINAL</p>
            <p class="lobby-deck-featured">Now featuring: ${featured.name}</p>
          </div>
          <dl class="lobby-deck-stats">
            <div class="lobby-deck-row"><dt>Runtime</dt><dd>Stable · JS v1.0</dd></div>
            <div class="lobby-deck-row"><dt>Score vault</dt><dd>Local per player</dd></div>
            <div class="lobby-deck-row"><dt>Cache</dt><dd>${online ? 'PWA + online' : 'Offline ready'}</dd></div>
            <div class="lobby-deck-row"><dt>Library</dt><dd>${gameRegistry.length} games · ${getTotalPlays()} plays</dd></div>
            <div class="lobby-deck-row"><dt>Progress</dt><dd>${getGamesPlayedCount()} / ${gameRegistry.length} tried</dd></div>
          </dl>
          <p class="lobby-deck-foot">Session deck · Grid standby</p>
        </div>
      </aside>
    </div>
  `);
}

export function renderLobbyAbout() {
  return lobbyShell(`
    ${lobbyBackBar('About KhelZon')}
    <div class="lobby-subbody">
      <div class="lobby-panel">
        <h3>What is KhelZon?</h3>
        <p>KhelZon is a single-player browser arcade. Every game runs instantly with no installs. Scores stay on your device, separated for each player profile.</p>

        <h3>Games</h3>
        <ul class="lobby-list">
          <li><strong>Marble Quest Solo, Territory Clash</strong> — Strategy vs CPU</li>
          <li><strong>Snake Rush, Neon Dodge, Orbit Breaker, Star Drift, Meteor Run</strong> — Arcade &amp; action</li>
          <li><strong>Number Cascade, Memory Matrix, Slide Quest, Tap Sequence, Target Tap</strong> — Puzzles &amp; reflex</li>
        </ul>

        <h3>Technology</h3>
        <p>Built with HTML, CSS, and vanilla JavaScript. Works offline as a Progressive Web App. No frameworks, no backend — your data never leaves this browser.</p>

        <h3>Design</h3>
        <p>KhelZon uses its own warm indigo-and-saffron identity — a distinct solo arcade experience.</p>

        <h3>Open source</h3>
        <p>KhelZon is free and open source under the MIT license. Anyone can report bugs, suggest features, or contribute code on GitHub.</p>
        <p class="lobby-about-links">
          <a href="https://github.com/pradipNP/khelzon" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          ·
          <a href="https://github.com/pradipNP/khelzon/issues" target="_blank" rel="noopener noreferrer">Issues</a>
          ·
          <a href="https://github.com/pradipNP/khelzon/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a>
        </p>
      </div>
    </div>
  `);
}

export function renderLobbyPlayers() {
  const active = storage.getActiveUser();
  const users = storage.getUsers();

  return lobbyShell(`
    ${lobbyBackBar('Players')}
    <div class="lobby-subbody">
      <div class="lobby-panel lobby-panel-players">
        <div class="lobby-active-player">
          <span class="user-list-avatar large">${active?.name?.charAt(0).toUpperCase() ?? '?'}</span>
          <div>
            <p class="lobby-active-label">Active player</p>
            <p class="lobby-active-name">${escapeHtml(active?.name ?? 'Guest')}</p>
          </div>
        </div>

        <h3 class="lobby-panel-heading">All players</h3>
        <div class="user-list" id="lobbyUserList">${renderUserListHTML()}</div>

        <h3 class="lobby-panel-heading">Add new player</h3>
        <form id="lobbyUserCreateForm" class="user-create-form">
          <input type="text" id="lobbyUserNameInput" placeholder="Enter player name" maxlength="20" required autocomplete="off" />
          <button type="submit" class="btn btn-lobby-enter btn-sm">Add Player</button>
        </form>
        <p class="user-create-error" id="lobbyUserCreateError" hidden></p>
        ${renderSyncPanelHTML()}
        <p class="lobby-panel-note">${users.length} profile${users.length !== 1 ? 's' : ''} on this device. Each keeps separate scores.</p>
      </div>
    </div>
  `);
}

function bindLobbyMain() {
  document.getElementById('lobbyEnter')?.addEventListener('click', () => {
    location.hash = '#/arcade';
  });
  document.getElementById('lobbyAbout')?.addEventListener('click', () => {
    location.hash = '#/lobby/about';
  });
  document.getElementById('lobbyPlayers')?.addEventListener('click', () => {
    location.hash = '#/lobby/players';
  });
}

function bindLobbyBack() {
  document.getElementById('lobbyBack')?.addEventListener('click', () => {
    location.hash = '#/lobby';
  });
}

function bindLobbyPlayersForm() {
  document.getElementById('lobbyUserCreateForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('lobbyUserNameInput');
    const err = document.getElementById('lobbyUserCreateError');
    const user = storage.createUser(input.value);
    if (!user) {
      err.textContent = 'Enter a unique name (not already used).';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    input.value = '';
    showLobbyView('players');
  });
}

function refreshLobbyUserList() {
  const list = document.getElementById('lobbyUserList');
  if (list) list.innerHTML = renderUserListHTML();
}

export function showLobbyView(view = 'main') {
  const lobby = document.getElementById('lobbyScreen');
  const main = document.getElementById('lobbyContent');

  let html;
  switch (view) {
    case 'about': html = renderLobbyAbout(); break;
    case 'players': html = renderLobbyPlayers(); break;
    default: html = renderLobbyMain();
  }

  main.innerHTML = html;
  lobby.classList.remove('hidden', 'fade-out');
  lobby.setAttribute('aria-hidden', 'false');
  syncThemeToggleUI();

  if (view === 'main') bindLobbyMain();
  else {
    bindLobbyBack();
    if (view === 'players') {
      bindLobbyPlayersForm();
      bindSyncPanel(main.querySelector('.sync-panel'), () => showLobbyView('players'));
    }
  }
  refreshInstallButtons();
}

export function hideLobbyScreen() {
  const lobby = document.getElementById('lobbyScreen');
  lobby.classList.add('fade-out');
  lobby.setAttribute('aria-hidden', 'true');
  setTimeout(() => lobby.classList.add('hidden'), 450);
}

export function onLobbyUserChange() {
  if (isLobbyRoute()) {
    refreshLobbyUserList();
    if (getLobbyView() === 'main') showLobbyView('main');
  }
}

export function initLobby() {
  storage.onUserChange(onLobbyUserChange);
}
