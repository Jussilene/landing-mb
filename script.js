const WHATSAPP_URL = "https://wa.me/5541996858734?text=Ol%C3%A1%2C%20Marcello!%20Vi%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20de%20Tar%C3%B4";

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = WHATSAPP_URL;
  link.target = "_blank";
  link.rel = "noopener";
});

const topbar = document.querySelector(".topbar");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

addEventListener("scroll", () => topbar.classList.toggle("scrolled", scrollY > 24), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  if (element.getBoundingClientRect().top > innerHeight * 0.92) element.classList.add("pending");
  observer.observe(element);
});

document.querySelector("#whatsapp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá, Marcello! Meu nome é ${data.get("name")}. Gostaria de conversar sobre: ${data.get("subject")}. Melhor horário para contato: ${data.get("time") || "a combinar"}.`;
  window.open(`https://wa.me/5541996858734?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

document.querySelectorAll(".accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".accordion details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
