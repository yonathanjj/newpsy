document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });


// Get the elements
const myTicketsCircle = document.getElementById('myTicketsCircle');
const ticketPopup = document.getElementById('ticketPopup');
const closeBtn = document.getElementById('closeBtn');
const ticketList = document.getElementById('ticketList');

// Toggle the popup when the "My Tickets" circle is clicked
myTicketsCircle.addEventListener('click', function(event) {
    event.stopPropagation();
    // Toggle the 'show' class to either show or hide the popup
    ticketPopup.classList.toggle('show');
});

// Close the popup when the close button is clicked
closeBtn.addEventListener('click', function() {
    ticketPopup.classList.remove('show'); // Hide the modal
});

// Close the popup if the user clicks outside of the modal
window.addEventListener('click', function(event) {
    if (event.target === ticketPopup) {
        ticketPopup.classList.remove('show');
    }
});

// Function to add tickets dynamically with "Used" and "Use" sections
function addTicket(ticketId, imageSrc, title, date, details, price, numPeople) {
    const ticketItem = document.createElement('li');
    ticketItem.classList.add('ticket-item');

    // Create ticket image element
    const ticketImg = document.createElement('div');
    ticketImg.classList.add('ticket-img');
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title;
    ticketImg.appendChild(img);

    // Create ticket details
    const ticketDetails = document.createElement('div');
    ticketDetails.classList.add('ticket-details');
    const ticketTitle = document.createElement('h3');
    ticketTitle.textContent = title;
    const ticketDate = document.createElement('p');
    ticketDate.textContent = `Date: ${date}`;
    const ticketDetailsText = document.createElement('p');
    ticketDetailsText.textContent = details;

    // Add Money Paid and Number of People
    const ticketPaymentInfo = document.createElement('p');
    ticketPaymentInfo.classList.add('ticket-payment-info');
    ticketPaymentInfo.textContent = `Amount Paid: $${price} for ${numPeople} ${numPeople > 1 ? 'people' : 'person'}`;
    ticketDetails.appendChild(ticketPaymentInfo);

    // Create ticket status (Used and Use)
    const ticketStatus = document.createElement('div');
    ticketStatus.classList.add('ticket-status');

    // Used label
    const usedLabel = document.createElement('span');
    usedLabel.classList.add('used-label');

    // Use label
    const useLabel = document.createElement('span');
    useLabel.classList.add('use-label');
    useLabel.textContent = 'Use';

    // Fetch the ticket status from the backend (API)
    fetch(`/ticket-status/${ticketId}`)
        .then(response => response.json())
        .then(data => {
            if (data.used) {
                // If the ticket is used, show "Used" and hide "Use"
                usedLabel.textContent = 'Used';
                ticketStatus.appendChild(usedLabel);
            } else {
                // If the ticket is not used, show "Use" and hide "Used"
                useLabel.onclick = function() {
                    // Simulate the use button action, this could send a backend request to mark the ticket as used
                    alert('You clicked Use!');
                    // Optional: Send a request to mark the ticket as used
                    fetch(`/update-ticket-status/${ticketId}`, {
                        method: 'POST',
                        body: JSON.stringify({ used: true }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Change the status to 'Used' after the action is successful
                            usedLabel.textContent = 'Used';
                            ticketStatus.appendChild(usedLabel);
                        }
                    })
                    .catch(error => {
                        console.error('Error updating ticket status:', error);
                    });
                };
                ticketStatus.appendChild(useLabel);
            }
        })
        .catch(error => {
            console.error('Error fetching ticket status:', error);
        });

    // Append details to ticket
    ticketDetails.appendChild(ticketTitle);
    ticketDetails.appendChild(ticketDate);
    ticketDetails.appendChild(ticketDetailsText);

    // Append ticket to list
    ticketItem.appendChild(ticketImg);
    ticketItem.appendChild(ticketDetails);
    ticketItem.appendChild(ticketStatus);

    ticketList.appendChild(ticketItem);
}

// Example: Dynamically add a ticket (replace with your actual ticket IDs, price, and people count)
addTicket(1, 'ticket1.jpg', 'Concert: The Weeknd', '2024-12-15', 'Venue: Madison Square Garden', 120, 3);
addTicket(2, 'ticket2.jpg', 'Festival: Coachella', '2025-04-10', 'Location: Indio, CA', 200, 5);
addTicket(3, 'ticket3.jpg', 'Play: Hamilton', '2025-02-25', 'Venue: Broadway', 150, 2);


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

