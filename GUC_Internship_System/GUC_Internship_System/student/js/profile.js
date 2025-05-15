// JavaScript for student profile page

document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const interests = document.getElementById('interests').value.trim();
  const internships = document.getElementById('internships').value.trim();
  const activities = document.getElementById('activities').value.trim();
  const major = document.getElementById('majorSelect').value;
  const semester = document.getElementById('semesterSelect').value;

  if (!interests || !major || !semester) {
    showNotification('Error', 'Please complete all required fields.', 'error');
    return;
  }

  const profile = { interests, internships, activities, major, semester };
  localStorage.setItem("studentProfile", JSON.stringify(profile));

  showNotification('Success', 'Your profile has been updated successfully!');
});

// Load profile data on page load
window.onload = function () {
  const profile = JSON.parse(localStorage.getItem("studentProfile"));
  if (profile) {
    document.getElementById('interests').value = profile.interests;
    document.getElementById('internships').value = profile.internships;
    document.getElementById('activities').value = profile.activities;
    document.getElementById('majorSelect').value = profile.major;
    document.getElementById('semesterSelect').value = profile.semester;
  }
};

// Notification function
function showNotification(title, message, type = 'success') {
  const notification = document.getElementById('notification');
  const notificationTitle = notification.querySelector('.notification-title');
  const notificationMessage = notification.querySelector('.notification-message');
  const notificationIcon = notification.querySelector('i');

  // Update notification content
  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  // Update notification style based on type
  if (type === 'error') {
    notification.style.backgroundColor = '#dc3545';
    notificationIcon.className = 'fas fa-exclamation-circle';
  } else {
    notification.style.backgroundColor = '#4CAF50';
    notificationIcon.className = 'fas fa-check-circle';
  }

  // Show notification
  notification.classList.add('show');

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
