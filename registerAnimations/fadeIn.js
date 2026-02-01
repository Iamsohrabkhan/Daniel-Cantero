CustomEase.create("primary", "0.8,0.2,0,1");

const fadeInAnimation = () => {
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
        }),
      );

      return timelines;
    },
    defaults: {
      duration: 1.5,
      ease: "primary",
    },
  });

  const privacyAndTerms = gsap.utils.toArray(
    ".privacy_heading_wrapper, .privacy_lists, .privac_information_heading",
  );
  if (privacyAndTerms.length) {
    privacyAndTerms.forEach((curr) => {
      gsap.effects.fade(curr);
    });
  }

  // text reveal effect
  gsap.registerEffect({
    name: "heroHeadingReveal",
    defaults: {
      splitType: "chars, lines",
      mask: "lines",
      charsClass: "page_hero_char",
      yFrom: "-340%",
      rotateXFrom: -24,
      yTo: "0%",
      rotateXTo: 0,
      duration: 1,
      stagger: 0.06,
      ease: "secondary",
    },
    effect: (target, config) => {
      const split = SplitText.create(target, {
        type: config.splitType,
        mask: config.mask,
        autoSplit: true,
        charsClass: config.charsClass,
      });

      const tl = gsap.timeline();

      tl.fromTo(
        split.chars,
        {
          y: config.yFrom,
          rotateX: config.rotateXFrom,
        },
        {
          y: config.yTo,
          rotateX: config.rotateXTo,
          duration: config.duration,
          stagger: config.stagger,
          ease: config.ease,
        },
      );

      return tl;
    },
  });
};
