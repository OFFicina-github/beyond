/**
 * Archivio portfolio: filtro categorie lato client.
 * Il filtro attivo viene salvato nell'hash dell'URL (#slug) per poterlo condividere.
 */
(function () {
  const root = document.querySelector("[data-portfolio-archive]");
  if (!root) return;

  const buttons = root.querySelectorAll("[data-filter]");
  const cards = root.querySelectorAll(".portfolio-card");
  const emptyMsg = root.querySelector("[data-filter-empty]");
  const toggle = root.querySelector(".portfolio-filter__toggle");
  const current = root.querySelector("[data-filter-current]");
  const header = document.getElementById("header-outer");

  // Sticky della sidebar: bordo inferiore dell'header fisso in una variabile CSS
  let ticking = false;
  function updateHeaderVar() {
    ticking = false;
    const bottom = header
      ? Math.max(0, Math.round(header.getBoundingClientRect().bottom))
      : 0;
    root.style.setProperty("--portfolio-header-h", bottom + "px");
  }
  function requestHeaderVar() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateHeaderVar);
    }
  }
  updateHeaderVar();
  window.addEventListener("scroll", requestHeaderVar, { passive: true });
  window.addEventListener("resize", requestHeaderVar);
  window.addEventListener("load", updateHeaderVar);

  function applyFilter(slug) {
    let activeBtn = root.querySelector(
      '[data-filter="' + CSS.escape(slug) + '"]',
    );
    if (!activeBtn) {
      slug = "";
      activeBtn = root.querySelector('[data-filter=""]');
    }

    buttons.forEach(function (btn) {
      const isActive = btn === activeBtn;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    // Evidenzia il genitore quando è attiva una sua sottocategoria
    root.querySelectorAll(".portfolio-filter__group").forEach(function (group) {
      group.classList.toggle("is-open", group.contains(activeBtn));
    });

    let visible = 0;
    cards.forEach(function (card) {
      const terms = card.dataset.terms ? card.dataset.terms.split(" ") : [];
      const show = !slug || terms.indexOf(slug) !== -1;
      card.hidden = !show;
      if (show) visible++;
    });

    if (emptyMsg) emptyMsg.hidden = visible > 0;
    if (current) current.textContent = activeBtn.textContent.trim();

    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const slug = btn.dataset.filter;
      history.replaceState(
        null,
        "",
        slug ? "#" + slug : location.pathname + location.search,
      );
      applyFilter(slug);

      if (toggle && window.matchMedia("(max-width: 999px)").matches) {
        root.classList.remove("filter-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  if (toggle) {
    toggle.addEventListener("click", function () {
      const open = root.classList.toggle("filter-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  applyFilter(decodeURIComponent(location.hash.replace("#", "")));
})();

/**
 * Single portfolio: shortcode [uscite_stampa].
 * Indice laterale -> click evidenzia voce + card e scrolla fino alla card.
 */
(function () {
  const sections = document.querySelectorAll("[data-uscite-stampa]");
  if (!sections.length) return;

  // Lenis è dichiarato globalmente in script.js
  const smooth = typeof lenis !== "undefined" ? lenis : null;

  const header = document.getElementById("header-outer");

  // Bordo inferiore dell'header fisso (include admin bar e cambi di altezza di Salient)
  function headerBottom() {
    return header
      ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) + 100
      : 100;
  }

  function headerOffset() {
    return headerBottom() + 20;
  }

  // Aggiorna la variabile CSS usata dallo sticky dell'indice
  let ticking = false;
  function updateHeaderVar() {
    ticking = false;
    const h = headerBottom() + "px";
    sections.forEach(function (section) {
      section.style.setProperty("--uscite-header-h", h);
    });
  }
  function requestHeaderVar() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateHeaderVar);
    }
  }
  updateHeaderVar();
  window.addEventListener("scroll", requestHeaderVar, { passive: true });
  window.addEventListener("resize", requestHeaderVar);
  window.addEventListener("load", updateHeaderVar);

  sections.forEach(function (section) {
    const links = section.querySelectorAll(".uscite-stampa__nav-link");
    const cards = section.querySelectorAll(".uscita-card");
    const toggle = section.querySelector(".uscite-stampa__toggle");

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.dataset.target === id);
      });
      cards.forEach(function (card) {
        card.classList.toggle("is-active", card.id === id);
      });
    }

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        // Salient intercetta (delegato sul body) i link "#..." dentro .container-wrap
        // e avvia un suo scroll jQuery che si scontra con Lenis: lo blocchiamo qui.
        e.stopPropagation();
        const target = document.getElementById(link.dataset.target);
        if (!target) return;

        setActive(link.dataset.target);

        const offset = -headerOffset();

        // Durata proporzionale alla distanza: 0.4s – 0.9s
        const distance = Math.abs(target.getBoundingClientRect().top + offset);
        const duration = Math.min(0.9, Math.max(0.4, 0.4 + distance / 5000));

        if (smooth) {
          // easeOutCubic: parte subito (senza lo strappo dell'easeOutExpo di default) e frena dolcemente
          smooth.scrollTo(target, {
            offset: offset,
            duration: duration,
            easing: function (t) {
              return 1 - Math.pow(1 - t, 3);
            },
            lock: true,
          });
        } else {
          const y =
            target.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }

        if (toggle && window.matchMedia("(max-width: 767px)").matches) {
          section.classList.remove("index-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        const open = section.classList.toggle("index-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  });
})();
