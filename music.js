document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });

document.querySelectorAll(".release-card").forEach((card) => {
    const playButton = card.querySelector(".play-button");
    const audio = card.querySelector("audio");
    const progressBar = card.querySelector(".progress-bar");
    const volumeBar = card.querySelector(".volume-bar");

    // Play/Pause functionality
    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = "Pause";
        } else {
            audio.pause();
            playButton.textContent = "Play";
        }
    });

    // Update progress bar as music plays
    audio.addEventListener("timeupdate", () => {
        // Update the progress bar value
        progressBar.value = (audio.currentTime / audio.duration) * 100;

        // Calculate the percentage of completion
        const percentage = (audio.currentTime / audio.duration) * 100;

        // Update the background gradient of the progress bar
        progressBar.style.background = `linear-gradient(to right, #00ff91 ${percentage}%, #444 ${percentage}%)`;
    });

    // Seek music
    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // Adjust volume
    volumeBar.addEventListener("input", () => {
        audio.volume = volumeBar.value;
    });
});



    // Swipe for releases grid
    const releasesGrid = document.getElementById('releasesGrid');
    let startX;

    releasesGrid?.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    releasesGrid?.addEventListener('touchmove', (event) => {
        const currentX = event.touches[0].clientX;
        const direction = startX - currentX;

        if (Math.abs(direction) > 30) {
            releasesGrid.scrollBy({ left: direction > 0 ? cardWidth : -cardWidth, behavior: 'smooth' });
            startX = currentX;
        }
    });
});
