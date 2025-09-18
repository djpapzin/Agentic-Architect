import { languageAgent, culturalAgent, legalAgent, toneAgent } from './coral/agents.js';

const state = {
  sessions: {},
  activeSessionId: null
};

function loadState() {
  try {
    const raw = localStorage.getItem('polyglot-sessions');
    if (raw) {
      const parsed = JSON.parse(raw);
      state.sessions = parsed.sessions || {};
      state.activeSessionId = parsed.activeSessionId || null;
    }
  } catch {}
  // load default agent preset
  try {
    const presetRaw = localStorage.getItem('polyglot-preset-default');
    if (presetRaw) {
      const p = JSON.parse(presetRaw);
      byId('agent-language').checked = !!p.language;
      byId('agent-cultural').checked = !!p.cultural;
      byId('agent-legal').checked = !!p.legal;
      byId('agent-tone').checked = !!p.toneAgent;
      if (p.tone) byId('tone').value = p.tone;
    }
  } catch {}
  if (!state.activeSessionId) {
    createSession();
  }
}

function persistState() {
  localStorage.setItem('polyglot-sessions', JSON.stringify({
    sessions: state.sessions,
    activeSessionId: state.activeSessionId
  }));
}

function createSession() {
  const id = 's_' + Math.random().toString(36).slice(2, 9);
  state.sessions[id] = { id, name: `Session ${Object.keys(state.sessions).length + 1}`, messages: [] };
  state.activeSessionId = id;
  persistState();
  renderSessions();
  render();
}

function switchSession(id) {
  if (!state.sessions[id]) return;
  state.activeSessionId = id;
  persistState();
  renderSessions();
  render();
}

function byId(id) { return document.getElementById(id); }

function addMessage(role, text) {
  const session = state.sessions[state.activeSessionId];
  session.messages.push({ role, text, at: new Date() });
  persistState();
  render();

  // Announce new message for screen readers
  const announcer = byId('status-message');
  announcer.textContent = `${role === 'user' ? 'You' : 'Polyglot Mediator'}: ${text}`;
}

function render() {
  const container = byId('messages');
  container.innerHTML = '';
  const session = state.sessions[state.activeSessionId];
  for (const [i, m] of session.messages.entries()) {
    const div = document.createElement('div');
    div.className = `bubble ${m.role}`;
    div.innerHTML = `<div class="bubble-text">${escapeHtml(m.text)}</div><small>${m.role === 'user' ? 'You' : 'Polyglot Mediator'} • ${m.at.toLocaleTimeString()}</small>`;

    // copy button for bot bubbles
    if (m.role === 'bot') {
      const copy = document.createElement('button');
      copy.className = 'copy-btn';
      copy.title = 'Copy message';
      copy.innerText = '📋';
      copy.addEventListener('click', () => navigator.clipboard.writeText(m.text));
      div.appendChild(copy);
    }

    container.appendChild(div);
  }
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"]+/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s]));
}

async function mediatePipeline(text, opts) {
  // Run agents sequentially and return combined output (string)
  let result = text;
  const steps = [];
  try {
    if (opts.language) {
      const out = await languageAgent(result);
      steps.push(out);
      result = out;
    }
    if (opts.cultural) {
      const out = await culturalAgent(result);
      steps.push(out);
      result = out;
    }
    if (opts.legal) {
      const out = await legalAgent(result);
      steps.push(out);
      result = out;
    }
    if (opts.toneAgent) {
      const out = await toneAgent(result, opts.tone);
      steps.push(out);
      result = out;
    }
    // combine steps into readable summary
    const summary = steps.map((s,i)=>`Step ${i+1}: ${s}`).join('\n\n');
    return summary;
  } catch (err) {
    return `[Error in pipeline] ${err.message || err}`;
  }
}

byId('composer').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputEl = byId('input');
  const text = inputEl.value.trim();
  if (!text) return;

  const opts = {
    language: byId('agent-language').checked,
    cultural: byId('agent-cultural').checked,
    legal: byId('agent-legal').checked,
    toneAgent: byId('agent-tone').checked,
    tone: byId('tone').value
  };

  addMessage('user', text);

  // show an interim bot message for UX
  addMessage('bot', 'Processing…');

  const out = await mediatePipeline(text, opts);

  // replace last bot message with real output
  const session = state.sessions[state.activeSessionId];
  session.messages = session.messages.filter(m=> !(m.role==='bot' && m.text==='Processing…'));
  addMessage('bot', out);
  persistState();

  inputEl.value = '';
  inputEl.focus();
});

// Demo mode - seed conversation
byId('demo-mode').addEventListener('click', () => {
  const session = state.sessions[state.activeSessionId];
  session.messages = [];
  addMessage('user', 'Hey, can you review this short contract?');
  addMessage('bot', 'Processing…');
  setTimeout(async () => {
    const out = await mediatePipeline('Hey, can you review this short contract?', {
      language: true, cultural: true, legal: true, toneAgent: true, tone: 'formal'
    });
    const session2 = state.sessions[state.activeSessionId];
    session2.messages = session2.messages.filter(m=> !(m.role==='bot' && m.text==='Processing…'));
    addMessage('bot', out);
    persistState();
  }, 400);
});

// Initial greeting
function renderSessions() {
  const list = byId('sessions-list');
  if (!list) return;
  list.innerHTML = '';
  const entries = Object.values(state.sessions);
  for (const s of entries) {
    const item = document.createElement('div');
    item.className = 'session-item' + (s.id === state.activeSessionId ? ' active' : '');
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', s.id === state.activeSessionId ? 'true' : 'false');

    const name = document.createElement('div');
    name.className = 'session-name';
    name.textContent = s.name;
    item.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'session-meta';
    meta.textContent = `${s.messages.length} msg`;
    item.appendChild(meta);

    item.addEventListener('click', () => switchSession(s.id));
    list.appendChild(item);
  }
}

byId('new-session')?.addEventListener('click', () => {
  createSession();
  addMessage('bot', 'New session created.');
});

// Presets wiring
function applyPreset(presetName) {
  const presets = {
    neutral: { language: true, cultural: true, legal: false, toneAgent: true, tone: 'neutral' },
    friendly: { language: true, cultural: true, legal: false, toneAgent: true, tone: 'friendly' },
    formal: { language: true, cultural: true, legal: true, toneAgent: true, tone: 'formal' }
  };
  const p = presets[presetName];
  if (!p) return;
  byId('agent-language').checked = p.language;
  byId('agent-cultural').checked = p.cultural;
  byId('agent-legal').checked = p.legal;
  byId('agent-tone').checked = p.toneAgent;
  byId('tone').value = p.tone;
}

document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => applyPreset(btn.getAttribute('data-preset')));
});

byId('save-default')?.addEventListener('click', () => {
  const preset = {
    language: byId('agent-language').checked,
    cultural: byId('agent-cultural').checked,
    legal: byId('agent-legal').checked,
    toneAgent: byId('agent-tone').checked,
    tone: byId('tone').value
  };
  localStorage.setItem('polyglot-preset-default', JSON.stringify(preset));
  const announcer = byId('status-message');
  announcer.textContent = 'Default preset saved';
});

loadState();
renderSessions();
addMessage('bot', 'Welcome! Type a message, select agents, then press Send.');