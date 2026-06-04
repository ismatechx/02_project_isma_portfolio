import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ===== I18N (EN / TA) =====
const I18N = {
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.certifications': 'Certifications',
    'nav.contact': 'Contact',

    'hero.badge': 'Open to AI &amp; Analytics roles &middot; New Jersey, USA',
    'hero.greeting': "Hi, I'm Ismail —",
    'hero.title1': 'AI Analytics',
    'hero.title2': 'Engineer.',
    'hero.taglineLead': 'Building intelligent data systems with',
    'hero.sub': '5+ years turning data into decisions — now bringing GenAI into the BI workflow.',
    'hero.cta1': 'View my work',
    'hero.cta2': 'Download CV',
    'hero.cta3': 'Desktop view',
    'hero.scroll': 'Scroll',
    'hero.term': 'whoami',

    'about.title': 'About Me',
    'about.p1': 'Senior Business Intelligence Analyst with <strong>5+ years of experience</strong> delivering data-driven solutions that empower organizations to achieve their strategic goals.',
    'about.p2': 'Skilled in developing interactive dashboards, automating reporting workflows, and extracting actionable insights from complex datasets to support critical decision-making processes.',
    'about.stat1': 'Years Experience',
    'about.stat2': 'Efficiency Gains',
    'about.stat3': 'Faster Reports',

    'skills.title': 'Skills',
    'skills.ai': 'AI & GenAI',
    'skills.bi': 'BI Tools',
    'skills.prog': 'Programming & Databases',
    'skills.cloud': 'Cloud & ETL',

    'exp.title': 'Experience',
    'exp.role1': 'Senior Business Intelligence Analyst',
    'exp.role3': 'Junior Consultant',
    'exp.role4': 'Software Trainee Intern',
    'exp.date1': 'Jun 2025 – Present',
    'exp.date2': 'Mar 2021 – May 2025',
    'exp.date3': 'Dec 2019 – Feb 2021',
    'exp.date4': 'Sep 2019 – Nov 2019',
    'exp.r1l1': 'Designed and developed dashboards in Power BI using data extracted from patient insurance documents, incorporating member details, service codes, and diagnosis codes.',
    'exp.r1l2': 'Collaborated with business stakeholders to define required fields and post-processing logic; performed validation testing for keyword accuracy and correct value inputs.',
    'exp.r1l3': 'Created automated validation reports in Power BI to reduce manual day-to-day data reconciliation between source and target layers.',
    'exp.r1l4': 'Reviewed generated reports and conducted accuracy validations to ensure data integrity and consistency between systems.',
    'exp.r2l1': 'Developed Tableau dashboards that reduced report turnaround time by <strong>25%</strong> and improved decision speed.',
    'exp.r2l2': 'Collaborated with cross-functional Supply Operation, Finance, and HPMT teams, contributing to a <strong>15% increase</strong> in operational efficiency.',
    'exp.r2l3': 'Built Supplier KPI, Actual vs Forecast, and Capability Matrices, enabling sourcing teams to monitor vendor performance and delivery timeliness (OTIF).',
    'exp.r2l4': 'Led a team of 2 to design and develop the ISMS Risk Dashboard in Power BI with RLS, delivering dashboards with risk trends, asset/threat analysis, and KPIs.',
    'exp.r2l5': 'Worked on Supply Operations, Strategic Sourcing, Procurement, IT Spend Analysis and End-to-End Supply Operation (16 KPI & Detailed View) dashboards.',
    'exp.r3l1': 'Built interactive Tableau dashboards for The Global Fund covering disease monitoring (HIV/TB/Malaria) and COVID-19 KPIs.',
    'exp.r3l2': 'Developed dashboards for grant-making processes, financial performance, and customer service agent performance.',
    'exp.r3l3': 'Configured dashboard-level security for multi-client publishing on Tableau Online.',
    'exp.r3l4': 'Utilized Tableau Lineage Analytics with GraphQL to generate metadata usage reports.',
    'exp.r4l1': 'Assisted in data analysis, report building, and dashboard development for BI and IT service management projects.',
    'exp.r4l2': 'Gained hands-on experience in Tableau and SQL; built bar charts, heat maps, filled maps, and scatter plots.',

    'proj.title': 'Key Projects',
    'proj.view': 'View Dashboard',
    'proj.readCase': 'Read case study',
    'proj.p1t': 'Supply Operations Dashboard',
    'proj.p1d': 'End-to-end supply operation with 16 KPI views covering Strategic Sourcing, Procurement, and IT Spend Analysis at Zuci Systems.',
    'proj.p2t': 'Global Fund Health Dashboards',
    'proj.p2d': 'Dashboards for tracking HIV/TB/Malaria disease monitoring, COVID-19 KPIs, grant-making and financial performance analytics.',
    'proj.p3t': 'ISMS Risk Dashboard',
    'proj.p3d': 'Power BI dashboard with RLS delivering risk trends, asset/threat analysis, and department KPIs for compliance monitoring.',
    'proj.p4t': 'NYC Maven Taxi Challenge',
    'proj.p4d': 'Interactive Tableau dashboard analyzing NYC taxi trip patterns, fare trends, pickup/drop-off hotspots, and time-based demand insights across New York City.',
    'proj.p5t': 'World Happiness Report 2022',
    'proj.p5d': 'Tableau dashboard visualizing global happiness scores, key contributing factors, and country-level comparisons from the 2022 World Happiness Report.',

    'cert.title': 'Certifications & Awards',
    'cert.certs': 'Certifications',
    'cert.awards': 'Awards',

    'contact.title': 'Contact',
    'contact.sub': "Interested in working together? Let's connect.",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.msg': 'Your Message',
    'contact.send': 'Send Message',

    'footer.rights': '© 2026 Ismail Uthuman. All rights reserved.',
  },
  ta: {
    'nav.about': 'பற்றி',
    'nav.skills': 'திறன்கள்',
    'nav.experience': 'அனுபவம்',
    'nav.projects': 'திட்டங்கள்',
    'nav.certifications': 'சான்றிதழ்கள்',
    'nav.contact': 'தொடர்பு',

    'hero.badge': 'AI &amp; பகுப்பாய்வு பணிகளுக்குத் தயார் &middot; நியூ ஜெர்ஸி, அமெரிக்கா',
    'hero.greeting': 'வணக்கம், நான் இஸ்மாயில் —',
    'hero.title1': 'AI பகுப்பாய்வு',
    'hero.title2': 'பொறியாளர்.',
    'hero.taglineLead': 'புத்திசாலித்தனமான தரவு அமைப்புகளை உருவாக்குகிறேன் —',
    'hero.sub': '5+ ஆண்டுகள் தரவை முடிவுகளாக மாற்றிய அனுபவம் — இப்போது GenAI-ஐ BI பணியோட்டத்தில் இணைக்கிறேன்.',
    'hero.cta1': 'என் பணியைப் பார்க்க',
    'hero.cta2': 'CV பதிவிறக்கம்',
    'hero.cta3': 'டெஸ்க்டாப் காட்சி',
    'hero.scroll': 'கீழே',
    'hero.term': 'whoami',

    'about.title': 'என்னைப் பற்றி',
    'about.p1': '<strong>5+ ஆண்டுகள் அனுபவம்</strong> கொண்ட மூத்த வணிக நுண்ணறிவு பகுப்பாய்வாளர் — நிறுவனங்கள் தங்கள் மூலோபாய இலக்குகளை அடைய தரவு உந்துதல் தீர்வுகளை வழங்குகிறேன்.',
    'about.p2': 'ஊடாடும் டாஷ்போர்டுகளை உருவாக்குதல், அறிக்கை பணியோட்டங்களைத் தானியங்கி செய்தல், மற்றும் சிக்கலான தரவுகளில் இருந்து செயல்படக்கூடிய நுண்ணறிவுகளை எடுத்து முக்கிய முடிவெடுப்பை ஆதரிப்பதில் திறமையானவன்.',
    'about.stat1': 'ஆண்டுகள் அனுபவம்',
    'about.stat2': 'செயல்திறன் மேம்பாடு',
    'about.stat3': 'வேகமான அறிக்கைகள்',

    'skills.title': 'திறன்கள்',
    'skills.ai': 'AI & GenAI',
    'skills.bi': 'BI கருவிகள்',
    'skills.prog': 'நிரலாக்கம் & தரவுத்தளங்கள்',
    'skills.cloud': 'கிளவுட் & ETL',

    'exp.title': 'அனுபவம்',
    'exp.role1': 'மூத்த வணிக நுண்ணறிவு பகுப்பாய்வாளர்',
    'exp.role3': 'இளைய ஆலோசகர்',
    'exp.role4': 'மென்பொருள் பயிற்சி இடைநிலையாளர்',
    'exp.date1': 'ஜூன் 2025 – தற்போது',
    'exp.date2': 'மார்ச் 2021 – மே 2025',
    'exp.date3': 'டிச 2019 – பிப் 2021',
    'exp.date4': 'செப் 2019 – நவ 2019',
    'exp.r1l1': 'நோயாளர் காப்பீட்டு ஆவணங்களில் இருந்து பெறப்பட்ட தரவைப் பயன்படுத்தி Power BI-இல் டாஷ்போர்டுகளை வடிவமைத்து உருவாக்கினேன் — உறுப்பினர் விவரங்கள், சேவை குறியீடுகள், நோய் கண்டறிதல் குறியீடுகள் உட்பட.',
    'exp.r1l2': 'வணிக பங்காளர்களுடன் இணைந்து தேவையான புலங்கள் மற்றும் பின்-செயலாக்க தர்க்கத்தை வரையறுத்தேன்; முக்கிய சொற்களின் துல்லியம் மற்றும் சரியான மதிப்புகளுக்கான சரிபார்ப்பு சோதனைகளை மேற்கொண்டேன்.',
    'exp.r1l3': 'மூல மற்றும் இலக்கு அடுக்குகளுக்கிடையேயான கைமுறை தரவு சரிசெய்தலைக் குறைக்க Power BI-இல் தானியங்கி சரிபார்ப்பு அறிக்கைகளை உருவாக்கினேன்.',
    'exp.r1l4': 'உருவாக்கப்பட்ட அறிக்கைகளை மறுபரிசீலனை செய்து, அமைப்புகளுக்கு இடையேயான தரவு ஒற்றுமை மற்றும் சீரான தன்மையை உறுதிப்படுத்தினேன்.',
    'exp.r2l1': 'Tableau டாஷ்போர்டுகளை உருவாக்கி, அறிக்கை திருப்பு நேரத்தை <strong>25%</strong> குறைத்து முடிவெடுக்கும் வேகத்தை மேம்படுத்தினேன்.',
    'exp.r2l2': 'Supply Operation, Finance, HPMT குழுக்களுடன் இணைந்து செயல்திறனில் <strong>15% அதிகரிப்பை</strong> அடைந்தேன்.',
    'exp.r2l3': 'Supplier KPI, Actual vs Forecast, Capability Matrix போன்றவற்றை உருவாக்கி விற்பனையாளர் செயல்திறன் மற்றும் OTIF கண்காணிப்பை எளிதாக்கினேன்.',
    'exp.r2l4': '2 பேர் கொண்ட குழுவை வழிநடத்தி, RLS-உடன் கூடிய ISMS Risk Dashboard-ஐ Power BI-இல் வடிவமைத்து வழங்கினேன் — ஆபத்து போக்குகள், சொத்து/அச்சுறுத்தல் பகுப்பாய்வு மற்றும் KPI-கள் உட்பட.',
    'exp.r2l5': 'Supply Operations, Strategic Sourcing, Procurement, IT Spend Analysis மற்றும் End-to-End Supply Operation (16 KPI & விரிவான பார்வை) டாஷ்போர்டுகளில் பணியாற்றினேன்.',
    'exp.r3l1': 'The Global Fund-க்காக நோய் கண்காணிப்பு (HIV/TB/Malaria) மற்றும் COVID-19 KPI-களை உள்ளடக்கிய ஊடாடும் Tableau டாஷ்போர்டுகளை உருவாக்கினேன்.',
    'exp.r3l2': 'மானியம் வழங்கும் செயல்முறைகள், நிதி செயல்திறன், வாடிக்கையாளர் சேவை முகவர் செயல்திறன் ஆகியவற்றுக்கான டாஷ்போர்டுகளை உருவாக்கினேன்.',
    'exp.r3l3': 'Tableau Online-இல் பல-வாடிக்கையாளர் வெளியீட்டுக்காக டாஷ்போர்டு-மட்ட பாதுகாப்பை அமைத்தேன்.',
    'exp.r3l4': 'GraphQL-உடன் Tableau Lineage Analytics-ஐப் பயன்படுத்தி மெட்டாடேட்டா பயன்பாட்டு அறிக்கைகளை உருவாக்கினேன்.',
    'exp.r4l1': 'BI மற்றும் IT சேவை நிர்வாகத் திட்டங்களுக்கான தரவு பகுப்பாய்வு, அறிக்கை மற்றும் டாஷ்போர்டு உருவாக்கத்தில் உதவினேன்.',
    'exp.r4l2': 'Tableau மற்றும் SQL-இல் நேரடி அனுபவம் பெற்றேன்; bar chart, heat map, filled map, scatter plot ஆகியவற்றை உருவாக்கினேன்.',

    'proj.title': 'முக்கிய திட்டங்கள்',
    'proj.view': 'டாஷ்போர்டைப் பார்க்க',
    'proj.readCase': 'வழக்கு ஆய்வைப் படிக்க',
    'proj.p1t': 'Supply Operations டாஷ்போர்டு',
    'proj.p1d': 'Strategic Sourcing, Procurement, IT Spend Analysis ஆகியவற்றை உள்ளடக்கிய 16 KPI பார்வைகள் கொண்ட முழுமையான supply operation — Zuci Systems-இல்.',
    'proj.p2t': 'Global Fund Health டாஷ்போர்டுகள்',
    'proj.p2d': 'HIV/TB/Malaria நோய் கண்காணிப்பு, COVID-19 KPI-கள், மானியம் வழங்கல் மற்றும் நிதி செயல்திறன் பகுப்பாய்வுக்கான டாஷ்போர்டுகள்.',
    'proj.p3t': 'ISMS Risk டாஷ்போர்டு',
    'proj.p3d': 'இணக்கம் கண்காணிப்புக்காக ஆபத்து போக்குகள், சொத்து/அச்சுறுத்தல் பகுப்பாய்வு மற்றும் துறை KPI-களை வழங்கும் RLS கொண்ட Power BI டாஷ்போர்டு.',
    'proj.p4t': 'NYC Maven Taxi சவால்',
    'proj.p4d': 'நியூயார்க் டாக்ஸி பயண முறைகள், கட்டண போக்குகள், pickup/drop-off hotspot-கள், நேர அடிப்படையிலான தேவை நுண்ணறிவுகளை பகுப்பாய்வு செய்யும் ஊடாடும் Tableau டாஷ்போர்டு.',
    'proj.p5t': 'உலக மகிழ்ச்சி அறிக்கை 2022',
    'proj.p5d': '2022 உலக மகிழ்ச்சி அறிக்கையின் அடிப்படையில் உலகளாவிய மகிழ்ச்சி மதிப்பெண்கள், முக்கிய காரணிகள் மற்றும் நாட்டு-மட்ட ஒப்பீடுகளை காட்சிப்படுத்தும் Tableau டாஷ்போர்டு.',

    'cert.title': 'சான்றிதழ்கள் & விருதுகள்',
    'cert.certs': 'சான்றிதழ்கள்',
    'cert.awards': 'விருதுகள்',

    'contact.title': 'தொடர்பு',
    'contact.sub': 'சேர்ந்து வேலை செய்ய ஆர்வமா? இணைவோம்.',
    'contact.name': 'உங்கள் பெயர்',
    'contact.email': 'உங்கள் மின்னஞ்சல்',
    'contact.msg': 'உங்கள் செய்தி',
    'contact.send': 'செய்தி அனுப்பு',

    'footer.rights': '© 2026 Ismail Uthuman. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!(key in dict)) return;
    const val = dict[key];
    if (el.hasAttribute('data-i18n-html') || /<\w+/.test(val)) {
      el.innerHTML = val;
    } else {
      el.textContent = val.replace(/&amp;/g, '&').replace(/&middot;/g, '·');
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key in dict) el.setAttribute('placeholder', dict[key]);
  });

  // typewriter swap
  const tw = document.querySelector('.typewriter');
  if (tw) {
    const words = tw.getAttribute('data-words-' + lang);
    if (words) tw.setAttribute('data-words', words);
  }

  // toggle active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  try { localStorage.setItem('lang', lang); } catch (_) {}
}

const savedLang = (() => {
  try { return localStorage.getItem('lang'); } catch (_) { return null; }
})();
const initialLang = (savedLang === 'ta' || savedLang === 'en') ? savedLang : 'en';
applyLang(initialLang);

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// ===== NAV: scrolled class + active links =====
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);

  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
});

// ===== MOBILE NAV =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinksList = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => navLinksList.classList.toggle('open'));
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ===== TYPEWRITER =====
const typewriterEl = document.querySelector('.typewriter');
if (typewriterEl) {
  let words = JSON.parse(typewriterEl.dataset.words);
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer = null;

  function type() {
    words = JSON.parse(typewriterEl.dataset.words);
    if (wordIndex >= words.length) wordIndex = 0;
    const current = words[wordIndex];
    if (deleting) {
      typewriterEl.textContent = current.slice(0, charIndex--);
    } else {
      typewriterEl.textContent = current.slice(0, charIndex++);
    }
    if (!deleting && charIndex === current.length + 1) {
      deleting = true;
      timer = setTimeout(type, 1800);
      return;
    }
    if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    timer = setTimeout(type, deleting ? 60 : 100);
  }
  type();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      clearTimeout(timer);
      wordIndex = 0; charIndex = 0; deleting = false;
      typewriterEl.textContent = '';
      type();
    });
  });
}

// ===== SKILLS SPHERE (3D rotating tag cloud + wireframe) =====
(function () {
  const sphere = document.getElementById('skill-sphere');
  if (!sphere) return;
  const wireG  = document.getElementById('sphere-wire-g');
  const nodes = [...sphere.querySelectorAll('.skill-node')];
  const N = nodes.length;
  let radius = 180;          // node radius (drawn in px)
  const WIRE_VB = 180;       // wire radius in viewBox units (SVG viewBox is -200..200)

  // skill node positions — Fibonacci lattice on unit sphere
  const points = nodes.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 1);
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    };
  });

  // ── Icosphere wireframe (triangulated geodesic mesh) ──
  const PHI = (1 + Math.sqrt(5)) / 2;
  const _a = 1 / Math.sqrt(PHI * PHI + 1);
  const _b = PHI * _a;
  let icoVerts = [
    [-_a,  _b, 0], [ _a,  _b, 0], [-_a, -_b, 0], [ _a, -_b, 0],
    [0, -_a,  _b], [0,  _a,  _b], [0, -_a, -_b], [0,  _a, -_b],
    [ _b, 0, -_a], [ _b, 0,  _a], [-_b, 0, -_a], [-_b, 0,  _a],
  ];
  let icoFaces = [
    [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
    [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
    [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
    [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
  ];
  function subdivide(verts, faces) {
    const newVerts = verts.map(v => v.slice());
    const cache = new Map();
    const mid = (i, j) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (cache.has(key)) return cache.get(key);
      const a = newVerts[i], b = newVerts[j];
      const mx = (a[0]+b[0])/2, my = (a[1]+b[1])/2, mz = (a[2]+b[2])/2;
      const len = Math.hypot(mx, my, mz);
      const idx = newVerts.length;
      newVerts.push([mx/len, my/len, mz/len]);
      cache.set(key, idx);
      return idx;
    };
    const newFaces = [];
    faces.forEach(([a, b, c]) => {
      const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
      newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    });
    return [newVerts, newFaces];
  }
  // 1 level of subdivision → 80 triangles, ~120 unique edges
  [icoVerts, icoFaces] = subdivide(icoVerts, icoFaces);

  // extract unique edges
  const seen = new Set();
  const wireLines = [];
  icoFaces.forEach(([a, b, c]) => {
    [[a, b], [b, c], [c, a]].forEach(([i, j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      const va = icoVerts[i], vb = icoVerts[j];
      wireLines.push([
        { x: va[0], y: va[1], z: va[2] },
        { x: vb[0], y: vb[1], z: vb[2] },
      ]);
    });
  });

  // build polyline elements once
  const wireEls = wireLines.map(() => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    wireG.appendChild(el);
    return el;
  });

  let rotX = 0.2, rotY = 0;
  let velX = -0.0015, velY = 0.0025;
  let dragging = false;
  let lastX = 0, lastY = 0;
  let idleSince = performance.now();

  function setRadius() {
    const box = sphere.getBoundingClientRect();
    radius = Math.min(box.width, box.height) / 2 - 24;
  }
  setRadius();
  window.addEventListener('resize', setRadius);

  function rotate(p, sinY, cosY, sinX, cosX) {
    let x = p.x * cosY - p.z * sinY;
    let z = p.x * sinY + p.z * cosY;
    let y = p.y * cosX - z * sinX;
    z      = p.y * sinX + z * cosX;
    return { x, y, z };
  }

  function frame() {
    const now = performance.now();
    if (!dragging) {
      const idle = (now - idleSince) / 1000;
      const ease = Math.min(1, idle / 0.6);
      rotY += velY * ease;
      rotX += velX * ease;
    }
    const sinY = Math.sin(rotY), cosY = Math.cos(rotY);
    const sinX = Math.sin(rotX), cosX = Math.cos(rotX);

    // skill nodes
    points.forEach((p, i) => {
      const r = rotate(p, sinY, cosY, sinX, cosX);
      const px = r.x * radius;
      const py = r.y * radius;
      const depth = (r.z + 1) / 2;
      const scale = 0.55 + 0.45 * depth;
      const opacity = 0.25 + 0.75 * depth;
      const el = nodes[i];
      el.style.transform = `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0) scale(${scale})`;
      el.style.opacity   = opacity.toFixed(3);
      el.style.zIndex    = Math.round(depth * 1000);
      el.style.filter    = depth < 0.4 ? `blur(${(0.4 - depth) * 4}px)` : 'none';
    });

    // wireframe lines (same rotation, projected into SVG viewBox)
    wireLines.forEach((line, li) => {
      let avgDepth = 0;
      const coords = line.map(p => {
        const r = rotate(p, sinY, cosY, sinX, cosX);
        avgDepth += r.z;
        return `${(r.x * WIRE_VB).toFixed(1)},${(r.y * WIRE_VB).toFixed(1)}`;
      });
      avgDepth /= line.length;
      const norm = (avgDepth + 1) / 2;
      const opacity = (0.10 + 0.45 * norm).toFixed(2);
      wireEls[li].setAttribute('points', coords.join(' '));
      wireEls[li].setAttribute('opacity', opacity);
    });

    requestAnimationFrame(frame);
  }
  frame();

  // drag
  function onDown(x, y) { dragging = true; lastX = x; lastY = y; sphere.classList.add('dragging'); }
  function onMove(x, y) {
    if (!dragging) return;
    const dx = x - lastX, dy = y - lastY;
    rotY += dx * 0.005;
    rotX -= dy * 0.005;
    lastX = x; lastY = y;
    // capture inertia
    velY = dx * 0.0006;
    velX = -dy * 0.0006;
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    sphere.classList.remove('dragging');
    idleSince = performance.now();
    // damp velocity toward gentle baseline
    setTimeout(() => { velY = 0.0025; velX = -0.0015; }, 1500);
  }

  sphere.addEventListener('mousedown', e => onDown(e.clientX, e.clientY));
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onUp);
  sphere.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener('touchmove', e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener('touchend', onUp);
})();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, idx) => {
        if (el === entry.target) {
          setTimeout(() => el.classList.add('visible'), idx * 80);
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== TABLEAU MODALS =====
const vizModalMap = {
  'viz1771970012538': 'tableau-modal',
  'viz1771976526694': 'tableau-modal-happiness'
};
const vizLoaded = {};

function openTableauModal(vizId) {
  const modalId = vizModalMap[vizId];
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!vizLoaded[vizId]) {
    const divElement = document.getElementById(vizId);
    const vizElement = divElement.getElementsByTagName('object')[0];
    vizElement.style.width = '100%';
    vizElement.style.height = '2527px';
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
    vizLoaded[vizId] = true;
  }
}

function closeAllTableauModals() {
  document.querySelectorAll('.tableau-modal').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

document.querySelectorAll('.tableau-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => openTableauModal(btn.dataset.viz));
});
document.querySelectorAll('.tableau-modal-close').forEach(btn => {
  btn.addEventListener('click', closeAllTableauModals);
});
document.querySelectorAll('.tableau-modal-overlay').forEach(el => {
  el.addEventListener('click', closeAllTableauModals);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllTableauModals(); });

// ===== CONTACT FORM + SUPABASE =====
const supabase = createClient(
  'https://rubhvlgacxjncohamfnz.supabase.co',
  'sb_publishable_Mh3HFvkFa1mOCiEcr5UXlQ__cUbk771'
);

const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const { error } = await supabase
    .from('contact_submissions')
    .insert([{ name, email, message }]);

  if (error) {
    btn.textContent = 'Failed — try again';
    btn.disabled = false;
    console.error(error);
  } else {
    btn.textContent = 'Sent!';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 3000);
  }
});
