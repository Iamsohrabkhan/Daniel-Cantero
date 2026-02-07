const ErrorPageAnimations = () => {
  const errorPage = document.querySelector(".error_section");
  const cursorButton = document.querySelector(".cursor_button");
  if (errorPage) {
    if (cursorButton) {
      const xTo = gsap.quickTo(cursorButton, "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursorButton, "y", {
        duration: 0.8,
        ease: "power3",
      });
      window.addEventListener("mousemove", ({ clientX, clientY }) => {
        xTo(clientX + 10);
        yTo(clientY + 10);
      });
    }

    const gridErro = createGridController(
      document.querySelector(".footer_canva"),
      {
        gridSize: 20,
        cellSize: 100,
        enableHover: true,
        elasticStrength: 20,
        liquidEffect: 15,
        waveAmplitude: 0.5,
      },
    );
    gridErro.create();
  }

  const textHeading = document.querySelectorAll(".erro_page_heading");
  if (textHeading.length) {
    const SplitHeading = SplitText.create(textHeading, {
      type: "lines,chars",
      mask: "lines",
      charsClass: "error_char",
      linesClass: "error_line++",
      onSplit: () => {},
    });

    gsap.fromTo(
      [
        textHeading[0].querySelectorAll(".error_line1 .error_char"),
        textHeading[2].querySelectorAll(".error_line1 .error_char"),
      ],
      {
        y: "0em",
        rotateY: -28,
      },
      {
        y: "-1.6em",
        duration: 1,
        ease: "back.inOut",
        stagger: 0.06,
        yoyo: true,
        repeat: -1,
        repeatDelay: 1,
        rotateY: 0,
      },
    );
    gsap.fromTo(
      [
        textHeading[1].querySelectorAll(".error_line1 .error_char"),
        textHeading[3].querySelectorAll(".error_line1 .error_char"),
      ],
      {
        y: "-1.6em",
        rotateY: -28,
      },
      {
        y: "0em",
        duration: 1,
        ease: "back.inOut",
        stagger: 0.06,
        yoyo: true,
        repeat: -1,
        repeatDelay: 1,
        rotateY: 0,
      },
    );
  }
};
