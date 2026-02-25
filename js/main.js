import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
  const words = JSON.parse(typewriterEl.dataset.words);
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = words[wordIndex];
    if (deleting) {
      typewriterEl.textContent = current.slice(0, charIndex--);
    } else {
      typewriterEl.textContent = current.slice(0, charIndex++);
    }
    if (!deleting && charIndex === current.length + 1) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

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

// ===== PROJECT SCROLL =====
const projectsScroll = document.getElementById('projects-scroll');
const scrollOuter    = projectsScroll?.closest('.projects-outer');
const btnLeft        = document.getElementById('scroll-left');
const btnRight       = document.getElementById('scroll-right');
const dotsContainer  = document.getElementById('scroll-dots');
const cardWidth      = 260 + 12; // card + gap
const CARDS          = 5; // total cards

if (projectsScroll) {
  // build dots
  for (let i = 0; i < CARDS; i++) {
    const d = document.createElement('span');
    d.className = 'scroll-dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(d);
  }

  function updateUI() {
    const s = projectsScroll.scrollLeft;
    const max = projectsScroll.scrollWidth - projectsScroll.clientWidth;
    btnLeft.classList.toggle('hidden', s <= 0);
    btnRight.classList.toggle('hidden', s >= max - 1);
    scrollOuter.classList.toggle('at-start', s <= 0);
    scrollOuter.classList.toggle('at-end', s >= max - 1);
    const idx = Math.round(s / cardWidth);
    dotsContainer.querySelectorAll('.scroll-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  btnLeft.addEventListener('click',  () => { projectsScroll.scrollLeft -= cardWidth; });
  btnRight.addEventListener('click', () => { projectsScroll.scrollLeft += cardWidth; });
  projectsScroll.addEventListener('scroll', updateUI);
  updateUI();
}

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
