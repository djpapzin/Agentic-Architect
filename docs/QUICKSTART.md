## Quickstart — Polyglot Mediator

This guide gets you from clone to demo in under 2 minutes.

### 1) Prerequisites
- A modern browser (Chrome, Edge, Firefox, Safari)
- Optional: Python 3 (for a quick local server)

### 2) Clone the repo
```bash
git clone https://github.com/djpapzin/Agentic-Architect.git
cd "Agentic-Architect"
```

### 3) Run locally
Option A: open `index.html` directly (double-click). Works fine for MVP.

Option B (recommended): serve over HTTP for cleaner console logs
```bash
python -m http.server 5173
# then visit http://localhost:5173
```

### 4) Use the app
- Type a message in the composer.
- Toggle agents (Language, Cultural, Legal, Tone) and choose a tone.
- Click Send. You’ll see a mocked mediated response while we prep Coral integration.

### 5) Presets & Sessions (after features land)
- Create/switch sessions in the left sidebar.
- Use Presets to preconfigure agents and tone.
- Settings persist locally via `localStorage`.

### 6) Next steps
- Read `README.md` for context and roadmap.
- See `docs/PRD.md` for goals/scope, and `docs/TODO.md` to track team work.
- Coral integration plan: `docs/coral-notes.md` (coming soon).

### 7) Git workflow (feature branches)
- Always create a new branch for each feature or fix. The maintainer will merge to `main`.
```bash
# create and switch to a feature branch
git checkout -b feat/<short-feature-name>

# make changes, then commit
git add -A
git commit -m "feat: short description"

# push the branch and open a PR
git push -u origin feat/<short-feature-name>
# then create a PR targeting main (via GitHub UI or GH CLI)
# maintainer will review and merge
```


