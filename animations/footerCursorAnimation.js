const cursorAnimations = () => {
  // =========================
  // REGISTER PLUGINS
  // =========================

  gsap.registerPlugin(ScrambleTextPlugin);

  // =========================
  // ONLY ENGINEERING CHILD PAGES
  // (NOT /engineering/ root)
  // =========================

  const path = window.location.pathname;

  const isEngineeringChildPage =
    path.includes("/engineering/") &&
    path !== "/es/engineering/" &&
    path !== "/engineering/";

  if (!isEngineeringChildPage) return;

  // =========================
  // MANUAL PAGE ORDER
  // =========================

  const pages = [
    "https://danielcantero.com/es/engineering/octogon-festival/",
    "https://danielcantero.com/es/engineering/laboratorio-octogon/",
    "https://danielcantero.com/es/engineering/binari/",
    "https://danielcantero.com/es/engineering/reactable/",
    "https://danielcantero.com/es/engineering/blakbox/",
    "https://danielcantero.com/es/engineering/dixpley/",
    "https://danielcantero.com/es/engineering/vinyl-recorder/",
    "https://danielcantero.com/es/engineering/digistudio/",
    "https://danielcantero.com/es/engineering/channel-master/",
    "https://danielcantero.com/es/engineering/blok/",
  ];

  const normalize = (url) => url.replace(/\/$/, "");

  const normalizedPages = pages.map(normalize);
  const currentUrl = normalize(window.location.href);

  let currentIndex = normalizedPages.indexOf(currentUrl);

  // =========================
  // LOOP LOGIC (CIRCULAR NAV)
  // =========================

  const getPrevIndex = () =>
    (currentIndex - 1 + normalizedPages.length) % normalizedPages.length;

  const getNextIndex = () =>
    (currentIndex + 1) % normalizedPages.length;

  const prevUrl = normalizedPages[getPrevIndex()];
  const nextUrl = normalizedPages[getNextIndex()];

  // =========================
  // ELEMENTS
  // =========================

  const footer = document.querySelector(".footer");
  if (!footer) return;

  const cursorButton = footer.querySelector(".cursor_button");
  if (!cursorButton) return;

  const links = footer.querySelectorAll("a, button");

  // =========================
  // SCRAMBLE CHARS
  // =========================

  const scrambleCharsCursor =
    "▙ ▚ ▞ a k i e d z e k";

  // =========================
  // STATE
  // =========================

  let currentSide = null;
  let isHoveringLink = false;
  let isHiddenArea = false;

  // =========================
  // QUICK FOLLOW
  // =========================

  const xTo = gsap.quickTo(cursorButton, "x", {
    duration: 0.8,
    ease: "power3",
  });

  const yTo = gsap.quickTo(cursorButton, "y", {
    duration: 0.8,
    ease: "power3",
  });

  // =========================
  // INITIAL STATE
  // =========================

  gsap.set(cursorButton, {
    // xPercent: -50,
    // yPercent: -50,
    scale: 0,
    // opacity: 0,
    pointerEvents: "none",
    fontWeight: "700",
    display: "flex",
  });

  // =========================
  // SHOW / HIDE CURSOR
  // =========================

  const showCursor = () => {
    if (isHoveringLink || isHiddenArea) return;

    gsap.to(cursorButton, {
      scale: 1,
    //   opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const hideCursor = () => {
    gsap.to(cursorButton, {
      scale: 0,
    //   opacity: 0,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  footer.addEventListener("mouseenter", showCursor);
  footer.addEventListener("mouseleave", hideCursor);

  // =========================
  // FOLLOW MOUSE
  // =========================

  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    const x = e.clientX - rect.left;

    xTo(e.clientX + 10);
    yTo(e.clientY + 10);

    const newSide = x < rect.width / 2 ? "prev" : "next";

    if (newSide !== currentSide) {
      currentSide = newSide;

      gsap.to(cursorButton, {
        duration: 0.4,
        scrambleText: {
          text: currentSide === "prev" ? "<< ANTERIOR" : "SIGUIENTE >>",
          chars: scrambleCharsCursor,
          speed: 0.3,
        },
      });
    }
  });

  // =========================
  // HIDE CURSOR ON LINKS
  // =========================

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      isHoveringLink = true;
      hideCursor();
    });

    link.addEventListener("mouseleave", () => {
      isHoveringLink = false;
      showCursor();
    });
  });

  // =========================
  // HIDE CURSOR ON SPECIFIC AREAS
  // =========================

  const hiddenSelectors = [
    ".brxe-bphqko .brxe-block .navbar_icons",
    ".brxe-cqjbgr .brxe-div btn",
    ".footer_lists",
  ];

  hiddenSelectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    el.addEventListener("mouseenter", () => {
      isHiddenArea = true;
      hideCursor();
    });

    el.addEventListener("mouseleave", () => {
      isHiddenArea = false;
      showCursor();
    });
  });

  // =========================
  // CLICK NAVIGATION
  // =========================

  footer.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;

    const rect = footer.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const isLeft = x < rect.width / 2;

    if (isLeft) {
      window.location.href = prevUrl;
    } else {
      window.location.href = nextUrl;
    }
  });

  // =========================
// HIDE CURSOR ON UI AREAS
// =========================

const blockedSelectors = [
  ".footer .navbar_icons",
//   ".brxe-cqjbgr .brxe-div.btn",
  ".footer_lists",
];

let isBlockedArea = false;

const checkBlocked = (target) => {
  return blockedSelectors.some((selector) => {
    return target.closest(selector);
  });
};

document.addEventListener("mousemove", (e) => {
  if (!footer.contains(e.target)) return;

  if (checkBlocked(e.target)) {
    if (!isBlockedArea) {
      isBlockedArea = true;

      gsap.to(cursorButton, {
        scale: 0,
        // opacity: 0,
        duration: 0.25,
        ease: "power3.out",
      });
    }
  } else {
    if (isBlockedArea) {
      isBlockedArea = false;

      gsap.to(cursorButton, {
        scale: 1,
        // opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }
});
};

cursorAnimations();