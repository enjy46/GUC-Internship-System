// Example data for suggested companies
const allSuggestions = [
  { name: "TechSpark", interest: "AI", industry: "Technology", recommendedBy: "Intern 2023" },
  { name: "MediSoft", interest: "Healthcare", industry: "Software", recommendedBy: "Intern 2024" },
  { name: "FinScope", interest: "Finance", industry: "Banking", recommendedBy: "Intern 2024" },
  { name: "EduWare", interest: "Education", industry: "EdTech", recommendedBy: "Intern 2023" }
];

// Example data for internships
const internships = [
  { company: "TechCorp", title: "Software Engineer Intern", duration: "3 months" },
  { company: "HealthPlus", title: "Data Analyst Intern", duration: "6 months" },
  { company: "EduSoft", title: "Web Developer Intern", duration: "4 months" },
  { company: "FinBank", title: "Finance Intern", duration: "2 months" }
];

// Load profile from localStorage
function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("studentProProfile")) || {};
  document.getElementById("jobInterests").value = profile.jobInterests || "";
  document.getElementById("previousInternships").value = profile.previousInternships || "";
  document.getElementById("collegeActivities").value = profile.collegeActivities || "";
}

// Save profile to localStorage
document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const profile = {
    jobInterests: document.getElementById("jobInterests").value.trim(),
    previousInternships: document.getElementById("previousInternships").value.trim(),
    collegeActivities: document.getElementById("collegeActivities").value.trim()
  };

  localStorage.setItem("studentProProfile", JSON.stringify(profile));
  document.getElementById("profileMessage").style.display = "block";

  // Refresh suggested companies
  populateSuggestedCompanies();
});

// Populate suggested companies based on job interests
function populateSuggestedCompanies() {
  const profile = JSON.parse(localStorage.getItem("studentProProfile")) || {};
  const userInterests = profile.jobInterests || "";
  const list = document.getElementById("suggestedCompaniesList");
  list.innerHTML = "";

  const filteredSuggestions = allSuggestions.filter(company =>
    userInterests.toLowerCase().includes(company.interest.toLowerCase())
  );

  if (filteredSuggestions.length === 0) {
    list.innerHTML = "<li>No matching companies found. Try updating your interests.</li>";
  } else {
    filteredSuggestions.forEach(company => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${company.name}</strong> - Industry: ${company.industry} <br><em>Recommended by: ${company.recommendedBy}</em>`;
      list.appendChild(li);
    });
  }
}

// Populate internships list
function populateInternshipsList(filter = "") {
  const list = document.getElementById("internshipsList");
  list.innerHTML = "";

  const filteredInternships = internships.filter(internship =>
    internship.company.toLowerCase().includes(filter.toLowerCase()) ||
    internship.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredInternships.length === 0) {
    list.innerHTML = "<li>No internships found.</li>";
  } else {
    filteredInternships.forEach(internship => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${internship.title}</strong> at <em>${internship.company}</em> - Duration: ${internship.duration}`;
      list.appendChild(li);
    });
  }
}

// Select an internship
function selectInternship(internship) {
  alert(`You selected: ${internship.title} at ${internship.company}`);
}

// Search internships
document.getElementById("searchInternships").addEventListener("input", function (e) {
  populateInternshipsList(e.target.value);
});

// Filter internships
document.getElementById("filterIndustry").addEventListener("change", () => populateInternshipsList());
document.getElementById("filterDuration").addEventListener("change", () => populateInternshipsList());
document.getElementById("filterPaid").addEventListener("change", () => populateInternshipsList());

// Load major and semester from localStorage
function loadMajorAndSemester() {
  const data = JSON.parse(localStorage.getItem("studentMajorSemester")) || {};
  document.getElementById("major").value = data.major || "";
  document.getElementById("semester").value = data.semester || "";
}

// Save major and semester to localStorage
document.getElementById("majorSemesterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const major = document.getElementById("major").value;
  const semester = document.getElementById("semester").value;

  const data = { major, semester };
  localStorage.setItem("studentMajorSemester", JSON.stringify(data));

  document.getElementById("majorSemesterMessage").style.display = "block";
});
// Toggle Online Assessments list
document.addEventListener('DOMContentLoaded', function() {
  const showAssessmentsBtn = document.getElementById('showAssessmentsBtn');
  const assessmentsList = document.getElementById('assessmentsList');

  showAssessmentsBtn.addEventListener('click', function() {
    if (assessmentsList.style.display === 'none') {
      assessmentsList.style.display = 'block';
      showAssessmentsBtn.textContent = 'Hide Online Assessments';
    } else {
      assessmentsList.style.display = 'none';
      showAssessmentsBtn.textContent = 'Show Online Assessments';
    }
  });
});

// Mark assessment as started
function markAssessmentStarted() {
  localStorage.setItem("assessmentStarted", "true");
  const viewScoreBtn = document.getElementById("viewScoreBtn");
  viewScoreBtn.style.display = "block";
}

// Show dummy score
function showDummyScore() {
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.style.display = "block";
}

// Initialize the page
window.onload = function () {
  loadProfile();
  populateSuggestedCompanies();
  loadMajorAndSemester();
  populateInternshipsList();

  const viewScoreBtn = document.getElementById("viewScoreBtn");
  if (localStorage.getItem("assessmentStarted") !== "true") {
    viewScoreBtn.style.display = "none";
  }
};