# Polyglot Mediator (Agentic Architect)

Minimal demo for the Internet of Agents Hackathon.

## Example Scenario
You draft a short partnership email in English and want to send a culturally-appropriate version in Spanish with a friendly tone, while avoiding risky claims. Enable Language, Cultural, and Tone agents, pick "Friendly", paste your draft, and press Send. The app returns a mediated version along with step outputs.

## What I built
- UI-first chat interface to orchestrate multiple agents (language, cultural, legal, tone).
- Agent stubs under `coral/agents.js` simulate async agents and errors.
- ARIA live region and keyboard focus styles for accessibility.
- Demo Mode to seed an example conversation.
- Copy-to-clipboard for bot outputs.

## Limitations (MVP)
- No real LLM/agent calls yet; all agents are stubs.
- No backend; everything runs in the browser and persists to `localStorage`.
- Legal checks are heuristic placeholders and NOT compliance advice.

## Tech Stack
- HTML/CSS/JavaScript (no build step required)
- Accessibility: ARIA live regions, keyboard focus-visible styles
- State: in-memory + `localStorage` for sessions/presets
- Optional static server: Python `http.server` or `npx serve`

## How to run (local)
1. Extract the ZIP and open the project folder.
2. Use a static server (recommended). From the project folder run:
   ```bash
   # Python 3
   python -m http.server 5173
   # then open http://localhost:5173 in your browser
   ```
3. Or use VS Code Live Server (Open index.html with Live Server).

## Files of interest
- `index.html` – main UI
- `styles.css` – improved styles + focus styles
- `app.js` – main app logic (ES module)
- `coral/agents.js` – agent stubs (async functions)
- `README.md` – this file

## Next steps for you (manual)
- Replace `coral/agents.js` stubs with real Coral MCP calls when you have credentials.
- Add backend proxy `/mediate` if you want server-side secrets or streaming responses.
- Hook up Solana payment flows if you plan to monetize agent calls.
- Add tests in `tests/` before final submission.

## Tests
- Open `http://localhost:5173/tests/index.test.html` and click "Run Tests" to validate basic DOM flows (Demo Mode, presets, send flow).

## Notes
This package is intentionally lightweight and runs in the browser using ES modules.
