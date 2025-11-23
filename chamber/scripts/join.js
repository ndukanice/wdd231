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

// Set timestamp when form loads
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    const now = new Date();
    timestampField.value = now.toISOString();
});

// Modal functionality
const modals = document.querySelectorAll('.modal');
const learnMoreButtons = document.querySelectorAll('.learn-more');
const closeButtons = document.querySelectorAll('.close');

// Open modal when "Learn More" is clicked
learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

// Close modal when X is clicked
closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});
