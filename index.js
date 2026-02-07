// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

CustomEase.create("primary", "0.8,0.2,0,1");
CustomEase.create("secondary", "M0,0 C0.6,0.4 0,1 1,1");
const detailPage = document.querySelector(".archieve_detail_image_wrapper");
const lenis = new Lenis({
  infinite: detailPage && innerWidth >= 478 ? true : false,
});
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

  // archieve page grid animations
  archieveHoverAnimations();

  // work section animations
  initMarqueeAnimations();
  workDetailAnimation();
  archieveDetail();

  studioAnimations();

  // error

  ErrorPageAnimations();
});
