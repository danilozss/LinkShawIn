const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the root directory
app.use("/html", express.static(__dirname + "/html")); // Serve HTML files
app.use("/css", express.static(__dirname + "/css")); // Serve CSS files
app.use("/javascript", express.static(__dirname + "/javascript")); // Serve JavaScript files

const JOBS_FILE = "./jobs.json"; // Path for storing job submissions

// Hardcoded users for login
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
];

// Load jobs from file
const loadJobs = () => {
  if (!fs.existsSync(JOBS_FILE)) return [];
  const data = fs.readFileSync(JOBS_FILE);
  return JSON.parse(data);
};

// Save jobs to file
const saveJobs = (jobs) => {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
};

// Default route for testing server
app.get("/", (req, res) => {
  res.redirect("/html/index.html"); // Redirect to the homepage
});

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

// Submit a new job
app.post("/api/jobs", (req, res) => {
  const jobs = loadJobs();
  const newJob = { id: Date.now().toString(), status: "pending", ...req.body };
  jobs.push(newJob);
  saveJobs(jobs);
  res.status(201).json({ message: "Job submitted successfully", job: newJob });
});

// Get jobs (filter by status)
app.get("/api/jobs", (req, res) => {
  const { status } = req.query;
  const jobs = loadJobs();
  const filteredJobs = status ? jobs.filter((job) => job.status === status) : jobs;
  res.json(filteredJobs);
});

// Update job status
app.post("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "declined"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const jobs = loadJobs();
  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex === -1) return res.status(404).json({ message: "Job not found" });

  jobs[jobIndex].status = status;
  saveJobs(jobs);
  res.json({ message: `Job ${status}`, job: jobs[jobIndex] });
});

// Route to fetch approved jobs
app.get("/api/jobs/approved", (req, res) => {
  const jobs = loadJobs();
  const approvedJobs = jobs.filter((job) => job.status === "approved");
  res.json(approvedJobs);
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
