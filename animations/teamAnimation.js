const teamAnimation = () => {
  const cards = gsap.utils.toArray(".team_card");
  gsap.set(cards, {
    clipPath: "inset(50%)",
  });

  cards.forEach((card) => {
    const personName = card.querySelector(".person_name");
    const personrole = card.querySelector(".person_role");
    gsap.to(card, {
      clipPath: "inset(0%)",
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
      },
    });

  });
  gsap.effects.fade(".person_name");
  gsap.effects.fade(".person_role");
};
