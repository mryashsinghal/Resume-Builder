// Enhanced ScrollSpy for navbar active link (without sticky color change)
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id], .template, .about');
    const navLinks = document.querySelectorAll('.nav-bar ul li a');
    
    // ScrollSpy functionality only (no sticky behavior changes)
    window.addEventListener('scroll', () => {
        // ScrollSpy functionality - enhanced version
        let currentSection = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150; // Increased offset for better detection
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id') || section.className.split(' ')[0];
            }
        });
        
        // Handle special case when at very top of page
        if (pageYOffset < 100) {
            currentSection = 'home';
        }
        
        // Update active nav links
        navLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Handle both ID-based and class-based sections
            if (href === `#${currentSection}` || 
                (currentSection === 'template' && href === '#template') ||
                (currentSection === 'about' && href === '#about') ||
                (currentSection === 'home' && href === '#home')) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                let targetSection = document.getElementById(targetId);
                
                // Fallback: try to find section by class if ID doesn't exist
                if (!targetSection) {
                    targetSection = document.querySelector(`.${targetId}`);
                }
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 120; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: Math.max(0, offsetTop), // Ensure we don't scroll to negative position
                        behavior: 'smooth'
                    });
                    
                    // Manually set active state during smooth scroll
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Set initial active state
    const homeLink = document.querySelector('.nav-bar ul li a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Trigger initial scroll event to set correct active state
    window.dispatchEvent(new Event('scroll'));
});

// Enhanced Intersection Observer for more precise detection (optional enhancement)
const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -70% 0px', // Adjusted margins for better detection
    threshold: [0, 0.1, 0.5]
};

const intersectionObserver = new IntersectionObserver((entries) => {
    let mostVisibleEntry = null;
    let maxIntersectionRatio = 0;
    
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
        }
    });
    
    if (mostVisibleEntry) {
        const sectionId = mostVisibleEntry.target.getAttribute('id') || 
                         mostVisibleEntry.target.className.split(' ')[0];
        const navLinks = document.querySelectorAll('.nav-bar ul li a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}, observerOptions);

// Initialize intersection observer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id], .template, .about');
    sections.forEach(section => {
        intersectionObserver.observe(section);
    });
});

// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optional: Use debounced scroll for better performance on slower devices
const debouncedScrollHandler = debounce(() => {
    // Additional scroll handling if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);