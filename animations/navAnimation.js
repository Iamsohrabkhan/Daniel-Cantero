const navAnimations = () => {
  const menuButton = document.querySelector(".menu_button");
  if (!menuButton) return;

  // Set initial states
  gsap.set(".navbar_menu_lists", {
    clipPath: "inset(0% 0% 100% 0%)",
    willChange: "clip-path",
  });
  gsap.set(".menu_list", { yPercent: -100 });
  gsap.set(".menu_text", { yPercent: 0 });

  // Create timeline
  const tl = gsap.timeline({ paused: true });

  // Animate navbar container
  tl.to(
    ".navbar_menu_lists",
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "tertially",
    },
    0,
  );

  // Animate menu text
  tl.to(
    ".menu_text",
    {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    },
    0,
  );

  // Animate menu items with stagger
  tl.to(
    ".menu_list",
    {
      yPercent: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power4.out",
    },
    0.5,
  ); // delay for menu items

  // Handle button click
  menuButton.addEventListener("click", () => {
    if (tl.reversed() || tl.progress() === 0) {
      tl.play();
      lenis.stop();
    } else {
      tl.reverse();
      lenis.start();
    }
  });
};

const logoAnimation = () => {
  const logo = document.querySelector(".logo");
  const word2 = logo.querySelectorAll("a .logo_word-mask")[1];
  // word2.style.transition = "transform 0.3s";
  if (!logo) return;

  const wordWrapper = logo.querySelectorAll(".logo_word-mask");
  if (!wordWrapper.length) return;

  const toggleLogoState = (state) => {
    if (state === "initial") {
      wordWrapper.forEach((word) => word.classList.remove("reveal"));
      word2.style.transform = "translateX(0px)";
    } else if (state === "reveal") {
      wordWrapper.forEach((word) => word.classList.add("reveal"));
      word2.style.transform = "translateX(2px)";
    } else {
      console.warn("Unknown state:", state);
    }
  };

  return toggleLogoState;
};

const navLogoAnimation = () => {
  if (document.querySelector(".home")) {
    const toggleLogoState = logoAnimation();
    if (!toggleLogoState) return;

    ScrollTrigger.create({
      trigger: ".about_section",
      start: "top top",
      end: "bottom bottom",
      // markers: true,
      onEnter: () => {
        toggleLogoState("reveal");
      },
      onLeaveBack: () => {
        toggleLogoState("initial");
      },
    });
  }
};
