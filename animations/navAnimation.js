const navAnimations = () => {
  const menuButton = document.querySelector(".menu_button");
  if (menuButton) {
    const tl = gsap.timeline({
      paused: true,
      reversed: true,
    });

    gsap.set(".menu_lists", {
      clipPath: "inset(0% 0% 100% 0%)",
      willChange: "clipPath",
    });
    gsap.set(".menu_list", {
      yPercent: -100,
    });

    tl.to(".menu_lists", {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.9,
      ease: "power3.out",
    });

    tl.to(
      ".menu_text",
      {
        yPercent: -100,
      },
      0,
    );
    tl.to(
      ".menu_list",
      {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.3,
      },
      0,
    );
    menuButton.addEventListener("click", () => {
      if (tl.reversed()) {
        tl.play();
        lenis.stop();
      } else {
        tl.reverse();
        lenis.start();
      }
    });
  }
};
