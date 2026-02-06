function initMarqueeAnimations() {
  /* ===========================
     TWEAKING CONTROLS (DEFAULTS)
  =========================== */

  const VELOCITY_RESPONSE = 0.22;
  const VELOCITY_FRICTION = 0.94;
  const DELTA_DAMPING = 0.82;
  const BASE_SPEED = 0.004;
  const SCROLL_MULTIPLIER = 0.02;
  const MAX_VELOCITY = 14;

  /* ===========================
     SETUP
  =========================== */
  const wrapper = gsap.utils.wrap(-50, 0);
  const clamper = gsap.utils.clamp(-MAX_VELOCITY, MAX_VELOCITY);

  let smoothVelocity = 0;
  let downwardScroll = true;

  const marquees = Array.from(document.querySelectorAll(".marquee")).map(
    (el) => {
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
        value: 0,
        smoothVelocity: 0,
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
    if (typeof parallaxImagesAnimation === "function") {
      parallaxImagesAnimation();
    }

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

  const marqueeImage=document.querySelectorAll(".marquee_image")
  if (marqueeImage.entries.length) {
    gsap.from(".marquee_image", {
      opacity: 1,
      // y: 150,
      duration: 2,
      ease: "secondary",
  
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".marquee_image",
        top: "top 80%",
        end: "bottom top",
        // markers: true,
      },
    });
    
  }
}
