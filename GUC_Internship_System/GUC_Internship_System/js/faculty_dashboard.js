// Function to download evaluations as a PDF
function downloadEvaluations() {
  const evaluations = JSON.parse(localStorage.getItem("evaluations")) || {};
  const content = Object.entries(evaluations).map(([name, evaluation]) => 
    `Name: ${name}\nEvaluation: ${evaluation}\n\n`
  ).join("");
  generatePDF("Evaluations", content);
}

// Mock data for students and reports
let allStudents = [
  { name: "Alice", email: "alice@example.com", major: "Computer Science", status: "current intern", details: "Working at TechCorp" },
  { name: "Bob", email: "bob@example.com", major: "Engineering", status: "internship complete", details: "Completed internship at BuildIt" },
  { name: "Charlie", email: "charlie@example.com", major: "Business", status: "not started", details: "Looking for opportunities" },
];

let allReports = [
  { title: "AI Research", major: "Computer Science", status: "pending", student: "Alice" },
  { title: "Bridge Design", major: "Engineering", status: "accepted", student: "Bob" },
  { title: "Market Analysis", major: "Business", status: "flagged", student: "Charlie" },
];

// Function to fetch and display all students
function fetchAllStudents() {
  displayStudents(allStudents);
}

// Function to display students in the list
function displayStudents(students) {
  const studentsList = document.getElementById("studentsList");
  studentsList.innerHTML = ""; // Clear the list before populating

  if (students.length === 0) {
    studentsList.innerHTML = "<li>No students found.</li>";
    return;
  }

  students.forEach(student => {
    const li = document.createElement("li");
    li.textContent = `Name: ${student.name}, Email: ${student.email}, Status: ${student.status}`;
    li.style.cursor = "pointer";
    li.onclick = () => viewStudentProfile(student); // Attach click event to view profile
    studentsList.appendChild(li);
  });
}

// Function to filter students by internship status
function filterStudentsByStatus() {
  const statusFilter = document.getElementById("statusFilter").value;
  const filteredStudents = statusFilter
    ? allStudents.filter(student => student.status === statusFilter)
    : allStudents;

  displayStudents(filteredStudents);
}

// Function to view a student's profile
function viewStudentProfile(student) {
  document.getElementById("profileName").textContent = student.name;
  document.getElementById("profileEmail").textContent = student.email;
  document.getElementById("profileMajor").textContent = student.major;
  document.getElementById("profileStatus").textContent = student.status;
  document.getElementById("profileDetails").textContent = student.details;

  document.getElementById("studentProfileModal").style.display = "block";
}

// Function to close the student profile modal
function closeStudentProfile() {
  document.getElementById("studentProfileModal").style.display = "none";
}

// Function to fetch and display all reports
function fetchAllReports() {
  const reportsList = document.getElementById("reportsList");
  reportsList.innerHTML = ""; // Clear existing list

  allReports.forEach(report => {
    const listItem = document.createElement("li");
    listItem.textContent = `Title: ${report.title}, Major: ${report.major}, Status: ${report.status}, Student: ${report.student}`;
    
    // Add a button to open the status update modal
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update Status";
    updateButton.onclick = () => openReportStatusModal(report);
    listItem.appendChild(updateButton);

    reportsList.appendChild(listItem);
  });
}

// Function to display reports in the list
function displayReports(reports) {
  const reportsList = document.getElementById("reportsList");
  reportsList.innerHTML = ""; // Clear the list before populating

  if (reports.length === 0) {
    reportsList.innerHTML = "<li>No reports found.</li>";
    return;
  }

  reports.forEach(report => {
    const li = document.createElement("li");
    li.textContent = `Title: ${report.title}, Major: ${report.major}, Status: ${report.status}, Student: ${report.student}`;
    reportsList.appendChild(li);
  });
}

// Function to filter and display reports dynamically
function filterReports() {
  const majorFilter = document.getElementById("filterByMajor").value;
  const statusFilter = document.getElementById("filterByStatus").value;

  const reportsList = document.getElementById("reportsList");
  reportsList.innerHTML = ""; // Clear existing list

  // Filter evaluations based on selected filters
  const filteredReports = evaluations.filter(evaluation => {
    const matchesMajor = majorFilter === "" || evaluation.major === majorFilter;
    const matchesStatus = statusFilter === "" || evaluation.status === statusFilter;
    return matchesMajor && matchesStatus;
  });

  // Populate the filtered reports
  filteredReports.forEach(evaluation => {
    const listItem = document.createElement("li");
    listItem.textContent = `Student: ${evaluation.studentName}, Company: ${evaluation.companyName}`;
    
    // Add a button to view the evaluation report
    const viewButton = document.createElement("button");
    viewButton.textContent = "View Details";
    viewButton.onclick = () => openEvaluationReportModal(evaluation);
    listItem.appendChild(viewButton);

    reportsList.appendChild(listItem);
  });
}

// Function to open the report status modal
function openReportStatusModal(report) {
  document.getElementById("reportTitle").textContent = report.title;
  document.getElementById("reportStudent").textContent = report.student;
  document.getElementById("updateStatus").value = report.status;
  document.getElementById("reportStatusModal").style.display = "block";

  // Store the current report in a global variable for updating
  window.currentReport = report;
}

// Function to close the report status modal
function closeReportStatusModal() {
  document.getElementById("reportStatusModal").style.display = "none";
  window.currentReport = null;
}

// Function to update the report status
function updateReportStatus() {
  const newStatus = document.getElementById("updateStatus").value;

  if (window.currentReport) {
    // Update the status in the allReports array
    window.currentReport.status = newStatus;

    // Refresh the reports list
    fetchAllReports();

    // Close the modal
    closeReportStatusModal();

    alert("Report status updated successfully!");
  } else {
    alert("No report selected for updating.");
  }
}

// Attach the filterReports function to the filter dropdowns
document.getElementById("filterByMajor").addEventListener("change", filterReports);
document.getElementById("filterByStatus").addEventListener("change", filterReports);