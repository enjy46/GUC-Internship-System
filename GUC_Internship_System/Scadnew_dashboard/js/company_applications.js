document.addEventListener('DOMContentLoaded', function () {
  // Add modal styles
  const style = document.createElement('style');
  style.textContent = `
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }

    .modal-content {
      position: relative;
      background-color: white;
      margin: 15% auto;
      padding: 2rem;
      width: 80%;
      max-width: 600px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .close-btn {
      position: absolute;
      right: 1rem;
      top: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    .close-btn:hover {
      color: #333;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status-pending {
      background-color: #fef3c7;
      color: #92400e;
    }

    .status-accepted {
      background-color: #dcfce7;
      color: #166534;
    }

    .status-rejected {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .notification {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background-color: #4CAF50;
      color: white;
      padding: 1rem 2rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .action-btn.accept {
      background-color: #4CAF50;
      color: white;
    }

    .action-btn.accept:hover {
      background-color: #45a049;
    }

    .action-btn.reject {
      background-color: #dc3545;
      color: white;
    }

    .action-btn.reject:hover {
      background-color: #c82333;
    }
  `;
  document.head.appendChild(style);

  const companies = [
    {
      name: "Innovatech",
      industry: "Technology",
      size: "Medium",
      logo: "../scadassets/techlogo.png",
      email: "contact@innovatech.com",
      documents: ["Tax_ID_1234.pdf"],
      status: "pending"
    },
    {
      name: "FinanceCorp",
      industry: "Finance",
      size: "Large",
      logo: "../scadassets/salary.png",
      email: "info@financecorp.com",
      documents: ["License_9876.pdf"],
      status: "pending"
    }
  ];
 

  const companyList = document.getElementById("companyList");
  const searchInput = document.getElementById("searchInput");
  const industryFilter = document.getElementById("industryFilter");

  function renderCompanies(list) {
    companyList.innerHTML = ""; // Clear the existing list
    list.forEach((company, index) => {
      const card = document.createElement("div");
      card.className = "company-card";
      card.innerHTML = `
       <div class="company-header">
  <img src="${company.logo}" alt="${company.name} Logo" class="company-logo" loading="lazy" onerror="this.src='https://placehold.co/50x50'"><h3>${company.name}</h3>
</div>
       
        <div class="action-buttons">
          <button class="action-btn view-details">View Details</button>
        </div>
      `;

      // Attach event listener only to "View Details"
      const viewDetailsBtn = card.querySelector(".view-details");
      viewDetailsBtn.addEventListener("click", () => viewDetails(index));

      companyList.appendChild(card);
    });
  }

  function viewDetails(index) {
    const company = companies[index];
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
      <span class="close-btn">&times;</span>
        <h3>${company.name}</h3>
        <p><strong>Industry:</strong> ${company.industry}</p>
        <p><strong>Size:</strong> ${company.size}</p>
        <p><strong>Email:</strong> ${company.email}</p>
        <p><strong>Documents:</strong> ${company.documents.join(", ")}</p>
        <p><strong>Status:</strong> 
        <span class="status-badge status-${company.status}" id="modal-status">${company.status}</span>
      </p>
        <div class="action-buttons">
          <button class="action-btn accept">Accept</button>
          <button class="action-btn reject">Reject</button>
        </div>
      </div>
    `;

    // Add modal to the page
    document.body.appendChild(modal);
    modal.style.display = "block";

     // Close modal handler
  modal.querySelector(".close-btn").addEventListener("click", () => {
    modal.remove();
  });

    // Attach accept/reject event handlers here
    modal.querySelector(".accept").addEventListener("click", () => {
      acceptCompany(index);
       updateModalStatus("accepted");
      showNotification("The company has been accepted.");
    });

    modal.querySelector(".reject").addEventListener("click", () => {
      rejectCompany(index);
       updateModalStatus("rejected");
      showNotification("The company has been rejected.");
    });
    function updateModalStatus(newStatus) {
    const statusSpan = modal.querySelector("#modal-status");
    statusSpan.textContent = newStatus;
    statusSpan.className = `status-badge status-${newStatus}`;
  }
  }


  function acceptCompany(index) {
    companies[index].status = "accepted"; // Update the status
    renderCompanies(filterAndSearch()); // Re-render the list
  }

  function rejectCompany(index) {
    companies[index].status = "rejected"; // Update the status
    renderCompanies(filterAndSearch()); // Re-render the list
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000); // Remove notification after 3 seconds
  }

  function filterAndSearch() {
    const search = searchInput.value.toLowerCase();
    const industry = industryFilter.value;

    return companies.filter(c =>
      c.name.toLowerCase().includes(search) &&
      (industry === "all" || c.industry === industry)
    );
  }

  function downloadCompanyApplications() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Company Applications", 10, 20);

    const filteredCompanies = filterAndSearch();

    if (filteredCompanies.length === 0) {
      doc.setFontSize(12);
      doc.text("No applications match the current filters.", 10, 40);
    } else {
      doc.setFontSize(12);
      doc.text("No.", 10, 40);
      doc.text("Company", 30, 40);
      doc.text("Industry", 100, 40);
      doc.text("Status", 160, 40);

      filteredCompanies.forEach((company, index) => {
        const yPosition = 50 + index * 10;
        doc.text(`${index + 1}`, 10, yPosition);
        doc.text(company.name, 30, yPosition);
        doc.text(company.industry, 100, yPosition);
        doc.text(company.status, 160, yPosition);
      });
    }

    doc.save("Company-Applications.pdf");
  }

  searchInput.addEventListener("input", () => renderCompanies(filterAndSearch()));
  industryFilter.addEventListener("change", () => renderCompanies(filterAndSearch()));

  renderCompanies(companies);

  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCompanyApplications);
  }

  // Sidebar toggle functionality
  const sidebar = document.querySelector('.sidebar');
  const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
  const mainContent = document.querySelector('.main-content');

  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('collapsed');
    });
  }
});