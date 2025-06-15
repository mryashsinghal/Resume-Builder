const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  toggle.checked = true;
} else {
  body.classList.add("light-mode");
}

// Handle toggle
toggle.addEventListener("change", function () {
  if (this.checked) {
    body.classList.replace("light-mode", "dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark-mode", "light-mode");
    localStorage.setItem("theme", "light");
  }
});
