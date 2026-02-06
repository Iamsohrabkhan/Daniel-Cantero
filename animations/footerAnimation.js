const footerAnimations = () => {
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
  const list = gsap.utils.toArray([
    ".footer_list",
    ".footer_cta",
    ".btn",
    // ".footer_copyright > *",
  ]);
  

  tl.fromTo(
    ".footer_line1 .footer_char",
    {
      y: "-3em",
      rotateX: -24,
    },
    {
      y: "0em",
      rotateX: 0,
      ease: "secondary",
      duration: 1.2,
      stagger: 0.05,
    },
  );
  tl.fromTo(
    ".footer_line2 .footer_char",
    {
      y: "-3em",
      rotateX: -24,
    },
    {
      y: "0em",
      rotateX: 0,
      ease: "secondary",
      duration: 1.2,
      stagger: 0.05,
    },
    0.2,
  );
  tl.add(gsap.effects.fade(list),0);
  // tl.add(gsap.effects.fade(copyrightText));

  // ===== Footer background reveal =====

  if (footerBg) {
    const isDesktop = window.innerWidth > 478;
    !isDesktop && footerBg.classList.add("reveal");

    ScrollTrigger.create({
      trigger: footerBg,
      start: "top center",
      end: "bottom top",
      onEnter: () => {
        tl.play();
      },
      onLeaveBack: () => {
        tl.pause(0);
      },
      ...(isDesktop && {
        toggleClass: { targets: footerBg, className: "reveal" },
      }),
    });
  }
};
