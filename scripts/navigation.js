const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('open')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});
