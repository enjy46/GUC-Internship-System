document.addEventListener('DOMContentLoaded', function () {
  const internships = [
    {
      title: "Software Engineering Intern",
      company: "TechSoft",
      duration: "3 Months",
      industry: "Engineering",
      paid: true,
      salary: "3000 EGP/month",
      skills: "JavaScript, HTML, CSS",
      description: "Assist the dev team with web application development."
    },
    {
      title: "Marketing Assistant",
      company: "BrandHive",
      duration: "1 Month",
      industry: "Business",
      paid: false,
      salary: "",
      skills: "Communication, Social Media",
      description: "Support social media campaigns and content creation."
    }
  ];

  const listContainer = document.getElementById("internshipList");
  const searchInput = document.getElementById("searchInput");
  const industryFilter = document.getElementById("industryFilter");
  const durationFilter = document.getElementById("durationFilter");
  const paymentFilter = document.getElementById("paymentFilter");

  function displayInternships() {
    const keyword = searchInput.value.toLowerCase();
    const industry = industryFilter.value;
    const duration = durationFilter.value;
    const paid = paymentFilter.value;

    const filtered = internships.filter(intern => {
      return (
        (keyword === '' || intern.title.toLowerCase().includes(keyword) || intern.company.toLowerCase().includes(keyword)) &&
        (industry === '' || intern.industry === industry) &&
        (duration === '' || intern.duration === duration) &&
        (paid === '' || (paid === 'Paid' && intern.paid) || (paid === 'Unpaid' && !intern.paid))
      );
    });

    listContainer.innerHTML = filtered.map(intern => `
      <div class="card">
        <h4>${intern.title}</h4>
        <p><strong>Company:</strong> ${intern.company}</p>
        <p><strong>Duration:</strong> ${intern.duration}</p>
        <p><strong>Industry:</strong> ${intern.industry}</p>
        <p><strong>${intern.paid ? "Paid" : "Unpaid"}</strong></p>
        ${intern.paid ? `<p><strong>Salary:</strong> ${intern.salary}</p>` : ''}
        <p><strong>Skills Required:</strong> ${intern.skills}</p>
        <p><strong>Description:</strong> ${intern.description}</p>
      </div>
    `).join("");
  }

  searchInput.addEventListener("input", displayInternships);
  industryFilter.addEventListener("change", displayInternships);
  durationFilter.addEventListener("change", displayInternships);
  paymentFilter.addEventListener("change", displayInternships);

  displayInternships();

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