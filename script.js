/* ===========================
   IIT-BBSR APP JS
=========================== */

// DARK MODE TOGGLE
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("theme-light");
  themeToggle.textContent = document.body.classList.contains("theme-light") ? "🌙" : "☀️";
});

// MOBILE NAV
const navToggle = document.getElementById("hamburger");
const navMenu = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// TABS
const tabs = document.querySelectorAll(".tab");
const tabText = document.getElementById("tabText");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    tabText.textContent = `${tab.dataset.tab.charAt(0).toUpperCase()+tab.dataset.tab.slice(1)} details will appear here.`;
  });
});

// PRICING TOGGLE
const priceToggle = document.getElementById("priceToggle");
const prices = document.querySelectorAll(".price");
priceToggle.addEventListener("change", () => {
  prices.forEach(p => {
    p.textContent = priceToggle.checked ? p.dataset.year : p.dataset.month;
  });
});

// TESTIMONIAL CAROUSEL
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;
setInterval(() => {
  testimonials[currentTestimonial].classList.remove("active");
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add("active");
}, 5000);

// SCROLL TO TOP
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({top:0, behavior:"smooth"});
});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  formStatus.textContent = "Message sent!";
  contactForm.reset();
  setTimeout(()=>formStatus.textContent="",3000);
});

// CUSTOM CURSOR
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");
document.addEventListener("mousemove", e => {
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
  cursorOutline.style.left = e.clientX + "px";
  cursorOutline.style.top = e.clientY + "px";
});
document.addEventListener("mousedown",()=>cursorOutline.style.transform="scale(0.7)");
document.addEventListener("mouseup",()=>cursorOutline.style.transform="scale(1)");

// PRELOADER
window.addEventListener("load",()=>{document.getElementById("preloader").style.display="none"});
