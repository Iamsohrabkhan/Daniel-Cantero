gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

const workAnimations = () => {
  const hero = document.querySelectorAll(".work_hero_section");

  const isAnimate = document.querySelectorAll("[is-animate='no']");
  if (!isAnimate.length) {
    if (hero.length) {
      hero.forEach((curr) => {
        gsap.to(curr, {
          scale: 0.9,
          y: -100,
          opacity: 0.5,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: () => {
              return `${innerHeight}px top`;
            },
            scrub: 1,
          },
        });
      });
    }
  }
};

if (document.readyState === "complete") {
  heroAnimation();
  pageHeroLoadAnimations();
} else {
  window.addEventListener("load", () => {
    heroAnimation();
    pageHeroLoadAnimations();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // universal animations
  fadeInAnimation();
  slideIn();
  slideLeft();

  // hero animations
  navAnimations();
  sectionHeaderAnimation();
  hoverListAnimations();
  projectAnimation();
  archieveMarqueeAnimations();
  teamAnimation();
  faqAnimation();
  processAnimation();
  priceAnimation();

  // work section animations
  workAnimations();

  const contactPageWrapper = document.querySelector(".contact_page_wrapper");
  const workHeroParagraph = document.querySelector(".work_hero_paragraph");
  if (contactPageWrapper) {
    lenis.on("scroll", (e) => {
      workHeroParagraph.style.setProperty("--y", `${-e.animatedScroll}px`);
    });
  }
});

