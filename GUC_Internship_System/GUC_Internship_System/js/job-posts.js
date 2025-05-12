const jobPostForm = document.getElementById('jobPostForm');
const jobPostsTableBody = document.querySelector('#jobPostsTable tbody');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const jobIdInput = document.getElementById('jobId');

let jobPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];

function renderJobPosts() {
  jobPostsTableBody.innerHTML = '';
  jobPosts.forEach((post, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${post.title}</td>
      <td>${post.description}</td>
      <td>${post.duration}</td>
      <td>${post.paidUnpaid}</td>
      <td>${post.paidUnpaid === 'paid' ? post.salary : '-'}</td>
      <td>${post.skillsRequired}</td>
      <td>
        <button class="action-btn edit-btn" data-index="${index}">Edit</button>
        <button class="action-btn delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    jobPostsTableBody.appendChild(tr);
  });
}

function clearForm() {
  jobIdInput.value = '';
  jobPostForm.reset();
  submitBtn.textContent = 'Create Job Post';
  cancelBtn.style.display = 'none';
}

function fillForm(post, index) {
  jobIdInput.value = index;
  document.getElementById('jobTitle').value = post.title;
  document.getElementById('jobDescription').value = post.description;
  document.getElementById('jobDuration').value = post.duration;
  document.getElementById('paidUnpaid').value = post.paidUnpaid;
  document.getElementById('salary').value = post.salary || '';
  document.getElementById('skillsRequired').value = post.skillsRequired;
  submitBtn.textContent = 'Update Job Post';
  cancelBtn.style.display = 'inline-block';
}

jobPostForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('jobTitle').value.trim();
  const description = document.getElementById('jobDescription').value.trim();
  const duration = document.getElementById('jobDuration').value.trim();
  const paidUnpaid = document.getElementById('paidUnpaid').value;
  const salary = document.getElementById('salary').value.trim();
  const skillsRequired = document.getElementById('skillsRequired').value.trim();

  if (!title || !description || !duration || !paidUnpaid || !skillsRequired) {
    alert('Please fill in all required fields.');
    return;
  }

  if (paidUnpaid === 'paid' && !salary) {
    alert('Please enter the expected salary for paid internships.');
    return;
  }

  const jobPost = {
    title,
    description,
    duration,
    paidUnpaid,
    salary: paidUnpaid === 'paid' ? salary : '',
    skillsRequired,
  };

  const jobId = jobIdInput.value;

  if (jobId === '') {
    // Create new job post
    jobPosts.push(jobPost);
  } else {
    // Update existing job post
    jobPosts[jobId] = jobPost;
  }

  localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
  renderJobPosts();
  clearForm();
});

cancelBtn.addEventListener('click', function() {
  clearForm();
});

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
    }
  }
});

// Initial render
renderJobPosts();

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
