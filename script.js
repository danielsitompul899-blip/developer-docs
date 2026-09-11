const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");
const copyButtons = document.querySelectorAll(".copy-button");
const searchInput = document.getElementById("searchInput");
const sections = document.querySelectorAll(".docs-section");

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("active");

  document.body.classList.toggle("menu-open", isOpen);

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu" : "Buka menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    sidebar.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    menuToggle.textContent = "☰";
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.parentElement.querySelector("code").innerText;

    try {
      await navigator.clipboard.writeText(code);

      const oldText = button.textContent;
      button.textContent = "Tersalin";

      setTimeout(() => {
        button.textContent = oldText;
      }, 1500);
    } catch (error) {
      button.textContent = "Gagal";

      setTimeout(() => {
        button.textContent = "Salin";
      }, 1500);
    }
  });
});

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase().trim();

  sections.forEach((section) => {
    const content = section.innerText.toLowerCase();

    section.style.display =
      content.includes(keyword) ? "block" : "none";
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isCurrent);
        });
      }
    });
  },
  {
    rootMargin: "-20% 0px -65% 0px"
  }
);

sections.forEach((section) => {
  observer.observe(section);
});