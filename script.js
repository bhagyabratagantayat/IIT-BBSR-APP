/* =========================
   IIT-BBSR APP JS
=========================== */

// DARK MODE TOGGLE with persistence
const themeToggle = document.getElementById("themeToggle");
if(localStorage.getItem("dark-mode") === "true"){
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
} else {
  document.body.classList.remove("dark-mode");
  themeToggle.textContent = "🌙";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// MOBILE NAV
const navToggle = document.getElementById("hamburger");
const navMenu = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navMenu.classList.toggle("show");
});

// TABS
const tabs = document.querySelectorAll(".tab");
const tabText = document.getElementById("tabText");

// PRICING TOGGLE
const priceToggle = document.getElementById("priceToggle");
priceToggle.addEventListener("change", () => {
  document.querySelectorAll(".price").forEach(el => {
    el.textContent = priceToggle.checked ? el.dataset.year : el.dataset.month;
  });
});

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 500 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:'smooth'}));

// PRELOADER
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// CUSTOM CURSOR
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");
document.addEventListener("mousemove", e => {
  cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// HERO PARALLAX
document.addEventListener("scroll", () => {
  const heroTitle = document.querySelector(".hero-title");
  if(heroTitle){
    heroTitle.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }
});

// CONTACT FORM (dummy)
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formStatus").textContent = "Message sent!";
  contactForm.reset();
});

// TESTIMONIAL CAROUSEL
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");
setInterval(() => {
  testimonials.forEach(t => t.classList.remove("active"));
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonials[testimonialIndex].classList.add("active");
}, 4000);

// BACK TO HOME NAV
document.getElementById("homeBtn").addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({top:0, behavior:"smooth"});
});
