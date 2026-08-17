const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileMenu.classList.toggle('open', !isOpen);
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menuButton?.click()));

const observed = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
  if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); }
}), { threshold: .12 });
observed.forEach((element) => observer.observe(element));

const cursor = document.querySelector('.cursor-orb');
window.addEventListener('pointermove', (event) => {
  if (cursor) { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; }
});
document.querySelectorAll('a, button').forEach((element) => {
  element.addEventListener('pointerenter', () => cursor?.classList.add('active'));
  element.addEventListener('pointerleave', () => cursor?.classList.remove('active'));
});
