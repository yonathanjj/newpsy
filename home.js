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



 document.addEventListener('DOMContentLoaded', () => {
     const eventsGrid = document.getElementById('eventsGrid');
     const leftScroll = document.getElementById('leftScroll');
     const rightScroll = document.getElementById('rightScroll');

     // Add event listener to scroll left
     leftScroll.addEventListener('click', () => {
         eventsGrid.scrollBy({
             top: 0,
             left: -300, // Adjust this value for scroll distance
             behavior: 'smooth'
         });
     });

     // Add event listener to scroll right
     rightScroll.addEventListener('click', () => {
         eventsGrid.scrollBy({
             top: 0,
             left: 300, // Adjust this value for scroll distance
             behavior: 'smooth'
         });
     });
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


