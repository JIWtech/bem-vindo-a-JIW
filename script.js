const WHATSAPP_NUMBER = "";

const links = [...document.querySelectorAll(".nav a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        );
      });
    });
  },
  { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
);

sections.forEach((section) => observer.observe(section));

const form = document.querySelector("#leadForm");
const note = document.querySelector("#formNote");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    "Olá, JIW. Quero um diagnóstico rápido.",
    `Nome: ${data.get("nome")}`,
    `Empresa: ${data.get("empresa")}`,
    `Instagram/site: ${data.get("canal") || "Não informado"}`,
    `Interesse: ${data.get("interesse")}`,
  ].join("\n");

  if (WHATSAPP_NUMBER) {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    return;
  }

  try {
    await navigator.clipboard.writeText(message);
    note.textContent =
      "Mensagem copiada. Configure o número no script.js para abrir o WhatsApp automaticamente.";
  } catch {
    note.textContent = message;
  }
});
