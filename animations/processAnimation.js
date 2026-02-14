const processAnimation = () => {
  const cards = gsap.utils.toArray(".process_card");
  if (cards.length) {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        cards.forEach((card, index) => {
          gsap.set(card, {
            rotateY: -56,
            transformOrigin: "left top",
            y: isDesktop ? (index === 0 ? 500 : index === 1 ? 700 : 700) : 300, // fixed value for all indexes on mobile
            willChange: "transform",
          });

          gsap.to(card, {
            rotateY: 0,
            y: isDesktop ? (index === 0 ? 0 : index === 1 ? 25 : 45) : 0,
            scrollTrigger: {
              trigger: ".process_container",
              scrub: 1,
              start: "top bottom",
              end: "top top",
              // markers: true,
            },
          });
        });
      },
    );

    // reveal image process

    const imageWrapper = gsap.utils.toArray(".process_reveal_image_wrapper");
    imageWrapper.forEach((curr) => {
      gsap.set(curr, {
        clipPath: "inset(90%)",
      });
      gsap.to(curr, {
        clipPath: "inset(0%)",
        ease: "tertially",
        duration: 1,
        scrollTrigger: {
          trigger: curr,
          start: "top 95%",
          end: "bottom top",
          // markers: true,
        },
      });
    });
  }
};
