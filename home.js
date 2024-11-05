document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });

    // GSAP animations
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

    // Horizontal scrolling for events grid
    const eventsGrid = document.getElementById('eventsGrid');
    const leftScroll = document.getElementById('leftScroll');
    const rightScroll = document.getElementById('rightScroll');

    if (eventsGrid && leftScroll && rightScroll) {
        const cardWidth = document.querySelector('.event-card').offsetWidth + 30; // Adjust as needed

        leftScroll.addEventListener('click', () => {
            eventsGrid.scrollBy({ top: 0, left: -cardWidth, behavior: 'smooth' });
        });

        rightScroll.addEventListener('click', () => {
            eventsGrid.scrollBy({ top: 0, left: cardWidth, behavior: 'smooth' });
        });
    }

    // Touch swipe for events grid
    let startXEvents;
    eventsGrid?.addEventListener('touchstart', (event) => {
        if (window.innerWidth <= 768) {
            startXEvents = event.touches[0].clientX;
        }
    });

    eventsGrid?.addEventListener('touchmove', (event) => {
        if (window.innerWidth <= 768) {
            const currentX = event.touches[0].clientX;
            const direction = startXEvents - currentX;

            if (Math.abs(direction) > 30) {
                eventsGrid.scrollBy({ left: direction > 0 ? cardWidth : -cardWidth, behavior: 'smooth' });
                startXEvents = currentX;
            }
        }
    });

    // Audio player
    const playButton = document.querySelector('.play-button');
    const audioPlayer = document.getElementById('audio-player');
    const audio = document.getElementById('audio');
    const pauseButton = document.querySelector('.pause-button');
    const progressBar = document.querySelector('.progress-bar');
    const currentTime = document.querySelector('.current-time');
    const totalTime = document.querySelector('.total-time');

    if (audio) {
        audio.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60);
            totalTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        });

        playButton?.addEventListener('click', () => {
            audio.play().then(() => {
                audioPlayer?.classList.remove('hidden');
                gsap.fromTo(audioPlayer, { opacity: 0 }, { opacity: 1, duration: 1 });
            }).catch(error => console.error("Error playing audio:", error));
        });

        audio.addEventListener('timeupdate', () => {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            currentTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        });

        pauseButton?.addEventListener('click', () => {
            audio.pause();
            audioPlayer?.classList.add('hidden');
        });

        progressBar?.addEventListener('input', () => {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        });
    }

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

// JavaScript for scroll buttons in the latest-releases section
document.addEventListener("DOMContentLoaded", function() {
    const releasesGrid = document.querySelector(".releases-grid");
    const scrollLeftButton = document.querySelector(".scroll-left");
    const scrollRightButton = document.querySelector(".scroll-right");

    // Scroll settings
    const scrollAmount = 320; // Adjust the scroll distance per click

    // Event listeners for scroll buttons
    scrollLeftButton.addEventListener("click", function() {
        releasesGrid.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

    scrollRightButton.addEventListener("click", function() {
        releasesGrid.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    // Optional: Hide left/right buttons at the start/end of scroll
    function updateScrollButtons() {
        const scrollLeft = releasesGrid.scrollLeft;
        const maxScrollLeft = releasesGrid.scrollWidth - releasesGrid.clientWidth;

        // Hide left button if at the start of the scroll
        scrollLeftButton.style.display = scrollLeft <= 0 ? "none" : "block";
        // Hide right button if at the end of the scroll
        scrollRightButton.style.display = scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    // Update button visibility on scroll
    releasesGrid.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons(); // Initial check
});
