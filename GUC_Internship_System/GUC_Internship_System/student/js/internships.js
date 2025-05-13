// JavaScript for student internships page

document.addEventListener('DOMContentLoaded', function() {
  loadInternships();
});

function loadInternships() {
  const internshipHistory = document.getElementById('internshipHistory');
  
  // Mock data - replace with actual API call
  const internships = [
    { company: 'Tech Corp', position: 'Software Engineer Intern', status: 'current intern', startDate: '2023-06-01' },
    { company: 'Data Inc', position: 'Data Analyst Intern', status: 'internship complete', startDate: '2022-06-01', endDate: '2022-08-31' },
  ];

  internshipHistory.innerHTML = '';

  internships.forEach(internship => {
    const internshipElement = document.createElement('div');
    internshipElement.className = 'internship-item';
    internshipElement.innerHTML = `
      <h3>${internship.position} at ${internship.company}</h3>
      <p>Status: <span class="internship-status status-${internship.status.replace(' ', '-')}">${internship.status}</span></p>
      <p>Start Date: ${internship.startDate}</p>
      ${internship.endDate ? `<p>End Date: ${internship.endDate}</p>` : ''}
    `;
    internshipHistory.appendChild(internshipElement);
  });
}

function searchAndFilterInternships() {
  // Implement search and filter functionality
  console.log('Search and filter internships');
}

function closeCompletedInternshipDetails() {
  document.getElementById('completedInternshipDetails').style.display = 'none';
}