
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




// document.addEventListener("DOMContentLoaded", () => {
//     setTimeout(() => {
//         const scribbles = document.querySelectorAll(".scribble");
//         if (!scribbles.length) return;

//         const observer = new IntersectionObserver(
//             (entries, obs) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("started");
//                         obs.unobserve(entry.target); // 🔥 una sola volta
//                     }
//                 });
//             },
//             {
//                 root: null,          // viewport
//                 threshold: 0.3       // % visibile prima di attivare
//             }
//         );

//         scribbles.forEach(el => observer.observe(el));
//     }, 1000);
// });



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