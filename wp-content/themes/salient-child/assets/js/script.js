
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
    setTimeout(() => {
        document.querySelectorAll(".scribble").forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                once: true,          // 🔥 una sola volta
                onEnter: () => {
                    requestAnimationFrame(() => {
                        el.offsetWidth;
                        el.classList.add("started");
                    });
                }
            });
        });
    }, 1000);
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
    }, 1000);

    setTimeout(() => {
        if (document.querySelector('.experience-intro'))
            document
                .querySelector('.experience-intro')
                .classList.add('second-animation');
    }, 2500);


    setTimeout(() => {
        if (document.querySelector('.experience-intro'))
            document
                .querySelector('.experience-intro')
                .classList.add('is-ready');
    }, 3000);
});

if (document.querySelector('.word-metodo')) {
    /* POSIZIONI INIZIALI */
    gsap.set(".word-metodo", { x: -400, y: 50 });
    gsap.set(".word-consapevolezza", { x: 40, y: 10 });
    gsap.set(".word-immagine", { x: -80, y: 80 });

    /* helper preciso centro-centro */
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
            ease: "none", // IMPORTANTISSIMO per scroll fluido
            scrollTrigger: {
                trigger: ".sentence-block",
                start: "top 100%",
                end: "top 55%",   // ⬅ molto più spazio
                scrub: 1,         // ⬅ smoothing
                snap: false,
                onUpdate: self => {
                    if (self.progress > 0.8) {
                        document
                            .querySelector(".sentence-block")
                            .classList.add("is-near");
                    } else {
                        document
                            .querySelector(".sentence-block")
                            .classList.remove("is-near");
                    }
                }       // ⬅ togli snap per naturalezza
            }
        });

    }

    /* highlight slot */
    ScrollTrigger.create({
        trigger: ".sentence-block",
        start: "top 75%",
        onEnter: () =>
            document
                .querySelector(".sentence-block")
                .classList.add("is-active")
    });

    /* associazioni */
    moveWordToSlot(".word-metodo", ".slot-metodo");
    moveWordToSlot(".word-consapevolezza", ".slot-consapevolezza");
    moveWordToSlot(".word-immagine", ".slot-immagine");
}

document.addEventListener("DOMContentLoaded", () => {
    // desktop only

    const bubbles = Array.from(
        document.querySelectorAll(".bubble-1, .bubble-2, .bubble-3")
    );

    const safeX = window.innerWidth * 0.1;  // 10vw
    const safeY = window.innerHeight * 0.1; // 10vh
    const padding = 24; // spazio minimo tra bolle
    const maxAttempts = 100;

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

    bubbles.forEach(bubble => {
        const rect = bubble.getBoundingClientRect();
        let attempts = 0;
        let placedRect;

        do {
            const minX = safeX;
            const maxX = window.innerWidth - rect.width - safeX;
            const minY = safeY;
            const maxY = window.innerHeight - rect.height - safeY;

            const x = minX + Math.random() * (maxX - minX);
            const y = minY + Math.random() * (maxY - minY);

            placedRect = {
                left: x,
                top: y,
                right: x + rect.width,
                bottom: y + rect.height
            };

            attempts++;
        } while (isOverlapping(placedRect) && attempts < maxAttempts);

        placed.push(placedRect);

        bubble.style.left = `${placedRect.left}px`;
        bubble.style.top = `${placedRect.top}px`;
    });

    setTimeout(() => {
        bubbles.forEach(bubble => bubble.classList.add("active"));
    }, 1500);
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
            stagger: 0.1,
            ease: "none"
        });
    });

}
