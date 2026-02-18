// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                document.querySelector(href)?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active page highlighting
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) || 
            (currentLocation.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});