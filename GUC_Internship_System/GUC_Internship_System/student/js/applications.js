// JavaScript for student applications page

document.addEventListener('DOMContentLoaded', function() {
    loadApplications();
});

function loadApplications() {
    const applicationList = document.getElementById('applicationList');
    
    // This is a mock data. In a real application, you would fetch this data from a server.
    const applications = [
        { company: 'Tech Corp', position: 'Software Engineer Intern', status: 'Pending' },
        { company: 'Data Inc', position: 'Data Analyst Intern', status: 'Accepted' },
        { company: 'Design Co', position: 'UX Design Intern', status: 'Rejected' }
    ];

    applicationList.innerHTML = '';

    applications.forEach(app => {
        const appElement = document.createElement('div');
        appElement.classList.add('application-item');
        appElement.innerHTML = `
            <h3>${app.position} at ${app.company}</h3>
            <p>Status: <span class="status ${app.status.toLowerCase()}">${app.status}</span></p>
        `;
        applicationList.appendChild(appElement);
    });
}
