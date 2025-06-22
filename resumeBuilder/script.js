const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    classes: "shepherd-theme-default",
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

// Step 1
tour.addStep({
  title: "Welcome to the Resume Builder",
  text: "This is a simple app built with Shepherd.js. Let me show you around!",
  attachTo: {
    element: ".content",
    on: "top",
  },
  buttons: [
    {
      action() {
        return this.cancel();
      },
      classes: "shepherd-button-secondary",
      text: "Skip",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
});

// Step 2
tour.addStep({
  title: "Navbar For Resume Builder",
  text: "Click Nav-buttons To Navigate To The Particular Page",
  attachTo: {
    element: ".nav-bar",
    on: "left",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.cancel();
      },
      classes: "shepherd-button-secondary",
      text: "Skip",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
});

// Step 3
tour.addStep({
  title: "Create For Free",
  text: "Click Here To Create A Resume For Free",
  attachTo: {
    element: ".create-free",
    on: "bottom",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.cancel();
      },
      classes: "shepherd-button-secondary",
      text: "Skip",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
});

// Step 4
tour.addStep({
  title: "Login",
  text: "Click Here To Login To The App",
  attachTo: {
    element: ".login-page",
    on: "bottom",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.cancel();
      },
      classes: "shepherd-button-secondary",
      text: "Skip",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
});

// Step 5
tour.addStep({
  title: "Template Library",
  text: "Swipe Left To Choose A Template Of Your Choice",
  attachTo: {
    element: ".swiper",
    on: "right",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.cancel();
      },
      classes: "shepherd-button-secondary",
      text: "Skip",
    },
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
});

// Step 6
tour.addStep({
  title: "Select Button",
  text: "Click Here To Select A Template",
  attachTo: {
    element: ".swiper",
    on: "bottom",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
    {
      action() {
        return this.cancel();
      },
      classes: "shepherd-button-secondary",
      text: "Skip",
    },
    {
      action() {
        return this.next();
      },
      text: "Got it",
    },
  ],
});

// Start the tour if user not logged in
window.onload = () => {
  const username = localStorage.getItem("user");
  const createButton = document.querySelector(".create-free");

  if (!username) {
    tour.start();
    if (createButton) {
      createButton.textContent = "Try It Now";
      const hoverSpan = document.createElement("span");
      hoverSpan.classList.add("hover-bg");
      createButton.appendChild(hoverSpan);
    }
  }
};

// Signup/Login logic
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector(".nav-bar ul");
  const signupLink = navLinks?.querySelector("a[href='Auth.html']:last-child");
  const loginButton = document.querySelector(".login-page");

  const token = localStorage.getItem("token");

  if (token) {
    if (signupLink) {
      signupLink.textContent = "Logout";
      signupLink.href = "#";
      signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("You have been logged out.");
        window.location.reload();
      });
    }

    if (loginButton) loginButton.style.display = "none";
  }
});

// Menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("active");
});
