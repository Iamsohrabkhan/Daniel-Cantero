gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);


const workAnimations = () => {
  const hero = document.querySelectorAll(".work_hero_section");

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
};

if (document.readyState === "complete") {
  heroAnimation();
} else {
  window.addEventListener("load", heroAnimation);
}


document.addEventListener("DOMContentLoaded", () => {
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
});
