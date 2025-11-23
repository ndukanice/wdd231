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

// Get form data from URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Display form data
const formDataContainer = document.getElementById('formData');

// Get membership level display name
function getMembershipLevelName(value) {
    const levels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    return levels[value] || value;
}

// Format timestamp
function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Create HTML to display form data
const formDataHTML = `
    <div class="detail-item">
        <span class="detail-label">First Name:</span>
        <span class="detail-value">${urlParams.get('firstName') || 'N/A'}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Last Name:</span>
        <span class="detail-value">${urlParams.get('lastName') || 'N/A'}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Email:</span>
        <span class="detail-value">${urlParams.get('email') || 'N/A'}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Mobile Phone:</span>
        <span class="detail-value">${urlParams.get('phone') || 'N/A'}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Business Name:</span>
        <span class="detail-value">${urlParams.get('businessName') || 'N/A'}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Membership Level:</span>
        <span class="detail-value">${getMembershipLevelName(urlParams.get('membershipLevel'))}</span>
    </div>
    <div class="detail-item">
        <span class="detail-label">Submitted:</span>
        <span class="detail-value">${formatTimestamp(urlParams.get('timestamp'))}</span>
    </div>
`;

formDataContainer.innerHTML = formDataHTML;
