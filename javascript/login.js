// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Send login request to the backend
  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  // Show login feedback message
  document.getElementById("message").textContent = data.message;

  // If login is successful, redirect to the dashboard
  if (data.success) {
    localStorage.setItem("username", username);  // Store the username in localStorage for the session
    window.location.href = "dashboard.html";  // Redirect to the dashboard
  }
});
//Yo WTH they are all chatgpt lol