document.addEventListener('DOMContentLoaded', function () {
 

 const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCompanyApplications);
  }

  const companyApplicationsBtn = document.getElementById("companyApplicationsBtn");

  if (companyApplicationsBtn) {
    companyApplicationsBtn.addEventListener("click", function () {
      window.location.href = "company_applications.html"; // Redirect to the Company Applications page
    });
  }
  const internshipPortalBtn = document.getElementById("internshipPortalBtn");
  if (internshipPortalBtn) {
    internshipPortalBtn.addEventListener("click", function () {
      window.location.href = "available_internships.html";
    });
  }

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