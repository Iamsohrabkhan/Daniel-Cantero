// track last known mouse position globally
let lastPointerX = window.innerWidth / 2;
let lastPointerY = window.innerHeight / 2;

window.addEventListener("mousemove", (e) => {
  lastPointerX = e.clientX;
  lastPointerY = e.clientY;
});

const hoverListAnimations = () => {
  // disable hover logic on touch / mobile devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const imageFollowHoverAnimationsContainer = document.querySelectorAll(
    ".image_follow_hover_animations",
  );

  const serviceWrappers = document.querySelectorAll(".service_wrapper");
  if (!serviceWrappers.length) return;

  serviceWrappers.forEach((servicewrapper, index) => {
    const listGridWrapper =
      servicewrapper.querySelectorAll(".list_grid_wrapper");

    const mouseFollowImage =
      servicewrapper.querySelectorAll(".mouse_follow_image");

    const followContainer =
      imageFollowHoverAnimationsContainer[index];

    if (!followContainer || !mouseFollowImage.length) return;

    // quick setters for smooth follow
    const xTo = gsap.quickTo(mouseFollowImage, "x", {
      duration: 0.8,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(mouseFollowImage, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    // enter wrapper
    servicewrapper.addEventListener("mouseenter", () => {
      // place image immediately at cursor position
      gsap.set(mouseFollowImage, {
        x: lastPointerX + 20,
        y: lastPointerY - 150,
      });

      mouseFollowImage.forEach((c) => {
        c.classList.remove("clip-transition");
      });

      gsap.to(mouseFollowImage, {
        scale: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    });

    // leave wrapper
    servicewrapper.addEventListener("mouseleave", () => {
      gsap.to(mouseFollowImage, {
        scale: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    });

    // follow cursor
    followContainer.addEventListener("mousemove", (e) => {
      if (e.buttons !== 0) return;

      xTo(e.clientX + 20);
      yTo(e.clientY - 150);
    });

    // hover list logic
    listGridWrapper.forEach((curr, hoverIndex) => {
      curr.addEventListener("mouseenter", () => {
        setTimeout(() => {
          mouseFollowImage.forEach((c) => {
            c.classList.add("clip-transition");
          });
        }, 300);

        mouseFollowImage.forEach((img, imgIndex) => {
          // first item: reset state
          if (hoverIndex === 0) {
            img.classList.remove("clip-0");
            if (imgIndex !== 0) img.classList.add("clip-50");
            return;
          }

          // progressive reveal
          if (imgIndex >= 1 && imgIndex <= hoverIndex) {
            img.classList.add("clip-0");
            img.classList.remove("clip-50");
          } else {
            img.classList.remove("clip-0");
            if (imgIndex !== 0) img.classList.add("clip-50");
          }
        });
      });
    });
  });
};
