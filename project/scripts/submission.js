// Get form data from URL parameters
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const submissionData = document.getElementById('submissionData');
    
    if (!submissionData) return;
    
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
    
    // Display form data
    const dataHTML = `
        <div class="detail-item">
            <span class="detail-label">Project Title:</span>
            <span class="detail-value">${urlParams.get('projectTitle') || 'N/A'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Category:</span>
            <span class="detail-value">${urlParams.get('projectCategory') || 'N/A'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Description:</span>
            <span class="detail-value">${urlParams.get('projectDescription') || 'N/A'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Your Name:</span>
            <span class="detail-value">${urlParams.get('proposerName') || 'N/A'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Your Email:</span>
            <span class="detail-value">${urlParams.get('proposerEmail') || 'N/A'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Estimated Participants:</span>
            <span class="detail-value">${urlParams.get('estimatedParticipants') || 'Not specified'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Submitted:</span>
            <span class="detail-value">${formatTimestamp(urlParams.get('timestamp'))}</span>
        </div>
    `;
    
    submissionData.innerHTML = dataHTML;
    
    console.log('✅ Form submission data displayed');
});
