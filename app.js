const state = {
  messages: []
};

function byId(id) { return document.getElementById(id); }

function addMessage(role, text) {
  state.messages.push({ role, text, at: new Date() });
  render();
}

function render() {
  const container = byId('messages');
  container.innerHTML = '';
  for (const m of state.messages) {
    const div = document.createElement('div');
    div.className = `bubble ${m.role}`;
    div.innerHTML = `${escapeHtml(m.text)}<small>${m.role === 'user' ? 'You' : 'Polyglot Mediator'} • ${m.at.toLocaleTimeString()}</small>`;
    container.appendChild(div);
  }
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/[&<>"]+/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s]));
}

function mockMediate(input, opts) {
  const enabled = Object.entries(opts).filter(([, v]) => !!v).map(([k]) => k).join(', ');
  const toneMap = { neutral: 'neutral', formal: 'more formal', friendly: 'friendlier', assertive: 'more assertive' };
  const tone = toneMap[opts.tone] || 'neutral';
  return `Processed with: ${enabled || 'none'}. Tone: ${tone}.\n\n“${input}”`;
}

byId('composer').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = byId('input');
  const text = input.value.trim();
  if (!text) return;

  const opts = {
    language: byId('agent-language').checked,
    cultural: byId('agent-cultural').checked,
    legal: byId('agent-legal').checked,
    toneAgent: byId('agent-tone').checked,
    tone: byId('tone').value
  };

  addMessage('user', text);

  // Simulate a small delay as if orchestrating remote agents
  setTimeout(() => {
    const out = mockMediate(text, { ...opts });
    addMessage('bot', out);
  }, 350);

  input.value = '';
  input.focus();
});

// Initial greeting
addMessage('bot', 'Welcome! Type a message, select agents, then press Send.');


