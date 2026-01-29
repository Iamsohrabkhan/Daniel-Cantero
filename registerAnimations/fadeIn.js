gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    gsap.set(targets, { opacity: 0 });

    const timelines = targets.map((el) =>
      gsap.to(el, {
        opacity: 1,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      })
    );

    return timelines;
  },
  defaults: {
    duration: 1.5,
    ease: "primary",
  },
});

