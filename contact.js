// GSAP animations
gsap.from(".navbar", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "bounce.out"
});

gsap.from(".left-section h1", {
    duration: 1.5,
    x: -100,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".left-section p", {
    duration: 1.5,
    x: -100,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5
});

gsap.from(".contact-button", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power3.out",
    delay: 1
});

gsap.from(".right-section", {
    duration: 1.5,
    x: 100,
    opacity: 0,
    ease: "power3.out",
    delay: 1
});

// Change color of send-circle on click
document.querySelector(".send-section a").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent form submission for testing
    gsap.to(".send-circle", {
        backgroundColor: "yellow",
        duration: 0.3
    });
});
