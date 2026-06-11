const wrapper = document.getElementById('fp-wrapper');
const sections = document.querySelectorAll('.fp-section');
const dots = document.querySelectorAll('.sb-dot');
let current = 0;

function goTo(idx) {
  if (!sections[idx]) return;
  const target = sections[idx];
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const top = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  closeMenu();
}

function updateNav(idx) {
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  current = idx;
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = Array.from(sections).indexOf(e.target);
      updateNav(idx);
      e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
  });
}, { root: window.innerWidth <= 768 ? null : wrapper, threshold: 0.35 });

sections.forEach(s => io.observe(s));

document.querySelectorAll('.reveal').forEach(el => {
  if (el.closest('#s-home')) el.classList.add('in');
});

function switchExp(idx) {
  document.querySelectorAll('.exp-nav-item').forEach((el, i) => el.classList.toggle('active', i === idx));
  document.querySelectorAll('.exp-panel').forEach((el, i) => el.classList.toggle('active', i === idx));
}

/* ── MOBILE MENU ── */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.getElementById('nav-overlay');

function openMenu() {
  navToggle.classList.add('open');
  navLinks.classList.add('open');
  navOverlay.classList.add('open');
}

function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', closeMenu);
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

document.querySelectorAll('.goto-link').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const idx = parseInt(el.getAttribute('data-target'), 10);
    goTo(idx);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});