// GSAP Animation
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.section, .team-section, .content-section');

// Animate each section on scroll
sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50, // Moves the element up by 50px
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            start: 'top bottom', // Trigger the animation when the top of the section hits the bottom of the viewport
            toggleActions: 'play none none reverse', // Play on enter and reverse on leave
        }
    });
});
