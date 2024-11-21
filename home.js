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

// Select the info button and the dropdown
const infoButton = document.querySelector('.info-btn');
const dropdown = document.querySelector('.dropdown-info');

// Toggle dropdown visibility on button click
infoButton.addEventListener('click', () => {
    dropdown.classList.toggle('visible');
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

document.addEventListener("DOMContentLoaded", () => {
    const events = document.querySelectorAll(".event-card");

    events.forEach(event => {
        const infoButton = event.querySelector(".outline-button:nth-child(1)");
        const ticketButton = event.querySelector(".outline-button:nth-child(2)");

        // Info Popup
        infoButton.addEventListener("click", (e) => {
            const position = getButtonPosition(e.target);
            showPopup(position, `
                <div style="color: yellow; font-size: 1.5em; font-weight: bold;">Event Details</div>
                <p style="color: white;">Location: Boom, Belgium</p>
                <p style="color: white;">Date: July 19-21, 2024</p>
                <p style="color: white;">Time: 6:00 PM - 2:00 AM</p>
            `);
        });

        // Tickets Popup
        ticketButton.addEventListener("click", (e) => {
            const position = getButtonPosition(e.target);
            let ticketCount = 1;
            const ticketPrice = 100;

            const updatePrice = () => ticketCount * ticketPrice;

            showPopup(position, `
                <div style="color: yellow; font-size: 1.5em; font-weight: bold;">Ticket Purchase</div>
                <div style="color: white; margin-top: 20px;">
                    <p>Tickets:</p>
                    <button id="decrease" style="padding: 5px; margin-right: 10px;">-</button>
                    <span id="ticket-count">${ticketCount}</span>
                    <button id="increase" style="padding: 5px; margin-left: 10px;">+</button>
                </div>
                <p style="color: white; margin-top: 10px;">Total Price: <span id="total-price">${updatePrice()}</span> ETB</p>
                <button id="buy-button" style="border: 2px solid white; background: transparent; padding: 10px 20px; color: white; font-weight: bold; cursor: pointer; margin-top: 20px;">Buy</button>
            `);

            document.getElementById("increase").addEventListener("click", () => {
                ticketCount++;
                document.getElementById("ticket-count").textContent = ticketCount;
                document.getElementById("total-price").textContent = updatePrice();
            });

            document.getElementById("decrease").addEventListener("click", () => {
                if (ticketCount > 1) {
                    ticketCount--;
                    document.getElementById("ticket-count").textContent = ticketCount;
                    document.getElementById("total-price").textContent = updatePrice();
                }
            });
        });
    });

    // Function to Show Popup
    function showPopup(position, content) {
        const popup = document.createElement("div");
        popup.style.position = "absolute";
        popup.style.top = `${position.top}px`;
        popup.style.left = `${position.left}px`;
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "black";
        popup.style.color = "white";
        popup.style.padding = "20px";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.style.zIndex = "1000";
        popup.innerHTML = `
            ${content}
            <button id="close-popup" style="margin-top: 20px; background: none; border: 1px solid white; color: white; padding: 10px 20px; cursor: pointer;">Close</button>
        `;
        document.body.appendChild(popup);

        document.getElementById("close-popup").addEventListener("click", () => {
            document.body.removeChild(popup);
        });
    }

    // Function to Get Button Position
    function getButtonPosition(button) {
        const rect = button.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY + rect.height / 2,
            left: rect.left + window.scrollX + rect.width / 2,
        };
    }
});
