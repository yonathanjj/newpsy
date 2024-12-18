const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden'); // Toggle visibility

        // GSAP Animation
        if (!mobileMenu.classList.contains('hidden')) {
            gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
        } else {
            gsap.to(mobileMenu, { opacity: 0, y: -20, duration: 0.5 });
        }
    });

document.addEventListener('DOMContentLoaded', function() {
  const gallerySection = document.querySelector('.gallery-container section');

  // Function to fetch images from the backend (adjust URL according to your backend API)
  function fetchImages() {
    fetch('/api/images') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        // Assuming the server returns an array of image URLs
        data.images.forEach(imageUrl => {
          addImageToGallery(imageUrl);
        });
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }

  // Function to add an image to the gallery
  function addImageToGallery(imageUrl) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item', 'relative', 'group');

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Gallery Image';
    imgElement.classList.add('gallery-image');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'absolute', 'inset-0', 'bg-black', 'bg-opacity-50', 'opacity-0', 'group-hover:opacity-100', 'transition', 'duration-300');

    galleryItem.appendChild(imgElement);
    galleryItem.appendChild(overlay);

    gallerySection.appendChild(galleryItem);
  }

  // Fetch images on page load
  fetchImages();

  // Optionally, you could call fetchImages periodically or when certain events happen (e.g., image uploaded from the admin panel)
});
