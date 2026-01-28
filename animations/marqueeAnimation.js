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