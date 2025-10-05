// Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Tabs
const tabs = document.querySelectorAll(".tab");
const tabText = document.getElementById("tabText");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    tabText.textContent = tab.dataset.tab + " details will appear here...";
  });
});

// Pricing Toggle
const priceToggle = document.getElementById("priceToggle");
const prices = document.querySelectorAll(".price");
priceToggle.addEventListener("change", () => {
  prices.forEach((price, i) => {
    if (priceToggle.checked) {
      price.textContent = ["$299 / yr", "$599 / yr", "$999 / yr"][i];
    } else {
      price.textContent = ["$29 / mo", "$59 / mo", "$99 / mo"][i];
    }
  });
});

// Testimonials Carousel
let index = 0;
const testimonials = document.querySelectorAll(".testimonial");
setInterval(() => {
  testimonials[index].classList.remove("active");
  index = (index + 1) % testimonials.length;
  testimonials[index].classList.add("active");
}, 3000);

// Contact Form
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message Sent!");
  form.reset();
});
