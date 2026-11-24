const WHATSAPP = '51946374985';

const products = [
  {
    name: 'Reno grande',
    number: 'Nº 24 / 80',
    price: 'S/ 12',
    image: 'assets/nevaluz-brand/reno-hero-adapted.png',
    description: 'Una escena de bosque encendida para regalar con intención, memoria y un mensaje propio. Incluye tarjeta personalizable, yute y estrella de madera.',
    status: 'Disponible ahora',
    available: true
  },
  {
    name: 'Cabaña',
    number: 'Próximamente',
    price: 'S/ 8 · Próximamente',
    image: 'assets/nevaluz-brand/cabana-detail-original.jpg',
    description: 'Un refugio de luz cálida que llegará en una próxima edición de NEVALUZ.',
    status: 'Próxima edición',
    available: false
  },
  {
    name: 'Pack Pareja',
    number: 'Próximamente',
    price: 'Precio por anunciar',
    image: 'assets/nevaluz-brand/collection-original.jpg',
    description: 'Una composición para compartir: dos paisajes, una misma luz y una edición por revelar.',
    status: 'Próximo pack',
    available: false
  }
];

const header = document.querySelector('#site-header');
const progress = document.querySelector('#scroll-progress');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const modal = document.querySelector('.product-modal');
const modalImage = modal.querySelector('.modal-image img');
const modalTitle = modal.querySelector('#modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalStatus = modal.querySelector('.modal-status');
const modalPrice = modal.querySelector('.modal-price');
const modalCta = modal.querySelector('.modal-cta');

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function openProduct(index) {
  const product = products[index] || products[0];
  const isUpcoming = !product.available;

  modal.classList.toggle('modal--upcoming', isUpcoming);
  modalImage.src = product.image;
  modalImage.alt = `${product.name} NEVALUZ`;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalStatus.textContent = `${product.status} · ${product.number}`;
  modalPrice.textContent = product.price;
  modalCta.textContent = isUpcoming ? 'Avisarme cuando llegue ↗' : 'Quiero esta pieza ↗';
  modalCta.href = buildWhatsAppUrl(isUpcoming
    ? `Hola NEVALUZ, quiero que me avisen cuando llegue ${product.name}.`
    : `Hola NEVALUZ, quiero reservar ${product.name} ${product.number} por ${product.price}.`);
  modal.showModal();
}

document.querySelectorAll('.quick-view').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    openProduct(Number(button.closest('.product-card').dataset.index));
  });
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const trackedSections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
trackedSections.forEach((section) => sectionObserver.observe(section));

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percentage}%`;
  header.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();
