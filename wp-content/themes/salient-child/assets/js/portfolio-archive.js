/**
 * Archivio portfolio: filtro categorie lato client.
 * Il filtro attivo viene salvato nell'hash dell'URL (#slug) per poterlo condividere.
 */
(function () {
    const root = document.querySelector('[data-portfolio-archive]');
    if (!root) return;

    const buttons = root.querySelectorAll('[data-filter]');
    const cards = root.querySelectorAll('.portfolio-card');
    const emptyMsg = root.querySelector('[data-filter-empty]');
    const toggle = root.querySelector('.portfolio-filter__toggle');
    const current = root.querySelector('[data-filter-current]');

    function applyFilter(slug) {
        let activeBtn = root.querySelector('[data-filter="' + CSS.escape(slug) + '"]');
        if (!activeBtn) {
            slug = '';
            activeBtn = root.querySelector('[data-filter=""]');
        }

        buttons.forEach(function (btn) {
            const isActive = btn === activeBtn;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Evidenzia il genitore quando è attiva una sua sottocategoria
        root.querySelectorAll('.portfolio-filter__group').forEach(function (group) {
            group.classList.toggle('is-open', group.contains(activeBtn));
        });

        let visible = 0;
        cards.forEach(function (card) {
            const terms = card.dataset.terms ? card.dataset.terms.split(' ') : [];
            const show = !slug || terms.indexOf(slug) !== -1;
            card.hidden = !show;
            if (show) visible++;
        });

        if (emptyMsg) emptyMsg.hidden = visible > 0;
        if (current) current.textContent = activeBtn.textContent.trim();

        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const slug = btn.dataset.filter;
            history.replaceState(null, '', slug ? '#' + slug : location.pathname + location.search);
            applyFilter(slug);

            if (toggle && window.matchMedia('(max-width: 999px)').matches) {
                root.classList.remove('filter-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    if (toggle) {
        toggle.addEventListener('click', function () {
            const open = root.classList.toggle('filter-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    applyFilter(decodeURIComponent(location.hash.replace('#', '')));
})();
