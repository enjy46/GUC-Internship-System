// Example data for suggested companies
const allSuggestions = [
  { name: "TechSpark", interest: "AI", industry: "Technology", recommendedBy: "Intern 2023" },
  { name: "MediSoft", interest: "Healthcare", industry: "Software", recommendedBy: "Intern 2024" },
  { name: "FinScope", interest: "Finance", industry: "Banking", recommendedBy: "Intern 2024" },
  { name: "EduWare", interest: "Education", industry: "EdTech", recommendedBy: "Intern 2023" }
];

// Example data for applied internships
const appliedInternships = [
  { company: "TechCorp", title: "Software Engineer Intern" },
  { company: "HealthPlus", title: "Data Analyst Intern" },
  { company: "EduSoft", title: "Web Developer Intern" }
];

// Example data for application statuses
const applicationStatuses = [
  { company: "TechCorp", title: "Software Engineer Intern", status: "pending" },
  { company: "HealthPlus", title: "Data Analyst Intern", status: "finalized" },
  { company: "EduSoft", title: "Web Developer Intern", status: "accepted" },
  { company: "FinBank", title: "Finance Intern", status: "rejected" }
];

// Example data for past and present internships
const internships = [
  { company: "TechCorp", title: "Software Engineer Intern", duration: "3 months", status: "completed" },
  { company: "HealthPlus", title: "Data Analyst Intern", duration: "6 months", status: "current" },
  { company: "EduSoft", title: "Web Developer Intern", duration: "4 months", status: "completed" },
  { company: "FinBank", title: "Finance Intern", duration: "2 months", status: "current" }
];

// Load profile from localStorage
function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("studentProProfile")) || {};
  document.getElementById("jobInterests").value = profile.jobInterests || "";
  document.getElementById("previousInternships").value = profile.previousInternships || "";
  document.getElementById("collegeActivities").value = profile.collegeActivities || "";
  document.getElementById("assessmentScore").value = profile.assessmentScore || "";
  document.getElementById("showScoreOnProfile").checked = profile.showScoreOnProfile || false;
  
  // Update profile display with assessment score if it should be shown
  updateProfileScoreDisplay(profile);
  
  // Check PRO badge eligibility
  checkProBadgeEligibility();
}

// Update the profile score display
function updateProfileScoreDisplay(profile) {
  const profileScoreDisplay = document.getElementById("profileScoreDisplay");
  if (profile.showScoreOnProfile && profile.assessmentScore) {
    profileScoreDisplay.textContent = `Online Assessment Score: ${profile.assessmentScore}%`;
    profileScoreDisplay.style.display = "block";
  } else {
    profileScoreDisplay.style.display = "none";
  }
}

// Function to handle document uploads
function uploadExtraDocuments() {
  const fileInput = document.getElementById("extraDocs");
  const documentsList = document.getElementById("documentsList");

  if (fileInput.files.length === 0) {
    alert("Please select at least one document to upload.");
    return;
  }

  for (const file of fileInput.files) {
    const listItem = document.createElement("li");
    listItem.textContent = file.name;
    documentsList.appendChild(listItem);
  }

  alert("Documents uploaded successfully!");
  fileInput.value = ""; // Clear the file input
}

// Populate applied internships list
function populateAppliedInternships() {
  const list = document.getElementById("appliedInternshipsList");
  list.innerHTML = "";

  if (appliedInternships.length === 0) {
    list.innerHTML = "<li>No internships applied to yet.</li>";
  } else {
    appliedInternships.forEach(internship => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${internship.title}</strong> at <em>${internship.company}</em>`;
      list.appendChild(listItem);
    });
  }
}

// Populate application statuses
function populateApplicationStatuses() {
  const list = document.getElementById("applicationStatusList");
  list.innerHTML = "";

  if (applicationStatuses.length === 0) {
    list.innerHTML = "<li>No applications found.</li>";
  } else {
    applicationStatuses.forEach(application => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>${application.title}</strong> at <em>${application.company}</em>
        <p>Status: <span class="status ${application.status}">${capitalizeStatus(application.status)}</span></p>
      `;
      list.appendChild(listItem);
    });
  }
}

// Helper function to capitalize the status
function capitalizeStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// Populate internships list
function populateInternshipsList(filter = "", statusFilter = "") {
  const list = document.getElementById("internshipsList");
  list.innerHTML = "";

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.company.toLowerCase().includes(filter.toLowerCase()) ||
                          internship.title.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = !statusFilter || internship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (filteredInternships.length === 0) {
    list.innerHTML = "<li>No internships found.</li>";
  } else {
    filteredInternships.forEach(internship => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>${internship.title}</strong> at <em>${internship.company}</em> - Duration: ${internship.duration}
        <button onclick="selectInternship('${internship.title}', '${internship.company}')">Select</button>
      `;
      list.appendChild(listItem);
    });
  }
}

// Search internships
function searchInternships() {
  const searchInput = document.getElementById("searchInternships").value;
  const statusFilter = document.getElementById("filterInternships").value;
  populateInternshipsList(searchInput, statusFilter);
}

// Filter internships by status
function filterInternshipsByStatus() {
  const statusFilter = document.getElementById("filterInternships").value;
  const searchInput = document.getElementById("searchInternships").value;
  populateInternshipsList(searchInput, statusFilter);
}

// Select a completed internship
function selectInternship(title, company) {
  alert(`You selected the internship: ${title} at ${company}`);
}

// Function to check if student qualifies for PRO badge
function checkProBadgeEligibility() {
  const proBadge = document.getElementById("proBadge");
  
  // First check if PRO status is already saved
  const isPro = localStorage.getItem("proStudentStatus") === "true";
  if (isPro) {
    proBadge.classList.add('visible');
    return; // If already PRO, keep the badge visible
  }
  
  // Get internships from the list
  const internshipsList = document.getElementById("internshipsList");
  const internshipItems = internshipsList.getElementsByTagName("li");
  
  let totalMonths = 0;
  
  // Calculate total months from the internships list
  for (let item of internshipItems) {
    const text = item.textContent;
    const durationMatch = text.match(/(\d+)\s*(?:month|months)/i);
    if (durationMatch) {
      totalMonths += parseInt(durationMatch[1]);
    }
  }
  
  // Show badge if total duration is 3 or more months
  if (totalMonths >= 3) {
    proBadge.classList.add('visible');
    localStorage.setItem("proStudentStatus", "true");
  }
}

// Add debug function
function updateDebugInfo() {
  const debugInfo = document.getElementById('debugInfo');
  const badge = document.getElementById('proBadge');
  const isPro = localStorage.getItem("proStudentStatus") === "true";
  
  debugInfo.innerHTML = `
    Badge Display: ${badge.style.display}<br>
    Badge Visibility: ${badge.style.visibility}<br>
    Badge Opacity: ${badge.style.opacity}<br>
    PRO Status: ${isPro}<br>
    Has Visible Class: ${badge.classList.contains('visible')}
  `;
}

// Function to show a notification
function showNotification(message) {
  const notificationContainer = document.getElementById('notificationContainer');
  const notificationMessage = document.getElementById('notificationMessage');

  notificationMessage.textContent = message;
  notificationContainer.style.display = 'block';

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 3000);
}

// Function to simulate user online/offline status
function checkUserStatus() {
  const userStatusElement = document.getElementById('userStatus');

  // Simulate online/offline status (replace this with real-time status logic if available)
  const isOnline = Math.random() > 0.5; // Randomly set online/offline for demonstration

  if (isOnline) {
    userStatusElement.textContent = 'Online';
    userStatusElement.style.color = 'green';
  } else {
    userStatusElement.textContent = 'Offline';
    userStatusElement.style.color = 'red';
  }
}

// Call checkUserStatus every 5 seconds to update the status
setInterval(checkUserStatus, 5000);

// Initialize the page
window.onload = function () {
  // Clear any existing profile data for testing
  localStorage.removeItem("studentProProfile");
  
  // Load profile
  loadProfile();
  
  // Initialize other components
  populateAppliedInternships();
  populateApplicationStatuses();
  populateInternshipsList();
  
  // Check PRO badge eligibility once on page load
  checkProBadgeEligibility();

  // Set up event listeners
  document.getElementById("searchInternships").addEventListener("input", searchInternships);
  document.getElementById("filterInternships").addEventListener("change", filterInternshipsByStatus);
  
  // Set up debug info
  setInterval(updateDebugInfo, 1000);
  
  // Show debug info (press Ctrl+D to toggle)
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'd') {
      const debugInfo = document.getElementById('debugInfo');
      debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
    }
  });

  // Set up online assessments toggle
  const showAssessmentsBtn = document.getElementById('showAssessmentsBtn');
  const assessmentsList = document.getElementById('assessmentsList');

  showAssessmentsBtn.addEventListener('click', function() {
    if (assessmentsList.style.display === 'none') {
      assessmentsList.style.display = 'block';
      showAssessmentsBtn.textContent = 'Hide Online Assessments';
    } else {
      assessmentsList.style.display = 'none';
      showAssessmentsBtn.textContent = 'Show Online Assessments';
    }
  });

  // Set up form submission
  document.getElementById("profileForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Store current badge state
    const badge = document.getElementById("proBadge");
    const wasVisible = badge.classList.contains('visible');
    
    // Save profile data
    const jobInterests = document.getElementById("jobInterests").value;
    const previousInternships = document.getElementById("previousInternships").value;
    const collegeActivities = document.getElementById("collegeActivities").value;
    const assessmentScore = document.getElementById("assessmentScore").value;
    const showScoreOnProfile = document.getElementById("showScoreOnProfile").checked;

    localStorage.setItem("jobInterests", jobInterests);
    localStorage.setItem("previousInternships", previousInternships);
    localStorage.setItem("collegeActivities", collegeActivities);
    localStorage.setItem("assessmentScore", assessmentScore);
    localStorage.setItem("showScoreOnProfile", showScoreOnProfile);

    // Restore badge state
    if (wasVisible) {
      badge.classList.add('visible');
    }

    // Show success message
    const profileMessage = document.getElementById("profileMessage");
    profileMessage.style.display = "block";
    setTimeout(() => {
      profileMessage.style.display = "none";
    }, 3000);

    // Update debug info
    updateDebugInfo();
  });

  // Set minimum date for appointment to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('appointmentDate').min = today;

  // Handle appointment form submission
  document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if user is PRO student
    const isPro = localStorage.getItem("proStudentStatus") === "true";
    if (!isPro) {
      showAppointmentStatus("Only PRO students can request video call appointments.", "error");
      return;
    }

    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const appointmentReason = document.getElementById('appointmentReason').value;
    const appointmentNotes = document.getElementById('appointmentNotes').value;

    // Save appointment details
    const appointment = {
      date: appointmentDate,
      time: appointmentTime,
      reason: appointmentReason,
      notes: appointmentNotes,
      status: 'pending'
    };

    localStorage.setItem('videoCallAppointment', JSON.stringify(appointment));
    
    // Show success message
    showAppointmentStatus("Appointment requested successfully! We will review your request and confirm shortly.", "success");
    
    // Update video call section
    updateVideoCallSection();
    
    // Reset form
    this.reset();
  });

  // Show appointment status message
  function showAppointmentStatus(message, type) {
    const statusDiv = document.getElementById('appointmentStatus');
    statusDiv.textContent = message;
    statusDiv.className = `appointment-status ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }

  // Update video call section
  function updateVideoCallSection() {
    const appointment = JSON.parse(localStorage.getItem('videoCallAppointment'));
    const videoCallSection = document.getElementById('videoCallSection');
    const startVideoCallBtn = document.getElementById('startVideoCallBtn');
    
    if (appointment) {
      // Update appointment details
      document.getElementById('callDate').textContent = formatDate(appointment.date);
      document.getElementById('callTime').textContent = formatTime(appointment.time);
      document.getElementById('callReason').textContent = formatReason(appointment.reason);
      
      // Show video call section
      videoCallSection.style.display = 'block';
      
      // Enable/disable start button based on appointment time
      const now = new Date();
      const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
      const timeDiff = appointmentDateTime - now;
      
      // Enable button if appointment is within 5 minutes
      if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000) {
        startVideoCallBtn.disabled = false;
      } else {
        startVideoCallBtn.disabled = true;
      }
    } else {
      videoCallSection.style.display = 'none';
    }
  }

  // Format date for display
  function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Format time for display
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  // Format reason for display
  function formatReason(reason) {
    const reasons = {
      'career_guidance': 'Career Guidance',
      'report_clarification': 'Report Clarification',
      'other': 'Other'
    };
    return reasons[reason] || reason;
  }

  // Handle start video call button
  document.getElementById('startVideoCallBtn').addEventListener('click', function() {
    const appointment = JSON.parse(localStorage.getItem('videoCallAppointment'));
    if (appointment) {
      // Here you would typically integrate with a video call service
      alert('Starting video call... This would connect to your video call service.');
    }
  });

  // Handle Accept Appointment
  document.getElementById('acceptAppointmentBtn').addEventListener('click', function () {
    const appointmentStatus = document.getElementById('appointmentStatus');
    appointmentStatus.textContent = 'Appointment Accepted';
    appointmentStatus.style.color = 'green';

    // Update appointment status in localStorage
    const appointment = JSON.parse(localStorage.getItem('studentAppointment')) || {};
    appointment.status = 'accepted';
    localStorage.setItem('studentAppointment', JSON.stringify(appointment));

    // Show notification
    showNotification('You have accepted the appointment.');
  });

  // Handle Reject Appointment
  document.getElementById('rejectAppointmentBtn').addEventListener('click', function () {
    const appointmentStatus = document.getElementById('appointmentStatus');
    appointmentStatus.textContent = 'Appointment Rejected';
    appointmentStatus.style.color = 'red';

    // Update appointment status in localStorage
    const appointment = JSON.parse(localStorage.getItem('studentAppointment')) || {};
    appointment.status = 'rejected';
    localStorage.setItem('studentAppointment', JSON.stringify(appointment));

    // Show notification
    showNotification('You have rejected the appointment.');
  });

  // Check appointment status periodically
  setInterval(updateVideoCallSection, 60000); // Check every minute

  // Initialize video call section on page load
  window.addEventListener('load', function() {
    updateVideoCallSection();
  });

  // Call checkUserStatus immediately when the page loads
  checkUserStatus();
};