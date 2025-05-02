// Simulate application notification (accepted or rejected)
document.getElementById('sendNotification').addEventListener('click', function() {
    // Simulate email notification behavior (accepted or rejected)
    const accepted = Math.random() > 0.5;  // Randomly accept or reject
    
    if (accepted) {
      document.getElementById('notificationMessage').style.display = 'block';
      document.getElementById('errorNotification').style.display = 'none';
    } else {
      document.getElementById('errorNotification').style.display = 'block';
      document.getElementById('notificationMessage').style.display = 'none';
    }
  });
  
  // Handle job post creation and listing
  document.getElementById('jobPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const jobDescription = document.getElementById('jobDescription').value.trim();
    const jobDuration = document.getElementById('jobDuration').value.trim();
    const salary = document.getElementById('salary').value.trim();
    const paidUnpaid = document.getElementById('paidUnpaid').value;
    const skillsRequired = document.getElementById('skillsRequired').value.trim();
  
    // Create a job post object
    const jobPost = {
      jobTitle,
      jobDescription,
      jobDuration,
      salary,
      paidUnpaid,
      skillsRequired
    };
  
    // Display the job post in the list
    const jobPostList = document.getElementById('jobPostList');
    const listItem = document.createElement('li');
    listItem.textContent = `${jobPost.jobTitle} | ${jobPost.jobDuration} | ${jobPost.paidUnpaid} | ${jobPost.skillsRequired}`;
    jobPostList.appendChild(listItem);
  
    // Clear the form after submission
    document.getElementById('jobPostForm').reset();
  });

// Simulated database for internship posts and applications
const internshipPosts = [
  { id: 1, title: "Frontend Developer Intern", company: "Innovatech", applicants: [] },
  { id: 2, title: "Backend Developer Intern", company: "Innovatech", applicants: [] }
];

const notifications = [];

// Function to render internship posts for the logged-in company
function renderCompanyInternshipPosts() {
  const companyInternshipList = document.getElementById("companyInternshipList");
  companyInternshipList.innerHTML = "";

  const companyPosts = internshipPosts.filter(post => post.company === "Innovatech"); // Replace with dynamic company name
  if (companyPosts.length === 0) {
    companyInternshipList.innerHTML = "<li>No internship posts found.</li>";
    return;
  }

  companyPosts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = `${post.title} - Applicants: ${post.applicants.length}`;
    companyInternshipList.appendChild(li);
  });
}

// Function to render notifications
function renderNotifications() {
  const notificationsList = document.getElementById("notificationsList");
  notificationsList.innerHTML = "";

  if (notifications.length === 0) {
    notificationsList.innerHTML = "<li>No notifications.</li>";
    return;
  }

  notifications.forEach(notification => {
    const li = document.createElement("li");
    li.textContent = notification;
    notificationsList.appendChild(li);
  });
}

// Simulate receiving a notification when someone applies
function simulateApplication(internshipId, applicantName) {
  const internship = internshipPosts.find(post => post.id === internshipId);
  if (internship) {
    internship.applicants.push(applicantName);
    notifications.push(`New application for ${internship.title} from ${applicantName}`);
    renderNotifications();
    renderCompanyInternshipPosts();
  }
}

// Initial rendering
renderCompanyInternshipPosts();
renderNotifications();
