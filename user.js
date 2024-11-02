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
