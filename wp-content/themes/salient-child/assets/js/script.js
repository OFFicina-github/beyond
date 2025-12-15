
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
        if(document.querySelector('.experience-intro'))
        document
            .querySelector('.experience-intro')
            .classList.add('first-animation');
    }, 1000);

    setTimeout(() => {
        if(document.querySelector('.experience-intro'))
        document
            .querySelector('.experience-intro')
            .classList.add('second-animation');
    }, 2500);


    setTimeout(() => {
        if(document.querySelector('.experience-intro'))
        document
            .querySelector('.experience-intro')
            .classList.add('is-ready');
    }, 3000);
});

gsap.registerPlugin(ScrollTrigger);

/* POSIZIONI INIZIALI */
gsap.set(".word-metodo", { x: -200 });
gsap.set(".word-consapevolezza", { x: 40 });
gsap.set(".word-immagine", { x: -80 });

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
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".sentence-block",
      start: "top 75%",
      end: "top 55%",
      scrub: true,
      snap: 1
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
