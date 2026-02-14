// const canvaDiv = document.querySelector(".canva");
// const grid = new ElasticGrid(canvaDiv);
const archieveMarqueeAnimations = () => {
  const stickyArchieve = document.querySelector(".sticky_archieve");
  const archieveMarquee = document.querySelectorAll(".archieve_marquee");
  const archieveImageParallax = document.querySelectorAll(
    ".archieve_image_parallax",
  );
  if (stickyArchieve) {
    if (archieveMarquee.length < 2) return;
    // stickyArchieve.classList.add("sticky_mask");

    // Create the animation but don't let it play automatically

    // initial states

    gsap.set(archieveMarquee[1], {
      x: -archieveMarquee[1].getBoundingClientRect().width / 3,
    });
    gsap.set(".archieve_text_animation_wrapper", {
      scale: 0,
    });
    gsap.set(".archieve_list", {
      yPercent: 100,
      opacity: 0,
    });
    archieveImageParallax.forEach((curr, index) => {
      if (index === 0) {
        gsap.set(curr, {
          scale: 0,
          opacity: 0,
          transformOrigin: "center",
        });
      } else {
        gsap.set(curr, {
          clipPath: "inset(50%)",
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".archieve_container",
        start: "top top",
        end: "center bottom",
        scrub: 1,
        // markers: true,
        invalidateOnRefresh: true,

        onEnter: () => {
          console.log("entered");
        },
        onLeave: () => {
          console.log("left");

          gsap.to(".archieve_text_animation_wrapper", {
            scale: 1,
            // opacity: 1,
            duration: 0.4,
            delay: 0.2,
            onComplete: () => {
              grid.create();
              stickyArchieve.classList.add("sticky_mask");
              gsap.to(".archieve_list", {
                yPercent: 0,
                opacity: 1,
              });
            },
          });
        },
        onEnterBack: () => {
          console.log("reenter");
          gsap.to(".archieve_text_animation_wrapper", {
            scale: 0,
            // opacity: 0,
            duration: 0.4,
            onComplete: () => {
              gsap.to(".archieve_list", {
                yPercent: 100,
                opacity: 0,
                duration: 0.15,
              });
              grid.destroy();
              stickyArchieve.classList.remove("sticky_mask");
            },
          });
        },
        // onLeaveBack: () => {
        //   console.log("leave back");
        // },
        // markers: true,
      },
    });

    // marquee movement (runs across full scroll)
    tl.to(
      archieveMarquee[0],
      {
        x: () => -archieveMarquee[0].getBoundingClientRect().width / 3,
        ease: "none",
        willChange: "transform",
      },
      0,
    );
    const overlay = gsap.quickTo(".archeive_overlay", "opacity", {
      duration: 0.2,
    });
    const q = gsap.utils.mapRange(
      -archieveMarquee[1].getBoundingClientRect().width / 3,
      0,
      0,
      0.8,
    );
    const clamp = gsap.utils.clamp(0, 0.8);
    tl.to(
      archieveMarquee[1],
      {
        x: 0,
        ease: "none",
        willChange: "transform",
        onComplete: () => {},

        onStart: () => {},
        onUpdate: () => {
          const currentX = gsap.getProperty(archieveMarquee[1], "x");
          const opacity = q(currentX);
          const opacityClamp = clamp(opacity);
          // console.log("🚀 ~ archieveMarqueeAnimations ~ currentX:", opacityClamp);
          overlay(opacityClamp);
        },
      },
      0,
    );

    // image scaling (side by side)
    archieveImageParallax.forEach((curr, index) => {
      tl.to(
        curr,
        {
          scale: index === 0 ? 1 : 1,
          clipPath: index !== 0 ? "inset(0%)" : null,
          willChange: "transform",
          ease: "none",
        },
        index === 0 ? ">" : ">",
      );
    });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".archieve_container",
        start: "center bottom", // EXACTLY where tl ends
        end: "bottom bottom",
        scrub: 1,
        // markers: {
        //   startColor: "white",
        //   endColor: "white",
        //   fontSize: "18px",
        //   fontWeight: "bold",
        //   indent: 20,
        // },
      },
    });

    t2.fromTo(
      ".archieve_text",
      {
        y: "100vh",
      },
      {
        y: "0vh",
      },
    );

    const archieveText = document.querySelector(".archieve_text");
    const splitArchieveText = SplitText.create(archieveText, {
      type: "chars",
      charsClass: "arc_text++",
    });
    const { width } = archieveText.getBoundingClientRect();

    // create a temp span to measure one letter
    const letterSpan = document.createElement("span");
    letterSpan.textContent = archieveText.textContent.trim()[0] || "A";
    letterSpan.style.position = "absolute";
    letterSpan.style.visibility = "hidden";
    letterSpan.style.whiteSpace = "nowrap";

    // copy font styles
    const styles = window.getComputedStyle(archieveText);
    letterSpan.style.font = styles.font;

    document.body.appendChild(letterSpan);

    const oneLetterWidth = letterSpan.getBoundingClientRect().width;

    document.body.removeChild(letterSpan);

    const calcX = width - innerWidth + oneLetterWidth * 3;

    t2.to(".archieve_text", {
      x: () => {
        return `${-calcX}px`;
      },
    });
    const letters = document.querySelectorAll(".archieve_text .arc_text");
    letters.forEach((letter, index) => {
      // Randomly choose direction: 1 for positive, -1 for negative (matching Framer's logic)
      const direction = Math.random() > 0.5 ? 1 : -1;

      gsap.set(letter, {
        y: direction * 150, // animationDistance from Framer (default 20)
        opacity: 0,
      });
    });
    letters.forEach((letter, index) => {
      ScrollTrigger.create({
        trigger: ".archieve_container", // or scroll parent
        start: "top top",
        end: "bottom 90%",

        onUpdate: () => {
          const rect = letter.getBoundingClientRect();
          const viewportWidth = window.innerWidth;

          if (rect.left >= 0 && rect.right <= viewportWidth) {
            letter.style.transition = `all 0.5s cubic-bezier(0.2, 0.8, 0, 1) 0.05s`;

            letter.style.transform = "translateY(0%)";
            letter.style.opacity = 1;
          } else {
            // letter.style.color = ""; // reset
          }
        },
      });
    });
  }
};

const archieveDetail = () => {
  const heading = document.querySelector(".archieve_detail_heading");
  const paragraph = document.querySelector(".archieve_detail_paragraph");
  const image = document.querySelector(".archieve_detail_image");
  const splitParagraph = SplitText.create(paragraph, {
    type: "lines",
    mask: "lines",
  });

  const seq = gsap.timeline();
  const mm = gsap.matchMedia();

  if (heading && splitParagraph?.lines) {
    seq.set(heading, { opacity: 1 });
    seq.set(paragraph, { opacity: 1 });

    seq.set(splitParagraph.lines, {
      yPercent: 100,
      opacity: 0,
    });

    seq.add(gsap.effects.heroHeadingReveal(heading));

    seq.to(
      splitParagraph.lines,
      {
        opacity: 1,
        yPercent: 0,
        stagger: 0.02,
        duration: 0.4,
      },
      0.5,
    );

    // Animate image ONLY if width is less than 478px
    mm.add("(max-width: 477px)", () => {
      seq.from(
        image,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
        },
        0.7,
      );
    });
  }
};

const archieveHoverAnimations = () => {
  const bento = document.querySelector(".grid_bento");
  const imgContainer = document.querySelector(".bento_images_reveal");
  const images = document.querySelectorAll(".bento_img");
  const cells = document.querySelectorAll(".grid_row");
  const archieveContainer = document.querySelector(".archieve_posts");
  let mm = gsap.matchMedia();

  if (archieveContainer) {
    mm.add("(min-width: 768px)", () => {
      let currentIndex = -1; // Track which cell we're currently on

      const xTo = gsap.quickTo(imgContainer, "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yTo = gsap.quickTo(imgContainer, "y", {
        duration: 0.8,
        ease: "power3",
      });

      window.addEventListener("mousemove", ({ clientX, clientY }) => {
        xTo(clientX + 20);
        yTo(clientY - imgContainer.getBoundingClientRect().height / 2);
      });

      gsap.set(bento, {
        zIndex: 1,
        pointerEvents: "all",
      });

      gsap.set(imgContainer, {
        scale: 0,
      });

      // Initially set all images to clip-50
      images.forEach((img) => {
        img.classList.add("clip-50");
        img.classList.remove("clip-0");
      });

      bento.addEventListener("mouseenter", () => {
        gsap.to(imgContainer, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      bento.addEventListener("mouseleave", () => {
        gsap.to(imgContainer, {
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        // Reset all images when leaving the bento area
        images.forEach((img) => {
          img.classList.remove("clip-0");
          img.classList.add("clip-50");
        });
        currentIndex = -1; // Reset current index
      });

      cells.forEach((cell, index) => {
        cell.addEventListener("mouseenter", () => {
          if (currentIndex === -1) {
            // First hover - reveal all images from 0 to current index
            for (let i = 0; i <= index; i++) {
              if (images[i]) {
                images[i].classList.remove("clip-50");
                images[i].classList.add("clip-0");
              }
            }
          } else if (index > currentIndex) {
            // Moving forward - reveal new images from currentIndex+1 to index
            for (let i = currentIndex + 1; i <= index; i++) {
              if (images[i]) {
                images[i].classList.remove("clip-50");
                images[i].classList.add("clip-0");
              }
            }
          } else if (index < currentIndex) {
            // Moving backward - hide images from index+1 to currentIndex
            for (let i = index + 1; i <= currentIndex; i++) {
              if (images[i]) {
                images[i].classList.remove("clip-0");
                images[i].classList.add("clip-50");
              }
            }
            // Ensure all images from 0 to index are visible
            for (let i = 0; i <= index; i++) {
              if (images[i]) {
                images[i].classList.remove("clip-50");
                images[i].classList.add("clip-0");
              }
            }
          }

          currentIndex = index; // Update current index
        });
      });
    });
  }
};
