// HERO ANIMATION

const heroAnimation = () => {
  const hero = document.querySelector(".hero__container");
  const heroList = gsap.utils.toArray(".hero_list_item");
  if (hero) {
    let split = SplitText.create(".hero_heading", {
      type: "chars, lines",
      mask: "lines",
      autoSplit: true,
      charsClass: "hero_char",
      linesClass: "hero_line++",
    });
    let heroDescriptionText = SplitText.create(".hero_description", {
      type: "lines",
      linesClass: "hero_description_line",
    });

    const tl = gsap.timeline();

    // Initial state
    tl.set([".hero_heading", ".hero_description"], {
      opacity: 1,
    });

    tl.fromTo(
      ".hero_line1 .hero_char",
      {
        y: "-310%",
        rotateX: -24,
      },
      {
        y: "0%",
        rotateX: 0,

        duration: 1,
        stagger: 0.06,
        ease: "secondary",
      },
      0,
    );
    tl.fromTo(
      ".hero_line2 .hero_char",
      { y: "-310%", rotateX: -24 },
      {
        y: "0%",
        rotateX: 0,

        duration: 1,
        stagger: 0.06,
        ease: "secondary",
      },
      0,
    );
    tl.fromTo(
      ".overlay",
      {
        autoAlpha: 1,
      },
      {
        autoAlpha: 0,
        duration: 0.4,
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
      "0.5",
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

    const aboutGrid = gsap.utils.toArray(".about_grid");

    aboutGrid.forEach((curr, i) => {
      gsap.effects.fade(curr);

      if (i === 0 && curr.nextElementSibling) {
        gsap.effects.fade(curr.nextElementSibling);
      }
    });

    // WAIT FOR FULL PAGE LOAD (HTML + CSS + IMAGES)
  }
};
