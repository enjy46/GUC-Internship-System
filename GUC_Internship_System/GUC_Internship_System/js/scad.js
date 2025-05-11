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

// Video Call State
let localStream = null;
let remoteStream = null;
let peerConnection = null;
let isVideoEnabled = true;
let isAudioEnabled = true;
let isScreenSharing = false;
let activeCalls = new Map();

// Initialize video call functionality
function initializeVideoCall() {
  const toggleVideoBtn = document.getElementById('toggleVideoBtn');
  const toggleAudioBtn = document.getElementById('toggleAudioBtn');
  const shareScreenBtn = document.getElementById('shareScreenBtn');
  const endCallBtn = document.getElementById('endCallBtn');
  const startVideoCallBtn = document.getElementById('startVideoCallBtn');

  // Event listeners for video call controls
  toggleVideoBtn.addEventListener('click', toggleVideo);
  toggleAudioBtn.addEventListener('click', toggleAudio);
  shareScreenBtn.addEventListener('click', toggleScreenShare);
  endCallBtn.addEventListener('click', endCall);
  startVideoCallBtn.addEventListener('click', startVideoCall);

  // Listen for incoming calls
  listenForIncomingCalls();
}

// Function to handle incoming call notifications
function listenForIncomingCalls() {
  // Simulate incoming call (replace with actual WebSocket/real-time implementation)
  setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance of incoming call
      const studentId = 'STU' + Math.floor(Math.random() * 1000);
      showIncomingCallNotification(studentId);
    }
  }, 30000);
}

// Function to show incoming call notification
function showIncomingCallNotification(studentId) {
  const notificationContainer = document.getElementById('notificationContainer');
  const notificationMessage = document.getElementById('notificationMessage');
  
  // Create a more prominent notification for incoming calls
  notificationContainer.style.backgroundColor = '#4CAF50';
  notificationContainer.style.color = 'white';
  notificationContainer.style.padding = '15px';
  notificationContainer.style.borderRadius = '5px';
  notificationContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  
  notificationMessage.innerHTML = `
    <div style="margin-bottom: 10px;">
      <strong>Incoming Call from Student ${studentId}</strong>
    </div>
    <div style="display: flex; gap: 10px;">
      <button onclick="acceptIncomingCall('${studentId}')" style="background: white; color: #4CAF50; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer;">
        Accept
      </button>
      <button onclick="rejectIncomingCall('${studentId}')" style="background: #f44336; color: white; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer;">
        Reject
      </button>
    </div>
  `;
  
  notificationContainer.style.display = 'block';
  
  // Play notification sound
  const audio = new Audio('notification.mp3');
  audio.play().catch(e => console.log('Audio play failed:', e));
}

// Function to accept incoming call
function acceptIncomingCall(studentId) {
  // Hide the notification
  document.getElementById('notificationContainer').style.display = 'none';
  
  // Start the video call
  startVideoCall();
  
  // Show call status
  showCallNotification(`Call with Student ${studentId} started`);
  
  // Update call status
  updateCallStatus('in-call');
  
  // Update active calls list
  addToActiveCalls(studentId);
}

// Function to reject incoming call
function rejectIncomingCall(studentId) {
  // Hide the notification
  document.getElementById('notificationContainer').style.display = 'none';
  
  // Show rejection notification
  showCallNotification(`Call with Student ${studentId} rejected`);
  
  // Update call status
  updateCallStatus('rejected');
}

// Function to start video call
async function startVideoCall() {
  try {
    // Get user media
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    // Display local video
    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = localStream;

    // Enable call controls
    enableCallControls();

    // Update call status
    updateCallStatus('in-call');
    showCallNotification('Call started');

    // Initialize WebRTC peer connection
    initializePeerConnection();

  } catch (error) {
    console.error('Error starting video call:', error);
    showCallNotification('Failed to start video call');
  }
}

// Function to initialize WebRTC peer connection
function initializePeerConnection() {
  // Create RTCPeerConnection (replace with your signaling server implementation)
  peerConnection = new RTCPeerConnection();

  // Add local stream tracks to peer connection
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  // Handle incoming streams
  peerConnection.ontrack = (event) => {
    const remoteVideo = document.getElementById('remoteVideo');
    remoteVideo.srcObject = event.streams[0];
  };

  // Handle connection state changes
  peerConnection.onconnectionstatechange = () => {
    if (peerConnection.connectionState === 'disconnected') {
      handleCallEnded();
    }
  };
}

// Function to toggle video
function toggleVideo() {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      isVideoEnabled = videoTrack.enabled;
      
      const toggleVideoBtn = document.getElementById('toggleVideoBtn');
      toggleVideoBtn.innerHTML = `<span class="icon">📹</span> ${isVideoEnabled ? 'Disable' : 'Enable'} Video`;
      toggleVideoBtn.classList.toggle('active', !isVideoEnabled);
    }
  }
}

// Function to toggle audio
function toggleAudio() {
  if (localStream) {
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      isAudioEnabled = audioTrack.enabled;
      
      const toggleAudioBtn = document.getElementById('toggleAudioBtn');
      toggleAudioBtn.innerHTML = `<span class="icon">🎤</span> ${isAudioEnabled ? 'Mute' : 'Unmute'}`;
      toggleAudioBtn.classList.toggle('active', !isAudioEnabled);
    }
  }
}

// Function to toggle screen sharing
async function toggleScreenShare() {
  try {
    if (!isScreenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      
      // Replace video track with screen share
      const videoTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
      sender.replaceTrack(videoTrack);
      
      isScreenSharing = true;
      document.getElementById('shareScreenBtn').classList.add('active');
      
      // Handle screen share stop
      videoTrack.onended = () => {
        toggleScreenShare();
      };
    } else {
      // Restore video track
      const videoTrack = localStream.getVideoTracks()[0];
      const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
      sender.replaceTrack(videoTrack);
      
      isScreenSharing = false;
      document.getElementById('shareScreenBtn').classList.remove('active');
    }
  } catch (error) {
    console.error('Error toggling screen share:', error);
    showCallNotification('Failed to share screen');
  }
}

// Function to end call
function endCall() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  
  // Clear video elements
  document.getElementById('localVideo').srcObject = null;
  document.getElementById('remoteVideo').srcObject = null;
  
  // Disable call controls
  disableCallControls();
  
  // Update call status
  updateCallStatus('ended');
  showCallNotification('Call ended');
}

// Function to handle call ended by other participant
function handleCallEnded() {
  showCallNotification('Student left the call');
  endCall();
}

// Function to enable call controls
function enableCallControls() {
  document.getElementById('toggleVideoBtn').disabled = false;
  document.getElementById('toggleAudioBtn').disabled = false;
  document.getElementById('shareScreenBtn').disabled = false;
  document.getElementById('endCallBtn').disabled = false;
  document.getElementById('startVideoCallBtn').disabled = true;
}

// Function to disable call controls
function disableCallControls() {
  document.getElementById('toggleVideoBtn').disabled = true;
  document.getElementById('toggleAudioBtn').disabled = true;
  document.getElementById('shareScreenBtn').disabled = true;
  document.getElementById('endCallBtn').disabled = true;
  document.getElementById('startVideoCallBtn').disabled = false;
}

// Function to update call status
function updateCallStatus(status) {
  const callStatus = document.getElementById('callStatus');
  callStatus.textContent = status === 'in-call' ? 'In Call' : 'Call Ended';
  callStatus.className = status;
}

// Function to add a call to active calls list
function addToActiveCalls(studentId) {
  const activeCallsList = document.getElementById('activeCallsList');
  const li = document.createElement('li');
  
  li.innerHTML = `
    <div class="call-info">
      <strong>Student ID:</strong> ${studentId}
      <br>
      <small>Status: Waiting for response</small>
    </div>
    <div class="call-actions">
      <button onclick="acceptCall('${studentId}')" class="btn accept-btn">Accept</button>
      <button onclick="rejectCall('${studentId}')" class="btn reject-btn">Reject</button>
    </div>
  `;
  
  activeCallsList.appendChild(li);
  activeCalls.set(studentId, li);
}

// Function to accept a call
function acceptCall(studentId) {
  const callElement = activeCalls.get(studentId);
  if (callElement) {
    callElement.querySelector('.call-info small').textContent = 'Status: In Progress';
    callElement.querySelector('.call-actions').innerHTML = `
      <button onclick="endCall()" class="btn danger">End Call</button>
    `;
    startVideoCall();
  }
}

// Function to reject a call
function rejectCall(studentId) {
  const callElement = activeCalls.get(studentId);
  if (callElement) {
    callElement.remove();
    activeCalls.delete(studentId);
    showCallNotification(`Call with Student ${studentId} rejected`);
  }
}

// Initialize video call functionality when the page loads
window.addEventListener('load', function() {
  initializeVideoCall();
});

// Array to store workshops
let workshops = [];

// Function to render the workshop list
function renderWorkshops() {
  const workshopList = document.getElementById('workshopList');
  workshopList.innerHTML = ''; // Clear the list

  workshops.forEach((workshop, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '15px';
    li.innerHTML = `
      <strong>${workshop.name}</strong> <br>
      <em>${workshop.description}</em> <br>
      <strong>Speaker:</strong> ${workshop.speaker} <br>
      <strong>Agenda:</strong> ${workshop.agenda} <br>
      <strong>Start:</strong> ${new Date(workshop.startDate).toLocaleString()} <br>
      <strong>End:</strong> ${new Date(workshop.endDate).toLocaleString()} <br>
      <button onclick="editWorkshop(${index})" class="btn">Edit</button>
      <button onclick="deleteWorkshop(${index})" class="btn" style="margin-left: 5px;">Delete</button>
    `;
    workshopList.appendChild(li);
  });
}

// Function to handle form submission
document.getElementById('workshopForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('workshopName').value.trim();
  const description = document.getElementById('workshopDescription').value.trim();
  const speaker = document.getElementById('workshopSpeaker').value.trim();
  const agenda = document.getElementById('workshopAgenda').value.trim();
  const startDate = document.getElementById('workshopStartDate').value;
  const endDate = document.getElementById('workshopEndDate').value;

  if (!name || !description || !speaker || !agenda || !startDate || !endDate) {
    alert('Please fill in all fields.');
    return;
  }

  // Check if editing an existing workshop
  const editingIndex = document.getElementById('workshopForm').dataset.editingIndex;
  if (editingIndex !== undefined) {
    workshops[editingIndex] = { name, description, speaker, agenda, startDate, endDate };
    delete document.getElementById('workshopForm').dataset.editingIndex;
  } else {
    // Add new workshop
    workshops.push({ name, description, speaker, agenda, startDate, endDate });
  }

  // Clear the form
  this.reset();

  // Re-render the workshop list
  renderWorkshops();
});

// Function to edit a workshop
function editWorkshop(index) {
  const workshop = workshops[index];

  document.getElementById('workshopName').value = workshop.name;
  document.getElementById('workshopDescription').value = workshop.description;
  document.getElementById('workshopSpeaker').value = workshop.speaker;
  document.getElementById('workshopAgenda').value = workshop.agenda;
  document.getElementById('workshopStartDate').value = workshop.startDate;
  document.getElementById('workshopEndDate').value = workshop.endDate;

  // Set the editing index
  document.getElementById('workshopForm').dataset.editingIndex = index;
}

// Function to delete a workshop
function deleteWorkshop(index) {
  if (confirm('Are you sure you want to delete this workshop?')) {
    workshops.splice(index, 1); // Remove the workshop
    renderWorkshops(); // Re-render the list
  }
}

// Render workshops on page load
window.onload = function () {
  renderWorkshops();
};