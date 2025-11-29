import attractions from '../data/attractions.mjs';

// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Display Visit Message using localStorage
function displayVisitMessage() {
    const visitMessageDiv = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessageDiv.innerHTML = '<p>🎉 Welcome! Let us know if you have any questions.</p>';
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDiff = now - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            // Less than a day
            visitMessageDiv.innerHTML = '<p>👋 Back so soon! Awesome!</p>';
        } else if (daysDiff === 1) {
            visitMessageDiv.innerHTML = '<p>📅 You last visited 1 day ago.</p>';
        } else {
            visitMessageDiv.innerHTML = `<p>📅 You last visited ${daysDiff} days ago.</p>`;
        }
    }
    
    // Store current visit time
    localStorage.setItem('lastVisit', now);
}

// Display Attraction Cards
function displayAttractions() {
    const attractionsGrid = document.getElementById('attractions');
    
    attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.classList.add('attraction-card');
        card.setAttribute('data-id', attraction.id);
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="images/attractions/${attraction.image}" 
                     alt="${attraction.name}" 
                     loading="lazy"
                     width="300"
                     height="200">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more">Learn More</button>
        `;
        
        attractionsGrid.appendChild(card);
    });
    
    console.log(`Displayed ${attractions.length} attractions`);
}

// Initialize page
displayVisitMessage();
displayAttractions();
