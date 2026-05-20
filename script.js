const WHATSAPP_NUMBER = "5521994037748";
const sanitizedWhatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

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

if (note) {
  note.innerHTML = sanitizedWhatsappNumber
    ? "Ao enviar, vamos abrir sua mensagem direto no WhatsApp."
    : 'Configure o n&uacute;mero de contato no arquivo <code>script.js</code> para abrir a conversa direto.';
}

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

  if (sanitizedWhatsappNumber) {
    window.open(
      `https://wa.me/${sanitizedWhatsappNumber}?text=${encodeURIComponent(message)}`,
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

// Scroll reveal (run once)
const revealElements = document.querySelectorAll(
  '.section-head, .price-card, .steps article, .comparison article, .section-copy, .service-card, .b-card, .client-card, .lead-form',
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// Scroll reveal (run once)
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    'h2, .section-copy p, .hero-proof div, .price-card, .steps article, .comparison article, .benefit-list li, .b-card, .client-card, .package-benefits h3, .package-benefits p, .premium-features li, .service-card, .section-head p, details.frufru-faq, .lead-form',
  );
  
  elements.forEach((el) => {
    el.classList.add('frufru-hidden');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('frufru-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));

  const faqItems = document.querySelectorAll('details.frufru-faq');
  faqItems.forEach((item) => {
    const summary = item.querySelector('summary');
    let openTimer;
    let closeTimer;
    let finishCloseTimer;

    const openFaq = () => {
      clearTimeout(closeTimer);
      clearTimeout(finishCloseTimer);
      item.setAttribute('open', 'open');
      requestAnimationFrame(() => {
        item.classList.add('is-open');
      });
    };

    const closeFaq = () => {
      item.classList.remove('is-open');
      finishCloseTimer = setTimeout(() => {
        item.removeAttribute('open');
      }, 480);
    };

    item.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      clearTimeout(finishCloseTimer);
      openTimer = setTimeout(() => {
        openFaq();
      }, 90);
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(openTimer);
      closeTimer = setTimeout(() => {
        closeFaq();
      }, 140);
    });

    summary?.addEventListener('click', (event) => {
      event.preventDefault();
      clearTimeout(openTimer);
      clearTimeout(closeTimer);

      if (item.classList.contains('is-open')) {
        closeFaq();
        return;
      }

      openFaq();
    });
  });
});
