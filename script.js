const SITE_LINKS = {
  whatsapp: "https://wa.me/5541996858734",
  instagram: "https://www.instagram.com/tarologomarcellobredey",
  // Substituir pelo endereço público definitivo da página quando estiver disponível.
  facebook: "https://www.facebook.com/share/193TzP4JoL/"
};

const WHATSAPP_URL = `${SITE_LINKS.whatsapp}?text=Ol%C3%A1%2C%20Marcello!%20Vi%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20de%20Tar%C3%B4`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = WHATSAPP_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-social]").forEach((link) => {
  link.href = SITE_LINKS[link.dataset.social];
});

const topbar = document.querySelector(".topbar");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const navSectionLinks = [...nav.querySelectorAll('a[href^="#"]')];

const closeMenu = () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
};

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

addEventListener("scroll", () => topbar.classList.toggle("scrolled", scrollY > 24), { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.getBoundingClientRect().top > innerHeight * 0.92) element.classList.add("pending");
    revealObserver.observe(element);
  });

}

const menuSections = navSectionLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

let menuUpdatePending = false;
const updateActiveMenu = () => {
  const marker = scrollY + topbar.offsetHeight + innerHeight * 0.28;
  let currentSection = menuSections[0];

  menuSections.forEach((section) => {
    if (section.offsetTop <= marker) currentSection = section;
  });

  navSectionLinks.forEach((link) => {
    const active = currentSection && link.hash === `#${currentSection.id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  menuUpdatePending = false;
};

addEventListener("scroll", () => {
  if (menuUpdatePending) return;
  menuUpdatePending = true;
  requestAnimationFrame(updateActiveMenu);
}, { passive: true });
addEventListener("resize", updateActiveMenu);
updateActiveMenu();

const form = document.querySelector("#whatsapp-form");
const formStatus = form.querySelector(".form-status");

form.addEventListener("invalid", (event) => {
  event.preventDefault();
  formStatus.textContent = "Preencha os campos obrigatórios antes de continuar.";
  event.target.setAttribute("aria-invalid", "true");
}, true);

form.addEventListener("input", (event) => {
  event.target.removeAttribute("aria-invalid");
  if (form.checkValidity()) formStatus.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formStatus.textContent = "Preencha os campos obrigatórios antes de continuar.";
    form.querySelector(":invalid")?.focus();
    return;
  }

  const data = new FormData(form);
  const message = `Olá, Marcello! Meu nome é ${data.get("name")}. Modalidade do atendimento: ${data.get("modality")}. Gostaria de conversar sobre: ${data.get("subject")}. Melhor horário para contato: ${data.get("time") || "a combinar"}.`;
  formStatus.textContent = "Abrindo o WhatsApp com sua mensagem preenchida…";
  window.open(`${SITE_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
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
