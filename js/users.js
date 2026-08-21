import { storage } from './storage.js';

export function updateUserBadge() {
  const el = document.getElementById('userBadge');
  if (!el) return;
  const name = storage.getActiveUserName();
  el.querySelector('.user-badge-name').textContent = name;
  el.title = `Playing as ${name} — click to switch`;
}

export function setupUsers(onSwitch) {
  storage.init();
  updateUserBadge();
  storage.onUserChange(() => {
    updateUserBadge();
    onSwitch?.();
  });

  document.getElementById('userBadge')?.addEventListener('click', () => openUserModal());
  document.getElementById('userModalClose')?.addEventListener('click', closeUserModal);
  document.getElementById('userModalBackdrop')?.addEventListener('click', closeUserModal);

  document.getElementById('userCreateForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('userNameInput');
    const err = document.getElementById('userCreateError');
    const user = storage.createUser(input.value);
    if (!user) {
      err.textContent = 'Enter a unique name (not already used).';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    input.value = '';
    renderUserList();
    closeUserModal();
    onSwitch?.();
  });

  document.addEventListener('click', e => {
    const switchBtn = e.target.closest('[data-switch-user]');
    if (switchBtn) {
      storage.switchUser(switchBtn.dataset.switchUser);
      renderUserList();
      closeUserModal();
      onSwitch?.();
      return;
    }

    const deleteBtn = e.target.closest('[data-delete-user]');
    if (deleteBtn) {
      const name = deleteBtn.dataset.userName;
      if (confirm(`Delete player "${name}" and all their scores?`)) {
        storage.deleteUser(deleteBtn.dataset.deleteUser);
        renderUserList();
        onSwitch?.();
      }
      return;
    }

    const renameBtn = e.target.closest('[data-rename-user]');
    if (renameBtn) {
      const newName = prompt('Rename player:', renameBtn.dataset.userName);
      if (newName !== null) {
        if (!storage.renameUser(renameBtn.dataset.renameUser, newName)) {
          alert('Could not rename — name may already exist or is empty.');
        } else {
          renderUserList();
          onSwitch?.();
        }
      }
    }
  });
}

export function openUserModal() {
  renderUserList();
  const modal = document.getElementById('userModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('userNameInput')?.focus();
}

export function closeUserModal() {
  const modal = document.getElementById('userModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const err = document.getElementById('userCreateError');
  if (err) err.hidden = true;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export { escapeHtml };

export function renderUserListHTML() {
  const active = storage.getActiveUser();
  const users = storage.getUsers();

  return users.map(u => {
    const stats = storage.getUserStats(u.id);
    const isActive = u.id === active?.id;
    return `
      <div class="user-list-item ${isActive ? 'active' : ''}">
        <div class="user-list-info">
          <span class="user-list-avatar">${u.name.charAt(0).toUpperCase()}</span>
          <div>
            <strong>${escapeHtml(u.name)}</strong>
            ${isActive ? '<span class="user-active-tag">Active</span>' : ''}
            <small>${stats.plays} sessions · ${stats.gamesPlayed} games</small>
          </div>
        </div>
        <div class="user-list-actions">
          ${!isActive ? `<button class="btn btn-secondary btn-sm" data-switch-user="${u.id}">Switch</button>` : ''}
          <button class="btn btn-secondary btn-sm" data-rename-user="${u.id}" data-user-name="${escapeHtml(u.name)}">Rename</button>
          ${users.length > 1 ? `<button class="btn btn-danger btn-sm" data-delete-user="${u.id}" data-user-name="${escapeHtml(u.name)}">Delete</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

export function renderUserList() {
  const list = document.getElementById('userList');
  if (!list) return;
  list.innerHTML = renderUserListHTML();
}

export function renderPlayersPage() {
  const users = storage.getUsers();
  const active = storage.getActiveUser();

  return `
    <div class="players-page">
      <h1>Players</h1>
      <p class="page-sub">Each player has their own scores on this device. Switch anytime — no account needed.</p>

      <div class="players-active-card">
        <span class="user-list-avatar large">${active?.name?.charAt(0).toUpperCase() ?? '?'}</span>
        <div>
          <p class="players-active-label">Currently playing as</p>
          <h2>${escapeHtml(active?.name ?? 'Guest')}</h2>
        </div>
        <button class="btn btn-primary" id="openUserModalBtn">Switch / Add Player</button>
      </div>

      <h2 class="section-title">All Players</h2>
      <div class="user-list user-list-page" id="userListPage">
        ${users.map(u => {
          const stats = storage.getUserStats(u.id);
          const isActive = u.id === active?.id;
          return `
            <div class="user-list-item ${isActive ? 'active' : ''}">
              <div class="user-list-info">
                <span class="user-list-avatar">${u.name.charAt(0).toUpperCase()}</span>
                <div>
                  <strong>${escapeHtml(u.name)}</strong>
                  ${isActive ? '<span class="user-active-tag">Active</span>' : ''}
                  <small>${stats.plays} sessions · ${stats.gamesPlayed} games played</small>
                </div>
              </div>
              <div class="user-list-actions">
                ${!isActive ? `<button class="btn btn-secondary btn-sm" data-switch-user="${u.id}">Switch</button>` : ''}
                <button class="btn btn-secondary btn-sm" data-rename-user="${u.id}" data-user-name="${escapeHtml(u.name)}">Rename</button>
                ${users.length > 1 ? `<button class="btn btn-danger btn-sm" data-delete-user="${u.id}" data-user-name="${escapeHtml(u.name)}">Delete</button>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="players-add-form">
        <h2 class="section-title">Add New Player</h2>
        <form id="userCreateFormPage" class="user-create-form">
          <input type="text" id="userNameInputPage" placeholder="Enter player name" maxlength="20" required autocomplete="off" />
          <button type="submit" class="btn btn-primary">Add Player</button>
        </form>
        <p class="user-create-error" id="userCreateErrorPage" hidden></p>
      </div>
    </div>
  `;
}

export function bindPlayersPage(onSwitch) {
  document.getElementById('openUserModalBtn')?.addEventListener('click', openUserModal);

  document.getElementById('userCreateFormPage')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('userNameInputPage');
    const err = document.getElementById('userCreateErrorPage');
    const user = storage.createUser(input.value);
    if (!user) {
      err.textContent = 'Enter a unique name (not already used).';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    input.value = '';
    onSwitch?.();
  });
}
