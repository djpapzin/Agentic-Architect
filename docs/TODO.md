## Team TODO — Agentic Architect

Owners: **DJ**, **Zemo**

### Checklist
- [ ] DJ — README: Example Scenario, Limitations, Tech Stack
- [ ] DJ — UI: multi-session support with sidebar
- [ ] DJ — Agent pipeline (mock): sequential transforms + rationales + latency
- [ ] DJ — Presets panel + persistence (localStorage)
- [ ] DJ — Tests: minimal browser tests for pipeline
- [ ] Zemo — A11y & UX: ARIA, focus states, copy button
- [ ] Zemo — Agent stubs: `coral/agents.js` + timeouts/errors
- [ ] Zemo — Docs: `docs/coral-notes.md` with MCP + registry + contracts
- [ ] Zemo — Demo mode: seed example conversation
- [ ] Zemo — Housekeeping: LICENSE, CONTRIBUTING.md, CHANGELOG.md

### Ground Rules
- Keep PRs small and self-contained.
- Prefer readable code and clear commit messages.
- Coordinate in Discord; reference task IDs in PR titles.

---

### DJ
1. README improvements: add Example Scenario, Limitations, and Tech Stack.
2. UI sessions: support multiple chat sessions with a left sidebar.
3. Agent pipeline (mock): refactor `app.js` to run enabled agents in sequence with rationales and latency simulation.
4. Presets panel: add preset buttons (EN→ES Business Email, EN→FR Product Announcement, EN→JP Developer Docs) and persist selections.
5. Tests: add minimal browser-based tests for pipeline functions (`tests/index.test.html`).

### Zemo
1. Accessibility & UX: add ARIA improvements, focus states, and message copy button.
2. Agent stubs: create `coral/agents.js` with placeholder async functions shaped like Coral responses; centralize timeouts and error handling.
3. Docs: write `docs/coral-notes.md` summarizing Coral MCP server standardization, registry definition, and planned request/response contracts.
4. Demo mode: toggle that seeds example messages/responses for quick demos.
5. Housekeeping: add `LICENSE` (MIT), `CONTRIBUTING.md`, and `CHANGELOG.md`.

---

### Backlog / Stretch
- Minimal Node/Express proxy `/mediate` (optional).
- Streaming responses and message history persistence.
- CI pipeline and linting.

### Done Definition
- Code runs locally via `index.html` or simple http server.
- Core feature has basic tests or manual test notes.
- README/Docs updated where relevant.


