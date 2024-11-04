document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });
});

 // JavaScript function to simulate connecting to the store page and fetching orders
  function redirectToStore() {
    window.location.href = "/store"; // Replace with actual store page URL if needed
  }

  // Function to load orders (placeholder for demonstration)
  function loadOrders() {
    const ordersSection = document.getElementById('orders-section');

    // Simulate an empty order list
    const hasOrders = false;

    if (!hasOrders) {
      // Display "No orders" message if there are no orders
      ordersSection.innerHTML = `
        <div class="no-orders-message">
          No orders found, buy some things at our <a href="#" onclick="redirectToStore()">Store</a> page.
        </div>`;
    } else {
      // Code to display orders if they exist would go here
    }
  }

  // Call loadOrders function on page load
  document.addEventListener('DOMContentLoaded', loadOrders);
