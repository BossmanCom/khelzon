const PREFIX = 'khelzon_';

function uid() {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function emptyScoreEntry() {
  return { best: 0, plays: 0, lastPlayed: null };
}

export const storage = {
  _listeners: [],

  onUserChange(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(f => f !== fn); };
  },

  _notify() {
    this._listeners.forEach(fn => fn(this.getActiveUser()));
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch { /* quota exceeded */ }
  },

  init() {
    const profiles = this.get('profiles');
    if (profiles) return;

    const legacyScores = this.get('scores', null);
    const id = uid();
    const users = {};

    if (legacyScores && Object.keys(legacyScores).length) {
      users[id] = {
        id,
        name: 'Player 1',
        scores: legacyScores,
        createdAt: new Date().toISOString(),
      };
    } else {
      users[id] = {
        id,
        name: 'Player 1',
        scores: {},
        createdAt: new Date().toISOString(),
      };
    }

    this.set('profiles', { activeUserId: id, users });
    localStorage.removeItem(PREFIX + 'scores');
  },

  _getProfiles() {
    this.init();
    return this.get('profiles', { activeUserId: null, users: {} });
  },

  _saveProfiles(profiles) {
    this.set('profiles', profiles);
  },

  _getProfilesRaw() {
    return this._getProfiles();
  },

  _applyProfiles(profiles) {
    if (!profiles?.users || !Object.keys(profiles.users).length) {
      throw new Error('Invalid profile data.');
    }
    if (!profiles.users[profiles.activeUserId]) {
      profiles.activeUserId = Object.keys(profiles.users)[0];
    }
    this._saveProfiles(profiles);
  },

  reloadFromDisk() {
    this._notify();
  },

  _notifyExternal() {
    this._notify();
  },

  mergeProfiles(incoming, theme) {
    const current = this._getProfiles();
    let merged = 0;

    for (const user of Object.values(incoming.users || {})) {
      const existing = Object.values(current.users).find(
        u => u.id === user.id || u.name.toLowerCase() === user.name.toLowerCase()
      );

      if (!existing) {
        current.users[user.id] = { ...user, scores: { ...user.scores } };
        merged++;
        continue;
      }

      merged++;
      for (const [gameId, incomingScore] of Object.entries(user.scores || {})) {
        const cur = existing.scores[gameId] ?? emptyScoreEntry();
        const inc = incomingScore ?? emptyScoreEntry();
        existing.scores[gameId] = {
          best: Math.max(cur.best, inc.best),
          plays: cur.plays + (inc.plays || 0),
          lastPlayed: [cur.lastPlayed, inc.lastPlayed].filter(Boolean).sort().pop() ?? null,
        };
      }
    }

    if (incoming.activeUserId && current.users[incoming.activeUserId]) {
      current.activeUserId = incoming.activeUserId;
    }

    this._saveProfiles(current);

    if (theme === 'light' || theme === 'dark') {
      try { localStorage.setItem('khelzon_theme', theme); } catch { /* ignore */ }
      document.documentElement.setAttribute('data-theme', theme);
    }

    this._notify();
    return { merged, replaced: false };
  },

  getUsers() {
    const { users } = this._getProfiles();
    return Object.values(users).sort((a, b) => a.name.localeCompare(b.name));
  },

  getActiveUser() {
    const { activeUserId, users } = this._getProfiles();
    if (!activeUserId || !users[activeUserId]) {
      const first = Object.values(users)[0];
      if (first) {
        this.switchUser(first.id, false);
        return first;
      }
      return null;
    }
    return users[activeUserId];
  },

  getActiveUserName() {
    return this.getActiveUser()?.name ?? 'Guest';
  },

  createUser(name) {
    const trimmed = name.trim();
    if (!trimmed) return null;

    const profiles = this._getProfiles();
    const exists = Object.values(profiles.users).some(
      u => u.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return null;

    const id = uid();
    profiles.users[id] = {
      id,
      name: trimmed,
      scores: {},
      createdAt: new Date().toISOString(),
    };
    profiles.activeUserId = id;
    this._saveProfiles(profiles);
    this._notify();
    return profiles.users[id];
  },

  switchUser(userId, notify = true) {
    const profiles = this._getProfiles();
    if (!profiles.users[userId]) return false;
    profiles.activeUserId = userId;
    this._saveProfiles(profiles);
    if (notify) this._notify();
    return true;
  },

  renameUser(userId, name) {
    const trimmed = name.trim();
    if (!trimmed) return false;

    const profiles = this._getProfiles();
    const user = profiles.users[userId];
    if (!user) return false;

    const duplicate = Object.values(profiles.users).some(
      u => u.id !== userId && u.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) return false;

    user.name = trimmed;
    this._saveProfiles(profiles);
    if (profiles.activeUserId === userId) this._notify();
    return true;
  },

  deleteUser(userId) {
    const profiles = this._getProfiles();
    const ids = Object.keys(profiles.users);
    if (ids.length <= 1) return false;

    delete profiles.users[userId];
    if (profiles.activeUserId === userId) {
      profiles.activeUserId = Object.keys(profiles.users)[0];
    }
    this._saveProfiles(profiles);
    this._notify();
    return true;
  },

  getScore(gameId) {
    const user = this.getActiveUser();
    if (!user) return emptyScoreEntry();
    return user.scores[gameId] ?? emptyScoreEntry();
  },

  saveScore(gameId, score, mode = 'high') {
    const profiles = this._getProfiles();
    const userId = profiles.activeUserId;
    const user = profiles.users[userId];
    if (!user) return emptyScoreEntry();

    const current = user.scores[gameId] ?? emptyScoreEntry();
    const isBetter = mode === 'high'
      ? score > current.best
      : score < current.best || current.best === 0;

    user.scores[gameId] = {
      best: isBetter ? score : current.best,
      plays: current.plays + 1,
      lastPlayed: new Date().toISOString(),
    };
    this._saveProfiles(profiles);
    return user.scores[gameId];
  },

  getAllScores() {
    return this.getActiveUser()?.scores ?? {};
  },

  clearScores(userId = null) {
    const profiles = this._getProfiles();
    const targetId = userId ?? profiles.activeUserId;
    const user = profiles.users[targetId];
    if (!user) return;
    user.scores = {};
    this._saveProfiles(profiles);
    if (targetId === profiles.activeUserId) this._notify();
  },

  getUserStats(userId) {
    const profiles = this._getProfiles();
    const user = profiles.users[userId];
    if (!user) return { plays: 0, gamesPlayed: 0 };
    const scores = Object.values(user.scores);
    return {
      plays: scores.reduce((s, e) => s + (e.plays || 0), 0),
      gamesPlayed: scores.filter(e => e.plays > 0).length,
    };
  },
};
