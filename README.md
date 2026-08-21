# KhelZon

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Issues](https://img.shields.io/github/issues/pradipNP/khelzon)](https://github.com/pradipNP/khelzon/issues)

KhelZon is a browser-based single-player arcade built with HTML, CSS, and JavaScript. It runs without frameworks, build tools, or user accounts, and stores scores locally on each device.

## Overview

- Seven original single-player games, including a Jackaroo-inspired marble and card racer
- Welcome lobby with arcade entry, about section, and multi-profile player management
- Light and dark themes with locally persisted preference
- Progressive Web App with offline support and optional installation
- Per-player score tracking with export and import backup

## Games

| Game | Type | Description |
|------|------|-------------|
| Marble Quest Solo | Strategy | Card-driven marble race against CPU (Jackaroo-inspired) |
| Snake Rush | Arcade | Classic snake with progressive speed |
| Number Cascade | Puzzle | Merge tiles to reach 4096 |
| Memory Matrix | Puzzle | Match pairs against the clock |
| Orbit Breaker | Arcade | Breakout-style brick smasher |
| Star Drift | Action | Space shooter through asteroid waves |
| Tap Sequence | Reflex | Repeat an expanding color pattern |

## Getting Started

ES modules require a local HTTP server.

```bash
git clone https://github.com/pradipNP/khelzon.git
cd khelzon
python -m http.server 8080
```

Open `http://localhost:8080`. The application loads the lobby first; select **Enter Arcade** to reach the game dashboard.

Alternative local servers: `npx serve .` or the VS Code Live Server extension.

## Progressive Web App

KhelZon registers a service worker for asset caching and supports installation as a standalone app.

| Platform | Installation |
|----------|--------------|
| Desktop / Android | Use **Install App** in the lobby or the install control in the header |
| iOS (Safari) | Share → **Add to Home Screen** |

HTTPS is required for installation and service worker registration in production.

## Data & Privacy

All player profiles and scores are stored in the browser via `localStorage`. No authentication or remote database is used.

| Capability | Behavior |
|------------|----------|
| Multiple profiles | Separate score sets per profile on the same device |
| Cross-tab updates | Changes propagate between open tabs automatically |
| Backup export / import | JSON file for manual transfer between browsers or devices |
| Browser sync | Optional; depends on Chrome or Firefox sync settings |

KhelZon does not transmit score data to external servers unless the user explicitly exports a backup file.

## Deployment

KhelZon is a static site. Deploy the repository root to any static hosting provider.

| Setting | Value |
|---------|-------|
| Build command | None |
| Output directory | `/` (repository root) |
| Requirements | HTTPS for PWA features |

Compatible hosts include Cloudflare Pages, Netlify, Vercel, and GitHub Pages. After the first online visit, the service worker caches application assets for offline use.

## Project Structure

```
KhelZon/
├── index.html
├── manifest.json
├── sw.js
├── css/
│   ├── main.css
│   └── games.css
└── js/
    ├── app.js
    ├── router.js
    ├── lobby.js
    ├── theme.js
    ├── pwa.js
    ├── sync.js
    ├── storage.js
    ├── gameRegistry.js
    ├── gameFit.js
    ├── users.js
    └── games/
```

## Technology

- Vanilla ES modules
- Canvas 2D for action games
- CSS Grid and Flexbox
- LocalStorage for persistence
- Service Worker for offline caching

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding guidelines, and pull request expectations.

- [Report a bug](https://github.com/pradipNP/khelzon/issues/new?template=bug_report.yml)
- [Request a feature](https://github.com/pradipNP/khelzon/issues/new?template=feature_request.yml)
- [Propose a game](https://github.com/pradipNP/khelzon/issues/new?template=game_idea.yml)

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before participating.

## License

[MIT](LICENSE) — Copyright (c) 2026 Pradip Kumar Prajapati.
