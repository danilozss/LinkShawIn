const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Simulated database
const dbFile = "database.json";
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([]));
}

// Create Account Endpoint
app.post("/create", (req, res) => {
  const { username, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(dbFile));

  // Check if username or email already exists
  if (users.some((user) => user.username === username)) {
    return res.json({ message: "Username already exists" });
  }

  if (users.some((user) => user.email === email)) {
    return res.json({ message: "Email is already in use" });
  }

  // Add the new user to the database
  users.push({ username, email, password });
  fs.writeFileSync(dbFile, JSON.stringify(users));

  res.json({ message: "Account created successfully" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
