// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

CustomEase.create("primary", "0.8,0.2,0,1");
CustomEase.create("secondary", "0.6, 0.4, 0, 1");
CustomEase.create("tertially", "0.6, 0.2, 0, 1");
const detailPage = document.querySelector(".archieve_detail_image_wrapper");
const LenisClass = Lenis; // plain global, no window prefix

const shouldEnable = detailPage && window.innerWidth >= 478;

lenis = new LenisClass({
  infinite: shouldEnable,
  syncTouch: shouldEnable,
});

lenis.on("scroll", ScrollTrigger.update);

// on resize, just update options directly
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const shouldEnable = detailPage && window.innerWidth >= 478;
    lenis.options.infinite = shouldEnable;
    lenis.options.syncTouch = shouldEnable;
  }, 150);
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // always uses latest lenis instance via closure
});

gsap.ticker.lagSmoothing(0);

const domLoaded = () => {
  // universal animations
  fadeInAnimation();
  slideIn();
  slideLeft();

  // hero animations
  // gsap.ticker.add(() => parallaxImagesAnimation());
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
};

if (document.readyState === "complete") {
  // parallaxImagesAnimation();
  heroAnimation();
  pageHeroLoadAnimations();
  pageHeroAnimations();
  domLoaded();
} else {
  window.addEventListener("load", () => {
    heroAnimation();
    pageHeroAnimations();
    pageHeroLoadAnimations();
    domLoaded();
  });
}

document.addEventListener("DOMContentLoaded", () => {});
