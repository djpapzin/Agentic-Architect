# Polyglot Mediator (Agentic Architect)

Minimal demo for the Internet of Agents Hackathon.

## What I built
- UI-first chat interface to orchestrate multiple agents (language, cultural, legal, tone).
- Agent stubs under `coral/agents.js` simulate async agents and errors.
- ARIA live region and keyboard focus styles for accessibility.
- Demo Mode to seed an example conversation.
- Copy-to-clipboard for bot outputs.

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

## Notes
This package is intentionally lightweight and runs in the browser using ES modules.
