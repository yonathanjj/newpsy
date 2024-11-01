document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector('#masonry-gallery');

  // Initialize Masonry
  const masonry = new Masonry(grid, {
    itemSelector: '.gallery-card',
    columnWidth: '.gallery-card',
    percentPosition: true,
    gutter: 16,
  });

  // Re-layout on images load to avoid gaps
  imagesLoaded(grid, () => {
    masonry.layout();
  });
});

// GSAP animations for each gallery item
gsap.utils.toArray('.gallery-card').forEach((item, index) => {
  gsap.from(item, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: index * 0.1,
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});
