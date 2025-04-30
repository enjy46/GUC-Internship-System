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
  