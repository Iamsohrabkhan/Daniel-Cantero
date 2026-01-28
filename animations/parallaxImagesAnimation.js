
const parallaxImagesAnimation = () => {
  const parallaxImages = document.querySelectorAll(".parallax_image");
  const processRevealImage = document.querySelectorAll(".process_reveal_image");

  parallaxImages.forEach((curr) => {
    const parallaxImageContainer = curr.closest(".parallax_image_container");
    const rect = parallaxImageContainer.getBoundingClientRect();
    const scrollProgress = rect.top / window.innerHeight;
    const translateY = -scrollProgress * 150;
    curr.style.transform = `translateY(${translateY}px)`;
  });
  processRevealImage.forEach((curr) => {
    const parallaxImageContainer = curr.closest(
      ".process_reveal_image_wrapper",
    );
    const rect = parallaxImageContainer.getBoundingClientRect();
    const scrollProgress = rect.top / window.innerHeight;
    const translateY = -scrollProgress * 150;
    curr.style.transform = `translateY(${translateY}px)`;
  });
};
