const WHATSAPP = '51946374985';

const products = [
  { name:'Reno grande', number:'Nº 24 / 80', price:'S/ 12', image:'assets/nevaluz-brand/reno-hero-adapted.png', description:'Una escena de bosque encendida para regalar con intención, memoria y un mensaje propio. Incluye tarjeta personalizable, yute y estrella de madera.', status:'Disponible ahora', available:true },
  { name:'Cabaña', number:'Próximamente', price:'S/ 8 · Próximamente', image:'assets/nevaluz-brand/cabana-detail-original.jpg', description:'Un refugio de luz cálida que llegará en una próxima edición de NEVALUZ.', status:'Próxima edición', available:false },
  { name:'Pack Pareja', number:'Próximamente', price:'Precio por anunciar', image:'assets/nevaluz-brand/collection-original.jpg', description:'Una composición para compartir: dos paisajes, una misma luz y una edición por revelar.', status:'Próximo pack', available:false }
];

const feelings = {
  sorprender: 'Un regalo con intención se queda más tiempo.',
  acompañar: 'La cercanía también puede tener una atmósfera.',
  recordar: 'Cada noche puede volver a encender una historia.'
};

const header = document.querySelector('#site-header');
const progress = document.querySelector('#scroll-progress');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const feelingOutput = document.querySelector('#feeling-output strong');
const modal = document.querySelector('.product-modal');
const modalImage = modal.querySelector('.modal-image img');
const modalTitle = modal.querySelector('#modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalStatus = modal.querySelector('.modal-status');
const modalPrice = modal.querySelector('.modal-price');
const modalCta = modal.querySelector('.modal-cta');

const buildWhatsAppUrl = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

function openProduct(index) {
  const product = products[index] || products[0];
  const upcoming = !product.available;
  modal.classList.toggle('modal--upcoming', upcoming);
  modalImage.src = product.image;
  modalImage.alt = `${product.name} NEVALUZ`;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalStatus.textContent = `${product.status} · ${product.number}`;
  modalPrice.textContent = product.price;
  modalCta.textContent = upcoming ? 'Avisarme cuando llegue ↗' : 'Quiero esta pieza ↗';
  modalCta.href = buildWhatsAppUrl(upcoming ? `Hola NEVALUZ, quiero que me avisen cuando llegue ${product.name}.` : `Hola NEVALUZ, quiero reservar ${product.name} ${product.number} por ${product.price}.`);
  modal.showModal();
}

document.querySelectorAll('.quick-view').forEach((button) => button.addEventListener('click', (event) => {
  event.stopPropagation();
  openProduct(Number(button.dataset.index));
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

document.querySelectorAll('.feeling-card').forEach((card) => card.addEventListener('click', () => {
  document.querySelectorAll('.feeling-card').forEach((item) => item.classList.remove('is-active'));
  card.classList.add('is-active');
  feelingOutput.textContent = feelings[card.dataset.feeling];
}));

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin:'-35% 0px -55% 0px', threshold:0 });
sections.forEach((section) => sectionObserver.observe(section));

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 18);
}
window.addEventListener('scroll', updateScrollState, { passive:true });
updateScrollState();
