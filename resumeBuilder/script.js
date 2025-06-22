//Creating tour for the resume builder using Shepherd
const tour = new Shepherd.Tour({
    defaultStepOptions: {
        cancelIcon: {
            enabled: true,
        },
        classes: 'shepherd-theme-default',
        scrollTo: { behavior: 'smooth', block: 'center' }
    }
});

// Adding steps to the tour
tour.addStep({
    title: 'Welcome to the Resume Builder',
    text: 'This is a simple app built with Shepherd.js. Let me show you around!',
    attachTo: {
        element: '.content',
        on: 'top',
    },
    buttons: [
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
            text: 'Next',
        },
    ],
});

tour.addStep({
    title: 'Navbar For Resume Builder',
    text: 'Click Nav-buttons To Navigate To The Particular Page',
    attachTo: {
        element: '.nav-bar',
        on: 'left',
    },
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
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
            text: 'Next',
        },
    ],
});

tour.addStep({
    title: 'Create For Free',
    text: 'Click Here To Create A Resume For Free',
    attachTo: {
        element: '.create-free',
        on: 'bottom',
    },
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
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
            text: 'Next',
        },
    ],
});

tour.addStep({
    title: 'Login',
    text: 'Click Here To Login To The App',
    attachTo: {
        element: '.login-page',
        on: 'bottom',
    },
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
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
            text: 'Next',
        },
    ],
});

tour.addStep({
    title: 'Template Library',
    text: 'Swipe Left To Choose A Template Of Your Choice',
    attachTo: {
        element: '.swiper',
        on: 'right',
    },
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
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
            text: 'Next',
        },
    ],
});

tour.addStep({
    title: 'Select Button',
    text: 'Click Here To Select A Template',
    attachTo: {
        element: '.swiper',
        on: 'bottom',
    },
    buttons: [
        {
            action() {
                return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
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
            text: 'Got it',
        },
    ],
});

// Function to start tour manually
function startTour() {
    tour.start();
}

// Function to create and add the tour button
function createTourButton() {
    // Check if button already exists
    if (document.getElementById('start-tour-btn')) {
        return;
    }

    const tourButton = document.createElement('button');
    tourButton.id = 'start-tour-btn';
    tourButton.className = 'tour-button';
    tourButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
        </svg>
        Take Tour
    `;
    tourButton.onclick = startTour;

    // Add the button to the navigation area
    const navBar = document.querySelector('.nav-bar');
    if (navBar) {
        navBar.appendChild(tourButton);
    }
}

// Function to check if user is new (for first-time tour)
function isFirstTimeUser() {
    return !localStorage.getItem('hasSeenTour');
}

// Function to mark user as having seen the tour
function markTourAsSeen() {
    localStorage.setItem('hasSeenTour', 'true');
}

// Function to show a subtle first-time user notification
function showFirstTimeNotification() {
    // Create a subtle notification element
    const notification = document.createElement('div');
    notification.className = 'first-time-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>👋 New here? Take a quick tour to get started!</span>
            <button class="notification-tour-btn" onclick="startTour()">Start Tour</button>
            <button class="notification-dismiss" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

// Modified window.onload - no auto-start tour, just show notification for first-time users
window.onload = () => {
    const username = localStorage.getItem("user");
    const createButton = document.querySelector(".create-free");
    
    if(username == null || username == undefined){
        createButton.textContent = "Try It Now";
        const hoverSpan = document.createElement('span');
        hoverSpan.classList.add('hover-bg');
        createButton.appendChild(hoverSpan);
    }

    // Create the tour button
    createTourButton();

    // Show subtle notification for first-time users instead of auto-starting tour
    if (isFirstTimeUser()) {
        showFirstTimeNotification();
        // Mark as seen when notification is shown
        markTourAsSeen();
    }
};

// Function to reset tour status (for testing or user preference)
function resetTourStatus() {
    localStorage.removeItem('hasSeenTour');
    location.reload();
}

// Event listener to handle the "Sign Up" link behavior
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-bar ul");
    const signupLink = navLinks.querySelector("a[href='Auth.html']:last-child");
    const loginButton = document.querySelector(".login-page");

    const token = localStorage.getItem("token");

    if (token) {
      signupLink.textContent = "Logout";
      signupLink.href = "#"; 

      if (loginButton) loginButton.style.display = "none";

      // Logout behavior
      signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // Clear tour seen status on logout so new users get the tour
        localStorage.removeItem("hasSeenTour");
        localStorage.removeItem("hasSeenResumeTour");
        alert("You have been logged out.");
        window.location.reload();
      });
    }
});

// Add keyboard shortcut to reset tour (Ctrl+Shift+T for testing)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        resetTourStatus();
    }
});