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
  displayReports(allReports);
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

// Function to filter reports by major and status
function filterReports() {
  const majorFilter = document.getElementById("filterByMajor").value;
  const statusFilter = document.getElementById("filterByStatus").value;

  const filteredReports = allReports.filter(report => {
    const matchesMajor = !majorFilter || report.major === majorFilter;
    const matchesStatus = !statusFilter || report.status === statusFilter;
    return matchesMajor && matchesStatus;
  });

  displayReports(filteredReports);
}

// Add event listeners for filtering
document.getElementById("filterByMajor").addEventListener("change", filterReports);
document.getElementById("filterByStatus").addEventListener("change", filterReports);