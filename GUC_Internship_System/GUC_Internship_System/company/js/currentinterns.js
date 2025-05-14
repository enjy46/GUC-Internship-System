// Mock data for job posts and applications
const jobPosts = [
  {
    title: "Software Engineer Intern",
    applications: [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        resume: "Resume Link",
        status: "current intern",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        resume: "Resume Link",
        status: "internship complete",
      },
    ],
  },
  {
    title: "Marketing Intern",
    applications: [
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        resume: "Resume Link",
        status: "current intern",
      },
      {
        name: "Bob Brown",
        email: "bob.brown@example.com",
        resume: "Resume Link",
        status: "internship complete",
      },
    ],
  },
  {
    title: "Data Analyst Intern",
    applications: [
      {
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        resume: "Resume Link",
        status: "current intern",
      },
      {
        name: "Emily White",
        email: "emily.white@example.com",
        resume: "Resume Link",
        status: "internship complete",
      },
    ],
  },
];

// Save mock data to localStorage for testing
localStorage.setItem("jobPosts", JSON.stringify(jobPosts));

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

        // Add "Evaluate Intern" button for current interns
        const evaluateButton = document.createElement("button");
        evaluateButton.textContent = "Evaluate Intern";
        evaluateButton.style.marginLeft = "10px";
        evaluateButton.onclick = () => redirectToEvaluate(application);
        li.appendChild(evaluateButton);

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

        // Add "Evaluate Intern" button for current intern or internship complete
        if (
          application.status === "current intern" ||
          application.status === "internship complete"
        ) {
          const evaluateButton = document.createElement("button");
          evaluateButton.textContent = "Evaluate Intern";
          evaluateButton.style.marginLeft = "10px";
          evaluateButton.onclick = () => redirectToEvaluate(application);
          li.appendChild(evaluateButton);
        }

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

        // Add "Evaluate Intern" button for current intern or internship complete
        if (
          application.status === "current intern" ||
          application.status === "internship complete"
        ) {
          const evaluateButton = document.createElement("button");
          evaluateButton.textContent = "Evaluate Intern";
          evaluateButton.style.marginLeft = "10px";
          evaluateButton.onclick = () => redirectToEvaluate(application);
          li.appendChild(evaluateButton);
        }

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
