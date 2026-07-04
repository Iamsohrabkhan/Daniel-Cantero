function initMarqueeAnimations(marquee) {
  if (!marquee) return;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || window.innerWidth < 768;

  // =========================
  // CONFIG VIA DATA ATTRIBUTES
  // =========================
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const speedAttr = parseFloat(marquee.dataset.speed);
  const dragAttr = parseFloat(marquee.dataset.drag);
  const dampingAttr = parseFloat(marquee.dataset.damping);
  const isDraggable = marquee.dataset.draggable !== "false";

  const autoScrollSpeed = !isNaN(speedAttr)
    ? clamp(speedAttr, -0.3, 0.3)
    : -0.05;

  const dragSensitivity = !isNaN(dragAttr) ? dragAttr : isMobile ? 0.035 : 0.03;

  const releaseDamping = !isNaN(dampingAttr)
    ? dampingAttr
    : isMobile
      ? 0.88
      : 0.9;

  // =========================
  // SELECT ITEMS
  // =========================
  let marqueeImages = marquee.querySelectorAll(".marquee_item");

  // =========================
  // CLONE ITEMS
  // =========================
  const itemsArray = Array.from(marqueeImages);

  itemsArray.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.classList.add("is-clone");
    clone.setAttribute("aria-hidden", "true");
    marquee.appendChild(clone);
  });

  // IMPORTANT: re-select AFTER cloning
  marqueeImages = marquee.querySelectorAll(".marquee_image, .marquee_item");

  // =========================
  // GSAP CORE
  // =========================
  const moveX = gsap.quickSetter(marquee, "x", "%");
  const wrapper = gsap.utils.wrap(0, -50);

  let value = 0;
  let targetValue = 0;

  let isDragging = false;
  let lastPosition = 0;
  let dragVelocity = 0;

  let velocityHistory = [];
  const velocityHistoryLength = isMobile ? 4 : 6;

  let currentSkew = 0;
  let targetSkew = 0;

  const smoothness = isMobile ? 0.15 : 0.12;

  const maxSkew = isMobile ? 12 : 20;
  const skewReturnSpeed = isMobile ? 0.15 : 0.18;
  const velocityToSkewRatio = isMobile ? 0.8 : 1.2;
  const minVelocityForSkew = 0.1;

  // =========================
  // VELOCITY SYSTEM
  // =========================
  const updateVelocityHistory = (v) => {
    velocityHistory.push(v);
    if (velocityHistory.length > velocityHistoryLength) {
      velocityHistory.shift();
    }
  };

  const getSmoothedVelocity = () => {
    if (!velocityHistory.length) return 0;

    let sum = 0;
    let weight = 0;

    velocityHistory.forEach((v, i) => {
      const w = i + 1;
      sum += v * w;
      weight += w;
    });

    return sum / weight;
  };

  const calculateSkew = () => {
    const v = getSmoothedVelocity();
    if (Math.abs(v) < minVelocityForSkew) return 0;

    let skew = v * velocityToSkewRatio;
    return Math.max(-maxSkew, Math.min(maxSkew, skew));
  };

  const applySkew = () => {
    targetSkew = calculateSkew();

    const speed = isDragging ? 0.2 : skewReturnSpeed;

    currentSkew += (targetSkew - currentSkew) * speed;

    marqueeImages.forEach((img) => {
      gsap.set(img, {
        skewX: currentSkew,
        force3D: true,
        transformOrigin: "center center",
      });
    });
  };

  // =========================
  // DRAG SYSTEM
  // =========================
  const handleDragStart = (x) => {
    isDragging = true;
    lastPosition = x;
    velocityHistory = [];
    marquee.style.cursor = "grabbing";
  };

  const handleDragMove = (x) => {
    if (!isDragging) return;

    const delta = x - lastPosition;

    dragVelocity = delta * dragSensitivity;
    targetValue += dragVelocity;

    updateVelocityHistory(delta);
    lastPosition = x;
  };

  const handleDragEnd = () => {
    isDragging = false;
    marquee.style.cursor = "grab";

    if (velocityHistory.length) {
      velocityHistory = [velocityHistory.at(-1) * 0.3];
    }
  };

  // =========================
  // POINTER EVENTS
  // =========================// =========================
  // POINTER EVENTS
  // =========================
  if (isDraggable) {
    marquee.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;

      handleDragStart(e.clientX);
      marquee.setPointerCapture(e.pointerId);
    });

    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      handleDragMove(e.clientX);
    });

    window.addEventListener("pointerup", (e) => {
      if (e.pointerType === "touch") return;
      handleDragEnd();
    });
  }
  // =========================
  // TOUCH EVENTS
  // =========================
  if (isDraggable) {
    marquee.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        handleDragStart(e.touches[0].clientX);
      }
    });

    marquee.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX);
      }
    });

    marquee.addEventListener("touchend", handleDragEnd);
    marquee.addEventListener("touchcancel", handleDragEnd);
  }
  // =========================
  // MAIN LOOP
  // =========================
  gsap.ticker.add(() => {
    if (isDragging) {
      value += (targetValue - value) * smoothness;
      applySkew();
    } else {
      if (Math.abs(dragVelocity) > 0.001) {
        targetValue += dragVelocity + autoScrollSpeed;
        value += (targetValue - value) * smoothness;

        dragVelocity *= releaseDamping;

        updateVelocityHistory(dragVelocity * 10);
        applySkew();

        if (Math.abs(dragVelocity) < 0.001) {
          velocityHistory = [];
          dragVelocity = 0;
        }
      } else {
        targetValue += autoScrollSpeed;
        value += (targetValue - value) * smoothness;

        currentSkew += (0 - currentSkew) * skewReturnSpeed;

        marqueeImages.forEach((img) => {
          gsap.set(img, { skewX: currentSkew, force3D: true });
        });
      }
    }

    const wrapX = wrapper(value);
    moveX(wrapX);
  });

  // =========================
  // INIT STYLES
  // =========================
  marquee.style.cursor = isDraggable ? "grab" : "default";
  marquee.style.userSelect = "none";
  marquee.style.touchAction = "pan-y";

  marqueeImages.forEach((img) => {
    img.style.pointerEvents = "none";
    img.draggable = false;
    img.style.willChange = "transform";
    img.style.transformOrigin = "center center";
  });

  // =========================
  // SCROLL ANIMATION
  // =========================
  gsap.fromTo(
    marqueeImages,
    { opacity: 0, y: 150 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: marquee,
        start: "top 90%",
        once: true,
      },
    },
  );
}

// =========================
// INIT ALL
// =========================
function initAllMarquees() {
  document.querySelectorAll(".marquee").forEach(initMarqueeAnimations);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllMarquees);
} else {
  initAllMarquees();
}
