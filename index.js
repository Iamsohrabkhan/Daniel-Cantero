gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

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
  pageHeroAnimations();
  initMarqueeAnimations();

  // ===== Footer headings animation =====

  const footerHeading = document.querySelectorAll(".footer_heading");

  const footerBg = document.querySelector(".footer_background");

  const s = SplitText.create(footerHeading, {
    type: "lines, chars",
    mask: "lines",
    linesClass: "footer_line++",
    charsClass: "footer_char",
  });
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(
    ".footer_line1 .footer_char",
    {
      y: "-340%",
      rotateX: -24,
    },
    {
      y: "0%",
      rotateX: 0,
      ease: "secondary",
      duration: 0.8,
      stagger: 0.02,
    },
  );
  tl.fromTo(
    ".footer_line2 .footer_char",
    {
      y: "-340%",
      rotateX: -24,
    },
    {
      y: "0%",
      rotateX: 0,
      ease: "secondary",
      duration: 0.8,
      stagger: 0.02,
    },
    0.2,
  );

  // ===== Footer background reveal =====
  if (footerBg) {
    ScrollTrigger.create({
      trigger: footerBg,
      start: "top center",
      end: "bottom top",
      // markers: true,

      onEnter: () => {
        tl.play();
      },
      onLeaveBack: () => {
        tl.pause(0);
      },
      toggleClass: { targets: footerBg, className: "reveal" },
    });
  }
});
