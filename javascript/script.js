document.getElementById("jobForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const jobTitle = document.getElementById("jobTitle").value.trim();
    const companyName = document.getElementById("companyName").value.trim();
    const jobLocation = document.getElementById("jobLocation").value.trim();
    const jobType = document.getElementById("jobType").value;
    const jobDescription = document.getElementById("jobDescription").value.trim();
    const contactEmail = document.getElementById("contactEmail").value.trim();

    if (jobTitle && companyName && jobLocation && jobType && jobDescription && contactEmail) {
        alert("Job posting submitted successfully!");
        document.getElementById("jobForm").reset();
    } else {
        alert("Please fill out all required fields.");
    }
});
