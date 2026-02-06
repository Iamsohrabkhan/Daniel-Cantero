const pageHeroAnimations = () => {
  const hero = document.querySelectorAll([
    ".work_hero_section",
    ".work_detail_hero",
  ]);

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

const pageHeroLoadAnimations = () => {
  const hero = document.querySelector(".work_hero_section");
  const fadeInEl = document.querySelectorAll('[data-animate="fadein"]');
  const gridColumnLines = document.querySelectorAll(".grid_column_line");

  if (hero) {
    fadeInEl.forEach((curr, i) => {
      if (i !== 0) {
        gsap.set(curr, {
          opacity: 1,
        });
      }
    });
    const heading = hero.querySelector(".section_hero_heading");
    const paragraph = hero.querySelector(".work_hero_paragraph");
    const tl = gsap.timeline();
    const splitParagraph = SplitText.create(paragraph, {
      type: "chars, lines",
      mask: "lines",
      linesClass: "section_hero_line",
      autoSplit: true,
      charsClass: "section_paragraph_char",
    });

    if (heading || hero) {
      tl.set([heading, ".work_hero_paragraph", ".hero_footer_text"], {
        opacity: 1,
      });
      tl.add(gsap.effects.heroHeadingReveal(heading));
      tl.fromTo(
        splitParagraph.lines,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.4,
        },
        0.5,
      );
      tl.fromTo(
        ".hero_footer_text",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.4,
        },
        0.6,
      );
      if (fadeInEl) {
        tl.add(gsap.effects.fade(fadeInEl[0]));
      }
      if (gridColumnLines.length) {
        tl.fromTo(
          gridColumnLines,
          {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "0% 0%",
          },
          {
            scaleY: 1,
            opacity: 0.1,
            duration: 1.2,
            stagger: 0.04,
          },
        );
      }
    }
  }
};
