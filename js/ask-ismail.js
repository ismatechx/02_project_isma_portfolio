// ===== ASK ISMAIL AI =====
// Posts to a Supabase Edge Function that proxies to Claude.
// Set the endpoint below to your deployed function URL.

const ENDPOINT = (window.ASK_ISMAIL_ENDPOINT || '').trim();
// fallback: derive from supabase project URL if available
const FALLBACK_ENDPOINT = 'https://rubhvlgacxjncohamfnz.supabase.co/functions/v1/ask-ismail';

const fab    = document.getElementById('ai-fab');
const panel  = document.getElementById('ai-panel');
const close  = panel?.querySelector('.ai-close');
const thread = document.getElementById('ai-thread');
const form   = document.getElementById('ai-form');
const input  = document.getElementById('ai-input');
const suggest= document.getElementById('ai-suggest');

if (!fab || !panel) {
  console.warn('ask-ismail: required DOM not found');
} else {
  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    fab.classList.toggle('hidden', panel.classList.contains('open'));
    if (panel.classList.contains('open')) setTimeout(() => input?.focus(), 200);
  });
  close.addEventListener('click', () => { panel.classList.remove('open'); fab.classList.remove('hidden'); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      panel.classList.remove('open'); fab.classList.remove('hidden');
    }
  });
}

suggest?.querySelectorAll('.ai-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    input.value = chip.textContent;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  });
});

function append(role, text, opts = {}) {
  const wrap = document.createElement('div');
  wrap.className = `ai-msg ai-msg--${role}`;
  const b = document.createElement('div');
  b.className = 'ai-bubble';
  if (opts.html) b.innerHTML = text;
  else b.textContent = text;
  wrap.appendChild(b);
  thread.appendChild(wrap);
  thread.scrollTop = thread.scrollHeight;
  return b;
}

function setLoading(bubble) {
  bubble.classList.add('ai-bubble--loading');
  bubble.innerHTML = '<span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span>';
}

function renderMarkdownLite(text) {
  // very light: line breaks, bold, code spans
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}

const conversation = []; // [{role: 'user'|'assistant', content: string}]

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) return;
  suggest?.remove();

  append('user', q);
  conversation.push({ role: 'user', content: q });
  input.value = '';
  input.disabled = true;

  const botBubble = append('bot', '', { html: true });
  setLoading(botBubble);

  const url = ENDPOINT || FALLBACK_ENDPOINT;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversation }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
    }
    const data = await res.json();
    const reply = (data.reply || data.content || '').trim();
    if (!reply) throw new Error('Empty response');
    botBubble.classList.remove('ai-bubble--loading');
    botBubble.innerHTML = renderMarkdownLite(reply);
    conversation.push({ role: 'assistant', content: reply });
  } catch (err) {
    botBubble.classList.remove('ai-bubble--loading');
    botBubble.classList.add('ai-bubble--err');
    botBubble.innerHTML = `Sorry — I can't reach the assistant right now.<br/><span class="mono ai-err-detail">${String(err.message || err).slice(0, 160)}</span><br/><br/>You can reach Ismail directly at <a href="mailto:isma96.u@gmail.com">isma96.u@gmail.com</a>.`;
  } finally {
    input.disabled = false;
    input.focus();
  }
});
