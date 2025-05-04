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

});
