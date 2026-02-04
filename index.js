gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

CustomEase.create("primary", "0.8,0.2,0,1");
CustomEase.create("secondary", "0.6, 0.4, 0, 1");

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

if (document.readyState === "complete") {
  heroAnimation();
  pageHeroLoadAnimations();
  pageHeroAnimations();
} else {
  window.addEventListener("load", () => {
    heroAnimation();
    pageHeroAnimations();
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

  footerAnimations();

  // work section animations
  initMarqueeAnimations();
  workDetailAnimation();
});
