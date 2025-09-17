## Product Requirements Document (PRD) — Polyglot Mediator

Owner: Agentic Architect (DJ & Zemo)
Status: Draft v0.1
Audience: Hackathon team, reviewers

### 1) Summary
Polyglot Mediator is a UI-first prototype that coordinates multiple specialized agents to translate, adapt tone, and ensure cultural/legal alignment across languages. The first milestone delivers a working demo with mocked agents and a clean UX. Later milestones integrate Coral Protocol to standardize and orchestrate real agents.

### 2) Goals & Non-Goals
Goals (MVP):
- Enable a user to enter a message, select agents (Language, Cultural, Legal, Tone), and view a mediated result.
- Provide a responsive, accessible UI with basic session management and presets.
- Document how agents will be standardized via Coral MCP/Registry.

Non-Goals (MVP):
- No production-grade backend or persistence beyond local storage.
- No realtime collaboration or auth.
- No full legal compliance guarantees (mock signaling only at MVP).

### 3) Personas
- Communicator (PM/Marketing/BD): needs culturally appropriate messaging across locales.
- Engineer/Writer: needs tone/style adaptation without changing intent.
- Reviewer/Legal: wants quick visibility into potential risk phrases.

### 4) User Stories
- As a communicator, I want to paste a draft message and get a culturally suitable version in Spanish with a friendly tone.
- As an engineer, I want to convert terse notes into a more formal announcement in French.
- As a reviewer, I want the app to flag potentially risky claims and suggest safer alternatives.

### 5) Requirements
Functional:
- Users can toggle agents: Language, Cultural, Legal, Tone.
- Message UI supports composing, sending, and viewing results with a loading state.
- Presets preconfigure agents and tone; selections persist locally.
- Sessions: create/switch between chats; messages isolated per session.

Non-Functional:
- Accessibility: ARIA live regions, keyboard navigability, sufficient contrast.
- Performance: Response within 1s for mock pipeline (excluding intentional latency simulation).
- Simplicity: Single-page app with no external build required.

### 6) UX Overview
- Left sidebar: session list + "New Session".
- Main panel: messages (bubbles) and composer with agent toggles and tone selector.
- Presets panel: collapsible row with scenario buttons.
- Loading indicators per request; copy button on bot messages.

### 7) Technical Approach
- MVP: Pure HTML/CSS/JS. `app.js` implements a modular pipeline with mock agents, latency simulation, and rationale per step.
- Coral Preparation: `docs/coral-notes.md` to outline agent standardization (MCP server), registry entries, and request/response shapes. `coral/agents.js` to provide async stubs matching future contracts.
- Optional: Node/Express proxy for a single `/mediate` endpoint if needed.

### 8) Milestones
- M0 (done/next): UI scaffold, README, team tasks, issues.
- M1 (today): Multi-session, presets, pipeline with rationales and spinners, accessibility, copy button.
- M2 (tomorrow): Coral docs, agent stubs, demo mode, tests, housekeeping docs.
- M3 (stretch): Optional proxy backend, streaming responses, basic CI.

### 9) Risks & Mitigations
- Time constraints: cut scope to MVP UI and mock agents; prioritize demo value.
- API uncertainty: define contracts early in `docs/coral-notes.md` and adhere to them in stubs.
- UX complexity creep: keep styles lightweight and avoid framework lock-in.

### 10) Success Metrics
- Demo readiness: end-to-end flow from input to mediated output in < 10 minutes of setup.
- Clarity: reviewers can understand the agent roles and pipeline from the UI and README.
- Extensibility: clear contracts that make swapping in Coral-backed agents straightforward.

### 11) Out of Scope (for Hackathon)
- Authentication, roles, and multi-tenant data storage.
- Enterprise-grade logging/monitoring.
- Full compliance verification; only heuristic/legal-agent flags at MVP.


