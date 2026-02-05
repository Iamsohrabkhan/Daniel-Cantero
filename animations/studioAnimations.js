 // studio animations
  const studioAnimations = () => {
    const statsSection = document.querySelector(".stats_section");
    const cardsNumbers = gsap.utils.toArray(".stats_number");
    const cards = gsap.utils.toArray(".stats_card");
    const studioAbout = gsap.utils.toArray(".studio_about_section");

    if (!statsSection) return;

    // Fade cards and numbers
    cards.forEach((card, i) => {
      gsap.effects.fade(card);
      gsap.effects["slide-up"](studioAbout[i], {
        y: 30,
      });
    });

    // Animate each stats number separately
    cardsNumbers.forEach((number) => {
      const split = SplitText.create(number, {
        type: "lines,chars",
        charsClass: "stats_chars",
        linesClass: "stats_lines",
      });

      gsap.fromTo(
        split.chars,
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          stagger: 0.05,
          duration: 1,

          ease: "secondary",
          scrollTrigger: {
            trigger: number, // trigger per stat
            start: "top 90%",
            end: "bottom top",
            // markers: true,
          },
        },
      );
    });
  };
