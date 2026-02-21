
const parallaxImagesAnimation = () => {
  const parallaxImages = document.querySelectorAll(".parallax_image");
  const processRevealImage = document.querySelectorAll(".process_reveal_image");
  const parallaxStrength = 150;

  if (parallaxImages.length) {
    parallaxImages.forEach((curr) => {
      const parallaxImageContainer = curr.closest(".parallax_image_container");

      if (!curr.dataset.parallaxInit) {
        parallaxImageContainer.style.position = "relative";
        curr.style.position = "absolute";
        curr.style.left = "0";
        curr.style.width = "100%";
        curr.style.height = `calc(100% + ${parallaxStrength}px)`;
        curr.style.top = `-${parallaxStrength / 2}px`;
        curr.style.objectFit = "cover";
        curr.dataset.parallaxInit = "true";
      }

      const rect = parallaxImageContainer.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      const translateY = -scrollProgress * parallaxStrength;
      curr.style.transform = `translateY(${translateY}px)`;
    });
  }

  if (processRevealImage.length) {
    processRevealImage.forEach((curr) => {
      const parallaxImageContainer = curr.closest(".process_reveal_image_wrapper");

      if (!curr.dataset.parallaxInit) {
        parallaxImageContainer.style.position = "relative";
        curr.style.position = "absolute";
        curr.style.left = "0";
        curr.style.width = "100%";
        curr.style.height = `calc(100% + ${parallaxStrength}px)`;
        curr.style.top = `-${parallaxStrength / 2}px`;
        curr.style.objectFit = "cover";
        curr.dataset.parallaxInit = "true";
      }

      const rect = parallaxImageContainer.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      const translateY = -scrollProgress * parallaxStrength;
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
        onSplit: () => {
          gsap.fromTo(
            curr.querySelectorAll(".project_heading_char"),
            {
              y: "-3em",
              rotateX: -24,
            },
            {
              y: "0em",
              rotateX: 0,
              duration: 0.9,
              stagger: {
                each: 0.05,
                ease: "slow(0.1,0.7,true)",
              },
              ease: "secondary",
              scrollTrigger: {
                trigger: curr,
                start: "top 80%",
                // toggleActions: "play reverse play reverse",
                // markers: true,
              },
            },
          );
        },
      });
    });
  }
};
