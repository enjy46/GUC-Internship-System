// Populate mock data for testing
function populateMockData() {
  const mockJobPosts = [
    {
      title: "Frontend Developer",
      applications: [
        { name: "Alice", email: "alice@example.com", resume: "Alice's Resume", status: "current intern" },
        { name: "Bob", email: "bob@example.com", resume: "Bob's Resume", status: "" },
      ],
    },
    {
      title: "Backend Developer",
      applications: [
        { name: "Charlie", email: "charlie@example.com", resume: "Charlie's Resume", status: "current intern" },
      ],
    },
    {
      title: "UI/UX Designer",
      applications: [
        { name: "Diana", email: "diana@example.com", resume: "Diana's Resume", status: "" },
      ],
    },
  ];
  localStorage.setItem("jobPosts", JSON.stringify(mockJobPosts));
}

// Populate the filter dropdown with internship posts
function populateFilterDropdown() {
  const filterDropdown = document.getElementById("filterApplicationsByPost");
  const internshipPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];

  internshipPosts.forEach((post) => {
    const option = document.createElement("option");
    option.value = post.title;
    option.textContent = post.title;
    filterDropdown.appendChild(option);
  });
}

// Render applications based on the selected internship post
function renderApplications(postTitle = "") {
  const applicationsList = document.getElementById("applicationsList");
  applicationsList.innerHTML = "";

  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  jobPosts.forEach((post) => {
    if (postTitle === "" || post.title === postTitle) {
      post.applications.forEach((application) => {
        const li = document.createElement("li");
        li.textContent = `Job: ${post.title} | Applicant: ${application.name}`;
        li.dataset.applicant = JSON.stringify(application);
        li.addEventListener("click", viewApplicantDetails);
        applicationsList.appendChild(li);
      });
    }
  });
}

// View applicant details
function viewApplicantDetails(event) {
  const applicant = JSON.parse(event.target.dataset.applicant);
  document.getElementById("applicantName").textContent = `Name: ${applicant.name}`;
  document.getElementById("applicantEmail").textContent = `Email: ${applicant.email}`;
  document.getElementById("applicantResume").textContent = `Resume: ${applicant.resume}`;
  document.getElementById("applicantDetails").style.display = "block";

  // Attach actions to buttons
  document.getElementById("finalizeApplicant").onclick = () => updateApplicantStatus(applicant, "finalized");
  document.getElementById("acceptApplicant").onclick = () => updateApplicantStatus(applicant, "accepted");
  document.getElementById("rejectApplicant").onclick = () => updateApplicantStatus(applicant, "rejected");
  document.getElementById("setCurrentIntern").onclick = () => updateApplicantStatus(applicant, "current intern");
  document.getElementById("setInternshipComplete").onclick = () => updateApplicantStatus(applicant, "internship complete");
}

// Update applicant status
function updateApplicantStatus(applicant, status) {
  applicant.status = status;
  alert(`Applicant ${applicant.name} has been marked as ${status}.`);
  document.getElementById("applicantDetails").style.display = "none";

  // Update the application in localStorage
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  jobPosts.forEach((post) => {
    post.applications.forEach((app) => {
      if (app.name === applicant.name && app.email === applicant.email) {
        app.status = status;
      }
    });
  });
  localStorage.setItem("jobPosts", JSON.stringify(jobPosts));
}

// Initialize the page
function init() {
  populateMockData();
  populateFilterDropdown();
  renderApplications();
}

// Event listener for filtering applications
document.getElementById("filterApplicationsByPost").addEventListener("change", function () {
  renderApplications(this.value);
});

// Call init on page load
init();