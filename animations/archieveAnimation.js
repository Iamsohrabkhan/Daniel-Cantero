const canvaDiv = document.querySelector(".canva");
const grid = new ElasticGrid(canvaDiv);
const archieveMarqueeAnimations = () => {
  const stickyArchieve = document.querySelector(".sticky_archieve");
  const archieveMarquee = document.querySelectorAll(".archieve_marquee");
  const archieveImageParallax = document.querySelectorAll(
    ".archieve_image_parallax",
  );

  if (archieveMarquee.length < 2) return;

  // initial states

  gsap.set(archieveMarquee[1], {
    x: -archieveMarquee[1].getBoundingClientRect().width / 3,
  });
  gsap.set(".archieve_text_animation_wrapper", {
    scale: 0,
  });
  archieveImageParallax.forEach((curr, index) => {
    if (index === 0) {
      gsap.set(curr, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
      });
    } else {
      gsap.set(curr, {
        clipPath: "inset(50%)",
      });
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".archieve_container",
      start: "top top",
      end: "80% bottom",
      scrub: 1,
      invalidateOnRefresh: true,

      onEnter: () => {
        console.log("entered");

        // grid.playEntryAnimation(1000);
      },
      onLeave: () => {
        console.log("left");
        gsap.to(".archieve_text_animation_wrapper", {
          scale: 1,
          // opacity: 1,
          duration: 0.4,
          delay: 0.2,
        });
      },
      onEnterBack: () => {
        console.log("reenter");
        gsap.to(".archieve_text_animation_wrapper", {
          scale: 0,
          // opacity: 0,
          duration: 0.4,
        });
      },
      onLeaveBack: () => {
        console.log("leave back");
      },
      // markers: true,
    },
  });

  // marquee movement (runs across full scroll)
  tl.to(
    archieveMarquee[0],
    {
      x: () => -archieveMarquee[0].getBoundingClientRect().width / 3,
      ease: "none",
      willChange: "transform",
    },
    0,
  );

  tl.to(
    archieveMarquee[1],
    {
      x: 0,
      ease: "none",
      willChange: "transform",
      onComplete: () => {},

      onStart: () => {},
      onUpdate: () => {
        const currentX = gsap.getProperty(archieveMarquee[1], "x");
        // use currentX here
        if (currentX === 0) {
          if (!stickyArchieve.classList.contains("sticky_mask")) {
            stickyArchieve.classList.add("sticky_mask");
          }
        } else {
          if (stickyArchieve.classList.contains("sticky_mask")) {
            stickyArchieve.classList.remove("sticky_mask");
          }
        }
      },
    },
    0,
  );

  // image scaling (side by side)
  archieveImageParallax.forEach((curr, index) => {
    tl.to(
      curr,
      {
        scale: index === 0 ? 1 : 1,
        clipPath: index !== 0 ? "inset(0%)" : null,
        willChange: "transform",
        ease: "none",
        onComplete: () => {
          if (index === archieveImageParallax.length - 1) {
            gsap.to(grid, {
              animationProgress: 1,
              duration: 1,
              delay: 0.2,
              ease: "power2.out",
            });
          }
        },
      },
      index === 0 ? ">" : ">",
    );
  });
};
