const THEME_KEY = 'khelzon_theme';
export const GITHUB_URL = 'https://github.com/pradipNP/khelzon';

const GITHUB_SVG = `<svg class="github-svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function setTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
  updateThemeMeta(next);
  syncThemeToggleUI();
}

export function toggleTheme() {
  setTheme(getTheme() === 'light' ? 'dark' : 'light');
}

function updateThemeMeta(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'light' ? '#f5f0eb' : '#1a1a2e';
}

export function syncThemeToggleUI() {
  const isLight = getTheme() === 'light';
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    btn.querySelector('.icon-moon')?.classList.toggle('hidden', isLight);
    btn.querySelector('.icon-sun')?.classList.toggle('hidden', !isLight);
  });
}

export function renderGithubButton(extraClass = '') {
  return `
    <a href="${GITHUB_URL}" class="tool-btn github-link ${extraClass}" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub" title="GitHub">
      ${GITHUB_SVG}
    </a>
  `;
}

export function renderThemeToggle(extraClass = '') {
  const isLight = getTheme() === 'light';
  return `
    <button type="button" class="tool-btn theme-toggle ${extraClass}" aria-label="${isLight ? 'Switch to dark theme' : 'Switch to light theme'}" title="Toggle theme">
      <span class="icon-moon ${isLight ? 'hidden' : ''}" aria-hidden="true">🌙</span>
      <span class="icon-sun ${isLight ? '' : 'hidden'}" aria-hidden="true">☀️</span>
    </button>
  `;
}

export function renderToolPair(extraClass = '') {
  return `<div class="tool-pair">${renderGithubButton(extraClass)}${renderThemeToggle(extraClass)}</div>`;
}

export function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  } catch { /* ignore */ }

  document.addEventListener('click', e => {
    if (e.target.closest('.theme-toggle')) {
      e.preventDefault();
      toggleTheme();
    }
  });

  syncThemeToggleUI();
}

export function showGlobalTools() {
  /* reserved — tools are embedded per page */
}
