gsap.registerPlugin(ScrollTrigger, CustomEase);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.lagSmoothing(0);

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
  const serviceWrappers = document.querySelectorAll(".service_wrapper");

  serviceWrappers.forEach((servicewrapper) => {
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

    servicewrapper.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      xTo(clientX + 10);
      yTo(clientY - 150);
    });

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

document.addEventListener("DOMContentLoaded", () => {
  navAnimations();
  hoverListAnimations();
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

});
