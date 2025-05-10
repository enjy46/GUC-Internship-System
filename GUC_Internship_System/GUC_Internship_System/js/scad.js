// Prevent form submission and handle appointment request
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page refresh

  // Get form values
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;
  const appointmentReason = document.getElementById('appointmentReason').value;

  // Validate form inputs
  if (!appointmentDate || !appointmentTime || !appointmentReason) {
    alert('Please fill in all fields.');
    return;
  }

  // Save appointment details in localStorage (or send to the server)
  const appointment = {
    date: appointmentDate,
    time: appointmentTime,
    reason: appointmentReason,
    status: 'pending',
  };
  localStorage.setItem('scadAppointment', JSON.stringify(appointment));

  // Update the video call section
  updateVideoCallSection();
});

// Function to update the video call section with appointment details
function updateVideoCallSection() {
  const appointment = JSON.parse(localStorage.getItem('scadAppointment'));
  const videoCallSection = document.getElementById('videoCallSection');

  if (appointment) {
    // Update appointment details
    document.getElementById('callDate').textContent = appointment.date;
    document.getElementById('callTime').textContent = appointment.time;
    document.getElementById('callReason').textContent = appointment.reason;

    // Show the video call section
    videoCallSection.style.display = 'block';
  } else {
    // Hide the video call section if no appointment exists
    videoCallSection.style.display = 'none';
  }
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

// Handle Accept Appointment
document.getElementById('acceptAppointmentBtn').addEventListener('click', function () {
  const appointmentStatus = document.getElementById('appointmentStatus');
  appointmentStatus.textContent = 'Appointment Accepted';
  appointmentStatus.style.color = 'green';

  // Update appointment status in localStorage
  const appointment = JSON.parse(localStorage.getItem('scadAppointment'));
  appointment.status = 'accepted';
  localStorage.setItem('scadAppointment', JSON.stringify(appointment));

  // Show notification
  showNotification('The appointment has been accepted.');
});

// Handle Reject Appointment
document.getElementById('rejectAppointmentBtn').addEventListener('click', function () {
  const appointmentStatus = document.getElementById('appointmentStatus');
  appointmentStatus.textContent = 'Appointment Rejected';
  appointmentStatus.style.color = 'red';

  // Update appointment status in localStorage
  const appointment = JSON.parse(localStorage.getItem('scadAppointment'));
  appointment.status = 'rejected';
  localStorage.setItem('scadAppointment', JSON.stringify(appointment));

  // Show notification
  showNotification('The appointment has been rejected.');
});

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

// Call updateVideoCallSection and checkUserStatus on page load to display existing appointment and user status
window.onload = function () {
  updateVideoCallSection();
  checkUserStatus();
};