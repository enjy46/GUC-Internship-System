// Constants for localStorage keys
const LS_KEYS = {
  PROFILE: "studentProfile",
  APPLICATIONS: "applications",
  EVALUATION: "companyEvaluation",
  RECOMMEND: "recommendCompany",
  EVALUATION_SAVED: "evaluationSaved",
  REPORT_TITLE: "reportTitle",
  REPORT_INTRO: "reportIntro",
  REPORT_BODY: "reportBody",
  HELPFUL_COURSES: "helpfulCourses"
};

const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
console.log(`Current Date: ${currentDate}`);

// Handle profile update
document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const interests = document.getElementById('interests').value.trim();
  const internships = document.getElementById('internships').value.trim();
  const activities = document.getElementById('activities').value.trim();
  const major = document.getElementById('majorSelect').value;
  const semester = document.getElementById('semesterSelect').value;

  if (!interests || !major || !semester) {
    alert("Please complete all required fields.");
    return;
  }

  const profile = { interests, internships, activities, major, semester };
  localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify(profile));

  alert("Profile updated successfully!");
  populateSuggestions(interests);
});

// Load profile
function loadProfile() {
  const profile = JSON.parse(localStorage.getItem(LS_KEYS.PROFILE));
  if (profile) {
    document.getElementById('interests').value = profile.interests;
    document.getElementById('internships').value = profile.internships;
    document.getElementById('activities').value = profile.activities;
    document.getElementById('majorSelect').value = profile.major;
    document.getElementById('semesterSelect').value = profile.semester;
    populateSuggestions(profile.interests);
  }
}

// Company suggestions
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

// Upload documents
function uploadExtraDocuments() {
  const files = document.getElementById("extraDocs").files;
  const fileNames = Array.from(files).map(file => file.name);
  const applications = JSON.parse(localStorage.getItem(LS_KEYS.APPLICATIONS) || "[]");

  if (applications.length === 0) {
    alert("Apply to at least one internship first.");
    return;
  }

  applications[applications.length - 1].documents = fileNames;
  localStorage.setItem(LS_KEYS.APPLICATIONS, JSON.stringify(applications));
  alert("Documents uploaded successfully.");
  displayApplications();
}

// Display applications
function displayApplications() {
  const container = document.getElementById("applicationList");
  const applications = JSON.parse(localStorage.getItem(LS_KEYS.APPLICATIONS) || "[]");

  container.innerHTML = applications.length === 0
    ? "<p>You have not applied to any internships yet.</p>"
    : "";

  applications.forEach(app => {
    if (!app.internship) return;
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

// Internship history
function loadInternshipHistory() {
  const container = document.getElementById("internshipHistory");
  const applications = JSON.parse(localStorage.getItem(LS_KEYS.APPLICATIONS) || "[]");

  container.innerHTML = applications.length === 0
    ? "<p>You have no past or present internships.</p>"
    : "";

  applications.forEach(app => {
    if (!app.internship) return;
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
    container.appendChild(div);
  });
}

// Search/filter internships
function searchAndFilterInternships() {
  const searchInput = document.getElementById("searchInternshipsInput").value.toLowerCase();
  const filterStatus = document.getElementById("filterInternshipsStatus").value;
  const container = document.getElementById("internshipHistory");
  const applications = JSON.parse(localStorage.getItem(LS_KEYS.APPLICATIONS) || "[]");

  const filtered = applications.filter(app => {
    const matchSearch = app.internship?.title.toLowerCase().includes(searchInput)
      || app.internship?.company.toLowerCase().includes(searchInput);
    const matchStatus = filterStatus === "" || app.status === filterStatus;
    return matchSearch && matchStatus;
  });

  container.innerHTML = filtered.length === 0
    ? "<p>No internships match your search or filter criteria.</p>"
    : "";

  filtered.forEach(app => {
    if (!app.internship) return;
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
    container.appendChild(div);
  });
}

function viewCompletedInternshipDetails(internship) {
  document.getElementById("completedInternshipTitle").textContent = `Title: ${internship.title}`;
  document.getElementById("completedInternshipCompany").textContent = `Company: ${internship.company}`;
  document.getElementById("completedInternshipDuration").textContent = `Duration: ${internship.duration}`;
  document.getElementById("completedInternshipSalary").textContent = `Salary: ${internship.paid ? internship.salary + " EGP" : "Unpaid"}`;
  document.getElementById("completedInternshipDetails").style.display = "block";
}

function closeCompletedInternshipDetails() {
  document.getElementById("completedInternshipDetails").style.display = "none";
}

// Save the evaluation for a specific company
function saveEvaluation() {
  const company = document.getElementById("companySelect").value;
  const evaluationText = document.getElementById("companyEvaluation").value.trim();
  const recommend = document.getElementById("recommendCompany").checked;

  if (!evaluationText) {
    alert("Please write your evaluation before submitting.");
    return;
  }

  const evaluationData = {
    company: company,
    text: evaluationText,
    recommend: recommend,
  };

  // Save to localStorage
  localStorage.setItem("companyEvaluation", JSON.stringify(evaluationData));
  alert(`Evaluation for ${company} saved successfully.`);
  loadEvaluation();
}

// Load the evaluation for a specific company
function loadEvaluation() {
  const evaluationData = JSON.parse(localStorage.getItem("companyEvaluation"));

  if (evaluationData) {
    document.getElementById("companySelect").value = evaluationData.company;
    document.getElementById("companyEvaluation").value = evaluationData.text;
    document.getElementById("recommendCompany").checked = evaluationData.recommend;

    // Disable the form to prevent multiple evaluations
    document.getElementById("companySelect").disabled = true;
    document.getElementById("companyEvaluation").disabled = true;
    document.getElementById("recommendCompany").disabled = true;
    document.querySelector("button[onclick='saveEvaluation()']").style.display = "none";
    document.querySelector("button[onclick='editEvaluation()']").style.display = "inline";
    document.querySelector("button[onclick='deleteEvaluation()']").style.display = "inline";
  } else {
    // No evaluation exists, enable the form
    document.getElementById("companySelect").disabled = false;
    document.getElementById("companyEvaluation").disabled = false;
    document.getElementById("recommendCompany").disabled = false;
    document.querySelector("button[onclick='saveEvaluation()']").style.display = "inline";
    document.querySelector("button[onclick='editEvaluation()']").style.display = "none";
    document.querySelector("button[onclick='deleteEvaluation()']").style.display = "none";
  }
}

// Edit the evaluation for a specific company
function editEvaluation() {
  document.getElementById("companySelect").disabled = false;
  document.getElementById("companyEvaluation").disabled = false;
  document.getElementById("recommendCompany").disabled = false;
  document.querySelector("button[onclick='saveEvaluation()']").style.display = "inline";
  document.querySelector("button[onclick='editEvaluation()']").style.display = "none";
}

// Delete the evaluation for a specific company
function deleteEvaluation() {
  localStorage.removeItem("companyEvaluation");
  alert("Evaluation deleted. You can now submit a new evaluation.");
  loadEvaluation();
}

// Call this function on page load
loadEvaluation();

// Internship report
function saveReport() {
  localStorage.setItem(LS_KEYS.REPORT_TITLE, document.getElementById("reportTitle").value);
  localStorage.setItem(LS_KEYS.REPORT_INTRO, document.getElementById("reportIntro").value);
  localStorage.setItem(LS_KEYS.REPORT_BODY, document.getElementById("reportBody").value);
  alert("Report saved.");
}

function deleteReport() {
  localStorage.removeItem(LS_KEYS.REPORT_TITLE);
  localStorage.removeItem(LS_KEYS.REPORT_INTRO);
  localStorage.removeItem(LS_KEYS.REPORT_BODY);
  alert("Report deleted.");
}

function loadReport() {
  document.getElementById("reportTitle").value = localStorage.getItem(LS_KEYS.REPORT_TITLE) || "";
  document.getElementById("reportIntro").value = localStorage.getItem(LS_KEYS.REPORT_INTRO) || "";
  document.getElementById("reportBody").value = localStorage.getItem(LS_KEYS.REPORT_BODY) || "";
}

function downloadInternshipReport() {
  const title = document.getElementById("reportTitle").value || "Internship Report";
  const intro = document.getElementById("reportIntro").value || "[No Introduction]";
  const body = document.getElementById("reportBody").value || "[No Body]";
  const content = `Introduction:\n${intro}\n\nBody:\n${body}`;
  generatePDF(title, content);
}

// Courses
const courses = {
  CS: ["Data Structures", "Web Development", "Algorithms"],
  Eng: ["Thermodynamics", "Circuit Analysis", "Fluid Mechanics"],
  Business: ["Marketing", "Finance", "Organizational Behavior"]
};

function loadCourses() {
  const coursesDropdown = document.getElementById("majorCoursesDropdown");
  if (coursesDropdown) {
    coursesDropdown.innerHTML = ""; // Clear existing options

    allCourses.forEach(course => {
      const option = document.createElement("option");
      option.textContent = course;
      coursesDropdown.appendChild(option);
    });
  } else {
    console.error("Element with id 'majorCoursesDropdown' not found.");
  }
}

function addManualCourse() {
  const input = document.getElementById("manualCourseInput");
  const courseName = input.value.trim();
  if (courseName) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.value = courseName;
    checkbox.name = "helpfulCourses";

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + courseName));
    document.getElementById("selectableCourses").appendChild(li);

    input.value = "";
  }
}

function saveSelectedCourses() {
  const selected = Array.from(document.querySelectorAll("input[name='helpfulCourses']:checked")).map(cb => cb.value);
  localStorage.setItem(LS_KEYS.HELPFUL_COURSES, JSON.stringify(selected));
  alert("Selected courses saved.");
}

// Final report display
function submitFinalReport() {
  const title = localStorage.getItem(LS_KEYS.REPORT_TITLE) || "[No Title]";
  const intro = localStorage.getItem(LS_KEYS.REPORT_INTRO) || "[No Intro]";
  const body = localStorage.getItem(LS_KEYS.REPORT_BODY) || "[No Body]";
  const final = `Title: ${title}\n\nIntroduction:\n${intro}\n\nBody:\n${body}`;
  document.getElementById("finalReportDisplay").textContent = final;
  alert("Report submitted (saved for now).");
}

// List of all courses in the student's major
const allCourses = [
  "Management",
  "Economics",
  "Financial Accounting",
  "Mathematics",
  "Computer Programming",
  "Principles of Law",
  "Data Structures and Algorithms",
  "Management Accounting",
  "Micro-economics",
  "Enterprise Systems",
  "Information and Communication Architecture",
  "Computer Programming Lab",
  "German Language IV",
  "Human Resource Management",
  "Electronic Business and Government",
  "Introduction to Networks",
  "Data Bases",
  "Operations",
  "Auditing",
  "Research Methodology",
  "Corporate Finance",
  "Theory of Computation",
  "Software Engineering",
  "Taxation",
  "IT Project Management",
  "Enterprise Systems Applications",
  "Human Computer Interaction",
  "Business Law",
  "Organizational Behavior",
  "Information Security",
  "E-Business Development",
  "Data Mining",
  "Academic English"
];

// Function to load courses into the dropdown
function loadMajorCourses() {
  const coursesDropdown = document.getElementById("majorCoursesDropdown");
  if (coursesDropdown) {
    coursesDropdown.innerHTML = ""; // Clear existing options
    // Populate courses
  } else {
    console.error("Element with id 'majorCoursesDropdown' not found.");
  }
}

// Mock data for companies that viewed the profile
const companiesThatViewedProfile = [
  "TechCorp",
  "Innovate Inc.",
  "Future Solutions",
  "Global Enterprises"
];

// Function to load and display companies that viewed the profile
function loadProfileViews() {
  const profileViewsList = document.getElementById("profileViewsList");
  profileViewsList.innerHTML = ""; // Clear existing list

  if (companiesThatViewedProfile.length === 0) {
    profileViewsList.innerHTML = "<li>No companies have viewed your profile yet.</li>";
  } else {
    companiesThatViewedProfile.forEach(company => {
      const listItem = document.createElement("li");
      listItem.textContent = company;
      profileViewsList.appendChild(listItem);
    });
  }
}

// Mock data for internship reports with comments
let internshipReports = [
  { title: "Internship at TechCorp", status: "flagged", comments: "Please revise the introduction section." },
  { title: "Internship at BuildIt", status: "rejected", comments: "The report lacks sufficient details about your responsibilities." },
];

// Function to simulate setting a report status
function setReportStatus(reportTitle, newStatus) {
  const report = internshipReports.find(r => r.title === reportTitle);
  if (report) {
    report.status = newStatus;
    notifyReportStatusChange(report);
  }
}

// Function to notify the student/PRO student about the status change
function notifyReportStatusChange(report) {
  const notificationMessage = `Your internship report "${report.title}" status has been set to "${report.status}".`;

  // Display the notification in the console (for debugging)
  console.log(notificationMessage);

  // Add the notification to the UI
  const notificationList = document.getElementById("notificationList");
  const li = document.createElement("li");
  li.textContent = notificationMessage;
  notificationList.appendChild(li);

  // Optionally, use an alert for immediate feedback
  alert(notificationMessage);
}

// Function to display comments for flagged or rejected reports
function displayComments() {
  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = ""; // Clear previous comments

  // Filter reports with flagged or rejected status
  const flaggedOrRejectedReports = internshipReports.filter(
    report => report.status === "flagged" || report.status === "rejected"
  );

  if (flaggedOrRejectedReports.length === 0) {
    commentsContainer.innerHTML = "<p>No comments available.</p>";
    return;
  }

  // Display comments for each flagged or rejected report
  flaggedOrRejectedReports.forEach(report => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const title = document.createElement("h4");
    title.textContent = `Report: ${report.title}`;
    commentDiv.appendChild(title);

    const status = document.createElement("p");
    status.textContent = `Status: ${report.status}`;
    commentDiv.appendChild(status);

    const comment = document.createElement("p");
    comment.textContent = `Comment: ${report.comments}`;
    commentDiv.appendChild(comment);

    commentsContainer.appendChild(commentDiv);
  });
}

// Function to populate the dropdown with flagged or rejected reports
function populateAppealDropdown() {
  const reportToAppeal = document.getElementById("reportToAppeal");
  reportToAppeal.innerHTML = ""; // Clear previous options

  // Filter reports with flagged or rejected status
  const flaggedOrRejectedReports = internshipReports.filter(
    report => report.status === "flagged" || report.status === "rejected"
  );

  if (flaggedOrRejectedReports.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No flagged or rejected reports available";
    option.disabled = true;
    option.selected = true;
    reportToAppeal.appendChild(option);
    return;
  }

  // Populate dropdown with flagged or rejected reports
  flaggedOrRejectedReports.forEach(report => {
    const option = document.createElement("option");
    option.value = report.title;
    option.textContent = `${report.title} (${report.status})`;
    reportToAppeal.appendChild(option);
  });
}

// Function to submit an appeal
function submitAppeal() {
  const reportToAppeal = document.getElementById("reportToAppeal").value;
  const appealMessage = document.getElementById("appealMessage").value.trim();

  if (!reportToAppeal || !appealMessage) {
    alert("Please select a report and write an appeal message before submitting.");
    return;
  }

  // Simulate submitting the appeal (replace with actual API call)
  console.log(`Appeal submitted for "${reportToAppeal}": ${appealMessage}`);
  alert(`Your appeal for "${reportToAppeal}" has been submitted.`);

  // Clear the appeal message
  document.getElementById("appealMessage").value = "";
}

// Mock data for videos based on majors
const internshipVideos = {
  CS: "https://www.example.com/videos/cs_internships.mp4",
  Eng: "https://www.example.com/videos/eng_internships.mp4",
  Business: "https://www.example.com/videos/business_internships.mp4",
};

// Function to load the video based on the selected major
function loadInternshipVideo() {
  const major = document.getElementById("majorVideoDropdown").value;
  const videoPlayer = document.getElementById("videoPlayer");

  // Clear the video player
  videoPlayer.innerHTML = "";

  if (!major || !internshipVideos[major]) {
    videoPlayer.innerHTML = "<p>Please select a valid major to view the video.</p>";
    return;
  }

  // Create and display the video element
  const video = document.createElement("video");
  video.src = internshipVideos[major];
  video.controls = true;
  video.style.width = "100%";
  video.style.maxWidth = "600px";
  videoPlayer.appendChild(video);
}

// Example usage: Simulate a status change
window.onload = function () {
  // Simulate a status change after 3 seconds (for demonstration purposes)
  setTimeout(() => setReportStatus("Internship at TechCorp", "accepted"), 3000);

  loadProfile();
  loadEvaluation();
  loadReport();
  loadCourses(); // Ensure this function is called
  displayApplications();
  loadInternshipHistory();
  searchAndFilterInternships();
  loadProfileViews();
  displayComments(); // Load comments for flagged or rejected reports
  document.getElementById("majorSelect").addEventListener("change", loadCourses);
  populateAppealDropdown(); // Populate the dropdown for appeals
  loadInternshipVideo(); // Ensure the dropdown is ready
};

// Call this function on page load
loadMajorCourses();

function downloadReportAsPDF() {
  const title = document.getElementById("reportTitle").value || "Internship Report";
  const intro = document.getElementById("reportIntro").value || "[No Introduction]";
  const body = document.getElementById("reportBody").value || "[No Body]";
  const content = `Introduction:\n${intro}\n\nBody:\n${body}`;
  generatePDF(title, content);
}


