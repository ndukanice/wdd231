import serviceProjects from '../data/projects.mjs';

// Global variables
let allProjects = [];
let filteredProjects = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    try {
        allProjects = [...serviceProjects];
        filteredProjects = [...allProjects];
        
        displayProjects(filteredProjects);
        setupEventListeners();
        loadFilterPreferences();
        
        console.log(`✅ Loaded ${allProjects.length} projects successfully`);
    } catch (error) {
        console.error('❌ Error initializing planner page:', error);
    }
});

// Display projects in grid
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectCount = document.getElementById('projectCount');
    
    if (!projectsGrid) return;
    
    // Use array method: map with template literals
    const projectsHTML = projects.map(project => `
        <article class="project-card" data-id="${project.id}">
            <h3>${project.title}</h3>
            <div class="project-badges">
                <span class="badge category">${project.category}</span>
                <span class="badge difficulty ${project.difficulty}">${project.difficulty}</span>
            </div>
            <div class="project-info">
                <p><strong>Duration:</strong> ${project.duration}</p>
                <p><strong>Participants:</strong> ${project.participants}</p>
                <p><strong>Impact:</strong> ${project.impact}</p>
            </div>
            <p>${project.description.substring(0, 100)}...</p>
        </article>
    `).join('');
    
    projectsGrid.innerHTML = projectsHTML || '<p>No projects found matching your filters.</p>';
    projectCount.textContent = projects.length;
    
    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.getAttribute('data-id'));
            showProjectModal(projectId);
        });
    });
}

// Filter projects
function filterProjects() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    
    // Use array method: filter
    filteredProjects = allProjects.filter(project => {
        const categoryMatch = categoryFilter === 'all' || project.category === categoryFilter;
        const difficultyMatch = difficultyFilter === 'all' || project.difficulty === difficultyFilter;
        return categoryMatch && difficultyMatch;
    });
    
    displayProjects(filteredProjects);
    saveFilterPreferences();
}

// Save filter preferences to localStorage
function saveFilterPreferences() {
    const preferences = {
        category: document.getElementById('categoryFilter').value,
        difficulty: document.getElementById('difficultyFilter').value
    };
    
    try {
        localStorage.setItem('filterPreferences', JSON.stringify(preferences));
        console.log('✅ Filter preferences saved to localStorage');
    } catch (error) {
        console.error('❌ Error saving preferences:', error);
    }
}

// Load filter preferences from localStorage
function loadFilterPreferences() {
    try {
        const saved = localStorage.getItem('filterPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            document.getElementById('categoryFilter').value = preferences.category;
            document.getElementById('difficultyFilter').value = preferences.difficulty;
            filterProjects();
            console.log('✅ Filter preferences loaded from localStorage');
        }
    } catch (error) {
        console.error('❌ Error loading preferences:', error);
    }
}

// Show project details in modal
function showProjectModal(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    // Use template literals for modal content
    modalBody.innerHTML = `
        <h3>${project.title}</h3>
        <div class="modal-badges">
            <span class="badge category">${project.category}</span>
            <span class="badge difficulty ${project.difficulty}">${project.difficulty}</span>
        </div>
        <div class="modal-info">
            <p><strong>Duration:</strong> ${project.duration}</p>
            <p><strong>Participants Needed:</strong> ${project.participants}</p>
            <p><strong>Best Season:</strong> ${project.season}</p>
            <p><strong>Difficulty Level:</strong> ${project.difficulty}</p>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Materials Needed:</strong> ${project.materials}</p>
            <p><strong>Expected Impact:</strong> ${project.impact}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Filter controls
    document.getElementById('categoryFilter').addEventListener('change', filterProjects);
    document.getElementById('difficultyFilter').addEventListener('change', filterProjects);
    
    document.getElementById('resetFilters').addEventListener('click', () => {
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('difficultyFilter').value = 'all';
        filterProjects();
    });
    
    // Form controls
    const showFormBtn = document.getElementById('showFormBtn');
    const cancelFormBtn = document.getElementById('cancelFormBtn');
    const proposeForm = document.getElementById('proposeForm');
    
    showFormBtn.addEventListener('click', () => {
        proposeForm.classList.remove('hidden');
        showFormBtn.style.display = 'none';
    });
    
    cancelFormBtn.addEventListener('click', () => {
        proposeForm.classList.add('hidden');
        showFormBtn.style.display = 'inline-block';
        proposeForm.reset();
    });
    
    // Set timestamp when form is displayed
    proposeForm.addEventListener('submit', () => {
        document.getElementById('timestamp').value = new Date().toISOString();
    });
    
    // Modal close
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
