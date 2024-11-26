const createForm = document.getElementById("createForm");
const message = document.getElementById("message");

// Handle account creation
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("create-username").value;
  const email = document.getElementById("create-email").value;
  const password = document.getElementById("create-password").value;
  const passwordConfirm = document.getElementById("create-password-confirm").value;

  // Simple client-side validation
  if (password !== passwordConfirm) {
    message.textContent = "Passwords do not match!";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters long.";
    return;
  }

  // Send data to the backend to create account
  const response = await fetch("/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  message.textContent = data.message;

  // Redirect to login page after successful account creation
  if (data.message === "Account created successfully") {
    setTimeout(() => {
      window.location.href = "login.html"; // Redirect to login page
    }, 2000);
  }
});
