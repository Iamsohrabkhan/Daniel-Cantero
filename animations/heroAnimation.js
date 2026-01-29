const heroAnimation = () => {
  const aboutGrid = gsap.utils.toArray(".about_grid");
  aboutGrid.forEach((curr, i) => {
    gsap.effects.fade(curr);
    i === 0 ? gsap.effects.fade(curr.nextSibling) : null;
  });
};
