const DESIGN_W = 1440, DESIGN_H = 3200;
const vp = document.getElementById('viewport');
const stage = document.getElementById('stage');

// Scale the 1440px design to fit any screen width
function fit() {
  const s = window.innerWidth / DESIGN_W;
  stage.style.transform = `scale(${s})`;
  vp.style.height = (DESIGN_H * s) + 'px';
}
window.addEventListener('resize', fit);
fit();

// Smooth scroll to a design-space Y position (works with the scaled stage)
const targets = { about: 1900, services: 840, contact: 2340 };
function goTo(id) {
  const s = window.innerWidth / DESIGN_W;
  window.scrollTo({ top: targets[id] * s, behavior: 'smooth' });
}
document.querySelectorAll('nav a').forEach(a =>
  a.addEventListener('click', e => { e.preventDefault(); goTo(a.getAttribute('href').slice(1)); })
);
document.getElementById('getStarted').addEventListener('click', () => goTo('services'));

// View Details modal
const modal = document.getElementById('modal');
document.querySelectorAll('.view').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('mImg').src = btn.dataset.img;
  document.getElementById('mTitle').textContent = btn.dataset.title;
  document.getElementById('mPrice').textContent = btn.dataset.price;
  modal.classList.remove('hidden');
}));
const closeModal = () => modal.classList.add('hidden');
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.getElementById('mContact').addEventListener('click', () => { closeModal(); goTo('contact'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Contact form validation
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = ['name', 'email', 'message'].map(id => document.getElementById(id));
  const email2 = document.getElementById('email2');
  fields.concat(email2).forEach(f => f.classList.remove('err'));
  let ok = true;
  fields.forEach(f => { if (!f.value.trim()) { f.classList.add('err'); ok = false; } });
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (fields[1].value && !re.test(fields[1].value)) { fields[1].classList.add('err'); ok = false; }
  if (email2.value && !re.test(email2.value)) { email2.classList.add('err'); ok = false; }
  msg.textContent = ok ? 'Message sent! Thank you.' : 'Please complete the fields correctly.';
  if (ok) form.reset();
});
