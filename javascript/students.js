document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("jobId");

  if (jobId) {
    document.getElementById("jobId").value = jobId;
  }

  const form = document.getElementById("applicationForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
  });
});
