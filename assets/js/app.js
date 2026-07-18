// NAV scroll
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });

  // Burger
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = burger.querySelectorAll("span");
    if (navLinks.classList.contains("open")) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    }
  });
  navLinks.querySelectorAll("a").forEach(l => l.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }));

  // Тарифы переключатель
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("on"));
      document.querySelectorAll(".ptable").forEach(t => t.classList.remove("on"));
      btn.classList.add("on");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("on");
    });
  });

  // Reveal при скролле
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      el.style.transition = "none";
      el.classList.add("visible");
      requestAnimationFrame(() => { el.style.transition = ""; });
    } else {
      observer.observe(el);
    }
  });
