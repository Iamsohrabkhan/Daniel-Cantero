const sectionHeaderAnimation = () => {
  const sectionHeader = gsap.utils.toArray(".section_header");
  sectionHeader.forEach((curr) => {
    const subHeading = curr.querySelector(".section_sub_heading");
    const paragraph = curr.querySelector(".section_paragraph");
    gsap.effects.fade([subHeading, paragraph]);
  });
};

const priceAnimation = () => {
  const elements = gsap.utils.toArray(".price_list, .price_paragraph");
  const priceButton = gsap.utils.toArray(".price_number, .price_button");
  

  priceButton.forEach((curr)=>{
    gsap.effects.fade(curr)
  })


  elements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "primary",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  });
};
