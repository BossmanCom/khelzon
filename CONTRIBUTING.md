# Contributing to KhelZon

Thank you for your interest in contributing! KhelZon is an open-source, single-player browser arcade built with vanilla HTML, CSS, and JavaScript. Every contribution helps make the project better for players and developers.

## Ways to contribute

- **Report bugs** — [Open a bug report](https://github.com/pradipNP/khelzon/issues/new?template=bug_report.yml)
- **Suggest features** — [Open a feature request](https://github.com/pradipNP/khelzon/issues/new?template=feature_request.yml)
- **Propose a new game** — [Open a game idea](https://github.com/pradipNP/khelzon/issues/new?template=game_idea.yml)
- **Fix issues or add code** — Fork the repo, make changes, and open a pull request
- **Improve docs** — README, comments, or in-app About text

You do **not** need permission to open an issue. If you're unsure, open one anyway — maintainers will help triage it.

## Before you start

1. Check [existing issues](https://github.com/pradipNP/khelzon/issues) to avoid duplicates
2. For large changes (new game, routing overhaul, storage format), open an issue first so we can align on approach
3. Read the [Code of Conduct](./CODE_OF_CONDUCT.md)

## Development setup

KhelZon has **no build step**. ES modules require a local HTTP server:

```bash
git clone https://github.com/pradipNP/khelzon.git
cd khelzon

# Option A — Python
python -m http.server 8080

# Option B — Node
npx serve .
```

Open `http://localhost:8080` in your browser.

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | App shell |
| `js/app.js` | Boot, splash, init |
| `js/router.js` | Hash routing & views |
| `js/lobby.js` | Welcome lobby |
| `js/storage.js` | Per-player local scores |
| `js/gameRegistry.js` | Game catalog & metadata |
| `js/games/` | One module per game |
| `css/main.css` | Theme, layout, lobby |
| `css/games.css` | Game-specific styles |
| `sw.js` | Service worker (offline cache) |

## Adding a new game

1. Create `js/games/your-game.js` exporting a default object with `mount(container)` and `unmount()` (see existing games)
2. Register it in `js/gameRegistry.js` with `id`, `name`, `description`, `icon`, `category`, `instructions`, and `load`
3. Add styles in `css/games.css` if needed
4. Ensure the game fits the viewport (use `js/gameFit.js` helpers for canvas/grid games)
5. Test on desktop and mobile

## Coding guidelines

- **Vanilla JS only** — no frameworks or bundlers
- **Match existing style** — naming, spacing, and patterns used in nearby files
- **Keep diffs focused** — one logical change per pull request when possible
- **Accessibility** — use semantic HTML, `aria-*` labels, keyboard-friendly controls
- **Mobile-first** — games and UI should work on small screens without forced scrolling in the play area
- **No secrets** — never commit API keys, tokens, or `.env` files

## Pull request process

1. Fork [pradipNP/khelzon](https://github.com/pradipNP/khelzon) and create a branch from `main`
2. Make your changes and test locally
3. Update `README.md` if you add games, routes, or user-facing features
4. Add `sw.js` cache entries if you add new static assets loaded by the app
5. Open a PR against `main` with:
   - A clear title (e.g. `fix: memory matrix grid on narrow screens`)
   - What changed and why
   - How you tested it
6. Link related issues (`Fixes #123`)

Maintainers will review when they can. Be patient and responsive to feedback.

## Issue labels (reference)

| Label | Meaning |
|-------|---------|
| `bug` | Something is broken |
| `enhancement` | Improvement to existing feature |
| `game` | New or updated game |
| `good first issue` | Good entry point for newcomers |
| `help wanted` | Maintainer would welcome a PR |

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

## Questions?

Open a [GitHub issue](https://github.com/pradipNP/khelzon/issues) or start a discussion on the repo. We're happy to help you get started.
