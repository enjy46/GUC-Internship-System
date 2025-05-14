// Display current interns
function displayCurrentInterns() {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const currentInternsList = document.getElementById("currentInternsList");
  currentInternsList.innerHTML = "";

  jobPosts.forEach((post) => {
    post.applications.forEach((application) => {
      if (application.status === "current intern") {
        const li = document.createElement("li");
        li.textContent = `Name: ${application.name}, Job Title: ${post.title}`;
        li.dataset.intern = JSON.stringify(application);
        li.addEventListener("click", viewInternDetails);
        currentInternsList.appendChild(li);
      }
    });
  });
}

// Filter interns by status
function filterInternsByStatus() {
  const filterValue = document.getElementById("filterInternStatus").value;
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const currentInternsList = document.getElementById("currentInternsList");
  currentInternsList.innerHTML = "";

  jobPosts.forEach((post) => {
    post.applications.forEach((application) => {
      if (filterValue === "" || application.status === filterValue) {
        const li = document.createElement("li");
        li.textContent = `Name: ${application.name}, Job Title: ${post.title}, Status: ${application.status}`;
        li.dataset.intern = JSON.stringify(application);
        li.addEventListener("click", viewInternDetails);
        currentInternsList.appendChild(li);
      }
    });
  });
}

// Search for interns by name or job title
function searchInterns() {
  const searchInput = document
    .getElementById("searchInternInput")
    .value.toLowerCase();
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const currentInternsList = document.getElementById("currentInternsList");
  currentInternsList.innerHTML = "";

  jobPosts.forEach((post) => {
    post.applications.forEach((application) => {
      if (
        application.status === "current intern" &&
        (application.name.toLowerCase().includes(searchInput) ||
          post.title.toLowerCase().includes(searchInput))
      ) {
        const li = document.createElement("li");
        li.textContent = `Name: ${application.name}, Job Title: ${post.title}`;
        li.dataset.intern = JSON.stringify(application);
        li.addEventListener("click", viewInternDetails);
        currentInternsList.appendChild(li);
      }
    });
  });
}

// View intern details
function viewInternDetails(event) {
  const intern = JSON.parse(event.target.dataset.intern);
  document.getElementById("internName").textContent = `Name: ${intern.name}`;
  document.getElementById("internEmail").textContent = `Email: ${intern.email}`;
  document.getElementById(
    "internResume"
  ).textContent = `Resume: ${intern.resume}`;
  document.getElementById(
    "internStatus"
  ).textContent = `Status: ${intern.status}`;
  document.getElementById("internDetails").style.display = "block";
}

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
  displayCurrentInterns();
});
