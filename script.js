// ---------- Shared pieces: header, footer, page transition ----------
const PAGES = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "skills.html", label: "Skills" },
  { href: "projects.html", label: "Projects" },
  { href: "services.html", label: "Services" },
  { href: "contact.html", label: "Contact" },
];

const currentPage = location.pathname.split("/").pop() || "index.html";

// Build header
const header = document.getElementById("site-header");
if (header) {
  header.innerHTML = `
    <div class="navbar">
      <a href="index.html" class="brand">
        <img class="logo" src="assets/transition-logo.png" alt="Ali Ashraf logo" title="Click to enlarge">
        <div class="brand-text">
          <strong>Ali Ashraf</strong>
          <small>Software Engineer</small>
        </div>
      </a>
      <nav class="nav-links" id="navLinks">
        ${PAGES.map(
          (p) =>
            `<a href="${p.href}" class="${p.href === currentPage ? "active" : ""}">${p.label}</a>`
        ).join("")}
      </nav>
      <a href="contact.html" class="btn-talk">Let's Talk</a>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;
}

// Build footer
const footer = document.getElementById("site-footer");
if (footer) {
  footer.innerHTML = `
    <div class="footer-socials">
      <a href="#" aria-label="GitHub">GH</a>
      <a href="#" aria-label="LinkedIn">in</a>
      <a href="#" aria-label="YouTube">▶</a>
      <a href="contact.html" aria-label="Email">✉</a>
    </div>
    <p>Designed by Engineer Ali Ashraf &nbsp;|&nbsp; Building a Better Digital Future 🚀</p>`;
}

// Page transition overlay
const overlay = document.createElement("div");
overlay.className = "page-overlay cover";
overlay.innerHTML = `<img class="overlay-logo" src="assets/transition-logo.png" alt="Ali Ashraf">`;
document.body.appendChild(overlay);

// Start covered, then reveal the page
requestAnimationFrame(() => {
  requestAnimationFrame(() => overlay.classList.remove("cover"));
});

// Animate out when clicking an internal page link
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("http") ||
    link.target === "_blank" ||
    href === currentPage
  ) return;

  if (href.endsWith(".html")) {
    e.preventDefault();
    overlay.classList.add("cover");
    setTimeout(() => (window.location.href = href), 600);
  }
});

// ---------- Mobile menu ----------
document.addEventListener("click", (e) => {
  const toggle = e.target.closest("#menuToggle");
  if (toggle) {
    document.getElementById("navLinks").classList.toggle("open");
  }
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));

// ---------- Contact form (opens the visitor's mail app) ----------
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${form.dataset.to}?subject=${subject}&body=${body}`;
  });
}

// ---------- Logo lightbox (click the navbar logo to enlarge) ----------
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `<img src="assets/transition-logo.png" alt="Ali Ashraf logo"><button class="lightbox-close" aria-label="Close">×</button>`;
document.body.appendChild(lightbox);

document.addEventListener("click", (e) => {
  if (e.target.closest(".logo")) {
    e.preventDefault();
    lightbox.classList.add("open");
  } else if (e.target.closest(".lightbox") && (e.target === lightbox || e.target.closest(".lightbox-close"))) {
    lightbox.classList.remove("open");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("open");
});
