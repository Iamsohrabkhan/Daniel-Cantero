const faqAnimation = () => {
  const faqs = document.querySelectorAll(".faqs_question_answer");
  let activeFaq = null;
if (faqs.length) {
  faqs.forEach((faq,index) => {
    gsap.effects["slide-up"](faq, {
      delay: index * 0.05, // now works because only one element is passed
    });
    const question = faq.querySelector(".faqs_question");
    const answer = faq.querySelector(".faqs_answer");
    const icon = faq.querySelector(".faq_icon");

    // Initial state
    gsap.set(answer, { height: 0 });
    gsap.set(icon, { rotate: 0 });

    question.addEventListener("click", () => {
      // Close previously open FAQ
      if (activeFaq && activeFaq !== faq) {
        const activeAnswer = activeFaq.querySelector(".faqs_answer");
        const activeIcon = activeFaq.querySelector(".faq_icon");

        gsap.to(activeAnswer, {
          height: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(activeFaq, {
          paddingBottom: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(activeIcon, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      const isOpen = activeFaq === faq;

      // Toggle current FAQ
      gsap.to(answer, {
        height: isOpen ? 0 : "auto",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(faq, {
        paddingBottom: isOpen ? 0 : 24,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(icon, {
        rotate: isOpen ? 0 : 180,
        duration: 0.3,
        ease: "power2.out",
      });

      activeFaq = isOpen ? null : faq;
    });
  });
  
}
};
