/* ===================================================================
   script.js — UI enhancements:
   - Dark mode with CSS variables and localStorage
   - Responsive hamburger + mobile slide-in nav
   - IntersectionObserver reveals (AOS used optionally)
   - Preloader removal
   - Custom cursor (dot + outline)
   - Scroll-to-top button
   - Keep existing features: tabs, pricing toggle, testimonials, contact form
   =================================================================== */

/* ----------------- Utilities ----------------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ----------------- PRELOADER ----------------- */
const preloader = $('#preloader');
window.addEventListener('load', () => {
  // remove preloader after small delay to display animation
  setTimeout(() => {
    if (!preloader) return;
    preloader.style.opacity = '0';
    preloader.style.transform = 'translateY(-6px)';
    setTimeout(() => preloader.remove(), 420);
  }, 420);
});

/* ----------------- THEME (Dark default) ----------------- */
/*
  - Default: Dark theme enabled
  - Toggle persists preference in localStorage ('theme' = 'dark'|'light')
*/
const themeToggle = $('#themeToggle');
const rootEl = document.documentElement;
const bodyEl = document.body;

function applyTheme(theme) {
  if (theme === 'light') {
    bodyEl.classList.add('theme-light');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'false');
  } else {
    bodyEl.classList.remove('theme-light');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'true');
  }
  localStorage.setItem('theme', theme);
}

// init theme: read localStorage or default to dark
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // force dark default per option A
applyTheme(initialTheme);

// theme toggle button
themeToggle.addEventListener('click', () => {
  const newTheme = bodyEl.classList.contains('theme-light') ? 'dark' : 'light';
  // smooth color transition
  rootEl.style.transition = 'background 350ms ease, color 250ms ease';
  applyTheme(newTheme);
  setTimeout(() => rootEl.style.transition = '', 400);
});

/* ----------------- HAMBURGER & MOBILE NAV ----------------- */
/*
  Strategy:
  - On mobile, clicking hamburger toggles a slide-in mobile nav created dynamically.
  - Keeps original nav links for desktop.
*/
const hamburger = $('#hamburger');
const mainNav = $('#mainNav');

let mobileNav = null;

function createMobileNav() {
  // if already exists, just return
  if (mobileNav) return mobileNav;

  const navClone = mainNav.cloneNode(true);
  navClone.classList.add('mobile-nav');
  navClone.setAttribute('aria-hidden', 'true');

  // add close behavior: clicking a link closes menu
  navClone.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  document.body.appendChild(navClone);
  mobileNav = navClone;
  return mobileNav;
}

function openMobileNav() {
  createMobileNav();
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  // prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (!mobileNav || !mobileNav.classList.contains('open')) openMobileNav();
  else closeMobileNav();
});

// close mobile nav when clicking outside (optional)
document.addEventListener('click', (e) => {
  if (!mobileNav) return;
  if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileNav();
  }
});

/* ----------------- ACTIVE NAV HIGHLIGHT & "Back to Home" ----------------- */
// highlight nav link when clicked + smooth scroll
const navLinks = $$('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // allow default anchor behavior (scroll)
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// home/back-to-home button quick scroll
const homeBtn = $('#homeBtn');
homeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#hero').scrollIntoView({behavior:'smooth'});
});

/* ----------------- SCROLL-TO-TOP BUTTON ----------------- */
const scrollTopBtn = $('#scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 420) scrollTopBtn.style.display = 'block';
  else scrollTopBtn.style.display = 'none';

  // highlight active section nav (intersection observer below handles accurate detection)
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});

/* ----------------- INTERSECTION OBSERVER (reveal on scroll) ----------------- */
/* If AOS loaded from CDN, initialize it; otherwise use IntersectionObserver fallback */
if (window.AOS) {
  AOS.init({ duration: 700, easing: 'ease-out-back', once: true, offset: 80 });
} else {
  // fallback simple observer
  const revealEls = $$('.section-title, .fade-in, .hero-left, .hero-right, .glass-card, .card-plan, .testimonial');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));
}

/* ----------------- PARALLAX HERO TITLE (subtle) ----------------- */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  window.addEventListener('scroll', () => {
    const offset = Math.min(Math.max(window.scrollY / 8, 0), 48);
    heroTitle.style.transform = `translateY(${offset}px)`;
  });
}

/* ----------------- CUSTOM CURSOR (dot + outline) ----------------- */
/* Provides a neon interactive cursor; hides on touch devices */
const cursorDot = $('#cursor-dot');
const cursorOutline = $('#cursor-outline');
let lastMouseX = 0, lastMouseY = 0;
let outlineX = 0, outlineY = 0;

// Hide cursor on touch devices (mobile)
const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
if (isTouch) {
  cursorDot.style.display = 'none';
  cursorOutline.style.display = 'none';
} else {
  document.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    cursorDot.style.left = lastMouseX + 'px';
    cursorDot.style.top = lastMouseY + 'px';
    // accelerate outline toward mouse for trailing effect
    outlineX += (lastMouseX - outlineX) * 0.18;
    outlineY += (lastMouseY - outlineY) * 0.18;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
  });

  // interactive states on hover
  const hoverTargets = $$('.btn, .nav-link, .tab, .card-plan');
  hoverTargets.forEach(t => {
    t.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'scale(0.7)';
      cursorOutline.style.transform = 'scale(1.4)';
    });
    t.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'scale(1)';
      cursorOutline.style.transform = 'scale(1)';
    });
  });
}

/* ----------------- PRICING TOGGLE (monthly/yearly) ----------------- */
const priceToggle = $('#priceToggle');
const priceEls = $$('.price');
if (priceToggle) {
  priceToggle.addEventListener('change', () => {
    priceEls.forEach((p) => {
      p.textContent = priceToggle.checked ? p.dataset.year : p.dataset.month;
    });
  });
}

/* ----------------- TABS (feature tabs) ----------------- */
/* Keep same behavior but add subtle animation */
const tabs = $$('.tab');
const tabText = $('#tabText');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.tab;
    const contentMap = {
      billing: 'Fast, automated billing with invoice generation and reconciliation.',
      charging: 'Smart charging & settlement with retries & refunds.',
      catalog: 'Organize products with tags, bulk edits, and variants.',
      events: 'Campaigns, promotions, and scheduled drops.'
    };
    // flip animation
    const panel = document.querySelector('.tab-panel');
    panel.animate([{ transform: 'rotateX(0deg)', opacity: 1 }, { transform: 'rotateX(10deg)', opacity: 0.4 }, { transform: 'rotateX(0deg)', opacity: 1 }], { duration: 420, easing: 'ease' });
    tabText.textContent = contentMap[key] || 'Details will appear here...';
  });
});

/* ----------------- TESTIMONIAL CAROUSEL ----------------- */
let tIndex = 0;
const testimonials = $$('.testimonial');
function rotateTestimonials() {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === tIndex));
}
rotateTestimonials();
setInterval(() => {
  tIndex = (tIndex + 1) % testimonials.length;
  rotateTestimonials();
}, 3600);

/* ----------------- CONTACT FORM (frontend simulation) ----------------- */
const form = $('#contactForm');
const formStatus = $('#formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending…';
    // simple simulated send - replace with real endpoint if needed
    setTimeout(() => {
      formStatus.textContent = 'Message sent. Thank you!';
      form.reset();
      setTimeout(() => formStatus.textContent = '', 3000);
    }, 900);
  });
}

/* ----------------- ACCESSIBILITY: keyboard nav for carousel ----------------- */
testimonials.forEach((t, i) => {
  t.setAttribute('tabindex', '0');
  t.addEventListener('focus', () => { tIndex = i; rotateTestimonials(); });
});

/* ----------------- FINAL POLISH: ensure links smooth scroll ----------------- */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    // allow regular external links
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
      closeMobileNav(); // close mobile if open
    }
  });
});
