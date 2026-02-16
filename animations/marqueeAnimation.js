function initMarqueeAnimations() {
  // Check if marquee exists first
  const marquee = document.querySelector(".marquee");
  if (!marquee) {
    return;
  }

  // Device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  let value = 0;
  const autoScrollSpeed = -0.05;
  const marqueeImages = document.querySelectorAll(".marquee_image");
  const moveX = gsap.quickSetter(marquee, "x", "%");
  const wrapper = gsap.utils.wrap(0, -50);

  let isDragging = false;
  let lastPosition = 0;
  let currentPosition = 0;
  let dragVelocity = 0;
  let targetValue = 0;
  let instantVelocity = 0;

  // Touch direction detection
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDirection = null;
  const directionThreshold = 10;

  // Enhanced velocity tracking for professional skew
  let velocityHistory = [];
  const velocityHistoryLength = isMobile ? 4 : 6;
  let currentSkew = 0;
  let targetSkew = 0;

  // Adaptive settings based on device - REDUCED SENSITIVITY
  const smoothness = isMobile ? 0.15 : 0.12;
  const dragSensitivity = isMobile ? 0.035 : 0.03; // REDUCED from 0.08/0.06 - less distance per swipe
  const releaseDamping = isMobile ? 0.88 : 0.90; // REDUCED from 0.95/0.96 - faster deceleration
  
  // Professional skew settings - responsive and smooth
  const maxSkew = isMobile ? 12 : 20;
  const skewSmoothness = isMobile ? 0.18 : 0.2;
  const skewReturnSpeed = isMobile ? 0.15 : 0.18; // Faster skew return
  const velocityToSkewRatio = isMobile ? 0.8 : 1.2;
  const minVelocityForSkew = 0.1;

  // Minimum drag distance to prevent accidental clicks
  let dragStartPosition = 0;
  let hasDragged = false;
  const minDragDistance = 5;

  // Calculate smooth average velocity with recent bias
  const getSmoothedVelocity = () => {
    if (velocityHistory.length === 0) return 0;
    
    let weightedSum = 0;
    let weightSum = 0;
    
    velocityHistory.forEach((v, index) => {
      const weight = index + 1;
      weightedSum += v * weight;
      weightSum += weight;
    });
    
    return weightedSum / weightSum;
  };

  // Update velocity history
  const updateVelocityHistory = (velocity) => {
    velocityHistory.push(velocity);
    if (velocityHistory.length > velocityHistoryLength) {
      velocityHistory.shift();
    }
  };

  // Calculate target skew based on velocity with enhanced dynamics
  const calculateTargetSkew = (rawVelocity) => {
    const smoothVelocity = getSmoothedVelocity();
    const velocityMagnitude = Math.abs(smoothVelocity);
    
    // If velocity is minimal, return zero
    if (velocityMagnitude < minVelocityForSkew) {
      return 0;
    }

    // Direct velocity mapping with power curve
    let skewAmount = smoothVelocity * velocityToSkewRatio;
    
    // Apply a subtle ease-out curve
    const normalizedSkew = skewAmount / maxSkew;
    const easedNormalized = normalizedSkew > 0 
      ? Math.pow(Math.min(normalizedSkew, 1), 0.7) 
      : -Math.pow(Math.min(Math.abs(normalizedSkew), 1), 0.7);
    
    skewAmount = easedNormalized * maxSkew;
    
    // Clamp to max values
    skewAmount = Math.max(-maxSkew, Math.min(maxSkew, skewAmount));
    
    return skewAmount;
  };

  // Apply skew with smooth interpolation
  const applySkew = () => {
    targetSkew = calculateTargetSkew(instantVelocity);
    
    // Smooth interpolation towards target
    const interpolationSpeed = isDragging ? skewSmoothness : skewReturnSpeed;
    currentSkew += (targetSkew - currentSkew) * interpolationSpeed;
    
    // Apply with hardware acceleration
    marqueeImages.forEach((img) => {
      gsap.set(img, {
        skewX: currentSkew,
        force3D: true,
        transformOrigin: "center center"
      });
    });
  };

  // Handle drag start
  const handleDragStart = (position) => {
    isDragging = true;
    lastPosition = position;
    currentPosition = position;
    dragStartPosition = position;
    hasDragged = false;
    dragVelocity = 0;
    instantVelocity = 0;
    velocityHistory = [];

    marquee.style.cursor = "grabbing";
  };

  // Handle drag move with enhanced velocity tracking
  const handleDragMove = (position) => {
    if (!isDragging) return;

    currentPosition = position;
    const deltaX = currentPosition - lastPosition;
    
    if (!hasDragged && Math.abs(currentPosition - dragStartPosition) > minDragDistance) {
      hasDragged = true;
    }

    dragVelocity = deltaX * dragSensitivity;
    instantVelocity = deltaX;
    targetValue += dragVelocity;

    updateVelocityHistory(instantVelocity);

    lastPosition = currentPosition;
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    isDragging = false;
    touchDirection = null;
    marquee.style.cursor = "grab";

    // Reduced momentum on release
    if (velocityHistory.length > 0) {
      const lastVelocity = velocityHistory[velocityHistory.length - 1];
      velocityHistory = [lastVelocity * 0.3]; // REDUCED from 0.5 - less momentum
    }
    
    instantVelocity = 0;
  };

  // Mouse/Pointer events for desktop
  marquee.addEventListener("pointerdown", (e) => {
    if (e.pointerType === 'touch') return;
    
    handleDragStart(e.clientX);
    marquee.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === 'touch') return;
    handleDragMove(e.clientX);
  });

  window.addEventListener("pointerup", (e) => {
    if (e.pointerType === 'touch') return;
    
    if (isDragging && marquee.hasPointerCapture(e.pointerId)) {
      marquee.releasePointerCapture(e.pointerId);
    }
    handleDragEnd();
  });

  // Touch events for mobile with direction detection
  marquee.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDirection = null;
      
      handleDragStart(e.touches[0].clientX);
    }
  }, { passive: true });

  marquee.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    if (touchDirection === null) {
      const deltaX = Math.abs(touchX - touchStartX);
      const deltaY = Math.abs(touchY - touchStartY);

      if (deltaX > directionThreshold || deltaY > directionThreshold) {
        if (deltaX > deltaY) {
          touchDirection = 'horizontal';
        } else {
          touchDirection = 'vertical';
        }
      }
    }

    if (touchDirection === 'horizontal') {
      e.preventDefault();
      handleDragMove(touchX);
    } else if (touchDirection === 'vertical') {
      if (isDragging) {
        isDragging = false;
        velocityHistory = [];
      }
    }
  }, { passive: false });

  marquee.addEventListener("touchend", (e) => {
    handleDragEnd();
  }, { passive: true });

  marquee.addEventListener("touchcancel", (e) => {
    handleDragEnd();
  }, { passive: true });

  // Prevent text selection and image dragging
  marquee.addEventListener("selectstart", (e) => e.preventDefault());
  marquee.addEventListener("dragstart", (e) => e.preventDefault());

  // Main animation loop with smooth velocity transition
  gsap.ticker.add(() => {
    if (isDragging) {
      value += (targetValue - value) * smoothness;
      applySkew();
    } else {
      // Always add movement - either from drag velocity or auto-scroll
      if (Math.abs(dragVelocity) > 0.0001) {
        // Combine drag velocity with auto-scroll speed
        const combinedVelocity = dragVelocity + autoScrollSpeed;
        targetValue += combinedVelocity;
        value += (targetValue - value) * smoothness;
        
        // Dampen the drag velocity towards zero
        dragVelocity *= releaseDamping;
        
        // Update skew based on the drag velocity portion only
        const momentumVelocity = dragVelocity * 12; // REDUCED from 15 - less dramatic skew during momentum
        updateVelocityHistory(momentumVelocity);
        applySkew();
        
        // Clear history when drag velocity becomes negligible
        if (Math.abs(dragVelocity) < 0.001) {
          velocityHistory = [];
          dragVelocity = 0;
        }
      } else {
        // Pure auto-scroll when no drag velocity
        targetValue += autoScrollSpeed;
        value += (targetValue - value) * smoothness;
        
        // No skew during pure auto-scroll
        if (Math.abs(currentSkew) > 0.01) {
          currentSkew += (0 - currentSkew) * skewReturnSpeed;
          marqueeImages.forEach((img) => {
            gsap.set(img, { skewX: currentSkew, force3D: true });
          });
        }
      }
    }

    const wrapX = wrapper(value);
    moveX(wrapX);
  });

  // Initial setup
  marquee.style.cursor = "grab";
  marquee.style.userSelect = "none";
  marquee.style.webkitUserSelect = "none";
  marquee.style.touchAction = "pan-y";
  marquee.style.webkitTouchCallout = "none";

  marqueeImages.forEach((img) => {
    img.style.transformOrigin = "center center";
    img.style.pointerEvents = "none";
    img.draggable = false;
    img.style.willChange = "transform";
  });
}

// Call the function when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMarqueeAnimations);
} else {
  initMarqueeAnimations();
}