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
            y: isDesktop ? (index === 0 ? 400 : index === 1 ? 500 : 600) : 300, // fixed value for all indexes on mobile
            willChange: "transform",
          });

          gsap.to(card, {
            rotateY: 0,
            y: isDesktop ? index * 30 : 0,
            scrollTrigger: {
              trigger: card,
              scrub: 1,
              start: "top bottom",
              end: "top center",
              // markers: true,
            },
          });
        });
      },
    );
  }
};
