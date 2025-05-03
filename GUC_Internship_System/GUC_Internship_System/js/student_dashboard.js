// Handle profile update form submission
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const interests = document.getElementById('interests').value.trim();
    const internships = document.getElementById('internships').value.trim();
    const activities = document.getElementById('activities').value.trim();
    const major = document.getElementById('majorSelect').value;
    const semester = document.getElementById('semesterSelect').value;
  
    const profile = {
      interests,
      internships,
      activities,
      major,
      semester
    };
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  
    alert("Profile updated successfully!");
    populateSuggestions(interests);
  });
  
  // Load profile data
  function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('studentProfile'));
    if (profile) {
      document.getElementById('interests').value = profile.interests;
      document.getElementById('internships').value = profile.internships;
      document.getElementById('activities').value = profile.activities;
      document.getElementById('majorSelect').value = profile.major;
      document.getElementById('semesterSelect').value = profile.semester;
      populateSuggestions(profile.interests);
    }
  }
  
  // Suggestions based on interest
  const allSuggestions = [
    { name: "TechSpark", interest: "AI", industry: "Technology", recommendedBy: "Intern 2023" },
    { name: "MediSoft", interest: "Healthcare", industry: "Software", recommendedBy: "Intern 2024" },
    { name: "FinScope", interest: "Finance", industry: "Banking", recommendedBy: "Intern 2024" },
    { name: "EduWare", interest: "Education", industry: "EdTech", recommendedBy: "Intern 2023" }
  ];
  
  function populateSuggestions(interest) {
    const list = document.getElementById('suggestedList');
    list.innerHTML = "";
  
    const filtered = allSuggestions.filter(c => interest && c.interest.toLowerCase().includes(interest.toLowerCase()));
  
    if (filtered.length === 0) {
      list.innerHTML = "<li>No matching companies found. Try updating your interests.</li>";
    } else {
      filtered.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${c.name}</strong> - Industry: ${c.industry} <br><em>Recommended by: ${c.recommendedBy}</em>`;
        list.appendChild(li);
      });
    }
  }
  
  // Upload documents for last application
  function uploadExtraDocuments() {
    const files = document.getElementById("extraDocs").files;
    const fileNames = Array.from(files).map(file => file.name);
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  
    if (applications.length === 0) {
      alert("Apply to at least one internship first.");
      return;
    }
  
    applications[applications.length - 1].documents = fileNames;
    localStorage.setItem("applications", JSON.stringify(applications));
    alert("Documents uploaded successfully.");
    displayApplications();
  }
  
  // Display applications with status
  function displayApplications() {
    const container = document.getElementById("applicationList");
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  
    if (applications.length === 0) {
      container.innerHTML = "<p>You have not applied to any internships yet.</p>";
      return;
    }
  
    container.innerHTML = "";
    applications.forEach(app => {
      const div = document.createElement("div");
      div.className = "application";
      div.innerHTML = `
        <h3>${app.internship.title} at ${app.internship.company}</h3>
        <p>Status: <strong>${app.status}</strong></p>
        <p>Documents: ${app.documents?.join(", ") || "None"}</p>
      `;
      container.appendChild(div);
    });
  }

// Load and display past and present internships
function loadInternshipHistory() {
  const internshipHistoryContainer = document.getElementById("internshipHistory");
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");

  if (applications.length === 0) {
    internshipHistoryContainer.innerHTML = "<p>You have no past or present internships.</p>";
    return;
  }

  internshipHistoryContainer.innerHTML = "";
  applications.forEach(app => {
    const div = document.createElement("div");
    div.className = "internship-history-item";
    div.innerHTML = `
      <h3>${app.internship.title} at ${app.internship.company}</h3>
      <p>Status: <strong>${app.status}</strong></p>
      <p>Duration: ${app.internship.duration}</p>
      <p>Paid: ${app.internship.paid ? "Yes" : "No"}</p>
      <p>Salary: ${app.internship.paid ? app.internship.salary + " EGP" : "Unpaid"}</p>
    `;
    internshipHistoryContainer.appendChild(div);
  });
}

// Search and filter internships
function searchAndFilterInternships() {
  const searchInput = document.getElementById("searchInternshipsInput").value.toLowerCase();
  const filterStatus = document.getElementById("filterInternshipsStatus").value;
  const internshipHistoryContainer = document.getElementById("internshipHistory");
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.internship.title.toLowerCase().includes(searchInput) ||
      app.internship.company.toLowerCase().includes(searchInput);
    const matchesFilter = filterStatus === "" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  internshipHistoryContainer.innerHTML = "";

  if (filteredApplications.length === 0) {
    internshipHistoryContainer.innerHTML = "<p>No internships match your search or filter criteria.</p>";
    return;
  }

  filteredApplications.forEach(app => {
    const div = document.createElement("div");
    div.className = "internship-history-item";
    div.innerHTML = `
      <h3>${app.internship.title} at ${app.internship.company}</h3>
      <p>Status: <strong>${app.status}</strong></p>
      <p>Duration: ${app.internship.duration}</p>
      <p>Paid: ${app.internship.paid ? "Yes" : "No"}</p>
      <p>Salary: ${app.internship.paid ? app.internship.salary + " EGP" : "Unpaid"}</p>
    `;
    if (app.status === "internship complete") {
      div.style.cursor = "pointer";
      div.addEventListener("click", () => viewCompletedInternshipDetails(app.internship));
    }
    internshipHistoryContainer.appendChild(div);
  });
}

// Display details of a selected completed internship
function viewCompletedInternshipDetails(internship) {
  document.getElementById("completedInternshipTitle").textContent = `Title: ${internship.title}`;
  document.getElementById("completedInternshipCompany").textContent = `Company: ${internship.company}`;
  document.getElementById("completedInternshipDuration").textContent = `Duration: ${internship.duration}`;
  document.getElementById("completedInternshipSalary").textContent = `Salary: ${internship.paid ? internship.salary + " EGP" : "Unpaid"}`;
  document.getElementById("completedInternshipDetails").style.display = "block";
}

// Close the completed internship details section
function closeCompletedInternshipDetails() {
  document.getElementById("completedInternshipDetails").style.display = "none";
}

// Call searchAndFilterInternships on page load
window.onload = function () {
  loadProfile();
  displayApplications();
  searchAndFilterInternships();
};

};  displayApplications();  loadInternshipHistory();  searchAndFilterInternships();  displayApplications();
  searchAndFilterInternships();
};
