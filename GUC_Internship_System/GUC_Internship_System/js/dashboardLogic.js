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
    // Add more dummy companies here
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
  
  searchInput.addEventListener("input", () => renderCompanies(filterAndSearch()));
  industryFilter.addEventListener("change", () => renderCompanies(filterAndSearch()));
  
  renderCompanies(companies);
  