document.addEventListener('DOMContentLoaded', function () {
  const companyApplicationsBtn = document.getElementById("companyApplicationsBtn");

  if (companyApplicationsBtn) {
    companyApplicationsBtn.addEventListener("click", function () {
      window.location.href = "company_applications.html"; // Replace with the actual path to your page
    });
  }
});