gsap.registerEffect({
  name: "slide-up",
  effect: (targets, config) => {
    gsap.set(targets, { opacity: 0, y: 100 });

    const timelines = targets.map((el) =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        delay: config.delay,
        stagger: config.stagger || 0,
        scrollTrigger: {
          trigger: el, // each element triggers on itself
          start: "top bottom",
        },
      }),
    );

    return timelines;
  },
  defaults: {
    duration: 1,
    ease: "primary",
  },
});

