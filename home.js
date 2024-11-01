document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Existing GSAP animations
    gsap.from(".main-content h1", {
        duration: 1.5,
        opacity: 0,
        y: -50,
        ease: "bounce"
    });

    gsap.from(".main-content p", {
        duration: 1,
        opacity: 0,
        delay: 0.5,
        y: 20
    });

    gsap.from(".buttons button", {
        duration: 1,
        opacity: 0,
        delay: 1,
        y: 20,
        stagger: 0.3
    });

    gsap.from(".info-text", {
        duration: 1,
        opacity: 0,
        x: -50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".info-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".info-image img", {
        duration: 1,
        opacity: 0,
        x: 50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".info-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });


document.addEventListener("DOMContentLoaded", function () {
    const eventsGrid = document.querySelector(".events-grid");
    const eventCards = document.querySelectorAll(".event-card");
    const cardWidth = eventCards[0].offsetWidth + 30; // Card width + gap
    let currentPosition = 0;

    function slide(direction) {
        if (direction === "left") {
            currentPosition -= cardWidth;
            if (currentPosition < -cardWidth * (eventCards.length - 1)) {
                currentPosition = 0; // Loop back to start
            }
        } else {
            currentPosition += cardWidth;
            if (currentPosition > 0) {
                currentPosition = -cardWidth * (eventCards.length - 1); // Loop back to end
            }
        }

        eventsGrid.style.transform = `translateX(${currentPosition}px)`;
    }

    document.getElementById("left-icon").addEventListener("click", () => slide("left"));
    document.getElementById("right-icon").addEventListener("click", () => slide("right"));
});




const eventsGrid = document.querySelector('.events-grid');
let isScrollingEvents = false;

function scrollToNextEvent(direction) {
    const cardWidth = eventsGrid.offsetWidth; // Get the width of the container
    const currentScroll = eventsGrid.scrollLeft; // Get current scroll position
    const targetScroll = currentScroll + (direction * cardWidth); // Calculate the target scroll position

    eventsGrid.scrollTo({
        left: targetScroll,
        behavior: 'smooth', // Smooth scrolling effect
    });
}

// Event listener for mouse wheel
eventsGrid.addEventListener('wheel', (event) => {
    if (window.innerWidth <= 768) { // Check if in mobile view
        event.preventDefault(); // Prevent the default scrolling behavior
        if (!isScrollingEvents) {
            isScrollingEvents = true;
            const direction = event.deltaY > 0 ? 1 : -1; // Determine the scroll direction
            scrollToNextEvent(direction);
            setTimeout(() => isScrollingEvents = false, 600); // Set a timeout to prevent rapid scrolling
        }
    }
});


// Event listener for touch swipe
let startXEvents;

eventsGrid.addEventListener('touchstart', (event) => {
    if (window.innerWidth <= 768) { // Check if in mobile view
        startXEvents = event.touches[0].clientX; // Get the initial touch position
    }
});

eventsGrid.addEventListener('touchmove', (event) => {
    if (window.innerWidth <= 768) { // Check if in mobile view
        const currentX = event.touches[0].clientX; // Get the current touch position
        const direction = startXEvents - currentX; // Calculate the swipe direction

        if (Math.abs(direction) > 30) { // If the swipe is significant enough
            scrollToNextEvent(direction > 0 ? 1 : -1); // Scroll to the next or previous card
            startXEvents = currentX; // Reset start position to prevent rapid scrolling
        }
    }
});

const playButton = document.querySelector('.play-button');
const audioPlayer = document.getElementById('audio-player');
const audio = document.getElementById('audio');
const pauseButton = document.querySelector('.pause-button');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');

// Update total time when audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    totalTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

// Show player controls and play audio
playButton.addEventListener('click', () => {
    audio.play().then(() => {
        audioPlayer.classList.remove('hidden'); // Show audio player when playing
        gsap.fromTo(audioPlayer, { opacity: 0 }, { opacity: 1, duration: 1 });
    }).catch(error => {
        console.error("Error playing audio:", error);
    });
});

// Update current time and progress bar
audio.addEventListener('timeupdate', () => {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Pause audio and hide player controls
pauseButton.addEventListener('click', () => {
    audio.pause();
    audioPlayer.classList.add('hidden'); // Hide audio player when paused
});

// Update progress bar on click
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

const releasesGrid = document.querySelector('.releases-grid');
let isScrolling = false;

function scrollToNextCard(direction) {
    const cardWidth = releasesGrid.offsetWidth; // Get the width of the container
    const currentScroll = releasesGrid.scrollLeft; // Get current scroll position
    const targetScroll = currentScroll + (direction * cardWidth); // Calculate the target scroll position

    releasesGrid.scrollTo({
        left: targetScroll,
        behavior: 'smooth', // Smooth scrolling effect
    });
}

// Event listener for mouse wheel
releasesGrid.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent the default scrolling behavior
    if (!isScrolling) {
        isScrolling = true;
        const direction = event.deltaY > 0 ? 1 : -1; // Determine the scroll direction
        scrollToNextCard(direction);
        setTimeout(() => isScrolling = false, 600); // Set a timeout to prevent rapid scrolling
    }
});

// Event listener for touch swipe
let startX;

releasesGrid.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Get the initial touch position
});

releasesGrid.addEventListener('touchmove', (event) => {
    const currentX = event.touches[0].clientX; // Get the current touch position
    const direction = startX - currentX; // Calculate the swipe direction

    if (Math.abs(direction) > 30) { // If the swipe is significant enough
        scrollToNextCard(direction > 0 ? 1 : -1); // Scroll to the next or previous card
        startX = currentX; // Reset start position to prevent rapid scrolling
    }
});


