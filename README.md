# KhelZon — Solo Arcade Playground

A browser-based **single-player** arcade built with pure **HTML, CSS, and JavaScript**. No frameworks, no accounts, no multiplayer — just instant games with local score tracking.

## Live Features

- **7 original single-player games** including a Jackaroo-inspired marble & card racer
- **Distinct warm indigo + saffron UI** — visually different from other browser arcades
- **Offline-ready PWA** with service worker caching
- **Local score storage** — stats stay on your device

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

Open the project folder and serve it locally (ES modules require a server):

```bash
# Option 1: Python
python -m http.server 8080

# Option 2: Node (npx)
npx serve .

# Option 3: VS Code Live Server extension
```

Then visit `http://localhost:8080`

## Project Structure

```
KhelZon/
├── index.html          # App shell
├── css/
│   ├── main.css        # Theme & layout
│   └── games.css       # Game-specific styles
├── js/
│   ├── app.js          # Boot & splash
│   ├── router.js       # Hash routing & views
│   ├── storage.js      # LocalStorage scores
│   ├── gameRegistry.js # Game catalog
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

## License

MIT — free to use, modify, and learn from.
