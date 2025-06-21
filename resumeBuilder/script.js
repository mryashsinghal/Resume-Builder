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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
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

// Modified window.onload - only auto-start for first-time users
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

    // Only auto-start tour for first-time users
    if (isFirstTimeUser()) {
        tour.start();
        // Mark as seen when tour completes or is cancelled
        tour.on('complete', markTourAsSeen);
        tour.on('cancel', markTourAsSeen);
    }
};

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
        alert("You have been logged out.");
        window.location.reload();
      });
    }
});