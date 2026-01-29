gsap.registerPlugin(ScrollTrigger, CustomEase);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

CustomEase.create("primary", "0.8,0.2,0,1");
CustomEase.create("secondary", "0.8,0.8,0,1");

document.addEventListener("DOMContentLoaded", () => {
  heroAnimation();
  navAnimations();
  sectionHeaderAnimation();
  hoverListAnimations();
  projectAnimation();
  archieveMarqueeAnimations();
  teamAnimation();
  faqAnimation();
  processAnimation();
  priceAnimation();
});
