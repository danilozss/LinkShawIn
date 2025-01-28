document.addEventListener("DOMContentLoaded", () => {
    const jobRequestsSection = document.getElementById("jobRequests");
  
    // Fetch pending jobs
    fetch("/api/jobs?status=pending")
      .then((response) => response.json())
      .then((jobs) => {
        if (jobs.length === 0) {
          jobRequestsSection.innerHTML = "<p>No pending job submissions.</p>";
          return;
        }
  
        jobs.forEach((job) => {
          const jobElement = document.createElement("div");
          jobElement.classList.add("job-request");
          jobElement.innerHTML = `
            <h3>${job.jobTitle}</h3>
            <p><strong>Company:</strong> ${job.companyName}</p>
            <p><strong>Location:</strong> ${job.jobLocation}</p>
            <p><strong>Description:</strong> ${job.jobDescription}</p>
            <button onclick="updateJobStatus('${job.id}', 'approved')">Approve</button>
            <button onclick="updateJobStatus('${job.id}', 'declined')">Decline</button>
          `;
          jobRequestsSection.appendChild(jobElement);
        });
      });
  
    // Function to update job status
    window.updateJobStatus = (jobId, status) => {
      fetch(`/api/jobs/${jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
        .then((response) => response.json())
        .then(() => location.reload());
    };
  });
  