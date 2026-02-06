 
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
  };