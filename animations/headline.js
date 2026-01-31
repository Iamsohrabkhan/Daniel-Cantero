const sectionHeaderAnimation = () => {
  const sectionHeadings = gsap.utils.toArray(".section_heading");
  if (sectionHeadings.length) {
    sectionHeadings.forEach((heading) => {
      const splitHeading = SplitText.create(heading, {
        type: "chars, lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "section_heading_line++",
        charsClass: "section_heading_char",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
        },
      });

      tl.fromTo(
        heading.querySelectorAll(
          ".section_heading_line1 .section_heading_char",
        ),
        {
          y: "-350%",
          rotateX: -24,
        },
        {
          y: "0%",
          rotateX: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "secondary",
        },
      );

      tl.fromTo(
        heading.querySelectorAll(
          ".section_heading_line2 .section_heading_char",
        ),
        {
          y: "310%",
          rotateX: -24,
        },
        {
          y: "0%",
          rotateX: 0,
          duration: 1,
          stagger: 0.06,
          ease: "secondary",
        },
        "<",
      );
    });
  }

  const sectionHeader = gsap.utils.toArray(".section_header");
  if (sectionHeader.length) {
    sectionHeader.forEach((curr) => {
      const subHeading = curr.querySelector(".section_sub_heading");
      const paragraph = curr.querySelector(".section_paragraph");
      gsap.effects.fade([subHeading, paragraph]);
    });
  }
};
