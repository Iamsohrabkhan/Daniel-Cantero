// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

CustomEase.create("primary", "0.8,0.2,0,1");
CustomEase.create("secondary", "0.6, 0.4, 0, 1");
CustomEase.create("tertially", "0.6, 0.2, 0, 1");
const detailPage = document.querySelector(".archieve_detail_image_wrapper");
const lenis = new Lenis({
  infinite: detailPage && innerWidth >= 478 ? true : false,
  syncTouch: detailPage && innerWidth >= 478 ? true : false,
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
  parallaxImagesAnimation();
});

gsap.ticker.lagSmoothing(0);
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
  navLogoAnimation();
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
  workDetailAnimation();
  archieveDetail();

  studioAnimations();

  // error

  ErrorPageAnimations();
});
