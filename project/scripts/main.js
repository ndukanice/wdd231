// Set current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }
    
    const modifiedSpan = document.getElementById('lastModified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const navUl = mainNav.querySelector('ul');
        navUl.classList.toggle('show');
    });
}

// Video link (will be updated with actual video URL)
const videoLink = document.getElementById('videoLink');
if (videoLink) {
    videoLink.href = 'https://youtu.be/YOUR_VIDEO_ID'; // Update with actual video
    videoLink.target = '_blank';
}
