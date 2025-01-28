document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.role === "admin") {
            window.location.href = "../html/admin.html";
          } else {
            alert("User login successful");
          }
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
