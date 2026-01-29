const hoverListAnimations = () => {
  const imageFollowHoverAnimationsContainer = document.querySelectorAll(
    ".image_follow_hover_animations",
  );
  const serviceWrappers = document.querySelectorAll(".service_wrapper");

  const listGridWrapperSlideLeft =
    document.querySelectorAll(".list_grid");

  listGridWrapperSlideLeft.forEach((curr, i) => {
    gsap.effects["slide-left"]([curr,curr.nextSibling], {
      delay: i * 0.04,
    });
  });

  serviceWrappers.forEach((servicewrapper, index) => {
    const listGridWrapper =
      servicewrapper.querySelectorAll(".list_grid_wrapper");

    const mouseFollowImage = servicewrapper.querySelectorAll(
      ".mouse_follow_image",
    );

    const xTo = gsap.quickTo(mouseFollowImage, "x", {
      duration: 0.8,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(mouseFollowImage, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    servicewrapper.addEventListener("mouseenter", () => {
      mouseFollowImage.forEach((c) => {
        c.classList.remove("clip-transition");
      });

      gsap.to(mouseFollowImage, {
        scale: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    });

    servicewrapper.addEventListener("mouseleave", () => {
      gsap.to(mouseFollowImage, {
        scale: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    });

    imageFollowHoverAnimationsContainer[index].addEventListener(
      "mousemove",
      (e) => {
        const { clientX, clientY } = e;
        xTo(clientX + 20);
        yTo(clientY - 150);
      },
    );

    listGridWrapper.forEach((curr, hoverIndex) => {
      curr.addEventListener("mouseenter", () => {
        setTimeout(() => {
          mouseFollowImage.forEach((c) => {
            c.classList.add("clip-transition");
          });
        }, 300);

        mouseFollowImage.forEach((img, imgIndex) => {
          // first item does nothing
          if (hoverIndex === 0) {
            img.classList.remove("clip-0");
            if (imgIndex !== 0) img.classList.add("clip-50");
            return;
          }

          // reveal progressively
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
