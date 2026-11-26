document.documentElement.classList.add('js');

// Mobile menu
const button = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.querySelector<HTMLElement>('#menu');
function closeMenu(returnFocus = false) {
  button?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('is-open');
  if (returnFocus) button?.focus();
}
button?.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  menu?.classList.toggle('is-open', !open);
});
menu?.addEventListener('click', e => {
  if (e.target instanceof Element && e.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && button?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});

// Section navigation: highlights the section being read and slides the thumb behind it.
const segment = document.querySelector<HTMLElement>('.segment');
const thumb = segment?.querySelector<HTMLElement>('.segment__thumb');
const links = Array.from(segment?.querySelectorAll<HTMLAnchorElement>('.segment__item') ?? []);
const sections = links.map(link => document.getElementById(link.hash.slice(1)));
let current = -1;
let lockUntil = 0;

function placeThumb() {
  if (!segment || !thumb) return;
  const link = links[current];
  if (!link) { thumb.style.opacity = '0'; return; }
  thumb.style.opacity = '1';
  thumb.style.transform = `translateX(${link.offsetLeft}px)`;
  thumb.style.width = `${link.offsetWidth}px`;
}
function select(index: number) {
  if (index === current) return;
  links[current]?.removeAttribute('aria-current');
  current = index;
  links[current]?.setAttribute('aria-current', 'location');
  placeThumb();
}
function spy() {
  if (Date.now() < lockUntil) return;
  // Anchors land at scroll-padding-top + the section's scroll-margin-top.
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  let next = -1;
  sections.forEach((section, i) => {
    if (!section) return;
    const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
    if (section.getBoundingClientRect().top <= padding + margin + 8) next = i;
  });
  select(next);
}
links.forEach((link, i) => link.addEventListener('click', () => { select(i); lockUntil = Date.now() + 900; }));
let frame = 0;
addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; spy(); }); }, { passive: true });
addEventListener('resize', placeThumb);
document.fonts?.ready.then(placeThumb);
spy();

// Theme cards: soft glow that follows the pointer (desktop with hover only).
if (matchMedia('(hover: hover) and (min-width: 769px) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelectorAll<HTMLElement>('.theme').forEach(card => {
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    });
  });
}

// Mobile sticky WhatsApp bar: appears after the hero CTA leaves the screen, hides on the contact section.
const sticky = document.querySelector<HTMLElement>('.sticky-cta');
const heroActions = document.querySelector('.hero-actions');
const contact = document.getElementById('contato');
if (sticky && heroActions && contact && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let contactVisible = false;
  const update = () => sticky.classList.toggle('is-visible', !heroVisible && !contactVisible);
  new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting || entry.boundingClientRect.top > 0; update(); }).observe(heroActions);
  new IntersectionObserver(([entry]) => { contactVisible = entry.isIntersecting; update(); }, { rootMargin: '0px 0px -30% 0px' }).observe(contact);
} else {
  sticky?.classList.add('is-visible');
}
