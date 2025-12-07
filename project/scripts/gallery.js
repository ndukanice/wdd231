import serviceProjects from '../data/projects.mjs';

// Gallery data (featured completed projects)
const galleryProjects = [
    {
        id: 1,
        title: "Community Food Drive Success",
        category: "Hunger Relief",
        emoji: "🥫",
        hours: 120,
        participants: 45,
        impact: "Fed 85 families",
        description: "Our youth collected over 2,000 pounds of food for local families in need."
    },
    {
        id: 2,
        title: "Park Beautification Day",
        category: "Environment",
        emoji: "🌳",
        hours: 95,
        participants: 38,
        impact: "Cleaned 3 parks",
        description: "Youth volunteers removed trash, planted flowers, and painted benches."
    },
    {
        id: 3,
        title: "Senior Tech Training",
        category: "Education",
        emoji: "💻",
        hours: 180,
        participants: 25,
        impact: "Taught 42 seniors",
        description: "Helped elderly community members learn to use smartphones and video calls."
    },
    {
        id: 4,
        title: "Homeless Shelter Meals",
        category: "Hunger Relief",
        emoji: "🍲",
        hours: 150,
        participants: 52,
        impact: "Served 350 meals",
        description: "Prepared and served warm meals with love and compassion."
    },
    {
        id: 5,
        title: "Children's Book Collection",
        category: "Education",
        emoji: "📚",
        hours: 75,
        participants: 30,
        impact: "Donated 650 books",
        description: "Collected and distributed books to underfunded school libraries."
    },
    {
        id: 6,
        title: "Community Garden Launch",
        category: "Environment",
        emoji: "🌱",
        hours: 200,
        participants: 40,
        impact: "Planted 15 beds",
        description: "Started a sustainable garden that provides fresh produce to food banks."
    }
];

// Testimonials data
const testimonials = [
    {
        id: 1,
        name: "Sarah M.",
        age: 16,
        project: "Food Drive Coordinator",
        avatar: "👧",
        text: "Leading the food drive taught me so much about organization and compassion. Seeing the gratitude in families' eyes was truly humbling. Service has become a part of who I am."
    },
    {
        id: 2,
        name: "Jacob L.",
        age: 15,
        project: "Park Cleanup Volunteer",
        avatar: "👦",
        text: "I never realized how much impact we could make in just a few hours. Working together with other youth to beautify our community was amazing. I can't wait for the next project!"
    },
    {
        id: 3,
        name: "Emma R.",
        age: 17,
        project: "Tech Tutor",
        avatar: "👩",
        text: "Teaching seniors to video call their grandchildren was the most rewarding experience. Their joy and excitement made all the hours worth it. Service truly changes you."
    },
    {
        id: 4,
        name: "Michael T.",
        age: 14,
        project: "Shelter Volunteer",
        avatar: "🧑",
        text: "Serving meals at the homeless shelter opened my eyes to how blessed I am. The people we served were so grateful and kind. This experience changed my perspective on life."
    }
];

// Display gallery projects
function displayGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    try {
        // Use array method: map with template literals
        const galleryHTML = galleryProjects.map(project => `
            <article class="gallery-card">
                <div class="gallery-image">${project.emoji}</div>
                <div class="gallery-content">
                    <span class="gallery-badge">${project.category}</span>
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="gallery-stats">
                        <div class="gallery-stat"><strong>Hours:</strong> ${project.hours}</div>
                        <div class="gallery-stat"><strong>Youth:</strong> ${project.participants}</div>
                        <div class="gallery-stat"><strong>Impact:</strong> ${project.impact}</div>
                    </div>
                </div>
            </article>
        `).join('');
        
        galleryGrid.innerHTML = galleryHTML;
        
        console.log(`✅ Displayed ${galleryProjects.length} gallery projects`);
    } catch (error) {
        console.error('❌ Error displaying gallery:', error);
        galleryGrid.innerHTML = '<p>Unable to load gallery.</p>';
    }
}

// Display testimonials
function displayTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    
    if (!testimonialsGrid) return;
    
    try {
        // Use array method: map with template literals
        const testimonialsHTML = testimonials.map(testimonial => `
            <article class="testimonial-card">
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.avatar}</div>
                    <div class="author-info">
                        <h5>${testimonial.name}, Age ${testimonial.age}</h5>
                        <p>${testimonial.project}</p>
                    </div>
                </div>
            </article>
        `).join('');
        
        testimonialsGrid.innerHTML = testimonialsHTML;
        
        console.log(`✅ Displayed ${testimonials.length} testimonials`);
    } catch (error) {
        console.error('❌ Error displaying testimonials:', error);
        testimonialsGrid.innerHTML = '<p>Unable to load testimonials.</p>';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    try {
        displayGallery();
        displayTestimonials();
        console.log('✅ Gallery page initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing gallery page:', error);
    }
});
