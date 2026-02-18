const processAnimation = () => {
  const cards = gsap.utils.toArray(".process_card");
  if (cards.length) {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        cards.forEach((card, index) => {
          gsap.set(card, {
            rotateY: -56,
            // perspective: 1200,
            // transformOrigin: "left top",
            y: isDesktop ? (index === 0 ? 300 : index === 1 ? 500 : 500) : 300, // fixed value for all indexes on mobile
            transform:"perspective(1200px)",
            willChange: "transform",
          });

          gsap.to(card, {
            rotateY: 0,
            y: isDesktop ? (index === 0 ? 0 : index === 1 ? 25 : 45) : 0,
            scrollTrigger: {
              trigger: isDesktop ? ".process_top" : card,
              scrub: 1,
              start: "top bottom",
              end: isDesktop ? "top top":"top center",
              // markers: true,
              
            },
          });
        });
      },
    );

    // reveal image process

    const headings = gsap.utils.toArray(".process_card_heading");

    headings.forEach((heading) => {
      const splitHeading = SplitText.create(heading, {
        type: "chars, lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "section_heading_line++",
        charsClass: "section_heading_char",
        onSplit: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              end: "bottom top",
              // toggleActions: "play reverse play reverse",
              // markers: true,
            },
          });
          let isRefreshing = false;

          const refresh = () => {
            if (!isRefreshing) return;
            tl.scrollTrigger.refresh();
          };

          ScrollTrigger.create({
            trigger: ".process_container",
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
              isRefreshing = true;
              gsap.ticker.add(refresh);
            },
            onLeave: () => {
              isRefreshing = false;
              gsap.ticker.remove(refresh);
            },
            onEnterBack: () => {
              isRefreshing = false;
              gsap.ticker.add(refresh);
            },
            onLeaveBack: () => {
              isRefreshing = false;
              gsap.ticker.remove(refresh);
            },
          });

          tl.fromTo(
            heading.querySelectorAll(
              ".section_heading_line1 .section_heading_char",
            ),
            {
              y: "-5em",
              rotateX: -24,
            },
            {
              y: "0em",
              rotateX: 0,

              duration: 1,
              stagger: 0.045,
              ease: "secondary",
            },
          );

          tl.fromTo(
            heading.querySelectorAll(
              ".section_heading_line2 .section_heading_char",
            ),
            {
              y: "1em",
              rotateX: -24,
            },
            {
              y: "-4em",
              rotateX: 0,

              duration: 1, // letterDuration from Framer
              stagger: 0.045, // letterDelay from Framer
              ease: "secondary",
            },
            "<",
          );
        },
      });
    });

    const imageWrapper = gsap.utils.toArray(".process_reveal_image_wrapper");
    imageWrapper.forEach((curr) => {
      gsap.set(curr, {
        clipPath: "inset(90%)",
      });
      gsap.to(curr, {
        clipPath: "inset(0%)",
        ease: "tertially",
        duration: 1,
        scrollTrigger: {
          trigger: curr,
          start: "top 95%",
          end: "bottom top",
          // markers: true,
        },
      });
    });
  }
};
