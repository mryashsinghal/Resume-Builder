// Resume Tips Page JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeActionVerbs();
    initializeTemplateFilters();
    initializeTemplateSelection();
    initializeTour();
    handleAuthState();
});

// Action Verbs Functionality
function initializeActionVerbs() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.closest('.verb-category');
            const isActive = category.classList.contains('active');
            
            // Close all categories first
            document.querySelectorAll('.verb-category').forEach(cat => {
                cat.classList.remove('active');
            });
            
            // Open clicked category if it wasn't active
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });

    // Copy to clipboard functionality
    const verbs = document.querySelectorAll('.verb');
    verbs.forEach(verb => {
        verb.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const text = this.textContent;
            
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast(`"${text}" copied to clipboard!`);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    fallbackCopyTextToClipboard(text);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(text);
            }
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast(`"${text}" copied to clipboard!`);
        } else {
            showToast('Failed to copy verb');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showToast('Failed to copy verb');
    }
    
    document.body.removeChild(textArea);
}

// Template Filter Functionality
function initializeTemplateFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter templates
            templateCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Template Selection Functionality
function initializeTemplateSelection() {
    const useTemplateButtons = document.querySelectorAll('.use-template-btn');
    
    useTemplateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateType = this.dataset.template;
            
            // Save selected template to localStorage
            localStorage.setItem('selectedTemplate', templateType);
            localStorage.setItem('templateSelectionTime', new Date().toISOString());
            
            // Show confirmation
            showToast(`Template "${templateType}" selected! Redirecting...`);
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const span = toast.querySelector('span');
    
    span.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Shepherd.js Tour - FIXED VERSION
function initializeTour() {
    // Check if Shepherd is loaded
    if (typeof Shepherd === 'undefined') {
        console.warn('Shepherd.js not loaded');
        return;
    }

    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true,
            },
            classes: 'shepherd-theme-default',
            scrollTo: { behavior: 'smooth', block: 'center' },
            when: {
                show() {
                    // Ensure proper positioning
                    setTimeout(() => {
                        const element = this.getElement();
                        if (element) {
                            element.style.zIndex = '10000';
                        }
                    }, 100);
                }
            }
        },
        useModalOverlay: true
    });

    // Step 1: Action Verbs
    tour.addStep({
        title: '🚀 Action Verbs Library',
        text: 'Discover powerful action verbs categorized by skill type. Click any category header to expand and see the verbs. Click any verb to copy it to your clipboard!',
        attachTo: {
            element: '.action-verbs-section',
            on: 'bottom',
        },
        buttons: [
            {
                action() {
                    return this.cancel();
                },
                classes: 'shepherd-button-secondary',
                text: 'Skip Tour'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next →',
            },
        ],
        when: {
            show() {
                // Scroll to the action verbs section
                document.querySelector('.action-verbs-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    // Step 2: Verb Categories
    tour.addStep({
        title: '📂 Verb Categories',
        text: 'Each category contains verbs specific to different skills. Try clicking on "Leadership" to see it in action!',
        attachTo: {
            element: '.verb-category:first-child .category-header',
            on: 'right',
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '← Back'
            },
            {
                action() {
                    return this.cancel();
                },
                classes: 'shepherd-button-secondary',
                text: 'Skip'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next →',
            },
        ],
        when: {
            show() {
                // Auto-open the first category for demonstration
                const firstCategory = document.querySelector('.verb-category:first-child');
                if (firstCategory && !firstCategory.classList.contains('active')) {
                    firstCategory.classList.add('active');
                }
            }
        }
    });

    // Step 3: Template Filters
    tour.addStep({
        title: '🎨 Template Gallery',
        text: 'Browse our professional templates! Use these filter buttons to find templates by style - Professional, Creative, or Modern.',
        attachTo: {
            element: '.filter-buttons',
            on: 'bottom',
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '← Back'
            },
            {
                action() {
                    return this.cancel();
                },
                classes: 'shepherd-button-secondary',
                text: 'Skip'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next →',
            },
        ],
        when: {
            show() {
                // Scroll to template section
                document.querySelector('.template-preview-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    // Step 4: Template Selection
    tour.addStep({
        title: '📋 Template Selection',
        text: 'When you find a template you like, click "Use This Template" to save your choice and return to the main page to start building your resume!',
        attachTo: {
            element: '.template-card:first-child .use-template-btn',
            on: 'top',
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '← Back'
            },
            {
                action() {
                    return this.cancel();
                },
                classes: 'shepherd-button-secondary',
                text: 'Skip'
            },
            {
                action() {
                    return this.next();
                },
                text: 'Next →',
            },
        ],
    });

    // Step 5: Do's and Don'ts
    tour.addStep({
        title: '✅ Best Practices',
        text: 'Review these essential do\'s and don\'ts to create a resume that stands out. These guidelines will help you craft a professional and effective resume!',
        attachTo: {
            element: '.dos-donts-section',
            on: 'top',
        },
        buttons: [
            {
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: '← Back'
            },
            {
                action() {
                    return this.cancel();
                },
                classes: 'shepherd-button-secondary',
                text: 'Skip'
            },
            {
                action() {
                    return this.complete();
                },
                text: 'Finish Tour!',
            },
        ],
        when: {
            show() {
                // Scroll to dos and don'ts section
                document.querySelector('.dos-donts-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    // Tour completion handler
    tour.on('complete', () => {
        showToast('Tour completed! You\'re ready to create amazing resumes!');
        localStorage.setItem('hasSeenTipsTour', 'true');
    });

    tour.on('cancel', () => {
        localStorage.setItem('hasSeenTipsTour', 'true');
    });

    // Auto-start tour for new users (with delay to ensure page is fully loaded)
    const hasSeenTipsTour = localStorage.getItem('hasSeenTipsTour');
    if (!hasSeenTipsTour) {
        setTimeout(() => {
            // Double-check that Shepherd is still available
            if (typeof Shepherd !== 'undefined') {
                tour.start();
            }
        }, 2000); // Increased delay to ensure everything is loaded
    }

    // Manual tour trigger
    window.startTipsTour = () => {
        if (typeof Shepherd !== 'undefined') {
            tour.start();
        } else {
            showToast('Tour is not available at the moment');
        }
    };

    // Add tour restart button (optional - you can add this to your HTML)
    const addTourButton = () => {
        const existingButton = document.getElementById('restart-tour-btn');
        if (!existingButton) {
            const button = document.createElement('button');
            button.id = 'restart-tour-btn';
            button.innerHTML = '<i class="fas fa-question-circle"></i> Take Tour';
            button.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: linear-gradient(135deg, #009688, #00bcd4);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(0, 150, 136, 0.3);
                z-index: 1000;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            
            button.addEventListener('click', () => {
                if (typeof Shepherd !== 'undefined') {
                    tour.start();
                } else {
                    showToast('Tour is not available');
                }
            });

            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 6px 20px rgba(0, 150, 136, 0.4)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '0 4px 15px rgba(0, 150, 136, 0.3)';
            });

            document.body.appendChild(button);
        }
    };

    // Add the tour button after a delay
    setTimeout(addTourButton, 3000);
}

// Handle Authentication State
function handleAuthState() {
    const navLinks = document.querySelector('.tips-nav-bar ul');
    const signupLink = navLinks.querySelector("a[href='Auth.html']");
    const token = localStorage.getItem("token");

    if (token && signupLink) {
        signupLink.textContent = "Logout";
        signupLink.href = "#";

        signupLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("resumeSettings");
            showToast("You have been logged out.");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive animations
function addInteractiveAnimations() {
    // Subtle parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.tips-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    document.querySelectorAll('section:not(.tips-hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractiveAnimations);

// Export functions for testing or external use
window.ResumeTips = {
    showToast,
    startTipsTour: () => window.startTipsTour(),
    initializeActionVerbs,
    initializeTemplateFilters,
    initializeTemplateSelection
};

// Error handling for Shepherd.js
window.addEventListener('error', (e) => {
    if (e.message.includes('Shepherd')) {
        console.warn('Shepherd.js error caught:', e.message);
        showToast('Tour functionality temporarily unavailable');
    }
});