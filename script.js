/* --------------------------
   Basic interactive behavior
   --------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  // PRELOADER: hide after window load + small delay
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    pre.style.opacity = '0';
    setTimeout(() => pre.style.display = 'none', 500);
  });

  // MOBILE NAV TOGGLE
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('primaryNav');
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });

  // DARK MODE
  const darkToggle = document.getElementById('darkModeToggle');
  const lsKey = 'iits_bbsr_dark';
  // initialize from localStorage
  if (localStorage.getItem(lsKey) === '1') document.body.classList.add('dark');
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem(lsKey, isDark ? '1' : '0');
    darkToggle.setAttribute('aria-pressed', String(isDark));
  });

  // TABS (Feature tabs)
  const tabs = document.querySelectorAll('.tab');
  const tabContent = document.getElementById('tabContent');
  tabs.forEach(t => t.addEventListener('click', (e) => {
    tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
    e.currentTarget.classList.add('active');
    e.currentTarget.setAttribute('aria-selected','true');

    const key = e.currentTarget.dataset.tab;
    // basic content swap examples; you can replace with richer markup
    const map = {
      billing: '<h3>Billing</h3><p>Invoices, line-items, mini chart preview.</p>',
      charging: '<h3>Charging</h3><p>Charge flows, card management and receipts.</p>',
      catalog: '<h3>Catalog</h3><p>Product listing, filters and brand kits.</p>',
      events: '<h3>Events</h3><p>Event triggers and webhooks.</p>'
    };
    tabContent.innerHTML = map[key] || '<p>Details coming soon.</p>';
  }));

  // PRICING toggle (monthly/yearly)
  const billingCycle = document.getElementById('billingCycle');
  const priceEls = document.querySelectorAll('.price');
  billingCycle.addEventListener('change', () => {
    priceEls.forEach(pe => {
      const month = pe.dataset.month;
      const year = pe.dataset.year;
      pe.textContent = billingCycle.checked ? year : month;
    });
  });

  // TESTIMONIAL CAROUSEL (simple)
  const testimonials = Array.from(document.querySelectorAll('.testimonial'));
  let tIdx = 0;
  setInterval(() => {
    testimonials.forEach((t, i) => t.classList.remove('active'));
    tIdx = (tIdx + 1) % testimonials.length;
    testimonials[tIdx].classList.add('active');
  }, 3500);

  // CONTACT FORM simple validation + success
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    // trivial validation
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      alert('Please fill all fields.');
      return;
    }
    // For hackathon: you can integrate Formspree or similar if you want POST
    alert('Message sent — thank you!');
    form.reset();
  });

  // PARALLAX: simple speed based on data-speed attribute
  const parallaxEls = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const scTop = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed || '1');
      el.style.transform = `translateY(${scTop * (0.05 * (1 - speed))}px)`;
    });
  }, {passive:true});

  // Accessibility: allow keyboard for tabs
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const active = document.querySelector('.tab.active');
      let next;
      if (e.key === 'ArrowRight') next = active.nextElementSibling || tabs[0];
      else next = active.previousElementSibling || tabs[tabs.length - 1];
      next.click();
      next.focus();
    }
  });

});
