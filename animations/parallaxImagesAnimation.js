const parallaxImagesAnimation = () => {
  const parallaxImages = document.querySelectorAll(".parallax_image");
  const processRevealImage = document.querySelectorAll(".process_reveal_image");

  if (parallaxImages.length) {
    parallaxImages.forEach((curr) => {
      const parallaxImageContainer = curr.closest(".parallax_image_container");
      const rect = parallaxImageContainer.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      const translateY = -scrollProgress * 150;
      curr.style.transform = `translateY(${translateY}px)`;
    });
  }
  if (processRevealImage.length) {
    processRevealImage.forEach((curr) => {
      const parallaxImageContainer = curr.closest(
        ".process_reveal_image_wrapper",
      );
      const rect = parallaxImageContainer.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      const translateY = -scrollProgress * 150;
      curr.style.transform = `translateY(${translateY}px)`;
    });
  }
};

// page hero section animations
const projectAnimation = () => {
  const projectTitle = gsap.utils.toArray(
    ".project_heading, .archieve_heading",
  );
  const projectParagraph = gsap.utils.toArray(".project_paragraph");
  const projectTags = gsap.utils.toArray(".project_tags");

  if (projectParagraph.length) {
    projectParagraph.forEach((curr) => {
      gsap.effects.fade(curr);
    });
  }
  if (projectTags.length) {
    projectTags.forEach((curr) => {
      gsap.effects.fade(curr);
    });
  }

  if (projectTitle.length) {
    projectTitle.forEach((curr) => {
      const splitHeading = SplitText.create(curr, {
        type: "chars, lines",
        mask: "lines",
        autoSplit: true,
        charsClass: "project_heading_char",
      });
      gsap.fromTo(
        curr.querySelectorAll(".project_heading_char"),
        {
          y: "-350%",
          rotateX: -24,
        },
        {
          y: "0%",
          rotateX: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "secondary",
          scrollTrigger: {
            trigger: curr,
            start: "top 80%",
          },
        },
      );
    });
  }
};

const pageHeroLoadAnimations = () => {
  const hero = document.querySelector(".work_hero_section");
  if (hero) {
    const heading = hero.querySelector(".section_hero_heading");
    const paragraph = hero.querySelector(".work_hero_paragraph");
    const tl = gsap.timeline();
    const splitParagraph = SplitText.create(paragraph, {
      type: "chars, lines",
      mask: "lines",
      linesClass: "section_hero_line",
      autoSplit: true,
      charsClass: "section_paragraph_char",
    });

    if (heading || hero) {
      tl.set([heading, ".work_hero_paragraph", ".hero_footer_text"], {
        opacity: 1,
      });
      tl.add(gsap.effects.heroHeadingReveal(heading));
      tl.fromTo(
        splitParagraph.lines,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.4,
        },
        0.5,
      );
      tl.fromTo(
        ".hero_footer_text",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.4,
        },
        0.6,
      );
    }
  }
};
