// JavaScript for student profile page

document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const interests = document.getElementById('interests').value.trim();
  const internships = document.getElementById('internships').value.trim();
  const activities = document.getElementById('activities').value.trim();
  const major = document.getElementById('majorSelect').value;
  const semester = document.getElementById('semesterSelect').value;

  if (!interests || !major || !semester) {
    alert("Please complete all required fields.");
    return;
  }

  const profile = { interests, internships, activities, major, semester };
  localStorage.setItem("studentProfile", JSON.stringify(profile));

  alert("Profile updated successfully!");
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
