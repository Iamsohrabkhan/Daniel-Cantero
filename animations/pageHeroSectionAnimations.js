const pageHeroAnimations = () => {
  const hero = document.querySelectorAll(".work_hero_section");

  const isAnimate = document.querySelectorAll("[is-animate='no']");
  if (!isAnimate.length) {
    if (hero.length) {
      hero.forEach((curr) => {
        gsap.to(curr, {
          scale: 0.9,
          y: -100,
          opacity: 0.5,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: () => {
              return `${innerHeight}px top`;
            },
            scrub: 1,
          },
        });
      });
    }
  }
  const contactPageWrapper = document.querySelector(".contact_page_wrapper");
  const workHeroParagraph = document.querySelector(".work_hero_paragraph");
  if (contactPageWrapper) {
    lenis.on("scroll", (e) => {
      workHeroParagraph.style.setProperty("--y", `${-e.animatedScroll}px`);
    });
  }
};