const slideLeft = () => {
  gsap.registerEffect({
    name: "slide-up",
    effect: (targets, config) => {
      // use config.y with a fallback
      gsap.set(targets, {
        opacity: 0,
        y: config.y
      });

      const timelines = targets.map((el) =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: config.duration,
          ease: config.ease,
          delay: config.delay,
          stagger: config.stagger || 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
          },
        })
      );

      return timelines;
    },
    defaults: {
      duration: 1,
      ease: "primary",
      y: 100, // default slide distance
    },
  });
};
