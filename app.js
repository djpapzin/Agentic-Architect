import { languageAgent, culturalAgent, legalAgent, toneAgent } from './coral/agents.js';

const state = {
  messages: []
};

function byId(id) { return document.getElementById(id); }

function addMessage(role, text) {
  state.messages.push({ role, text, at: new Date() });
  render();

  // Announce new message for screen readers
  const announcer = byId('status-message');
  announcer.textContent = `${role === 'user' ? 'You' : 'Polyglot Mediator'}: ${text}`;
}

function render() {
  const container = byId('messages');
  container.innerHTML = '';
  for (const [i, m] of state.messages.entries()) {
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
  state.messages = state.messages.filter(m=> !(m.role==='bot' && m.text==='Processing…'));
  addMessage('bot', out);

  inputEl.value = '';
  inputEl.focus();
});

// Demo mode - seed conversation
byId('demo-mode').addEventListener('click', () => {
  state.messages = [];
  addMessage('user', 'Hey, can you review this short contract?');
  addMessage('bot', 'Processing…');
  setTimeout(async () => {
    const out = await mediatePipeline('Hey, can you review this short contract?', {
      language: true, cultural: true, legal: true, toneAgent: true, tone: 'formal'
    });
    state.messages = state.messages.filter(m=> !(m.role==='bot' && m.text==='Processing…'));
    addMessage('bot', out);
  }, 400);
});

// Initial greeting
addMessage('bot', 'Welcome! Type a message, select agents, then press Send.');