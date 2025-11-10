console.log('Directory.js loaded successfully!');

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

// View toggle functionality
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const memberDirectory = document.getElementById('memberDirectory');

gridViewBtn.addEventListener('click', () => {
    memberDirectory.className = 'grid-view';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    gridViewBtn.setAttribute('aria-pressed', 'true');
    listViewBtn.setAttribute('aria-pressed', 'false');
});

listViewBtn.addEventListener('click', () => {
    memberDirectory.className = 'list-view';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    listViewBtn.setAttribute('aria-pressed', 'true');
    gridViewBtn.setAttribute('aria-pressed', 'false');
});

// Fetch and display members
async function fetchMembers() {
    try {
        console.log('Fetching members...');
        const response = await fetch('data/members.json');  // lowercase
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Members loaded:', data);
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching members:', error);
        memberDirectory.innerHTML = '<p style="color: red; padding: 2rem;">Error loading member directory. Please check console for details.</p>';
    }
}

function displayMembers(members) {
    memberDirectory.innerHTML = '';
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.setAttribute('role', 'listitem');
        
        const membershipLevelText = getMembershipLevelText(member.membershipLevel);
        
        // Correct path - images folder is at same level as directory.html
        const imagePath = `images/${member.icon}`;
        
        // Create image element
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = `${member.name} company logo`;
        imgElement.loading = 'lazy';
        imgElement.width = 400;
        imgElement.height = 200;
        
        imgElement.onerror = function() {
            console.error(`❌ FAILED to load: ${imagePath}`);
            console.error(`Full attempted URL: ${this.src}`);
            this.src = `https://placehold.co/400x200/1e5a8e/ffffff?text=${encodeURIComponent(member.name)}`;
        };
        
        imgElement.onload = function() {
            console.log(`✅ SUCCESS: Loaded ${imagePath}`);
        };
        
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <span class="membership-level level-${member.membershipLevel}">${membershipLevelText}</span>
            <p><strong>Industry:</strong> ${member.industry}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^0-9+]/g, '')}">${member.phone}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p><strong>Contact:</strong> ${member.contactPerson}</p>
            <p><strong>Founded:</strong> ${member.founded}</p>
        `;
        
        memberCard.insertBefore(imgElement, memberCard.firstChild);
        memberDirectory.appendChild(memberCard);
    });
    
    console.log(`Displayed ${members.length} members`);
}

function getMembershipLevelText(level) {
    switch(level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Member';
    }
}

// Initialize
console.log('Initializing...');
fetchMembers();
