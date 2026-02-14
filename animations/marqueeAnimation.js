function initMarqueeAnimations() {
  let value = 0;
  const autoScrollSpeed = -0.05;
  const marquee = document.querySelector(".marquee");
  const marqueeImages = document.querySelectorAll(".marquee_image");
  const moveX = gsap.quickSetter(marquee, "x", "%");
  const wrapper = gsap.utils.wrap(0, -50);
  
  let isDragging = false;
  let lastMouseX = 0;
  let currentMouseX = 0;
  let dragVelocity = 0;
  let targetValue = 0;
  let instantVelocity = 0;
  
  const smoothness = 0.1;
  const dragSensitivity = 0.06;
  const releaseDamping = 0.92;
  
  // Skew settings - very sensitive
  const maxSkew = 36; // Positive value, we'll apply direction
  const skewSensitivity = 5; // Very high sensitivity for small movements

  // Pointer events for drag
  marquee.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    currentMouseX = e.clientX;
    dragVelocity = 0;
    instantVelocity = 0;
    
    // Kill any ongoing skew animations
    marqueeImages.forEach(img => {
      gsap.killTweensOf(img);
    });
    
    marquee.style.cursor = "grabbing";
    marquee.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    
    currentMouseX = e.clientX;
    const deltaX = currentMouseX - lastMouseX;
    
    // Calculate velocity for movement
    dragVelocity = deltaX * dragSensitivity;
    
    // Calculate instant velocity for skew (with direction)
    instantVelocity = deltaX;
    
    // Update target value
    targetValue += dragVelocity;
    
    // Calculate skew based on direction
    const velocityMagnitude = Math.abs(instantVelocity);
    
    let targetSkew = 0;
    if (velocityMagnitude > 0.1) { // Very low threshold
      // Calculate skew amount
      const skewAmount = Math.min(velocityMagnitude * skewSensitivity, maxSkew);
      
      // Apply direction: right = negative skew, left = positive skew
      if (deltaX > 0) {
        // Dragging right → negative skew (-48)
        targetSkew = -skewAmount;
      } else {
        // Dragging left → positive skew (+48)
        targetSkew = skewAmount;
      }
    }
    
    // Apply skew to all images
    marqueeImages.forEach(img => {
      gsap.to(img, {
        skewX: targetSkew,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true
      });
    });
    
    lastMouseX = currentMouseX;
  });

  window.addEventListener("pointerup", (e) => {
    if (isDragging) {
      isDragging = false;
      marquee.style.cursor = "grab";
      
      // Return all images to 0 skew
      marqueeImages.forEach(img => {
        gsap.to(img, {
          skewX: 0,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true
        });
      });
      
      instantVelocity = 0;
      
      if (marquee.hasPointerCapture(e.pointerId)) {
        marquee.releasePointerCapture(e.pointerId);
      }
    }
  });

  // Prevent text selection
  marquee.addEventListener("selectstart", (e) => e.preventDefault());
  marquee.addEventListener("dragstart", (e) => e.preventDefault());

  // Main animation loop
  gsap.ticker.add(() => {
    if (isDragging) {
      value += (targetValue - value) * smoothness;
    } else {
      if (Math.abs(dragVelocity) > 0.0001) {
        targetValue += dragVelocity;
        value += (targetValue - value) * smoothness;
        dragVelocity *= releaseDamping;
      } else {
        targetValue += autoScrollSpeed;
        value += (targetValue - value) * smoothness;
        dragVelocity = 0;
      }
    }
    
    const wrapX = wrapper(value);
    moveX(wrapX);
  });
  
  // Initial setup
  marquee.style.cursor = "grab";
  marquee.style.userSelect = "none";
  marquee.style.webkitUserSelect = "none";
  
  // Set transform origin for all images
  marqueeImages.forEach(img => {
    img.style.transformOrigin = "center center";
  });
  
  // Debug: Log number of images found
  console.log(`Found ${marqueeImages.length} images with class .marquee_image`);
}