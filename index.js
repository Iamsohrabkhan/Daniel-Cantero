gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// =========================
// CUSTOM EASING
// =========================
CustomEase.create("primary", "0.8,0.2,0,1");
CustomEase.create("secondary", "0.6, 0.4, 0, 1");
CustomEase.create("tertially", "0.6, 0.2, 0, 1");

// =========================
// LENIS SETUP
// =========================
const detailPage = document.querySelector(".archieve_detail_image_wrapper");
const LenisClass = Lenis;

const shouldEnable = detailPage && window.innerWidth >= 478;

const lenis = new LenisClass({
  infinite: shouldEnable,
  syncTouch: shouldEnable,
});

lenis.on("scroll", ScrollTrigger.update);

// resize handling
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const shouldEnable = detailPage && window.innerWidth >= 478;
    lenis.options.infinite = shouldEnable;
    lenis.options.syncTouch = shouldEnable;
  }, 150);
});

// GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// =========================
// INIT FUNCTIONS
// =========================
function initAnimations() {
  // universal animations
  fadeInAnimation();
  slideIn();
  slideLeft();

  // navigation
  navAnimations();
  navLogoAnimation();
  sectionHeaderAnimation();
  hoverListAnimations();

  // sections
  projectAnimation();
  archieveMarqueeAnimations();
  teamAnimation();
  faqAnimation();
  processAnimation();
  priceAnimation();
  footerAnimations();

  // archive
  archieveHoverAnimations();

  // pages
  workDetailAnimation();
  archieveDetail();
  studioAnimations();

  // error
  ErrorPageAnimations();

  // hero
  heroAnimation();
  pageHeroLoadAnimations();
  pageHeroAnimations();
}

// =========================
// BOOTSTRAP (NO DOMContentLoaded)
// =========================
const isReady =
  document.readyState === "interactive" || document.readyState === "complete";

if (isReady) {
  initAnimations();
} else {
  window.addEventListener("load", initAnimations, { once: true });
}