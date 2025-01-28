document.addEventListener("DOMContentLoaded", () => {
  const jobForm = document.getElementById("jobForm");

  jobForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle: document.getElementById("jobTitle").value,
      companyName: document.getElementById("companyName").value,
      jobLocation: document.getElementById("jobLocation").value,
      jobType: document.getElementById("jobType").value,
      jobDescription: document.getElementById("jobDescription").value,
      contactEmail: document.getElementById("contactEmail").value,
    };

    fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        jobForm.reset();
      })
      .catch((error) => console.error("Error submitting job:", error));
  });
});
