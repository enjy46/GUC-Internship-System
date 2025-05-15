const workshops = [
  {
    title: "CV Writing Masterclass",
    description: "Learn how to create a compelling CV that gets noticed.",
    recordingUrl: "https://www.youtube.com/embed/Tt08KmFfIYQ",
    liveUrl: "https://www.youtube.com/embed/pjqi_M3SPwY",
    isLive: false
  },
  {
    title: "Ace Your Interview",
    description: "Tips and techniques for nailing job interviews.",
    recordingUrl: "https://www.youtube.com/embed/grorhKeNklw",
    liveUrl: "https://www.youtube.com/embed/DzbFBgGUGdU",
    isLive: false
  },
  {
    title: "AI in the Workplace",
    description: "Explore how artificial intelligence is shaping the job market.",
    recordingUrl: "https://www.youtube.com/embed/nVyD6THcvDQ",
    liveUrl: "https://www.youtube.com/embed/Q07rFZtc2Ao",
    isLive: false
  }
];

let registered = false;
let selectedWorkshop = null;
const listContainer = document.getElementById("workshopList");
const modal = document.getElementById("workshopDetails");
const chatBox = document.getElementById("chatBox");
const notification = document.getElementById("notification");

function displayWorkshops() {
  listContainer.innerHTML = workshops.map((w, i) => `
    <div class="workshop-card">
      <h3>${w.title}</h3>
      <p>${w.description}</p>
      <button onclick="showDetails(${i})">View Details</button>
    </div>
  `).join("");
}

function showNotification(message, type = 'info') {
  const notificationText = document.getElementById("notificationText");
  notificationText.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
}

function showDetails(index) {
  selectedWorkshop = workshops[index];
  document.getElementById("workshopTitle").textContent = selectedWorkshop.title;
  document.getElementById("workshopDescription").textContent = selectedWorkshop.description;
  
  // Reset video player
  const videoPlayer = document.getElementById("workshopVideo");
  videoPlayer.src = "";
  videoPlayer.style.display = "none";
  
  // Reset buttons
  document.getElementById("toggleRecording").disabled = !registered;
  document.getElementById("joinLiveBtn").disabled = !registered;
  
  // Reset status
  document.getElementById("workshopStatus").textContent = "Not Registered";
  document.getElementById("workshopStatus").className = "status-badge";
  
  // Show modal
  modal.classList.remove("hidden");
  
  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function closeDetails() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
  
  // Reset all form elements
  document.getElementById("notes").value = "";
  document.getElementById("chatBox").innerHTML = "";
  document.getElementById("rating").value = "";
  document.getElementById("feedback").value = "";
  document.getElementById("chatInput").value = "";
  
  // Stop video if playing
  const video = document.getElementById("workshopVideo");
  video.src = "";
  video.style.display = "none";
  
  registered = false;
}

function registerWorkshop() {
  registered = true;
  document.getElementById("toggleRecording").disabled = false;
  document.getElementById("joinLiveBtn").disabled = false;
  
  // Update status
  const status = document.getElementById("workshopStatus");
  status.textContent = "Registered";
  status.className = "status-badge registered";
  
  showNotification(`Successfully registered for ${selectedWorkshop.title}!`, 'success');
}

function joinLive() {
  if (!registered) {
    showNotification("Please register for the workshop first!", 'error');
    return;
  }

  const videoPlayer = document.getElementById("workshopVideo");
  const liveBtn = document.getElementById("joinLiveBtn");
  const recordingBtn = document.getElementById("toggleRecording");
  
  // Add live indicator
  const liveIndicator = document.createElement('div');
  liveIndicator.className = 'live-indicator';
  liveIndicator.innerHTML = '<span class="pulse"></span> LIVE';
  liveBtn.appendChild(liveIndicator);
  
  // Update video source
  videoPlayer.src = selectedWorkshop.liveUrl;
  videoPlayer.style.display = "block";
  selectedWorkshop.isLive = true;
  
  // Update button states
  liveBtn.classList.add("active", "live-active");
  recordingBtn.classList.remove("active");
  
  showNotification("Connecting to live workshop...", 'info');
  
  // Simulate live stream connection
  setTimeout(() => {
    showNotification("Connected to live workshop! You can now interact with the presenter.", 'success');
    // Add live chat simulation
    simulateLiveChat();
  }, 1500);
}

function toggleRecording() {
  if (!registered) {
    showNotification("Please register for the workshop first!", 'error');
    return;
  }

  const videoPlayer = document.getElementById("workshopVideo");
  const liveBtn = document.getElementById("joinLiveBtn");
  const recordingBtn = document.getElementById("toggleRecording");
  
  // Remove live indicator if exists
  const liveIndicator = liveBtn.querySelector('.live-indicator');
  if (liveIndicator) {
    liveIndicator.remove();
  }
  
  videoPlayer.src = selectedWorkshop.recordingUrl;
  videoPlayer.style.display = "block";
  selectedWorkshop.isLive = false;
  
  // Update button states
  recordingBtn.classList.add("active");
  liveBtn.classList.remove("active", "live-active");
  
  showNotification("Loading recording...", 'info');
  
  setTimeout(() => {
    showNotification("Recording is ready to watch!", 'success');
  }, 1000);
}

function simulateLiveChat() {
  const chatBox = document.getElementById("chatBox");
  const messages = [
    "Welcome to the live workshop!",
    "Feel free to ask questions in the chat.",
    "The presenter will answer your questions after the session.",
    "Don't forget to take notes!"
  ];
  
  let index = 0;
  const interval = setInterval(() => {
    if (index < messages.length) {
      const msg = document.createElement("div");
      msg.classList.add("chat-message", "system-message");
      msg.innerHTML = `
        <strong>System:</strong>
        <p>${messages[index]}</p>
        <small>${new Date().toLocaleTimeString()}</small>
      `;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
      index++;
    } else {
      clearInterval(interval);
    }
  }, 3000);
}

function submitFeedback() {
  const rating = document.getElementById("rating").value;
  const feedback = document.getElementById("feedback").value;
  
  if (!rating) {
    showNotification("Please select a rating!", 'error');
    return;
  }
  
  // Here you would typically send the feedback to a server
  showNotification("Thank you for your feedback!", 'success');
  
  // Reset form
  document.getElementById("rating").value = "";
  document.getElementById("feedback").value = "";
}

function submitNotes() {
  const notes = document.getElementById("notes").value;
  
  if (!notes.trim()) {
    showNotification("Please add some notes before saving!", 'error');
    return;
  }
  
  // Here you would typically save the notes to a server
  showNotification("Notes saved successfully!", 'success');
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  
  if (!message) {
    showNotification("Please type a message!", 'error');
    return;
  }
  
  const msg = document.createElement("div");
  msg.classList.add("chat-message");
  msg.innerHTML = `
    <strong>You:</strong>
    <p>${message}</p>
    <small>${new Date().toLocaleTimeString()}</small>
  `;
  
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
  
  // Simulate response
  setTimeout(() => {
    const response = document.createElement("div");
    response.classList.add("chat-message");
    response.innerHTML = `
      <strong>Attendee:</strong>
      <p>Thanks for sharing!</p>
      <small>${new Date().toLocaleTimeString()}</small>
    `;
    chatBox.appendChild(response);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

function showCertificate() {
  if (!registered) {
    showNotification("Please register for the workshop first!", 'error');
    return;
  }
  
  const certificateModal = document.getElementById("certificateModal");
  const certificateTitle = document.getElementById("certificateTitle");
  const certificateDate = document.getElementById("certificateDate");
  
  certificateTitle.textContent = selectedWorkshop.title;
  certificateDate.textContent = `on ${new Date().toLocaleDateString()}`;
  
  certificateModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCertificate() {
  const certificateModal = document.getElementById("certificateModal");
  certificateModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function printCertificate() {
  window.print();
}

function downloadCertificate() {
  if (!registered) {
    showNotification("Please register for the workshop first!", 'error');
    return;
  }

  // Create a temporary container for the certificate
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = `
    <div class="cert">
      <h1>Certificate of Achievement</h1>
      <p>This is to certify that</p>
      <h2>Malak Abuelkhier</h2>
      <p>has successfully completed the workshop</p>
      <h3>${selectedWorkshop.title}</h3>
      <p>on ${new Date().toLocaleDateString()}</p>
      <div class="signature">
        <div class="signature-line"></div>
        <div class="signature-text">SCAD Career Development Office</div>
        <div class="signature-line"></div>
      </div>
    </div>
  `;

  // Add the certificate styles
  const styles = `
    <style>
      body {
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 2rem;
        background: #f0f8ff;
      }
      .cert {
        border: 8px double #1e3a8a;
        padding: 3rem;
        background: #ffffff;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        border-radius: 20px;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }
      h1 {
        color: #1e3a8a;
        font-size: 2.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 1rem;
      }
      h2 {
        color: #111827;
        font-size: 2rem;
        margin: 1.5rem 0;
        font-weight: 600;
        text-transform: uppercase;
      }
      h3 {
        color: #1e3a8a;
        font-size: 1.8rem;
        margin: 1.5rem 0;
        font-weight: 600;
      }
      p {
        font-size: 1.2rem;
        color: #333;
        margin: 0.8rem 0;
        line-height: 1.6;
      }
      .signature {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
      }
      .signature-line {
        flex: 1;
        height: 1px;
        background: #1e3a8a;
        margin: 0 1rem;
      }
      .signature-text {
        font-style: italic;
        color: #1e3a8a;
        font-size: 1.1rem;
      }
    </style>
  `;

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificate - ${selectedWorkshop.title}</title>
        ${styles}
      </head>
      <body>
        ${tempContainer.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();

  // Wait for the content to load
  printWindow.onload = function() {
    // Use html2pdf to convert the content to PDF
    html2pdf()
      .from(printWindow.document.body)
      .save(`Certificate_${selectedWorkshop.title.replace(/\s+/g, '_')}.pdf`)
      .then(() => {
        printWindow.close();
        showNotification("Certificate downloaded successfully!", 'success');
      })
      .catch(() => {
        showNotification("Error downloading certificate. Please try again.", 'error');
      });
  };
}

// Initialize workshops display
displayWorkshops();

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeDetails();
  }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeDetails();
  }
});

