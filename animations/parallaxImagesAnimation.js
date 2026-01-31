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
const projectAnimation = () => {
  const projectParagraph = gsap.utils.toArray(".project_paragraph");
  const projectTags = gsap.utils.toArray(".project_tags");

  if (projectParagraph.length) {
    projectParagraph.forEach((curr) => {
      gsap.effects.fade(curr);
    });
    
  }
  if (projectTags) {
    projectTags.forEach((curr) => {
      gsap.effects.fade(curr);
    });
    
  }
};
