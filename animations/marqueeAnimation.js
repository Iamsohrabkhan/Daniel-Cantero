function initMarqueeAnimations(marquee) {
  if (!marquee) return;

  // =========================
  // CONFIG VIA DATA ATTRIBUTES
  // =========================
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const durationAttr = parseFloat(marquee.dataset.duration);
  const duration = !isNaN(durationAttr) ? clamp(durationAttr, 5, 300) : 20; // Default 20 seconds

  // =========================
  // SELECT ITEMS
  // =========================
  let marqueeImages = marquee.querySelectorAll(".marquee_image_item");

  if (!marqueeImages.length) {
    marqueeImages = marquee.querySelectorAll(".marquee_image, .marquee_item");
  }

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
  // GSAP INFINITE SCROLL
  // =========================
  const moveX = gsap.quickSetter(marquee, "x", "%");
  const wrapper = gsap.utils.wrap(0, -50);

  let value = 0;

  // Infinite animation
  gsap.to(marquee, {
    x: -50 + "%",
    duration: duration,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => wrapper(parseFloat(x))),
    },
  });

  // =========================
  // INIT STYLES
  // =========================
  marquee.style.userSelect = "none";

  // Enable pointer-events on anchor tags
  marqueeImages.forEach((img) => {
    // Disable pointer-events on children
    const children = img.querySelectorAll("*");
    children.forEach((child) => {
      child.style.pointerEvents = "none";
    });

    // Keep anchor clickable
    if (img.tagName === "A") {
      img.style.pointerEvents = "auto";
    }

    img.draggable = false;
    img.style.willChange = "transform";
    img.style.transformOrigin = "center center";
  });

  // =========================
  // SCROLL ANIMATION (FADE IN)
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