const workDetailAnimation = () => {
  const hero = document.querySelector(".work_detail_hero");
  const list = gsap.utils.toArray([
    ".work_detail_hero_list_text",
    ".work_detail_hero_footer",
  ]);
  const tl = gsap.timeline();

  if (hero) {
    const mainHeading = hero.querySelector(".work_detail_main_heading");
    const grid= gsap.utils.toArray(".work_detail_grid_3")
    gsap.effects["slide-up"](grid)
    tl.set(mainHeading, {
      opacity: 1,
    });
    tl.add(gsap.effects.heroHeadingReveal(mainHeading));
    tl.fromTo(
      list,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "primary",
      },
      -0.5,
    );
  }
};
