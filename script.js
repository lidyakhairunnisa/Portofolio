const wrapper = document.getElementById('fp-wrapper');
const sections = document.querySelectorAll('.fp-section');
const dots = document.querySelectorAll('.sb-dot');
let current = 0;

function goTo(idx) {
  sections[idx].scrollIntoView({ behavior: 'smooth' });
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
}, { root: wrapper, threshold: 0.5 });

sections.forEach(s => io.observe(s));

document.querySelectorAll('.reveal').forEach(el => {
  if (el.closest('#s-home')) el.classList.add('in');
});

function switchExp(idx) {
  document.querySelectorAll('.exp-nav-item').forEach((el, i) => el.classList.toggle('active', i === idx));
  document.querySelectorAll('.exp-panel').forEach((el, i) => el.classList.toggle('active', i === idx));
}
