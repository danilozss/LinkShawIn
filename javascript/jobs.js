document.addEventListener("DOMContentLoaded", () => {
    const jobsContainer = document.getElementById("jobs-container");
  
    // Fetch approved jobs
    fetch("/api/jobs/approved")
      .then((response) => response.json())
      .then((jobs) => {
        if (jobs.length === 0) {
          jobsContainer.innerHTML = "<p>No jobs available at the moment.</p>";
          return;
        }
  
        // Display each job
        jobs.forEach((job) => {
          const jobCard = document.createElement("div");
          jobCard.classList.add("job-card");
  
          jobCard.innerHTML = `
            <h2>${job.jobTitle}</h2>
            <p><strong>Company:</strong> ${job.companyName}</p>
            <p><strong>Location:</strong> ${job.jobLocation}</p>
            <p><strong>Type:</strong> ${job.jobType}</p>
            <p><strong>Description:</strong> ${job.jobDescription}</p>
            <button class="apply-button" data-job-id="${job.id}">Apply</button>
          `;
  
          jobsContainer.appendChild(jobCard);
        });
  
        // Add event listeners to "Apply" buttons
        document.querySelectorAll(".apply-button").forEach((button) => {
          button.addEventListener("click", (e) => {
            const jobId = e.target.getAttribute("data-job-id");
            window.location.href = `students.html?jobId=${jobId}`;
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        jobsContainer.innerHTML = "<p>Failed to load jobs. Please try again later.</p>";
      });
  });
  