// JavaScript for student internships page

document.addEventListener('DOMContentLoaded', function() {
  loadInternships();
});

function loadInternships() {
  // Simulated data - replace with actual data fetching logic
  const internships = [
    { title: "Software Developer Intern", company: "Tech Co", duration: "3 months", status: "internship complete", salary: "$3000/month" },
    { title: "Data Analyst Intern", company: "Data Corp", duration: "6 months", status: "current intern", salary: "$2500/month" },
    // Add more internship data as needed
  ];

  const internshipHistory = document.getElementById('internshipHistory');
  internshipHistory.innerHTML = '';

  internships.forEach(internship => {
    const internshipElement = document.createElement('div');
    internshipElement.className = 'internship-item';
    internshipElement.innerHTML = `
      <h3 class="internship-title">${internship.title}</h3>
      <p class="internship-company">${internship.company}</p>
      <p class="internship-duration">${internship.duration}</p>
      <p class="internship-status">${internship.status}</p>
    `;

    if (internship.status === "internship complete") {
      internshipElement.addEventListener('click', () => showCompletedInternshipDetails(internship));
    }

    internshipHistory.appendChild(internshipElement);
  });
}

function searchAndFilterInternships() {
  const searchInput = document.getElementById('searchInternshipsInput').value.toLowerCase();
  const statusFilter = document.getElementById('filterInternshipsStatus').value.toLowerCase();
  const internshipItems = document.querySelectorAll('.internship-item');

  internshipItems.forEach(item => {
    const title = item.querySelector('.internship-title').textContent.toLowerCase();
    const company = item.querySelector('.internship-company').textContent.toLowerCase();
    const status = item.querySelector('.internship-status').textContent.toLowerCase();

    const matchesSearch = title.includes(searchInput) || company.includes(searchInput);
    const matchesFilter = statusFilter === '' || status === statusFilter;

    item.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
  });
}

function showCompletedInternshipDetails(internship) {
  document.getElementById('completedInternshipTitle').textContent = `Title: ${internship.title}`;
  document.getElementById('completedInternshipCompany').textContent = `Company: ${internship.company}`;
  document.getElementById('completedInternshipDuration').textContent = `Duration: ${internship.duration}`;
  document.getElementById('completedInternshipSalary').textContent = `Salary: ${internship.salary}`;
  document.getElementById('completedInternshipDetails').style.display = 'block';
}

function closeCompletedInternshipDetails() {
  document.getElementById('completedInternshipDetails').style.display = 'none';
}