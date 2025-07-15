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
    text: 'Swipe left or right to choose a template of your choice.\n\nClick the Select button below a template to use it for your resume.',
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


// Starting the tour on page load
window.onload = () => {
    const username = localStorage.getItem("user");
    const createButton = document.querySelector(".create-free");
    if(username == null || username == undefined){
        tour.start();
        createButton.textContent  = "Try It Now";
        const hoverSpan = document.createElement('span');
        hoverSpan.classList.add('hover-bg');
        createButton.appendChild(hoverSpan);
    }
};
// Scroll to top button logic
const scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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
        alert("You have been logged out.");
        window.location.reload();
      });
    }
});