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

// Store current intern for evaluation
let currentIntern = null;

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
        li.dataset.intern = JSON.stringify({...application, jobTitle: post.title});
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
        li.dataset.intern = JSON.stringify({...application, jobTitle: post.title});
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
  const filterValue = document.getElementById("filterInternStatus").value;
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const currentInternsList = document.getElementById("currentInternsList");
  currentInternsList.innerHTML = "";

  jobPosts.forEach((post) => {
    post.applications.forEach((application) => {
      if (
        (filterValue === "" || application.status === filterValue) &&
        (application.name.toLowerCase().includes(searchInput) ||
          post.title.toLowerCase().includes(searchInput))
      ) {
        const li = document.createElement("li");
        li.textContent = `Name: ${application.name}, Job Title: ${post.title}, Status: ${application.status}`;
        li.dataset.intern = JSON.stringify({...application, jobTitle: post.title});
        li.addEventListener("click", viewInternDetails);
        currentInternsList.appendChild(li);
      }
    });
  });
}

// View intern details
function viewInternDetails(event) {
  const intern = JSON.parse(event.target.dataset.intern);
  currentIntern = intern;
  
  document.getElementById("internName").textContent = `Name: ${intern.name}`;
  document.getElementById("internEmail").textContent = `Email: ${intern.email}`;
  document.getElementById("internResume").textContent = `Resume: ${intern.resume}`;
  document.getElementById("internStatus").textContent = `Status: ${intern.status}`;
  
  // Display the modal
  document.getElementById("internDetailsModal").style.display = "flex";
  
  // Show or hide evaluate button based on intern status
  const evaluateBtn = document.getElementById("evaluateInternBtn");
  if (intern.status === "internship complete") {
    evaluateBtn.style.display = "inline-block";
  } else {
    evaluateBtn.style.display = "none";
  }
}

// Close intern details modal
function closeInternDetailsModal() {
  document.getElementById("internDetailsModal").style.display = "none";
}

// Open evaluation modal
function openEvaluationModal() {
  document.getElementById("evaluationModal").style.display = "flex";
  document.getElementById("internDetailsModal").style.display = "none";
}

// Close evaluation modal
function closeEvaluationModal() {
  document.getElementById("evaluationModal").style.display = "none";
}

// Submit evaluation
function submitEvaluation(event) {
  event.preventDefault();
  
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const recommendation = document.getElementById("recommendHire").value;
  const comments = document.getElementById("evaluationComments").value;
  
  if (!rating || !recommendation || !comments) {
    alert("Please complete all fields");
    return;
  }
  
  // Here you would typically send this data to a server
  console.log("Evaluation submitted:", {
    intern: currentIntern,
    rating,
    recommendation,
    comments
  });
  
  // Store evaluation in localStorage for demo purposes
  const evaluations = JSON.parse(localStorage.getItem("internEvaluations")) || [];
  evaluations.push({
    internName: currentIntern.name,
    internEmail: currentIntern.email,
    jobTitle: currentIntern.jobTitle,
    rating,
    recommendation,
    comments,
    date: new Date().toISOString()
  });
  localStorage.setItem("internEvaluations", JSON.stringify(evaluations));
  
  // Close the modal
  closeEvaluationModal();
  
  // Reset the form
  document.getElementById("evaluationForm").reset();
}

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
  displayCurrentInterns();
  
  // Add event listeners for the modals
  document.getElementById("evaluateInternBtn").addEventListener("click", openEvaluationModal);
  document.getElementById("closeInternDetailsBtn").addEventListener("click", closeInternDetailsModal);
  
  // Close the modals if user clicks outside of them
  window.addEventListener("click", function(event) {
    const internDetailsModal = document.getElementById("internDetailsModal");
    const evaluationModal = document.getElementById("evaluationModal");
    
    if (event.target === internDetailsModal) {
      closeInternDetailsModal();
    }
    
    if (event.target === evaluationModal) {
      closeEvaluationModal();
    }
  });
  
  // Handle form submission
  document.getElementById("evaluationForm").addEventListener("submit", submitEvaluation);
});
