const processAnimation = () => {
  const cards = gsap.utils.toArray(".process_card");
  if (cards.length) {
    cards.forEach((card, index) => {
      gsap.set(card, {
        rotateY: -30,
        transformOrigin: "left top",
        y: index === 0 ? 200 : index === 1 ? 350 :450,
        willChange: "transform",
      });

      gsap.to(card, {
        rotateY: 0,
        y: index * 30,
        scrollTrigger: {
          trigger: card,
          scrub: 1,
          top: "top bottom",
          end: "top 40%",
        },
      });
    });
  }
};
