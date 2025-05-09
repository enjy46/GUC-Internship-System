// Example data for suggested companies
const allSuggestions = [
  { name: "TechSpark", interest: "AI", industry: "Technology", recommendedBy: "Intern 2023" },
  { name: "MediSoft", interest: "Healthcare", industry: "Software", recommendedBy: "Intern 2024" },
  { name: "FinScope", interest: "Finance", industry: "Banking", recommendedBy: "Intern 2024" },
  { name: "EduWare", interest: "Education", industry: "EdTech", recommendedBy: "Intern 2023" }
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

// Initialize the page
window.onload = function () {
  loadProfile();
  populateSuggestedCompanies();
  loadMajorAndSemester();
};