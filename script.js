(() => {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeNav = () => {
    siteNav?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  navToggle?.addEventListener("click", () => {
    const open = !siteNav?.classList.contains("is-open");
    siteNav?.classList.toggle("is-open", open);
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
      observer.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    const text = [
      "طلب نقل أثاث من موقع أمال الخير",
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `التفاصيل: ${message}`,
    ].join("\n");

    const url = `https://wa.me/966508434496?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (formNote) {
      formNote.hidden = false;
      formNote.textContent = "سيتم فتح واتساب لإرسال طلبك مباشرة.";
    }

    form.reset();
  });
})();
