const authForm = document.getElementById("authForm");
const toggleLink = document.getElementById("toggleLink");
const formTitle = document.getElementById("formTitle");
const usernameInput = document.getElementById("username");
const usernameLabel = document.getElementById("usernameLabel");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const errorMsg = document.getElementById("errorMsg");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let isSignup = false;

function toggleForm() {
  isSignup = !isSignup;

  formTitle.textContent = isSignup ? "Sign Up" : "Login";
  toggleLink.textContent = isSignup ? "Login" : "Sign Up";
  toggleLink.previousSibling.textContent = isSignup
    ? "Already have an account? "
    : "Don't have an account? ";

  // Show/hide signup-specific fields via classes for better control
  usernameInput.classList.toggle("show", isSignup);
  usernameLabel.classList.toggle("show", isSignup);
  confirmPasswordGroup.classList.toggle("show", isSignup);

  document.querySelector(".btn").textContent = isSignup ? "Sign Up" : "Login";
  errorMsg.textContent = "";
  authForm.reset();
}

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm();
});

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  // Basic signup password confirmation check
  if (isSignup && password.value !== confirmPassword.value) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // Prepare payload
  const payload = isSignup
    ? {
        username: usernameInput.value.trim(),
        email: email.value.trim(),
        password: password.value,
      }
    : {
        email: email.value.trim(),
        password: password.value,
      };

  try {
    const url = isSignup
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Something went wrong");
    }

    alert(data.msg);

    localStorage.setItem("user", JSON.stringify(data.user.email));
    localStorage.setItem("token", data.token);

    // Redirect to home page
    window.location.href = "index.html";
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});