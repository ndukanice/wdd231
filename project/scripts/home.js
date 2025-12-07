import serviceProjects from '../data/projects.mjs';

// Display recent highlights (first 3 projects)
function displayHighlights() {
    const highlightsGrid = document.getElementById('highlightsGrid');
    
    if (!highlightsGrid) return;
    
    try {
        // Use array method: slice to get first 3 projects
        const recentProjects = serviceProjects.slice(0, 3);
        
        // Use array method: map with template literals
        const highlightsHTML = recentProjects.map(project => `
            <article class="highlight-card">
                <span class="highlight-badge">${project.category}</span>
                <h3>${project.title}</h3>
                <p><strong>Duration:</strong> ${project.duration}</p>
                <p><strong>Impact:</strong> ${project.impact}</p>
                <p>${project.description}</p>
            </article>
        `).join('');
        
        highlightsGrid.innerHTML = highlightsHTML;
        
        console.log('✅ Displayed 3 recent project highlights');
    } catch (error) {
        console.error('❌ Error displaying highlights:', error);
        highlightsGrid.innerHTML = '<p>Unable to load recent highlights.</p>';
    }
}

// Animate statistics counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayHighlights();
    
    // Animate stats when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
    });
    
    const statsSection = document.querySelector('.quick-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
