gsap.registerPlugin(ScrollTrigger, CustomEase);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

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

const hoverListAnimations = () => {
  const imageFollowHoverAnimationsContainer = document.querySelectorAll(
    ".image_follow_hover_animations",
  );
  const serviceWrappers = document.querySelectorAll(".service_wrapper");

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

// Archieve marqee animations

const parallaxImagesAnimation = () => {
  const parallaxImages = document.querySelectorAll(".parallax_image");
  const processRevealImage = document.querySelectorAll(".process_reveal_image");

  parallaxImages.forEach((curr) => {
    const parallaxImageContainer = curr.closest(".parallax_image_container");
    const rect = parallaxImageContainer.getBoundingClientRect();
    const scrollProgress = rect.top / window.innerHeight;
    const translateY = -scrollProgress * 150;
    curr.style.transform = `translateY(${translateY}px)`;
  });
  processRevealImage.forEach((curr) => {
    const parallaxImageContainer = curr.closest(
      ".process_reveal_image_wrapper",
    );
    const rect = parallaxImageContainer.getBoundingClientRect();
    const scrollProgress = rect.top / window.innerHeight;
    const translateY = -scrollProgress * 150;
    curr.style.transform = `translateY(${translateY}px)`;
  });
};

const archieveMarqueeAnimations = () => {
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
      },
      index === 0 ? ">" : ">",
    );
  });
};

document.addEventListener("DOMContentLoaded", () => {
  navAnimations();
  hoverListAnimations();
  archieveMarqueeAnimations();
});

document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
   TWEAKING CONTROLS (DEFAULTS)
   =========================== */

  const VELOCITY_RESPONSE = 0.1;
  const VELOCITY_FRICTION = 0.95;
  const DELTA_DAMPING = 0.9;
  const BASE_SPEED = 0.002;
  const SCROLL_MULTIPLIER = 0.01;
  const MAX_VELOCITY = 10;

  /* ===========================
   SETUP
   =========================== */

  const wrapper = gsap.utils.wrap(-50, 0);
  const clamper = gsap.utils.clamp(-MAX_VELOCITY, MAX_VELOCITY);

  let smoothVelocity = 0;
  let downwardScroll = true;

  const marquees = Array.from(document.querySelectorAll(".marquee")).map(
    (el) => {
      // Parse data attributes or use defaults
      const velocityResponse =
        parseFloat(el.dataset.velocityResponse) || VELOCITY_RESPONSE;
      const velocityFriction =
        parseFloat(el.dataset.velocityFriction) || VELOCITY_FRICTION;
      const deltaDamping = parseFloat(el.dataset.deltaDamping) || DELTA_DAMPING;
      const baseSpeed = parseFloat(el.dataset.baseSpeed) || BASE_SPEED;
      const scrollMultiplier =
        parseFloat(el.dataset.scrollMultiplier) || SCROLL_MULTIPLIER;

      return {
        el,
        reverse: el.hasAttribute("data-marquee-reverse"),
        setX: gsap.quickSetter(el, "x", "%"),
        value: 0, // Each marquee tracks its own position
        smoothVelocity: 0, // Each marquee has its own smooth velocity
        velocityResponse,
        velocityFriction,
        deltaDamping,
        baseSpeed,
        scrollMultiplier,
      };
    },
  );

  /* ===========================
   SCROLL HANDLING
   =========================== */

  lenis.on("scroll", ({ velocity, direction }) => {
    const targetVelocity = clamper(velocity * SCROLL_MULTIPLIER);
    smoothVelocity = gsap.utils.interpolate(
      smoothVelocity,
      targetVelocity,
      VELOCITY_RESPONSE,
    );

    downwardScroll = direction !== -1;

    // Update each marquee's individual smooth velocity
    marquees.forEach((m) => {
      const targetVel = clamper(velocity * m.scrollMultiplier);
      m.smoothVelocity = gsap.utils.interpolate(
        m.smoothVelocity,
        targetVel,
        m.velocityResponse,
      );
    });
  });

  /* ===========================
   TICKER LOOP
   =========================== */

  gsap.ticker.add((time, deltaTime) => {
    parallaxImagesAnimation();
    lenis.raf(time * 1000);
    smoothVelocity *= VELOCITY_FRICTION;

    marquees.forEach((m) => {
      m.smoothVelocity *= m.velocityFriction;
      const dampedDelta = gsap.utils.interpolate(0, deltaTime, m.deltaDamping);
      if (downwardScroll) {
        m.value += dampedDelta * m.baseSpeed + m.smoothVelocity;
      } else {
        m.value -= dampedDelta * m.baseSpeed - m.smoothVelocity;
      }

      const xValue = m.reverse ? wrapper(m.value) : wrapper(-m.value);
      m.setX(xValue);
    });
  });

  gsap.ticker.lagSmoothing(0);
});
