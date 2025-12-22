console.log("-D4N-")
gsap.registerPlugin(ScrollTrigger);

const split = new SplitType('.js-title-text', { types: 'chars' });
if (split && split.chars && split.chars.length > 0) {

    const pinWrapper = document.querySelector("#hero");
    const scrollContainer = document.querySelector(".horizontal-scroll");

    function getWidth() {
        return scrollContainer.scrollWidth - window.innerWidth;
    }

    let horizontalTween = gsap.to(scrollContainer, {
        x: () => -getWidth(),
        ease: "none",
        scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            end: () => "+=" + getWidth(),
            scrub: true,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
        }
    });

    // Reveal anim
    split.chars.forEach((char) => {
        gsap.from(char, {
            opacity: 0,
            y: 40,
            duration: 0.3,
            scrollTrigger: {
                trigger: char,
                containerAnimation: horizontalTween,
                start: "left 90%",
                toggleActions: "play none none reverse"
            }
        });
    });
}


window.addEventListener("load", () => {
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 600);
});

function addServiziIDs() {
    // Trova la griglia principale
    const grid = document.querySelector('.nectar-post-grid');
    if (!grid) return; // Se non c'è finisce qui

    // Trova tutti i figli
    const items = grid.querySelectorAll('.nectar-post-grid-item');

    // Controllo che ci siano almeno 3 elementi
    if (items.length >= 2) items[1].id = "servizi-2";
    if (items.length >= 3) items[2].id = "servizi-3";
}

addEventListener("DOMContentLoaded", (event) => {

    if (document.querySelectorAll(".rotateWord").length > 0) {

        new Splide('.rotateWord .splide', {
            direction: 'ttb',
            height: '3rem',
            autoplay: true,          // Abilita l'autoplay
            interval: 2000,          // Imposta l'intervallo tra ogni slide (in millisecondi)
            arrows: false,           // Disabilita le frecce di navigazione
            pagination: false,       // Disabilita la pagination
            pauseOnHover: false,     // Disabilita la pausa al passaggio del mouse
            type: 'loop',            // Aggiunge un effetto di dissolvenza
            drag: false,
        }).mount();

        addServiziIDs();
    }
})

document.addEventListener("DOMContentLoaded", addServiziIDs);

// Esegui di nuovo quando tutto il layout è montato (utile per Salient)
window.addEventListener("load", addServiziIDs);


const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    smoothTouch: false,
    autoRaf: false,
});


function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {

    function initScribbles(container = document) {
        container.querySelectorAll(".scribble").forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    requestAnimationFrame(() => {
                        el.offsetWidth; // force reflow
                        el.classList.add("started");
                    });
                }
            });
        });
    }

    /* ==========================
       Scribble NORMALI → subito
    ========================== */
    document.querySelectorAll(".scribble:not(.delay-scribble .scribble)")
        .forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    requestAnimationFrame(() => {
                        el.offsetWidth;
                        el.classList.add("started");
                    });
                }
            });
        });

    /* ==========================
       Scribble DELAYED → DOPO INTRO
    ========================== */
    const delayedContainer = document.querySelector(".delay-scribble");
    if (!delayedContainer) return;

    if (document.documentElement.classList.contains("intro-finished")) {
        initScribbles(delayedContainer);
        ScrollTrigger.refresh();
        return;
    }

    const observer = new MutationObserver(() => {
        if (document.documentElement.classList.contains("intro-finished")) {
            initScribbles(delayedContainer);
            ScrollTrigger.refresh();
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
    });
});



window.addEventListener('scroll', () => {
    const top = document.querySelector('#top');
    const bodyTop = document.body.getBoundingClientRect().top;
    if (Math.abs(bodyTop) >= 80) {
        top.classList.add('scrolled');
    } else {
        top.classList.remove('scrolled');
    }
});


document.addEventListener("DOMContentLoaded", () => {

    if (typeof SplitType === "undefined" || typeof gsap === "undefined") return;

    const titles = document.querySelectorAll(".reveal-text");

    titles.forEach(title => {

        gsap.set(title, { opacity: 0 });

        const split = new SplitType(title, {
            types: "lines, words, chars",
            lineClass: "split-line",
            wordClass: "split-word",
            charClass: "split-char"
        });

        gsap.set(title, { opacity: 1 });

        gsap.set(split.chars, {
            y: "100%",
            opacity: 0
        });

        gsap.to(split.chars, {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.025,
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                once: true
            }
        });
    });

    setTimeout(() => {
        if (document.querySelector('.experience-intro'))
            document
                .querySelector('.experience-intro')
                .classList.add('first-animation');
    }, 600);

    setTimeout(() => {
        if (document.querySelector('.experience-intro'))
            document
                .querySelector('.experience-intro')
                .classList.add('second-animation');
    }, 1600);


    setTimeout(() => {
        if (document.querySelector('.experience-intro'))
            document
                .querySelector('.experience-intro')
                .classList.add('is-ready');
    }, 2300);
});

function initSentenceAnimation() {

    if (!document.querySelector('.word-metodo')) return;

    /* POSIZIONI INIZIALI */
    if (window.innerWidth < 1000) {
        gsap.set(".word-metodo", { x: -200, y: 50 });
    } else {
        gsap.set(".word-metodo", { x: -400, y: 50 });
    }

    gsap.set(".word-consapevolezza", { x: 40, y: 10 });
    gsap.set(".word-immagine", { x: -80, y: 80 });

    function moveWordToSlot(wordSelector, slotSelector) {
        const word = document.querySelector(wordSelector);
        const slot = document.querySelector(slotSelector);

        const getDelta = () => {
            const w = word.getBoundingClientRect();
            const s = slot.getBoundingClientRect();

            return {
                x: s.left + s.width / 2 - (w.left + w.width / 2),
                y: s.top + s.height / 2 - (w.top + w.height / 2)
            };
        };

        gsap.to(word, {
            x: () => `+=${getDelta().x}`,
            y: () => `+=${getDelta().y}`,
            ease: "none",
            scrollTrigger: {
                trigger: ".sentence-block",
                start: "top 100%",
                end: "top 55%",
                scrub: 1,
                snap: false,
                onUpdate: self => {
                    document
                        .querySelector(".sentence-block")
                        .classList.toggle("is-near", self.progress > 0.8);
                }
            }
        });
    }

    ScrollTrigger.create({
        trigger: ".sentence-block",
        start: "top 75%",
        onEnter: () =>
            document.querySelector(".sentence-block").classList.add("is-active")
    });

    moveWordToSlot(".word-metodo", ".slot-metodo");
    moveWordToSlot(".word-consapevolezza", ".slot-consapevolezza");
    moveWordToSlot(".word-immagine", ".slot-immagine");
}


document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       CONFIG
       ============================== */

    const container = document.querySelector(".spline-content-bubble");
    if (!container) return;

    const bubbles = Array.from(
        container.querySelectorAll(".bubble-1, .bubble-2, .bubble-3")
    );

    const safeMultiplier = window.innerWidth < 1000 ? 0 : 0.08;
    const safeMultiplierHeight = window.innerWidth < 1000 ? 0.2 : 0.2;

    const padding = 24;
    const maxAttempts = 200;
    const delayBetween = 200;

    const placed = [];

    /* ==============================
       UTILS
       ============================== */

    function isOverlapping(rect) {
        return placed.some(p =>
            !(
                rect.right + padding < p.left ||
                rect.left - padding > p.right ||
                rect.bottom + padding < p.top ||
                rect.top - padding > p.bottom
            )
        );
    }

    /* ==============================
       POSIZIONAMENTO
       ============================== */

    function placeBubble(bubble) {

        const containerRect = container.getBoundingClientRect();
        const rect = bubble.getBoundingClientRect();

        const safeX = containerRect.width * safeMultiplier;
        const safeY = containerRect.height * safeMultiplierHeight;

        let attempts = 0;
        let placedRect = null;

        while (attempts < maxAttempts) {

            const minX = safeX;
            const maxX = containerRect.width - rect.width - safeX;
            const minY = safeY;
            const maxY = containerRect.height - rect.height - safeY;

            if (maxX <= minX || maxY <= minY) break;

            const x = minX + Math.random() * (maxX - minX);
            const y = minY + Math.random() * (maxY - minY);

            const candidate = {
                left: x,
                top: y,
                right: x + rect.width,
                bottom: y + rect.height
            };

            if (!isOverlapping(candidate)) {
                placedRect = candidate;
                break;
            }

            attempts++;
        }

        if (!placedRect) {
            console.warn("Bubble non posizionata (spazio insufficiente)", bubble);
            return;
        }

        placed.push(placedRect);

        bubble.style.left = `${placedRect.left}px`;
        bubble.style.top = `${placedRect.top}px`;

        setTimeout(() => {
            bubble.classList.add("active");
        }, 50);
    }

    /* ==============================
       AVVIO SEQUENZIALE
       ============================== */

    bubbles.forEach((bubble, index) => {
        setTimeout(() => {
            placeBubble(bubble);
        }, index * delayBetween);
    });

});















if (document.querySelector(".manifesto-wrapper")) {

    document.querySelectorAll(".text").forEach(p => {
        const words = p.innerText.split(" ");
        p.innerHTML = words.map(w => `
    <span class="word">
      <span class="word-fill">${w}&nbsp;</span>
      <span style="opacity:.4">${w}&nbsp;</span>
    </span>
  `).join("");
    });

    const titles = gsap.utils.toArray(".title");

    /* split lettere titoli */
    titles.forEach(title => {
        const text = title.innerText;
        title.innerHTML = text
            .split("")
            .map(char =>
                char === " "
                    ? "&nbsp;"
                    : `<span class="char">${char}</span>`
            )
            .join("");
    });

    /* stato iniziale titoli */
    let currentTitleIndex = 0;

    titles.forEach((t, i) => {
        gsap.set(t, { opacity: i === 0 ? 1 : 0 });
    });

    function showTitle(index) {
        if (index === currentTitleIndex) return;

        const prev = titles[currentTitleIndex];
        const next = titles[index];

        const prevChars = prev.querySelectorAll(".char");
        const nextChars = next.querySelectorAll(".char");

        /* OUT titolo precedente */
        gsap.to(prevChars, {
            opacity: 0,
            scale: 1.4,
            filter: "blur(12px)",
            stagger: 0.03,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                prev.style.opacity = 0;
            }
        });

        /* IN titolo nuovo */
        next.style.opacity = 1;

        gsap.fromTo(
            nextChars,
            {
                opacity: 0,
                scale: 1.4,
                filter: "blur(12px)"
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                stagger: 0.03,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.1
            }
        );

        currentTitleIndex = index;
    }

    /* ==============================
       COLONNE
       ============================== */
    const columns = gsap.utils.toArray(".manifesto-col");

    /* ==============================
       TIMELINE MASTER
       ============================== */
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".manifesto-wrapper",
            start: () => {
                return window.innerWidth < 1000
                    ? "top-=80 top"
                    : "top-=120 top";
            },
            end: "bottom bottom",
            scrub: true,
            pin: ".manifesto-pin",

            /* CONTROLLO GLOBALE PROGRESS */
            onUpdate: self => {
                const p = self.progress;

                if (p < 0.33) {
                    showTitle(0);
                } else if (p < 0.66) {
                    showTitle(1);
                } else {
                    showTitle(2);
                }
            }
        }
    });

    /* ==============================
       RIEMPIMENTO TESTI (SOLO TESTI)
       ============================== */
    columns.forEach(col => {
        const words = col.querySelectorAll(".word-fill");

        tl.to(words, {
            height: "100%",
            stagger: {
                each: 0.1
            },
            duration: 0.02, // ← scatto immediato
            ease: "none"
        });
    });

}





if (document.querySelector("#hero.reputation-driven")) {

    const tlHero = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero.reputation-driven",
            start: "top top",
            end: "+=150%",   // scroll totale
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeave: () => {
                initSentenceAnimation();
            }
        }
    });

    // FADE VELOCE NELLA PRIMA PARTE DELLO SCROLL
    tlHero
        .to(".subtitle-1", { opacity: 0, duration: 0.05 })
        .to(".subtitle-2", { opacity: 1, duration: 0.01 }, "<")
        .to({}, { duration: 0.8 });
}



document.addEventListener('DOMContentLoaded', () => {

    const items = document.querySelectorAll(
        '.elenco-libri .nectar-post-grid-item[data-has-img="true"]'
    );

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    const ease = 0.12;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX + 30;
        mouseY = e.clientY + 30;
    });

    function animate() {
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        const active = document.querySelector(
            '.elenco-libri .nectar-post-grid-item.is-hovered .nectar-post-grid-item-bg'
        );

        if (active) {
            active.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    items.forEach(item => {

        const bg = item.querySelector('.nectar-post-grid-item-bg');
        if (!bg || !bg.querySelector('img')) return;

        item.addEventListener('mouseenter', () => {
            // 🔥 POSIZIONE IMMEDIATA (no interpolazione)
            currentX = mouseX;
            currentY = mouseY;

            bg.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

            item.classList.add('is-hovered');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('is-hovered');
        });

    });

    document.querySelectorAll('.nectar-post-grid-link').forEach(link => {
        link.removeAttribute('href');
        link.style.pointerEvents = 'none';
    });

});























document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".hero-tags-container");
    if (!container) return;

    const tags = Array.from(container.querySelectorAll(".tag"));

    const padding = 24;
    const maxAttempts = 200;
    const delayBetween = 200; // 0.2s

    const placed = [];

    function isOverlapping(rect) {
        return placed.some(p =>
            !(
                rect.right + padding < p.left ||
                rect.left - padding > p.right ||
                rect.bottom + padding < p.top ||
                rect.top - padding > p.bottom
            )
        );
    }

    function placeTag(tag) {
        const containerRect = container.getBoundingClientRect();
        const rect = tag.getBoundingClientRect();
        const safeMultiplier = window.innerWidth < 1000 ? 0 : 0.1;
        const safeX = window.innerWidth * safeMultiplier;
        const safeY = window.innerHeight * safeMultiplier;
        let attempts = 0;
        let placedRect = null;

        while (attempts < maxAttempts) {
            const minX = safeX;
            const maxX = containerRect.width - rect.width - safeX;
            const minY = safeY;
            const maxY = containerRect.height - rect.height - safeY;

            const x = minX + Math.random() * (maxX - minX);
            const y = minY + Math.random() * (maxY - minY);

            const candidate = {
                left: x,
                top: y,
                right: x + rect.width,
                bottom: y + rect.height
            };

            if (!isOverlapping(candidate)) {
                placedRect = candidate;
                break;
            }

            attempts++;
        }

        if (!placedRect) {
            console.warn("Tag non posizionata: spazio insufficiente", tag);
            return;
        }

        placed.push(placedRect);

        tag.style.left = `${placedRect.left}px`;
        tag.style.top = `${placedRect.top}px`;

        requestAnimationFrame(() => {
            tag.classList.add("active");
        });
    }

    tags.forEach((tag, index) => {
        setTimeout(() => {
            placeTag(tag);
        }, index * delayBetween);
    });
});







const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const svg = entry.target;
        const instance = svg._stringImpulse;

        if (instance && !instance.autoplayed) {
            instance.autoplay(2);
            instance.autoplayed = true;
        }

        observer.unobserve(svg);
    });
}, {
    threshold: 0.35
});


(() => {
    const svgs = Array.from(document.querySelectorAll('svg[string="impulse"]'));
    if (!svgs.length) return;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    function attrNum(el, name, fallback) {
        const v = parseFloat(el.getAttribute(name));
        return Number.isFinite(v) ? v : fallback;
    }
    function attrBool(el, name, fallback) {
        const v = (el.getAttribute(name) ?? "").toLowerCase().trim();
        if (!v) return fallback;
        return v === "true" || v === "1" || v === "yes";
    }

    class StringImpulse {
        constructor(svg) {
            this.svg = svg;
            this.path = svg.querySelector("path");
            if (!this.path) return;

            // Tunables (nomi compatibili coi tuoi attributi)
            this.strength = attrNum(svg, "string-position-strength", 2.0); // energia input
            this.tension = attrNum(svg, "string-position-tension", 0.82);  // ritorno
            this.friction = attrNum(svg, "string-position-friction", 0.18); // smorzamento (più alto = più “morto”)
            this.continuous = attrBool(svg, "string-continuous-push", true);

            // Geometria “normalizzata” 0..1
            this.y0 = 0.5;
            this.n = 22;                 // punti della corda (più = più morbida)
            this.influence = 0.18;       // raggio d'influenza in unità 0..1
            this.maxDisp = 0.5;         // limite curvatura (anti “curva troppo”)

            this.p = new Array(this.n).fill(0).map((_, i) => ({
                x: i / (this.n - 1),
                y: this.y0,
                vy: 0
            }));

            // input
            this.pointer = { x: 0.5, y: 0.5, vx: 0, vy: 0, inside: false };
            this._lastPointer = null;

            // bind
            this._onMove = this._onMove.bind(this);
            this._onEnter = this._onEnter.bind(this);
            this._onLeave = this._onLeave.bind(this);
            this._tick = this._tick.bind(this);

            // events
            svg.addEventListener("pointermove", this._onMove, { passive: true });
            svg.addEventListener("pointerenter", this._onEnter, { passive: true });
            svg.addEventListener("pointerleave", this._onLeave, { passive: true });

            // init path
            this._render();
            this._raf = requestAnimationFrame(this._tick);
            svg.setAttribute("string-inited", "");

            this.autoplayed = false;
            this._autoplayTween = null;

            svg._stringImpulse = this;
            observer.observe(svg);

        }

        _svgCoords(e) {
            const r = this.svg.getBoundingClientRect();
            const nx = clamp((e.clientX - r.left) / r.width, 0, 1);
            const ny = clamp((e.clientY - r.top) / r.height, 0, 1);
            return { x: nx, y: ny };
        }

        _onEnter() { this.pointer.inside = true; this._lastPointer = null; }
        _onLeave() { this.pointer.inside = false; this._lastPointer = null; }

        _onMove(e) {
            const now = performance.now();
            const pt = this._svgCoords(e);

            if (this._lastPointer) {
                const dt = Math.max(16, now - this._lastPointer.t); // clamp dt
                const dx = pt.x - this._lastPointer.x;
                const dy = pt.y - this._lastPointer.y;
                // velocità “normalizzata”
                this.pointer.vx = dx / dt;
                this.pointer.vy = dy / dt;
            }

            this.pointer.x = pt.x;
            this.pointer.y = pt.y;
            this._lastPointer = { x: pt.x, y: pt.y, t: now };

            // impulso “one-shot” + continuo
            this._applyImpulse(true);
        }

        _applyImpulse(fromEvent) {
            if (!this.pointer.inside && this.continuous) return;

            const { x: mx, y: my, vx, vy } = this.pointer;
            // energia dall’intensità del movimento (bidirezionale, naturale)
            const speed = Math.sqrt(vx * vx + vy * vy);
            const impulse = clamp(speed * this.strength * 60, 0, 3.5); // scale

            // direzione verticale: segue il mouse (su/giù) ma limitata
            const targetY = clamp(my, 0, 1);
            const dir = clamp((targetY - this.y0) / 0.5, -1, 1);

            // applico ai punti vicini lungo x (gauss/triangular falloff)
            for (let i = 1; i < this.n - 1; i++) {
                const pt = this.p[i];
                const dx = Math.abs(pt.x - mx);
                if (dx > this.influence) continue;

                const w = 1 - dx / this.influence;            // 0..1
                const shaped = w * w * (3 - 2 * w);           // smoothstep
                // impulso: “pizzico” + un po’ di attrazione verso mouse
                pt.vy += dir * impulse * shaped * 0.012;
                pt.vy += (targetY - pt.y) * shaped * 0.35 * (fromEvent ? 1 : 0.6);
            }
        }

        _stepPhysics() {

            if (!this.pointer.inside || Math.abs(this.pointer.vy) < 0.0005) {
                for (let i = 1; i < this.n - 1; i++) {
                    this.p[i].vy *= 0.8;
                }
            }
            // opzionale spinta continua (se vuoi “viva” anche con mouse fermo)
            if (this.continuous && this.pointer.inside) this._applyImpulse(false);

            const fr = clamp(this.friction, 0.0, 0.35);
            const tn = clamp(this.tension, 0.0, 0.999);

            // fissi gli estremi
            this.p[0].y = this.y0; this.p[0].vy = 0;
            this.p[this.n - 1].y = this.y0; this.p[this.n - 1].vy = 0;

            // integrazione + propagazione “corda”
            for (let i = 1; i < this.n - 1; i++) {
                const pt = this.p[i];

                // ritorno verso baseline
                const spring = (this.y0 - pt.y) * (1 - tn) * 0.85;

                // accoppio con vicini (propagazione)
                const left = this.p[i - 1], right = this.p[i + 1];
                const neighbor = ((left.y + right.y) * 0.5 - pt.y) * 0.22;

                pt.vy += (spring + neighbor) * 0.7;

                // damping
                pt.vy *= (1 - fr);

                pt.y += pt.vy;

                // clamp curvatura (anti “curva troppo”)
                pt.y = clamp(pt.y, this.y0 - this.maxDisp, this.y0 + this.maxDisp);
            }
        }

        _render() {
            // Cubic segments in 0..1 space, come nel tuo esempio
            // (C0..Ck) con controlli basati su punti intermedi
            const pts = this.p;
            let d = `M ${pts[0].x} ${pts[0].y}`;

            // segmento cubico ogni 2 punti per avere forma “strumento”
            for (let i = 0; i < pts.length - 1; i++) {
                const a = pts[i];
                const b = pts[i + 1];
                const dx = (b.x - a.x);

                // controlli: un po’ “tirati” per avere curva pulita
                const c1x = a.x + dx * 0.45;
                const c2x = a.x + dx * 0.55;
                const c1y = a.y;
                const c2y = b.y;

                d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${b.x} ${b.y}`;
            }

            this.path.setAttribute("d", d);
        }

        _tick() {
            this._stepPhysics();
            this._render();
            this._raf = requestAnimationFrame(this._tick);
        }

        autoplay(times = 3) {
            if (this._autoplayTween) return;

            this.pointer.inside = true;
            this.pointer.x = 0.5;

            const obj = { y: this.y0 };
            let count = 0;

            this._autoplayTween = gsap.timeline({
                onComplete: () => {
                    this.pointer.inside = false;
                    this.pointer.vy = 0;
                    this._autoplayTween = null;
                }
            });

            const pluck = () => {
                this._autoplayTween
                    .to(obj, {
                        y: this.y0 + 0.32,
                        duration: 0.35,
                        ease: "power3.out",
                        onUpdate: () => {
                            this.pointer.y = obj.y;
                            this.pointer.vy = 0.08;
                            this._applyImpulse(false);
                        }
                    })
                    .to(obj, {
                        y: this.y0 - 0.22,
                        duration: 0.25,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            this.pointer.y = obj.y;
                            this.pointer.vy = -0.06;
                            this._applyImpulse(false);
                        }
                    });
            };

            for (let i = 0; i < times; i++) {
                pluck();

                // micro pausa tra un colpo e l'altro
                if (i < times - 1) {
                    this._autoplayTween.to({}, { duration: 0.25 });
                }
            }
        }


    }

    svgs.forEach(svg => new StringImpulse(svg));
})();

// Animazione intro HP
window.addEventListener('load', function () {
    if (!document.body.classList.contains('home')) return;

    document.body.classList.add('intro-lock');

    const overlay = document.getElementById('intro-overlay');
    const video = document.getElementById('intro-video');
    const header = document.getElementById('header-outer');

    const introDuration = 2500;
    const exitDuration = 2200;
    const exitDurationHeader = 900;
    const textExtraDelay = 1000; // ⏱ +1 secondo testo

    setTimeout(() => {
        overlay.classList.add('exit');

        // ⬇️ TESTO / HEADER resta visibile più a lungo
        setTimeout(() => {
            if (header) {
                header.classList.add('intro-ended');
            }
        }, exitDurationHeader + textExtraDelay);

        // ⬇️ Fine animazione overlay
        setTimeout(() => {
            overlay.remove();

            document.documentElement.classList.remove('intro-lock');
            document.body.classList.remove('intro-lock');

            if (header) {
                header.classList.add('intro-ended');
            }

            document.documentElement.classList.add('intro-finished');

        }, exitDuration);

    }, introDuration);
});
