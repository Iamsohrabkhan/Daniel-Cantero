gsap.registerPlugin(ScrollTrigger, CustomEase);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

document.addEventListener("DOMContentLoaded", () => {
  navAnimations();
  hoverListAnimations();
  archieveMarqueeAnimations();
  teamAnimation();
});


