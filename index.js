// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
gsap.config({ nullTargetWarn: false, });
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

document.addEventListener("DOMContentLoaded", () => {
  (function () {
    console.clear();

    const line = "==============================================";

    console.log(`%c${line}`, "color: #888;");
    console.log(
      "%c🚀 Website developed by Sohrab Khan",
      "color: #111; font-size: 16px; font-weight: 700;",
    );
    console.log(
      "%c🌐 https://sohrabkhan.dev/",
      "color: #4CAF50; font-size: 14px; font-weight: 600;",
    );
    console.log(`%c${line}`, "color: #888;");
  })();

  (function () {
    const comment = document.createComment(`
==================================================
🚀 Website developed by Sohrab Khan
🌐 https://sohrabkhan.dev/

Frontend Developer | Animation Specialist
Creating modern, high-quality web animations and interactive experiences.

For collaboration or project inquiries,
feel free to get in touch.
==================================================
  `);

    document.documentElement.prepend(comment);
  })();
});
