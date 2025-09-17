## Polyglot Mediator

A minimal, UI-first prototype for coordinating multiple specialized agents to translate, adapt tone, and ensure cultural/legal alignment across languages. Built by Agentic Architect for the Internet of Agents hackathon.

### Problem
- Global teams need to communicate across languages and cultures without losing intent, tone, or compliance.
- Existing translation tools miss nuance: cultural context, legal sensitivities, domain-specific constraints, and stylistic tone.

### Solution
Polyglot Mediator orchestrates multiple agents in parallel:
- **Language Agent**: high-fidelity translation and paraphrasing.
- **Cultural Agent**: adapts phrasing to cultural norms.
- **Legal Agent**: flags risky or non-compliant wording.
- **Tone Agent**: transforms style (formal, friendly, assertive, etc.).

The UI lets a user write a message, select which agents to apply, and preview combined outputs. Under the hood, we will standardize each agent using Coral Protocol so they can be registered, invoked, and composed consistently.

### Why Coral Protocol?
- **Standardization**: MCP/Server conventions make agents predictable and composable.
- **Discovery**: Coral Registry enables publishing and reusing agents across teams.
- **Orchestration**: Clear interaction patterns for multi-agent workflows.

### Architecture (prototype)
- `index.html` — simple chat-like interface with agent selectors.
- `styles.css` — lightweight, responsive styles.
- `app.js` — local-only mock orchestration (no backend yet). Later this will call standardized Coral agents.

### Repository Structure
- Root UI
  - [`index.html`](index.html) — main UI
  - [`styles.css`](styles.css) — styles for layout and theming
  - [`app.js`](app.js) — mock agent pipeline and UI behaviors
- Documentation
  - [`docs/QUICKSTART.md`](docs/QUICKSTART.md) — fast start (clone → run → branch workflow)
  - [`docs/PRD.md`](docs/PRD.md) — product requirements (goals, scope, milestones)
  - [`docs/TODO.md`](docs/TODO.md) — daily checklists (Sept 17–21) with owners
  - [`docs/PLANNING.md`](docs/PLANNING.md) — planning notes
  - [`docs/hackathon_overview.md`](docs/hackathon_overview.md) — high-level hackathon info
  - [`docs/coral website.md`](docs/coral%20website.md) — Coral-related notes and links

### Getting Started
Prereqs: a modern browser.

1) Clone the repo
```bash
git clone https://github.com/djpapzin/Agentic-Architect.git
cd "Agentic-Architect"
```

2) Open the UI
- Double-click `index.html`, or
- Use a local server (recommended):
```bash
# Python 3
python -m http.server 5173
# then visit http://localhost:5173
```

### Quickstart
For a step-by-step, see `docs/QUICKSTART.md`.

3) Try it out
- Type a message, choose agents (Language, Cultural, Legal, Tone), and click Send.
- You’ll see a mocked “mediated” response. We’ll replace this with Coral-backed agents next.

### Next Steps (Roadmap)
- Wire UI to Coral-standardized agents via MCP.
- Add agent registry integration and presets per use case.
- Introduce streaming responses and message history.
- Add tests and CI.

### Contributing
PRs welcome during the hackathon. Keep code readable and small; prefer incremental commits.


