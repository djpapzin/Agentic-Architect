## Coral Integration Notes (MVP Planning)

Status: Draft for hackathon

### Goals
- Standardize each agent (Language, Cultural, Legal, Tone) using Coral Server MCP so they can be discovered, invoked, and composed.
- Define clear I/O contracts to make swapping mocks for real agents trivial.

### MCP Server Shape (per agent)
Example capabilities exposed by a Coral MCP server:
```ts
// Request to an agent
interface AgentRequest {
  id: string;                // correlation id
  message: string;           // input text
  sourceLang?: string;       // optional hint
  targetLang?: string;       // e.g., 'es', 'fr', 'ja'
  tone?: 'neutral'|'formal'|'friendly'|'assertive';
  context?: Record<string, unknown>; // domain/policy hints
}

// Response from an agent
interface AgentResponse {
  id: string;                // echoes request id
  status: 'ok'|'error';
  output?: string;           // transformed text
  rationale?: string;        // short explanation of changes/flags
  warnings?: string[];       // optional flags (e.g., legal)
  error?: {
    code: string;
    message: string;
  }
}
```

### Registry Entry (per agent)
Minimum metadata for Coral Registry:
```ts
interface RegistryEntry {
  name: string;              // e.g., 'polyglot-language'
  version: string;           // semver
  maintainers: string[];
  capabilities: string[];    // e.g., ['translate', 'paraphrase']
  inputs: string[];          // ['message', 'sourceLang', 'targetLang', 'tone']
  outputs: string[];         // ['output', 'rationale', 'warnings']
}
```

### Orchestration (UI pipeline target)
- Sequential pipeline (mock today): Language → Cultural → Legal → Tone.
- Each step returns `{output, rationale, warnings}`; the next step consumes `output`.
- UI shows a combined result and aggregates rationales and warnings.

### Stubs (to implement now)
- File: `coral/agents.js`
- Functions (async): `callLanguageAgent`, `callCulturalAgent`, `callLegalAgent`, `callToneAgent`.
- Shape each return to match `AgentResponse` above; simulate latency and timeouts.

### Error & Timeout Policy (MVP)
- Timeout per agent: 5s (configurable).
- On timeout/error: continue pipeline with last good `output`; append warning.

### Next Steps
- Validate contracts against Coral docs.
- Add discovery hooks for Registry.
- Replace mocks with real MCP invocations post-hackathon.


