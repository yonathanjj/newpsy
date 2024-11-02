document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });
});

// Set active link for "Account Preview" page
document.addEventListener("DOMContentLoaded", function() {
  const accountLink = document.getElementById("account-preview-link");
  accountLink.classList.add("text-4CAF50");
});

// GSAP Animation for the main content
document.addEventListener('DOMContentLoaded', function () {
  // Animate elements with the class 'animate-left' from the left
  gsap.from('.animate-left', {
    x: -100, // start position
    opacity: 0, // fade in
    duration: 0.5, // duration of the animation
    stagger: 0.2, // delay between each animation
    ease: 'power2.out', // easing function
  });

  // Animate elements with the class 'animate-right' from the right
  gsap.from('.animate-right', {
    x: 100, // start position
    opacity: 0, // fade in
    duration: 0.5, // duration of the animation
    stagger: 0.2, // delay between each animation
    ease: 'power2.out', // easing function
  });
});
