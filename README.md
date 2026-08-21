# KhelZon — Solo Arcade Playground

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Issues](https://img.shields.io/github/issues/pradipNP/khelzon)](https://github.com/pradipNP/khelzon/issues)

A browser-based **single-player** arcade built with pure **HTML, CSS, and JavaScript**. No frameworks, no accounts, no multiplayer — just instant games with local score tracking.

**Repository:** [github.com/pradipNP/khelzon](https://github.com/pradipNP/khelzon)

## Live Features

- **7 original single-player games** including a Jackaroo-inspired marble & card racer
- **Welcome lobby** with Enter Arcade, About, and per-device player profiles
- **Light / dark theme** toggle — preference saved locally
- **Distinct warm indigo + saffron UI** — visually different from other browser arcades
- **Offline-ready PWA** with service worker caching
- **Local score storage** — stats stay on your device, separated per player

## Games

| Game | Type | Description |
|------|------|-------------|
| 🏁 Marble Quest Solo | Strategy | Card-driven marble race vs CPU (Jackaroo-inspired solo mode) |
| 🐍 Snake Rush | Arcade | Classic snake with speed scaling |
| 🔢 Number Cascade | Puzzle | Merge tiles to reach 4096 |
| 🧠 Memory Matrix | Puzzle | Flip & match pairs against the clock |
| 🧱 Orbit Breaker | Arcade | Breakout-style brick smasher |
| 🚀 Star Drift | Action | Solo space shooter through asteroid waves |
| 🎵 Tap Sequence | Reflex | Repeat the growing color pattern |

## Quick Start

Clone the repo and serve it locally (ES modules require a server):

```bash
git clone https://github.com/pradipNP/khelzon.git
cd khelzon

# Option 1: Python
python -m http.server 8080

# Option 2: Node (npx)
npx serve .

# Option 3: VS Code Live Server extension
```

Then visit `http://localhost:8080` — you'll land on the lobby, then **Enter Arcade** to play.

## Project Structure

```
KhelZon/
├── index.html          # App shell
├── css/
│   ├── main.css        # Theme, layout, lobby
│   └── games.css       # Game-specific styles
├── js/
│   ├── app.js          # Boot & splash
│   ├── router.js       # Hash routing & views
│   ├── lobby.js        # Welcome lobby
│   ├── theme.js        # Light/dark theme
│   ├── storage.js      # Per-player local scores
│   ├── gameRegistry.js # Game catalog
│   ├── gameFit.js      # Viewport-fit helpers
│   └── games/          # Individual game modules
├── manifest.json       # PWA manifest
└── sw.js               # Service worker
```

## Tech

- Vanilla ES modules (no build step)
- Canvas 2D for action games
- CSS Grid/Flexbox for layout
- LocalStorage for persistence
- Service Worker for offline cache

## Contributing

KhelZon is **open source** and contributions are welcome!

| Action | Link |
|--------|------|
| Report a bug | [Open bug report](https://github.com/pradipNP/khelzon/issues/new?template=bug_report.yml) |
| Request a feature | [Open feature request](https://github.com/pradipNP/khelzon/issues/new?template=feature_request.yml) |
| Suggest a new game | [Open game idea](https://github.com/pradipNP/khelzon/issues/new?template=game_idea.yml) |
| Submit code | [CONTRIBUTING.md](CONTRIBUTING.md) |

1. Fork the repository
2. Create a branch (`git checkout -b fix/my-fix`)
3. Make your changes and test locally
4. Open a pull request against `main`

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## License

[MIT](LICENSE) — free to use, modify, and learn from. Copyright (c) 2026 Pradip Kumar Prajapati.
