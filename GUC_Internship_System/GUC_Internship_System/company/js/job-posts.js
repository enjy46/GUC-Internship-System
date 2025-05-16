const jobPostForm = document.getElementById('jobPostForm');
const jobPostsTableBody = document.querySelector('#jobPostsTable tbody');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const jobIdInput = document.getElementById('jobId');
const alertNotification = document.getElementById('alertNotification');
const paidUnpaidSelect = document.getElementById('paidUnpaid');
const salaryFields = document.querySelectorAll('.salary-field');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

// Get current company name (this would come from your authentication system)
const currentCompany = "Your Company"; // Replace with actual company name from auth

// Initialize with dummy data if no data exists in localStorage
let jobPosts = JSON.parse(localStorage.getItem('jobPosts')) || [
  {
    title: "Software Engineering Intern",
    description: "Looking for a software engineering intern to work on web development projects using modern technologies.",
    duration: "3",
    paidUnpaid: "paid",
    salary: "1000",
    skillsRequired: "JavaScript, React, Node.js, HTML, CSS",
    company: currentCompany
  },
  {
    title: "Marketing Intern",
    description: "Join our marketing team to help create and implement digital marketing strategies.",
    duration: "2",
    paidUnpaid: "unpaid",
    salary: "",
    skillsRequired: "Social Media Marketing, Content Creation, Analytics",
    company: currentCompany
  },
  {
    title: "Data Science Intern",
    description: "Work on data analysis and machine learning projects to help drive business decisions.",
    duration: "4",
    paidUnpaid: "paid",
    salary: "1200",
    skillsRequired: "Python, SQL, Machine Learning, Data Analysis"
  },
  {
    title: "UI/UX Design Intern",
    description: "Create beautiful and intuitive user interfaces for our web and mobile applications.",
    duration: "3",
    paidUnpaid: "paid",
    salary: "900",
    skillsRequired: "Figma, Adobe XD, UI Design, User Research"
  }
];

// Save dummy data to localStorage if it doesn't exist
if (!localStorage.getItem('jobPosts')) {
  localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
}

// Handle salary field visibility
paidUnpaidSelect.addEventListener('change', function() {
  const isPaid = this.value === 'paid';
  salaryFields.forEach(field => {
    field.style.display = isPaid ? 'block' : 'none';
    if (isPaid) {
      field.setAttribute('required', 'required');
    } else {
      field.removeAttribute('required');
    }
  });
});

// Add search and filter functionality
function filterAndSearchJobPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;
  
  return jobPosts.filter(post => {
    // Only show posts from current company
    if (post.company !== currentCompany) return false;
    
    // Apply search filter
    const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
                         post.description.toLowerCase().includes(searchTerm) ||
                         post.skillsRequired.toLowerCase().includes(searchTerm);
    
    // Apply status filter
    const matchesFilter = filterValue === 'all' || post.paidUnpaid === filterValue;
    
    return matchesSearch && matchesFilter;
  });
}

// Update renderJobPosts function to use filtered results
function renderJobPosts() {
  const jobPostsList = document.getElementById('jobPostsList');
  jobPostsList.innerHTML = ''; // Clear the list
  
  const filteredPosts = filterAndSearchJobPosts();
  
  if (filteredPosts.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <p style="text-align: center; color: #666; padding: 2rem;">
        No job posts found matching your search criteria.
      </p>
    `;
    jobPostsList.appendChild(noResults);
    return;
  }
  
  filteredPosts.forEach((post, index) => {
    const card = document.createElement('div');
    card.className = 'job-post-card';
    card.innerHTML = `
      <div class="card-header">
        <h4>${post.title}</h4>
        <span class="company-name">${post.company}</span>
      </div>
      <p><strong>Description:</strong> ${post.description}</p>
      <p><strong>Duration:</strong> ${post.duration} months</p>
      <p><strong>Type:</strong> ${post.paidUnpaid === 'paid' ? 'Paid' : 'Unpaid'}</p>
      ${post.paidUnpaid === 'paid' ? `<p><strong>Salary:</strong> $${post.salary}/month</p>` : ''}
      <p><strong>Required Skills:</strong> ${post.skillsRequired}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editJobPost(${index})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="delete-btn" onclick="deleteJobPost(${index})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;
    jobPostsList.appendChild(card);
  });
}

function clearForm() {
  jobIdInput.value = '';
  jobPostForm.reset();
  submitBtn.textContent = 'Create Job Post';
  cancelBtn.style.display = 'none';
  salaryFields.forEach(field => field.style.display = 'none');
}

function fillForm(post, index) {
  jobIdInput.value = index;
  document.getElementById('jobTitle').value = post.title;
  document.getElementById('jobDescription').value = post.description;
  document.getElementById('jobDuration').value = post.duration;
  document.getElementById('paidUnpaid').value = post.paidUnpaid;
  document.getElementById('salary').value = post.salary || '';
  document.getElementById('skillsRequired').value = post.skillsRequired;
  
  // Show/hide salary fields based on paid/unpaid selection
  const isPaid = post.paidUnpaid === 'paid';
  salaryFields.forEach(field => {
    field.style.display = isPaid ? 'block' : 'none';
  });
  
  submitBtn.textContent = 'Update Job Post';
  cancelBtn.style.display = 'inline-block';
}

// Show alert notification
function showAlert(message, type) {
  alertNotification.textContent = message;
  alertNotification.className = 'alert-notification';
  alertNotification.classList.add(`alert-${type}`);
  alertNotification.style.display = 'block';
  
  setTimeout(() => {
    alertNotification.style.display = 'none';
  }, 5000);
}

// Add event listeners for search and filter
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');
  
  searchInput.addEventListener('input', renderJobPosts);
  filterSelect.addEventListener('change', renderJobPosts);
  
  // Initial render
  renderJobPosts();
});

// Form submission handler
jobPostForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const title = document.getElementById('jobTitle').value.trim();
  const description = document.getElementById('jobDescription').value.trim();
  const duration = document.getElementById('jobDuration').value.trim();
  const paidUnpaid = document.getElementById('paidUnpaid').value;
  const salary = document.getElementById('salary').value.trim();
  const skillsRequired = document.getElementById('skillsRequired').value.trim();

  // Validate required fields
  if (!title || !description || !duration || !paidUnpaid || !skillsRequired) {
    showAlert('Please fill in all required fields.', 'error');
    return;
  }

  if (paidUnpaid === 'paid' && !salary) {
    showAlert('Please enter the expected salary for paid internships.', 'error');
    return;
  }

  // Create new job post object
  const jobPost = {
    title,
    description,
    duration,
    paidUnpaid,
    salary: paidUnpaid === 'paid' ? salary : '',
    skillsRequired,
    company: currentCompany // Add company name to the job post
  };

  const jobId = jobIdInput.value;

  if (jobId === '') {
    // Create new job post
    jobPosts.push(jobPost);
    showAlert('Job post created successfully!', 'success');
  } else {
    // Update existing job post
    jobPosts[jobId] = jobPost;
    showAlert('Job post updated successfully!', 'success');
  }

  // Save to localStorage
  localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
  
  // Update the table display
  renderJobPosts();
  
  // Clear the form
  clearForm();
});

// Cancel button handler
cancelBtn.addEventListener('click', function() {
  clearForm();
});

// Table action buttons handler
jobPostsTableBody.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    const index = event.target.getAttribute('data-index');
    fillForm(jobPosts[index], index);
  } else if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    if (confirm('Are you sure you want to delete this job post?')) {
      jobPosts.splice(index, 1);
      localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
      renderJobPosts();
      clearForm();
      showAlert('Job post deleted successfully!', 'success');
    }
  }
});

// Initial render of job posts
document.addEventListener('DOMContentLoaded', function() {
  // Clear any existing data in localStorage for testing
  // localStorage.removeItem('jobPosts');
  
  // Initialize jobPosts array from localStorage or use dummy data
  jobPosts = JSON.parse(localStorage.getItem('jobPosts')) || [
    {
      title: "Software Engineering Intern",
      description: "Looking for a software engineering intern to work on web development projects using modern technologies.",
      duration: "3",
      paidUnpaid: "paid",
      salary: "1000",
      skillsRequired: "JavaScript, React, Node.js, HTML, CSS"
    },
    {
      title: "Marketing Intern",
      description: "Join our marketing team to help create and implement digital marketing strategies.",
      duration: "2",
      paidUnpaid: "unpaid",
      salary: "",
      skillsRequired: "Social Media Marketing, Content Creation, Analytics"
    },
    {
      title: "Data Science Intern",
      description: "Work on data analysis and machine learning projects to help drive business decisions.",
      duration: "4",
      paidUnpaid: "paid",
      salary: "1200",
      skillsRequired: "Python, SQL, Machine Learning, Data Analysis"
    },
    {
      title: "UI/UX Design Intern",
      description: "Create beautiful and intuitive user interfaces for our web and mobile applications.",
      duration: "3",
      paidUnpaid: "paid",
      salary: "900",
      skillsRequired: "Figma, Adobe XD, UI Design, User Research"
    }
  ];

  // Save to localStorage if it doesn't exist
  if (!localStorage.getItem('jobPosts')) {
    localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
  }

  // Render the job posts
  renderJobPosts();
});

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
