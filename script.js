// ======== Utility / DOM =========
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// PRELOADER
const preloader = $('#preloader');
window.addEventListener('load', () => {
  // small delay to show loader elegantly
  setTimeout(() => {
    preloader.style.opacity = 0;
    preloader.style.transform = 'translateY(-6px)';
    setTimeout(()=> preloader.remove(), 420);
  }, 450);
});

/* NAV TOGGLE */
const navToggle = $('#navToggle'), navMenu = $('#navMenu'), navLinks = $$('.nav-links a');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
  // show/hide links for small screens
  document.querySelector('.nav-links')?.classList.toggle('open');
});

/* Close nav after click on mobile */
navLinks.forEach(a => a.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.remove('open');
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded','false');
}));

/* DARK MODE TOGGLE (persist) */
const darkToggle = $('#darkModeToggle');
const preferred = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark');
function applyTheme(t){
  if(t === 'dark') {
    document.documentElement.style.setProperty('--bg','#071026');
    document.body.classList.add('dark');
    darkToggle.textContent = '☀️';
    darkToggle.setAttribute('aria-pressed','true');
  } else {
    document.body.classList.remove('dark');
    darkToggle.textContent = '🌙';
    darkToggle.setAttribute('aria-pressed','false');
  }
  localStorage.setItem('theme', t);
}
applyTheme(preferred);
darkToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});

/* Tabs */
const tabs = $$('.tab'), tabText = $('#tabText');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false') });
    tab.classList.add('active'); tab.setAttribute('aria-selected','true');
    // simple simulated content switch
    const key = tab.getAttribute('data-tab');
    const map = {
      billing: 'Fast, automated billing with invoice generation and reconciliations.',
      charging: 'Smart charging and settlement system with auto-retries and refunds.',
      catalog: 'Organize products with tags, variants, and bulk-editing tools.',
      events: 'Track campaigns, promotions, and scheduled product drops.'
    };
    // 3D flip effect
    const panel = document.querySelector('.tab-panel .tab-content');
    panel.animate([{transform:'rotateX(0deg)', opacity:1},{transform:'rotateX(12deg)', opacity:.3},{transform:'rotateX(0deg)', opacity:1}], {duration:450, easing:'ease'});
    tabText.textContent = map[key] || 'Details will appear here...';
  });
});

/* Pricing toggle */
const priceToggle = $('#priceToggle');
const priceEls = $$('.price');
priceToggle.addEventListener('change', () => {
  priceEls.forEach(el => {
    el.textContent = priceToggle.checked ? el.dataset.year : el.dataset.month;
  });
});

/* Testimonials carousel */
let tIndex = 0;
const testimonials = $$('.testimonial');
function rotateTestimonials(){
  testimonials.forEach((t, i) => t.classList.toggle('active', i === tIndex));
}
rotateTestimonials();
setInterval(() => {
  tIndex = (tIndex + 1) % testimonials.length;
  rotateTestimonials();
}, 3500);

/* Contact form - basic front-end simulation */
const form = $('#contactForm'), formStatus = $('#formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = 'Sending…';
  // simulate async send
  setTimeout(()=> {
    formStatus.textContent = 'Message sent. Thank you!';
    form.reset();
    setTimeout(()=> formStatus.textContent = '', 3000);
  }, 900);
});

/* Intersection Observer for fade-in elements */
const fadeEls = $$('.fade-in, .widget, .card-graphic, .testimonial, .section-title, .hero-left, .hero-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => io.observe(el));

/* Parallax for hero title */
const heroTitle = document.querySelector('.hero-title[data-parallax]');
window.addEventListener('scroll', () => {
  if(!heroTitle) return;
  const y = window.scrollY;
  const offset = Math.min(Math.max(y / 6, 0), 60);
  heroTitle.style.transform = `translateY(${offset}px)`;
});

/* Lazy loading for images already via loading="lazy" in HTML; ensure videos are muted & willplay */
const heroVideo = document.getElementById('heroVideo');
if(heroVideo) {
  heroVideo.addEventListener('error', () => {
    // fallback: hide video if fails to load
    heroVideo.style.display = 'none';
  });
}

/* Accessibility: keyboard navigation for carousel testimonials */
testimonials.forEach((t, i) => {
  t.addEventListener('focus', () => { tIndex = i; rotateTestimonials(); });
});

/* Small UI polish: make price buttons show active on click */
document.querySelectorAll('.card.plan button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    btn.textContent = btn.textContent.includes('Add') ? 'Added ✓' : btn.textContent;
    setTimeout(()=> btn.textContent = btn.textContent.includes('Added') ? btn.textContent.replace('Added ✓','Add to Bag') : btn.textContent, 1400);
  });
});
