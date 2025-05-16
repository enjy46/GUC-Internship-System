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

// Mock data for evaluation reports
const evaluationReports = [
  {
    studentName: "Alice",
    companyName: "TechCorp",
    supervisor: "John Doe",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
  },
  {
    studentName: "Bob",
    companyName: "BuildIt",
    supervisor: "Jane Smith",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
  },
  {
    studentName: "Charlie",
    companyName: "BizWorld",
    supervisor: "Michael Brown",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
  },
];

// Internship Reports Management
let internshipReports = JSON.parse(localStorage.getItem('internshipReports')) || [
  {
    id: 1,
    studentName: "John Doe",
    company: "Tech Corp",
    reportTitle: "Summer Internship Report",
    status: "pending",
    submissionDate: "2024-03-15",
    content: "Detailed internship experience and learnings...",
    comments: ""
  },
  {
    id: 2,
    studentName: "Jane Smith",
    company: "Data Analytics Inc",
    reportTitle: "Data Science Internship Report",
    status: "accepted",
    submissionDate: "2024-03-10",
    content: "Analysis of machine learning models...",
    comments: "Excellent work on the project"
  }
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

// Function to fetch and display evaluation reports
function fetchEvaluationReports() {
  const evaluationReportsList = document.getElementById("evaluationReportsList");
  evaluationReportsList.innerHTML = ""; // Clear the list before populating

  evaluationReports.forEach((report, index) => {
    const li = document.createElement("li");
    li.textContent = `Student: ${report.studentName}, Company: ${report.companyName}`;
    li.style.cursor = "pointer";
    li.onclick = () => viewEvaluationReportDetails(index); // Attach click event to view details
    evaluationReportsList.appendChild(li);
  });
}

// Function to view detailed evaluation report
function viewEvaluationReportDetails(index) {
  const report = evaluationReports[index];
  document.getElementById("evalStudentName").textContent = report.studentName;
  document.getElementById("evalCompanyName").textContent = report.companyName;
  document.getElementById("evalSupervisor").textContent = report.supervisor;
  document.getElementById("evalStartDate").textContent = report.startDate;
  document.getElementById("evalEndDate").textContent = report.endDate;

  document.getElementById("evaluationReportModal").style.display = "block";
}

// Function to close the evaluation report modal
function closeEvaluationReportModal() {
  document.getElementById("evaluationReportModal").style.display = "none";
}

// Function to filter and search reports
function filterAndSearchReports() {
  const searchTerm = document.getElementById('reportSearchInput').value.toLowerCase();
  const statusFilter = document.getElementById('reportStatusFilter').value;
  
  return internshipReports.filter(report => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm) ||
                         report.company.toLowerCase().includes(searchTerm) ||
                         report.reportTitle.toLowerCase().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
}

// Function to render reports
function renderReports() {
  const reportsList = document.getElementById('reportsList');
  reportsList.innerHTML = '';
  
  const filteredReports = filterAndSearchReports();
  
  if (filteredReports.length === 0) {
    reportsList.innerHTML = `
      <div class="no-results" style="text-align: center; padding: 2rem; color: #666;">
        No reports found matching your search criteria.
      </div>
    `;
    return;
  }
  
  filteredReports.forEach(report => {
    const reportCard = document.createElement('div');
    reportCard.className = 'report-card';
    reportCard.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-left: 4px solid ${getStatusColor(report.status)};
    `;
    
    reportCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem; color: #0d1b2a; font-size: 1.2rem;">${report.reportTitle}</h4>
          <p style="margin: 0; color: #666;">${report.studentName} - ${report.company}</p>
        </div>
        <span class="status-badge" style="
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          background-color: ${getStatusColor(report.status)};
          color: white;
        ">${report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
      </div>
      <p style="margin: 0.5rem 0; color: #444;">${report.content.substring(0, 150)}...</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
        <span style="color: #666; font-size: 0.9rem;">Submitted: ${report.submissionDate}</span>
        <button onclick="openReportStatusModal(${report.id})" style="
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          background-color: #0d1b2a;
          color: white;
          cursor: pointer;
          font-size: 0.9rem;
        ">Update Status</button>
      </div>
    `;
    
    reportsList.appendChild(reportCard);
  });
}

// Function to get status color
function getStatusColor(status) {
  switch (status) {
    case 'accepted':
      return '#4CAF50';
    case 'rejected':
      return '#dc3545';
    case 'flagged':
      return '#ffc107';
    default:
      return '#6c757d';
  }
}

// Function to open report status modal
function openReportStatusModal(reportId) {
  const report = internshipReports.find(r => r.id === reportId);
  if (!report) return;
  
  document.getElementById('reportStatus').value = report.status;
  document.getElementById('statusComment').value = report.comments || '';
  
  const modal = document.getElementById('reportStatusModal');
  modal.style.display = 'block';
  
  // Update form submission handler
  const form = document.getElementById('reportStatusForm');
  form.onsubmit = function(e) {
    e.preventDefault();
    
    const newStatus = document.getElementById('reportStatus').value;
    const comments = document.getElementById('statusComment').value;
    
    // Update report
    report.status = newStatus;
    report.comments = comments;
    
    // Save to localStorage
    localStorage.setItem('internshipReports', JSON.stringify(internshipReports));
    
    // Update display
    renderReports();
    
    // Close modal
    closeReportStatusModal();
    
    // Show notification
    showNotification(`Report status updated to ${newStatus}`, 'success');
  };
}

// Function to close report status modal
function closeReportStatusModal() {
  document.getElementById('reportStatusModal').style.display = 'none';
}

// Add event listeners for search and filter
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('reportSearchInput');
  const statusFilter = document.getElementById('reportStatusFilter');
  
  if (searchInput && statusFilter) {
    searchInput.addEventListener('input', renderReports);
    statusFilter.addEventListener('change', renderReports);
    
    // Initial render
    renderReports();
  }
});

// Attach the filterReports function to the filter dropdowns
document.getElementById("filterByMajor").addEventListener("change", filterReports);
document.getElementById("filterByStatus").addEventListener("change", filterReports);