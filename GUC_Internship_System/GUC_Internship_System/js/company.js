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

// Function to load job posts from localStorage
function loadJobPosts() {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  renderJobPosts(jobPosts);
}

// Function to save job posts to localStorage
function saveJobPost(jobPost) {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  jobPosts.push(jobPost);
  localStorage.setItem("jobPosts", JSON.stringify(jobPosts));
}

// Function to render job posts
function renderJobPosts(jobPosts) {
  const jobPostList = document.getElementById("jobPostList");
  jobPostList.innerHTML = "";

  if (jobPosts.length === 0) {
    jobPostList.innerHTML = "<li>No job posts available.</li>";
    return;
  }

  jobPosts.forEach((post, index) => {
    const li = document.createElement("li");
    li.textContent = `${post.title} | ${post.duration} | ${post.paidUnpaid} | ${post.skills} | Applications: ${post.applications.length}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteJobPost(index);
    li.appendChild(deleteButton);
    jobPostList.appendChild(li);
  });
}

// Function to delete a job post
function deleteJobPost(index) {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  jobPosts.splice(index, 1);
  localStorage.setItem("jobPosts", JSON.stringify(jobPosts));
  renderJobPosts(jobPosts);
}

// Handle job post form submission
document.getElementById("jobPostForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const jobPost = {
    title: document.getElementById("jobTitle").value,
    description: document.getElementById("jobDescription").value,
    duration: document.getElementById("jobDuration").value,
    salary: document.getElementById("salary").value,
    paidUnpaid: document.getElementById("paidUnpaid").value,
    skills: document.getElementById("skillsRequired").value,
    applications: [] // Initialize with no applications
  };

  saveJobPost(jobPost);
  loadJobPosts();
  e.target.reset();
});

// Function to search job posts
document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const filteredPosts = jobPosts.filter(post => post.title.toLowerCase().includes(searchTerm));
  renderJobPosts(filteredPosts);
});

// Function to filter job posts by Paid/Unpaid
document.getElementById("filterPaidUnpaid").addEventListener("change", (e) => {
  const filterValue = e.target.value;
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const filteredPosts = filterValue ? jobPosts.filter(post => post.paidUnpaid === filterValue) : jobPosts;
  renderJobPosts(filteredPosts);
});

// Function to load applications
function loadApplications() {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const applicationsList = document.getElementById("applicationsList");
  applicationsList.innerHTML = "";

  jobPosts.forEach(post => {
    post.applications.forEach(application => {
      const li = document.createElement("li");
      li.textContent = `Job: ${post.title} | Applicant: ${application}`;
      applicationsList.appendChild(li);
    });
  });
}

// Simulate adding an application to a job post
function simulateApplication(jobIndex, applicantName) {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  jobPosts[jobIndex].applications.push(applicantName);
  localStorage.setItem("jobPosts", JSON.stringify(jobPosts));
  loadJobPosts();
  loadApplications();
}

// Function to download job posts as PDF
function downloadJobPosts() {
  const jobPosts = JSON.parse(localStorage.getItem("jobPosts")) || [];
  const content = jobPosts.map(post => 
    `Title: ${post.title}\nDuration: ${post.duration}\nPaid/Unpaid: ${post.paidUnpaid}\nSkills: ${post.skills}\n\n`
  ).join("");
  generatePDF("Job Posts", content);
}

// Initial rendering
renderCompanyInternshipPosts();
renderNotifications();

// Load job posts and applications on page load
loadJobPosts();
loadApplications();
