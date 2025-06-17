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






// Starting the tour on page load
window.onload = () => {
    tour.start();
};