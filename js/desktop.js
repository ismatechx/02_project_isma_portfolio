// ===== LOCK SCREEN =====
function tick() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const lt = document.getElementById('lock-time');
  const ld = document.getElementById('lock-date');
  const cb = document.getElementById('tb-clock');
  if (lt) lt.textContent = `${hh}:${mm}`;
  if (ld) ld.textContent = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  if (cb) cb.textContent = `${hh}:${mm}`;
}
tick();
setInterval(tick, 30 * 1000);

const lock = document.getElementById('lock');
document.getElementById('lock-enter').addEventListener('click', () => lock.classList.add('hidden'));
document.addEventListener('keydown', e => {
  if (!lock.classList.contains('hidden') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    lock.classList.add('hidden');
  }
});

// ===== WINDOW MANAGER (multi-window) =====
const wins = document.querySelectorAll('.win');
const tbActive = document.getElementById('tb-active');
const openSet = new Set();      // names of windows ever opened (including minimized)
let zCounter = 100;
let cascadeIdx = 0;

const WIN_W = 820;
const WIN_H = 500;

function nameOf(w) { return w.id.replace('win-', ''); }

function cascadePos() {
  const off = (cascadeIdx++ % 6) * 28;
  const cx = Math.max(20, (window.innerWidth  - WIN_W) / 2 + off);
  const cy = Math.max(60, (window.innerHeight - WIN_H) / 2 + off - 20);
  return { left: cx, top: cy };
}

function openApp(name) {
  const w = document.getElementById('win-' + name);
  if (!w) return;
  if (name === 'terminal') openTerminal();

  const firstOpen = !w.classList.contains('open') && !w.classList.contains('minimized');
  if (firstOpen) {
    const { left, top } = cascadePos();
    w.style.left = left + 'px';
    w.style.top  = top  + 'px';
    w.style.transform = 'none';
  }
  w.classList.remove('minimized');
  w.classList.add('open');
  openSet.add(name);

  bringToFront(w);
  const inp = w.querySelector('input, textarea');
  if (inp) setTimeout(() => inp.focus(), 50);
}

function bringToFront(w) {
  w.style.zIndex = ++zCounter;
  document.querySelectorAll('.win').forEach(o => o.classList.remove('active'));
  w.classList.add('active');
  if (tbActive) {
    const n = nameOf(w);
    tbActive.textContent = n[0].toUpperCase() + n.slice(1);
  }
  updateDockState(w);
}

function minimizeWindow(w) {
  w.classList.add('minimized');
  w.classList.remove('active');
  updateTopBarAfterFocusChange();
  updateDockState();
}
function toggleMaximize(w) {
  w.classList.toggle('maximized');
  bringToFront(w);
}
function closeWindow(w) {
  w.classList.remove('open', 'minimized', 'maximized', 'active');
  openSet.delete(nameOf(w));
  updateTopBarAfterFocusChange();
  updateDockState();
}

function updateTopBarAfterFocusChange() {
  const top = [...document.querySelectorAll('.win.open:not(.minimized)')]
    .sort((a, b) => (+b.style.zIndex || 0) - (+a.style.zIndex || 0))[0];
  if (top) {
    top.classList.add('active');
    if (tbActive) {
      const n = nameOf(top);
      tbActive.textContent = n[0].toUpperCase() + n.slice(1);
    }
  } else if (tbActive) {
    tbActive.textContent = 'Desktop';
  }
}

function updateDockState() {
  document.querySelectorAll('.dock-btn[data-app]').forEach(btn => {
    btn.classList.toggle('dock-btn--open', openSet.has(btn.dataset.app));
  });
}

// app launchers (icons + dock)
document.querySelectorAll('[data-app]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const name = el.dataset.app;
    const w = document.getElementById('win-' + name);
    // dock behavior: if open & focused → minimize; if minimized → restore; else open/raise
    if (el.classList.contains('dock-btn') && w && w.classList.contains('open')) {
      if (w.classList.contains('minimized')) { openApp(name); return; }
      if (w.classList.contains('active'))    { minimizeWindow(w); return; }
      bringToFront(w);
      return;
    }
    openApp(name);
  });
});

// traffic-light dots
document.querySelectorAll('.win').forEach(w => {
  const close = w.querySelector('.win-dot--r');
  const min   = w.querySelector('.win-dot--y');
  const max   = w.querySelector('.win-dot--g');
  if (close) close.addEventListener('click', e => { e.stopPropagation(); closeWindow(w); });
  if (min)   min.addEventListener('click',   e => { e.stopPropagation(); minimizeWindow(w); });
  if (max)   max.addEventListener('click',   e => { e.stopPropagation(); toggleMaximize(w); });

  // focus on click
  w.addEventListener('mousedown', () => bringToFront(w));

  // drag from title bar
  const bar = w.querySelector('.win-bar');
  let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
  if (bar) {
    bar.addEventListener('mousedown', e => {
      if (e.target.closest('.win-dot')) return;
      if (w.classList.contains('maximized')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      const r = w.getBoundingClientRect();
      sl = r.left; st = r.top;
      w.style.left = sl + 'px';
      w.style.top  = st + 'px';
      w.style.transform = 'none';
      document.body.style.userSelect = 'none';
    });
    bar.addEventListener('dblclick', () => toggleMaximize(w));
  }
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const nx = Math.max(0, Math.min(window.innerWidth - 100, sl + e.clientX - sx));
    const ny = Math.max(36, Math.min(window.innerHeight - 60, st + e.clientY - sy));
    w.style.left = nx + 'px';
    w.style.top  = ny + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; document.body.style.userSelect = ''; }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const top = document.querySelector('.win.open.active');
    if (top) closeWindow(top);
  }
});

// ===== TERMINAL =====
const termOut = document.getElementById('term-out');
const termIn  = document.getElementById('term-in');
const termPromptEl = document.querySelector('.term-input .t-prompt .t-path');
const history = [];
let histIdx = -1;

// virtual filesystem
const FS = {
  'about.txt': `Ismail Uthuman — Senior BI Analyst @ Zuci Systems (USA).
5+ years turning data into decisions.
Now bringing GenAI (Claude API, RAG, LLM agents) into the BI workflow.

  location:   New Jersey, USA
  email:      isma96.u@gmail.com
  linkedin:   linkedin.com/in/isma96u`,
  'achievements.txt': `· Sky Walker Award — Best Performance (Q4 2024, Zuci Systems)
· Award of Excellence — Supply Operation Analytics (2023, The Global Fund)
· Sky Walker Award — Best Performer (Q2 2023, Zuci Systems)
· Rookie Award — Exceptional Fresher Performance (2020, Radiare)`,
  '.bashrc': `# .bashrc — ismail@os
export PS1="\\u@\\h:\\w$ "
alias ll='ls -lah'
alias gs='git status'
alias rag='python -m rag.serve'`,
  'skills/': {
    'ai-genai.txt':   `Claude API · LLM Integration · RAG · Prompt Engineering · LangChain · Vector DBs`,
    'bi-tools.txt':   `Tableau · Power BI · Tableau Prep`,
    'programming.txt':`SQL · Python · MS SQL Server · Azure SQL`,
    'cloud-etl.txt':  `Azure Data Factory · Microsoft Fabric · Tableau Server`,
  },
  'projects/': {
    'supply-operations.txt':   `Supply Operations Dashboard — Tableau, SQL.
End-to-end supply op with 16 KPI views: Strategic Sourcing, Procurement, IT Spend (Zuci Systems).`,
    'global-fund-health.txt':  `Global Fund Health Dashboards — Tableau, GraphQL.
HIV/TB/Malaria monitoring, COVID-19 KPIs, grant-making analytics.`,
    'isms-risk.txt':           `ISMS Risk Dashboard — Power BI, RLS.
Risk trends, asset/threat analysis, compliance KPIs.`,
    'nyc-taxi.txt':            `NYC Maven Taxi Challenge — Tableau Public. [LIVE]
Trip patterns, fares, pickup/drop-off hotspots across NYC.`,
    'world-happiness.txt':     `World Happiness Report 2022 — Tableau Public. [LIVE]
Global happiness scores and country-level comparisons.`,
  },
  'experience/': {
    '2025-zuci-usa.log':   `feat(zuci-usa): Senior BI Analyst — Jun 2025 → present
  · Power BI dashboards from patient insurance docs
  · Automated validation reports cut manual reconciliation`,
    '2021-zuci-india.log': `feat(zuci-india): Senior BI Analyst — Mar 2021 → May 2025
  · Tableau dashboards — 25% faster report turnaround
  · +15% operational efficiency w/ Supply / Finance / HPMT
  · Led ISMS Risk Dashboard (Power BI + RLS)`,
    '2019-radiare.log':    `feat(radiare): Junior Consultant — Dec 2019 → Feb 2021
  · Global Fund dashboards (HIV/TB/Malaria, COVID KPIs)
  · Tableau Lineage Analytics w/ GraphQL`,
    '2019-intern.log':     `init(radiare): Software Trainee Intern — Sep 2019 → Nov 2019
  · Tableau + SQL fundamentals`,
  },
  'contact/': {
    'email.txt':    `isma96.u@gmail.com`,
    'linkedin.txt': `https://www.linkedin.com/in/isma96u/`,
    'tableau.txt':  `https://public.tableau.com/app/profile/ismail4056`,
    'portfolio.txt':`open with: open website   →   index.html`,
  },
};

let cwd = []; // path segments, root = ~

function nodeAt(segments) {
  let n = FS;
  for (const seg of segments) {
    const key = seg + '/';
    if (n[key] && typeof n[key] === 'object') n = n[key];
    else return null;
  }
  return n;
}
function cwdNode() { return nodeAt(cwd); }
function cwdString() { return cwd.length ? '~/' + cwd.join('/') : '~'; }
function isDir(name, parent) { return parent && typeof parent[name + '/'] === 'object'; }
function isFile(name, parent) { return parent && typeof parent[name] === 'string'; }

function updatePrompt() {
  if (termPromptEl) termPromptEl.textContent = cwdString();
}

function lsHTML(dir) {
  const keys = Object.keys(dir);
  if (!keys.length) return '<span class="t-dim">(empty)</span>';
  return keys.map(k => {
    if (k.endsWith('/')) return `<span class="t-dir">${escape(k)}</span>`;
    if (k.startsWith('.')) return `<span class="t-dim">${escape(k)}</span>`;
    return `<span class="t-file">${escape(k)}</span>`;
  }).join('   ');
}

function treeHTML(dir, prefix = '') {
  const keys = Object.keys(dir);
  return keys.map((k, i) => {
    const isLast = i === keys.length - 1;
    const branch = isLast ? '└── ' : '├── ';
    const name = k.endsWith('/')
      ? `<span class="t-dir">${escape(k.slice(0, -1))}/</span>`
      : `<span class="t-file">${escape(k)}</span>`;
    let line = `${prefix}${branch}${name}`;
    if (k.endsWith('/')) {
      const sub = treeHTML(dir[k], prefix + (isLast ? '    ' : '│   '));
      if (sub) line += '\n' + sub;
    }
    return line;
  }).join('\n');
}

const COMMANDS = {
  help: () => `<span class="t-info">Available Commands:</span>

<span class="t-cat">Navigation:</span>
  <span class="t-file">ls</span> [path]      - List directory contents
  <span class="t-file">cd</span> [path]      - Change directory
  <span class="t-file">pwd</span>             - Print working directory
  <span class="t-file">tree</span>            - Show directory structure

<span class="t-cat">File Operations:</span>
  <span class="t-file">cat</span> [file]     - Display file contents
  <span class="t-file">find</span> [name]    - Search for files
  <span class="t-file">grep</span> [text]    - Search within files
  <span class="t-file">mkdir</span> [name]   - Create directory

<span class="t-cat">Applications:</span>
  <span class="t-file">open</span> [app]     - Open an app window (about|skills|projects|experience|certs|contact|website)

<span class="t-cat">System Info:</span>
  <span class="t-file">whoami</span>          - Current user info
  <span class="t-file">uname</span>           - System information
  <span class="t-file">ps</span>              - Show processes
  <span class="t-file">df</span>              - Disk usage

<span class="t-cat">Utilities:</span>
  <span class="t-file">clear</span>           - Clear terminal
  <span class="t-file">history</span>         - Command history
  <span class="t-file">echo</span> [text]     - Display text
  <span class="t-file">date</span>            - Current date/time
  <span class="t-file">help</span>            - This help message

<span class="t-cat">Personal:</span>
  <span class="t-file">resume</span>          - Quick resume overview
  <span class="t-file">contact</span>         - Contact information
  <span class="t-file">portfolio</span>       - Open portfolio link`,

  whoami:  () => `ismail
<span class="t-dim">uid=1000(ismail) gid=1000(ismail) groups=ai-engineers,bi-analysts,zuci-systems</span>`,
  uname:   () => `ISMA-OS 1.0.0 isma-portfolio #1 SMP PREEMPT x86_64 GNU/Linux
<span class="t-dim">build: dark-glass · mesh: violet/cyan/pink · powered by: Claude API</span>`,
  ps:      () => `<span class="t-dim">  PID TTY          TIME CMD</span>
 1001 pts/0    00:00:01 portfolio
 1042 pts/0    00:00:00 dashboard --tableau
 1078 pts/0    00:00:00 dashboard --power-bi
 1133 pts/1    00:00:00 rag --pipeline=claude
 1208 pts/1    00:00:00 llm --agent=analytics
 1337 pts/0    00:00:00 bash`,
  df:      () => `<span class="t-dim">Filesystem      Size  Used Avail Use% Mounted on</span>
/dev/skills     5.0T  4.2T  0.8T  84% /skills
/dev/projects   2.0T  1.5T  0.5T  75% /projects
/dev/coffee     999G  998G    1G  99% /motivation
tmpfs           ∞     ∞      ∞    -- /ideas`,
  history: () => historyHTML(),
  resume:  () => `<span class="t-info">Ismail Uthuman — Senior BI Analyst → AI Analytics Engineer</span>
<span class="t-dim">5+ years · New Jersey, USA</span>

<span class="t-cat">Current:</span>
  Sr. BI Analyst @ Zuci Systems, USA (Jun 2025 → present)

<span class="t-cat">Previously:</span>
  · Sr. BI Analyst @ Zuci Systems, India (2021 → 2025)
  · Junior Consultant @ Radiare (2019 → 2021)

<span class="t-cat">Stack:</span>
  AI/GenAI:  Claude API · LLM · RAG · LangChain · Vector DBs
  BI:        Tableau · Power BI · Tableau Prep
  Code/DB:   SQL · Python · MS SQL Server · Azure SQL
  Cloud:     Azure Data Factory · Microsoft Fabric

<span class="t-dim">→ run 'cat about.txt' for more, or 'open about' to view in a window</span>`,
  contact: () => `<span class="t-cat">Contact:</span>
  email:    <span class="t-file">isma96.u@gmail.com</span>
  linkedin: <span class="t-file">linkedin.com/in/isma96u</span>
  tableau:  <span class="t-file">public.tableau.com/app/profile/ismail4056</span>
  location: New Jersey, USA`,
  portfolio: () => { setTimeout(() => window.location.href = 'index.html', 400); return `<span class="t-ok">→ redirecting to portfolio website...</span>`; },
  date:    () => new Date().toString(),
  pwd:     () => `/home/ismail${cwd.length ? '/' + cwd.join('/') : ''}`,
  clear:   () => '__clear__',
  exit:    () => '__exit__',

  // ── easter eggs ──
  coffee:  () => `<span class="t-info">brewing... ☕</span>
<span class="t-dim">[#####.....] 50%   never enough</span>`,
  '42':    () => `<span class="t-info">The answer to life, the universe, and everything.</span>
<span class="t-dim">Question still pending.</span>`,
  konami:  () => `<span class="t-ok">↑↑↓↓←→←→BA</span>
<span class="t-info">+30 dashboards unlocked.</span>`,
  matrix:  () => `<span class="t-ok">wake up, ismail...</span>
<span class="t-dim">the data has you.</span>`,
  fortune: () => {
    const lines = [
      'Premature optimization is the root of all dashboards.',
      'The best dashboard is the one nobody has to ask about.',
      'In data we trust — all others bring evidence.',
      'A KPI a day keeps the stakeholder away.',
      'If your chart needs a legend, your chart needs a rewrite.',
      'SELECT * FROM problems WHERE root_cause IS NOT NULL;',
    ];
    return `<span class="t-info">${lines[Math.floor(Math.random() * lines.length)]}</span>`;
  },
  banner:  () => `<span class="t-info">
  ___  ____  __  __    _      ___  ____
 |_ _|/ ___||  \\/  |  / \\    / _ \\/ ___|
  | | \\___ \\| |\\/| | / _ \\  | | | \\___ \\
  | |  ___) | |  | |/ ___ \\ | |_| |___) |
 |___||____/|_|  |_/_/   \\_\\ \\___/|____/
</span>`,
};

function historyHTML() {
  if (!history.length) return '<span class="t-dim">(no history yet)</span>';
  return history.map((h, i) => `<span class="t-dim">${String(i + 1).padStart(4, ' ')}</span>  ${escape(h)}`).join('\n');
}

function printLine(html) {
  const div = document.createElement('div');
  div.className = 'term-line';
  div.innerHTML = html;
  termOut.appendChild(div);
  termOut.scrollTop = termOut.scrollHeight;
}

function promptHTML() {
  return `<span class="t-prompt"><span class="t-user">ismail</span>@<span class="t-host">os</span>:<span class="t-path">${escape(cwdString())}</span>$</span>`;
}

function runCmd(raw) {
  const cmd = raw.trim();
  if (!cmd) { printLine(`${promptHTML()}`); return; }
  printLine(`${promptHTML()} <span class="t-cmd">${escape(cmd)}</span>`);

  const [head, ...args] = cmd.split(/\s+/);
  const dir = cwdNode();

  switch (head) {
    case 'ls': {
      const target = args[0];
      if (!target) { printLine(lsHTML(dir)); return; }
      const clean = target.replace(/\/+$/, '');
      if (isDir(clean, dir)) { printLine(lsHTML(dir[clean + '/'])); return; }
      if (isFile(clean, dir)) { printLine(`<span class="t-file">${escape(clean)}</span>`); return; }
      return printLine(`<span class="t-err">ls: cannot access '${escape(target)}': No such file or directory</span>`);
    }
    case 'cd': {
      const target = args[0] || '~';
      if (target === '~' || target === '/') { cwd = []; updatePrompt(); return; }
      if (target === '..') { cwd.pop(); updatePrompt(); return; }
      const clean = target.replace(/\/+$/, '');
      if (isDir(clean, dir)) { cwd.push(clean); updatePrompt(); return; }
      if (isFile(clean, dir)) return printLine(`<span class="t-err">cd: not a directory: ${escape(target)}</span>`);
      return printLine(`<span class="t-err">cd: ${escape(target)}: No such file or directory</span>`);
    }
    case 'tree': {
      printLine(`<span class="t-dir">${escape(cwdString())}</span>\n` + treeHTML(dir));
      return;
    }
    case 'cat': {
      if (!args.length) return printLine(`<span class="t-err">cat: missing operand</span>`);
      args.forEach(a => {
        if (isFile(a, dir)) printLine(escape(dir[a]));
        else if (isDir(a, dir)) printLine(`<span class="t-err">cat: ${escape(a)}: Is a directory</span>`);
        else printLine(`<span class="t-err">cat: ${escape(a)}: No such file or directory</span>`);
      });
      return;
    }
    case 'echo': {
      printLine(escape(args.join(' ')));
      return;
    }
    case 'find': {
      const needle = (args[0] || '').toLowerCase();
      if (!needle) return printLine('<span class="t-err">find: missing pattern</span>');
      const hits = [];
      (function walk(node, path) {
        Object.keys(node).forEach(k => {
          const full = path + k;
          if (k.toLowerCase().includes(needle)) hits.push(full);
          if (k.endsWith('/') && typeof node[k] === 'object') walk(node[k], full);
        });
      })(FS, '~/');
      if (!hits.length) return printLine(`<span class="t-dim">find: no matches for '${escape(needle)}'</span>`);
      printLine(hits.map(h => h.endsWith('/') ? `<span class="t-dir">${escape(h)}</span>` : `<span class="t-file">${escape(h)}</span>`).join('\n'));
      return;
    }
    case 'grep': {
      const needle = args[0];
      if (!needle) return printLine('<span class="t-err">grep: missing pattern</span>');
      const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const hits = [];
      (function walk(node, path) {
        Object.keys(node).forEach(k => {
          const v = node[k];
          if (typeof v === 'string') {
            v.split('\n').forEach((line, idx) => {
              if (re.test(line)) hits.push(`<span class="t-file">${escape(path + k)}</span><span class="t-dim">:${idx + 1}:</span> ${escape(line.trim())}`);
            });
          } else if (k.endsWith('/')) walk(v, path + k);
        });
      })(FS, '~/');
      if (!hits.length) return printLine(`<span class="t-dim">grep: no matches for '${escape(needle)}'</span>`);
      printLine(hits.join('\n'));
      return;
    }
    case 'mkdir': {
      const name = args[0];
      if (!name) return printLine('<span class="t-err">mkdir: missing operand</span>');
      const clean = name.replace(/\/+$/, '');
      if (dir[clean + '/'] || dir[clean]) return printLine(`<span class="t-err">mkdir: cannot create directory '${escape(name)}': File exists</span>`);
      dir[clean + '/'] = {};
      return;
    }
    case 'sudo': {
      const rest = args.join(' ');
      if (!rest) return printLine(`<span class="t-err">usage: sudo &lt;command&gt;</span>`);
      if (/coffee/i.test(rest))    return printLine(`<span class="t-ok">privilege escalation granted: ☕ doubled.</span>`);
      if (/rm.*rf/i.test(rest))    return printLine(`<span class="t-err">refused. seriously.</span>`);
      if (/make.*sandwich/i.test(rest)) return printLine(`<span class="t-ok">okay.</span>`);
      return printLine(`<span class="t-err">[sudo] password for ismail: </span><span class="t-dim">(nice try)</span>`);
    }
    case 'cowsay': {
      const msg = (args.join(' ') || 'moo').slice(0, 60);
      const bar = '_'.repeat(msg.length + 2);
      const bot = '-'.repeat(msg.length + 2);
      printLine(`<span class="t-ok"> ${bar}
&lt; ${escape(msg)} &gt;
 ${bot}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||</span>`);
      return;
    }
    case 'open': {
      const app = args[0];
      if (!app) return printLine('<span class="t-err">open: missing app name</span>');
      if (app === 'website') { window.location.href = 'index.html'; return; }
      if (!document.getElementById('win-' + app)) return printLine(`<span class="t-err">open: no such app: ${escape(app)}</span>`);
      openApp(app);
      printLine(`<span class="t-ok">opened ${escape(app)}</span>`);
      return;
    }
  }

  const fn = COMMANDS[head];
  if (!fn) return printLine(`<span class="t-err">${escape(head)}: command not found — try 'help'</span>`);
  const out = fn();
  if (out === '__clear__') { termOut.innerHTML = ''; return; }
  if (out === '__exit__')  { document.getElementById('win-terminal').classList.remove('open'); return; }
  printLine(out);
}

function escape(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function openTerminal() {
  if (termOut && termOut.children.length === 0) {
    printLine(`<span class="t-info">Welcome to ISMA OS Terminal!</span>
<span class="t-info">ISMA OS 1.0 LTS - Type 'help' for available commands</span>
<span class="t-dim">Senior BI Analyst &amp; AI Engineer</span>
`);
  }
  updatePrompt();
}

if (termIn) {
  termIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      runCmd(termIn.value);
      if (termIn.value.trim()) history.push(termIn.value);
      histIdx = history.length;
      termIn.value = '';
    } else if (e.key === 'ArrowUp') {
      if (histIdx > 0) { histIdx--; termIn.value = history[histIdx]; }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (histIdx < history.length - 1) { histIdx++; termIn.value = history[histIdx]; }
      else { histIdx = history.length; termIn.value = ''; }
      e.preventDefault();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = termIn.value;
      const parts = val.split(/\s+/);
      const last = parts[parts.length - 1] || '';
      const dir = cwdNode();
      const matches = Object.keys(dir).filter(k => k.startsWith(last) || k.replace(/\/$/, '').startsWith(last));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        termIn.value = parts.join(' ');
      } else if (matches.length > 1) {
        printLine(`${promptHTML()} <span class="t-cmd">${escape(val)}</span>`);
        printLine(matches.map(m => m.endsWith('/') ? `<span class="t-dir">${escape(m)}</span>` : `<span class="t-file">${escape(m)}</span>`).join('   '));
      }
    }
  });
}
