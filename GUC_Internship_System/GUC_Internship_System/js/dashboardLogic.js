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

// Global functions for modal handling
function closeEvaluationReportModal() {
  const modal = document.getElementById("evaluationReportModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function viewEvaluationReportDetails(index) {
  const report = evaluationReports[index];
  document.getElementById("evalStudentName").textContent = report.studentName;
  document.getElementById("evalCompanyName").textContent = report.companyName;
  document.getElementById("evalSupervisor").textContent = report.supervisor;
  document.getElementById("evalStartDate").textContent = report.startDate;
  document.getElementById("evalEndDate").textContent = report.endDate;

  document.getElementById("evaluationReportModal").style.display = "block";
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
  
  // Get the form element by ID
  const cycleDateForm = document.getElementById('cycleDateForm');
  
  if (cycleDateForm) { // Check if the element exists in the DOM
    // Attach the submit event listener to the form
    cycleDateForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form submission

      // Get start and end date values
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const displayDiv = document.getElementById('dateDisplay');

      // Validate the dates
      if (new Date(startDate) > new Date(endDate)) {
        displayDiv.style.color = 'red';
        displayDiv.textContent = 'Error: Start date cannot be after end date.';
        return;
      }

      // If dates are valid, display them
      displayDiv.style.color = 'green';
      displayDiv.textContent = `Internship cycle set from ${startDate} to ${endDate}.`;

      // Optionally clear the form after setting the dates
      cycleDateForm.reset();
    });
  } else {
    console.error('cycleDateForm element not found!');
  }

  // Get references to the other page elements for company management
  const companies = [
    {
      name: "Innovatech",
      industry: "Tech",
      size: "Medium",
      logo: "assets/logo.png",
      email: "contact@innovatech.com",
      documents: ["Tax_ID_1234.pdf"],
      status: "pending"
    },
    {
      name: "FinanceCorp",
      industry: "Finance",
      size: "Large",
      logo: "assets/logo.png",
      email: "info@financecorp.com",
      documents: ["License_9876.pdf"],
      status: "pending"
    },
    // Add more companies as needed
  ];

  const companyList = document.getElementById("companyList");
  const searchInput = document.getElementById("searchInput");
  const industryFilter = document.getElementById("industryFilter");

  function renderCompanies(list) {
    companyList.innerHTML = "";
    list.forEach((company, index) => {
      const card = document.createElement("div");
      card.className = "company-card";
      card.innerHTML = `
        <img src="${company.logo}" alt="${company.name} Logo">
        <h3>${company.name}</h3>
        <p><strong>Industry:</strong> ${company.industry}</p>
        <p><strong>Size:</strong> ${company.size}</p>
        <p><strong>Email:</strong> ${company.email}</p>
        <p><strong>Documents:</strong> ${company.documents.join(", ")}</p>
        <p><strong>Status:</strong> ${company.status}</p>
        <button onclick="viewDetails(${index})">View Details</button>
        <button onclick="acceptCompany(${index})">Accept</button>
        <button onclick="rejectCompany(${index})">Reject</button>
      `;
      companyList.appendChild(card);
    });
  }

  function viewDetails(index) {
    const company = companies[index];
    alert(`Company Details:\n\nName: ${company.name}\nIndustry: ${company.industry}\nSize: ${company.size}\nEmail: ${company.email}\nDocuments: ${company.documents.join(", ")}`);
  }

  function acceptCompany(index) {
    companies[index].status = "accepted";
    renderCompanies(filterAndSearch());
  }

  function rejectCompany(index) {
    companies[index].status = "rejected";
    renderCompanies(filterAndSearch());
  }

  function filterAndSearch() {
    const search = searchInput.value.toLowerCase();
    const industry = industryFilter.value;

    return companies.filter(c =>
      c.name.toLowerCase().includes(search) &&
      (industry === "" || c.industry === industry)
    );
  }

  function downloadCompanyApplications() {
    const applications = companies.map(company => 
      `Company: ${company.name}\nIndustry: ${company.industry}\nStatus: ${company.status}\n\n`
    ).join("");
    generatePDF("Company Applications", applications);
  }

  searchInput.addEventListener("input", () => renderCompanies(filterAndSearch()));
  industryFilter.addEventListener("change", () => renderCompanies(filterAndSearch()));

  renderCompanies(companies);

  // Mock data for internship reports
  const internshipReports = [
    { title: "AI Research", major: "Computer Science", status: "pending", student: "Alice" },
    { title: "Bridge Design", major: "Engineering", status: "accepted", student: "Bob" },
    { title: "Market Analysis", major: "Business", status: "flagged", student: "Charlie" },
    { title: "Web Development", major: "Computer Science", status: "rejected", student: "Dave" },
  ];

  const filterByMajor = document.getElementById("filterByMajor");
  const filterByStatus = document.getElementById("filterByStatus");
  const reportsList = document.getElementById("reportsList");

  // Function to render internship reports
  function renderReports(data) {
    reportsList.innerHTML = "";
    if (data.length === 0) {
      reportsList.innerHTML = "<li>No reports found.</li>";
      return;
    }

    data.forEach(report => {
      const li = document.createElement("li");
      li.textContent = `Title: ${report.title}, Major: ${report.major}, Status: ${report.status}, Student: ${report.student}`;
      reportsList.appendChild(li);
    });
  }

  // Function to filter internship reports
  function filterReports() {
    const selectedMajor = filterByMajor.value;
    const selectedStatus = filterByStatus.value;

    const filteredReports = internshipReports.filter(report => {
      const matchesMajor = selectedMajor === "" || report.major === selectedMajor;
      const matchesStatus = selectedStatus === "" || report.status === selectedStatus;
      return matchesMajor && matchesStatus;
    });

    renderReports(filteredReports);
  }

  // Add event listeners for filtering
  filterByMajor.addEventListener("change", filterReports);
  filterByStatus.addEventListener("change", filterReports);

  // Function to fetch and display all reports
  function fetchAllReports() {
    renderReports(internshipReports);
  }

  // Function to fetch and display evaluation reports
  function fetchEvaluationReports() {
    const evaluationReportsList = document.getElementById("evaluationReportsList");
    const instructionText = document.querySelector('.instruction-text');
    
    if (!evaluationReportsList) return; // Guard clause in case element doesn't exist
    
    // Clear the list before populating
    evaluationReportsList.innerHTML = "";
    
    // Hide the instruction text
    if (instructionText) {
      instructionText.style.display = 'none';
    }

    evaluationReports.forEach((report, index) => {
      const li = document.createElement("li");
      li.textContent = `Student: ${report.studentName}, Company: ${report.companyName}`;
      li.style.cursor = "pointer";
      li.onclick = () => viewEvaluationReportDetails(index); // Attach click event to view details
      evaluationReportsList.appendChild(li);
    });
  }

  // Add event listener for the evaluation reports button
  const loadEvaluationReportsBtn = document.querySelector('button[onclick="fetchEvaluationReports()"]');
  if (loadEvaluationReportsBtn) {
    loadEvaluationReportsBtn.addEventListener('click', fetchEvaluationReports);
  }
});