const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileMenu?.classList.toggle('open', !isOpen);
  mobileMenu?.setAttribute('aria-hidden', String(isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  if (menuButton?.getAttribute('aria-expanded') === 'true') menuButton.click();
}));

const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
  if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.faq-question').forEach((button) => button.addEventListener('click', () => {
  const item = button.closest('.faq-item');
  document.querySelectorAll('.faq-item.open').forEach((openItem) => { if (openItem !== item) openItem.classList.remove('open'); });
  item?.classList.toggle('open');
}));

document.querySelector('[data-whatsapp-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = `Hello ABIM Studio, I am ${form.get('name')}.\nEmail: ${form.get('email')}\n\nProject enquiry:\n${form.get('message')}`;
  window.open(`https://wa.me/919960893927?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
