// HERO ANIMATION

const heroAnimation = () => {
  const hero = document.querySelector(".hero__container");
  const heroList = gsap.utils.toArray(".hero_list_item");
  const heroHeading = document.querySelector(".hero_heading");

  if (hero) {
    // Wait for fonts to load before splitting text
    document.fonts.ready.then(() => {
      // Create splits after fonts are loaded
      let split = SplitText.create(".hero_heading", {
        type: "chars, lines",
        mask: "lines",
        autoSplit: true,
        charsClass: "hero_char",
        linesClass: "hero_line++",
      });
      heroHeading.style.whiteSpace = "nowrap";

      let heroDescriptionText = SplitText.create(".hero_description", {
        type: "lines",
        linesClass: "hero_description_line",
        autoSplit: true,
      });

      // Create timeline AFTER splits are complete
      const tl = gsap.timeline();

      // Initial state
      tl.set([".hero_heading", ".hero_description"], {
        opacity: 1,
      });
      tl.set(".hero_line", {
        perspective: 1200,
      });
      tl.set(".hero_char", {
        transformStyle: "preserve-3d",
      });
      tl.fromTo(
        ".hero_line1 .hero_char",
        {
          y: "-400%",
          rotateX: -0,
        },
        {
          y: "0%",
          rotateX: 0,
          duration: 1.2,
          stagger: 0.06,
          ease: "secondary",
        },
      );

      tl.fromTo(
        ".hero_line2 .hero_char",
        { y: "-400%", rotateX: -0 },
        {
          y: "0%",
          rotateX: 0,
          duration: 1.2,
          stagger: {
            each: 0.05,
            ease: "secondary",
          },
          ease: "secondary",
        },
        "<",
      );

      tl.fromTo(
        ".overlay",
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 1.2,
          ease: "secondary",
        },
        "<0.4",
      );

      tl.fromTo(
        ".hero_description_line",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "secondary",
        },
        "+0.5",
      );

      tl.fromTo(
        heroList,
        {
          y: "100%",
        },
        {
          y: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
        },
        "<",
      );

      const aboutGrid = gsap.utils.toArray([
        ".about_grid .about_heading",
        ".about_grid .about_description",
        ".about_grid .btn",
      ]);

      aboutGrid.forEach((curr, i) => {
        gsap.effects.fade(curr);
      });
    });
  }
};
