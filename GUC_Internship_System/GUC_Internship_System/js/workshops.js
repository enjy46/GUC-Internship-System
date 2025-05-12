
const workshops = [
  {
    title: "CV Writing Masterclass",
    description: "Learn how to create a compelling CV that gets noticed.",
    recordingUrl: "https://example.com/cv-writing.mp4",
  },
  {
    title: "Ace Your Interview",
    description: "Tips and techniques for nailing job interviews.",
    recordingUrl: "https://example.com/interview.mp4",
  },
  {
    title: "AI in the Workplace",
    description: "Explore how artificial intelligence is shaping the job market.",
    recordingUrl: "https://example.com/ai-careers.mp4",
  }
];

let registered = false;
let selectedWorkshop = null;
const listContainer = document.getElementById("workshopList");
const modal = document.getElementById("workshopDetails");
const chatBox = document.getElementById("chatBox");

function displayWorkshops() {
  listContainer.innerHTML = workshops.map((w, i) => `
    <div class="workshop-card">
      <h3>${w.title}</h3>
      <p>${w.description}</p>
      <button onclick="showDetails(${i})">View Details</button>
    </div>
  `).join("");
}

displayWorkshops();

function showDetails(index) {
  selectedWorkshop = workshops[index];
  document.getElementById("workshopTitle").textContent = selectedWorkshop.title;
  document.getElementById("workshopDescription").textContent = selectedWorkshop.description;
  document.getElementById("toggleRecording").textContent = "Play Recording";
  document.getElementById("toggleRecording").disabled = !registered;
  document.getElementById("joinLiveBtn").disabled = !registered;
  document.getElementById("videoPlayer").style.display = "none";
  modal.classList.remove("hidden");
}

function registerWorkshop() {
  registered = true;
  alert("✅ You are now registered for: " + selectedWorkshop.title);
  document.getElementById("toggleRecording").disabled = false;
  document.getElementById("joinLiveBtn").disabled = false;

  // Show visual confirmation
  const status = document.getElementById("registrationStatus");
  if (status) status.textContent = "✅ You are registered for this workshop.";
}




function submitFeedback() {
  const rating = document.getElementById("rating").value;
  const feedback = document.getElementById("feedback").value;
  alert(`⭐ Rating: ${rating}\n💬 Feedback: ${feedback}`);
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message");
    msg.textContent = "🔔 " + message;
    chatBox.appendChild(msg);
    input.value = "";
  }
}

function closeDetails() {
  modal.classList.add("hidden");
  document.getElementById("notes").value = "";
  document.getElementById("chatBox").innerHTML = "";
  document.getElementById("rating").value = "";
  document.getElementById("feedback").value = "";
  document.getElementById("chatInput").value = "";
  document.getElementById("videoPlayer").innerHTML = "";
  document.getElementById("videoPlayer").style.display = "none";
  registered = false;
}

function joinLive() {
  const player = document.getElementById("videoPlayer");

  if (!registered) {
    alert("❗ You must register for the workshop to join the live session.");
    player.innerHTML = ""; // just in case
    player.style.display = "none";
    return;
  }

  player.innerHTML = `
    <video controls autoplay width="100%">
      <source src="https://example.com/live-stream-url" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
  player.style.display = "block";

  setTimeout(() => {
    alert("🔔 Live workshop is starting now!");
  }, 500);
}



function toggleRecording() {
  if (!registered) {
    alert("❗ You must register for the workshop to view the recording.");
    return;
  }
  const btn = document.getElementById("toggleRecording");
  const player = document.getElementById("videoPlayer");

  if (!document.getElementById("recording")) {
    player.innerHTML = `
      <video id="recording" width="100%" controls>
        <source src="${selectedWorkshop.recordingUrl}" type="video/mp4">
      </video>
      <div style="margin-top: 0.5rem;">
        <button onclick="document.getElementById('recording').play()">▶ Play</button>
        <button onclick="document.getElementById('recording').pause()">⏸ Pause</button>
        <button onclick="document.getElementById('recording').currentTime = 0; document.getElementById('recording').pause();">⏹ Stop</button>
      </div>
    `;
    player.style.display = "block";
    btn.textContent = "Pause Recording";
    setTimeout(() => alert("🔔 Your registered recording is ready to play!"), 500);
  } else {
    const vid = document.getElementById("recording");
    if (vid.paused) {
      vid.play();
      btn.textContent = "Pause Recording";
    } else {
      vid.pause();
      btn.textContent = "Play Recording";
    }
  }
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message");
    msg.textContent = "🔔 " + message;
    chatBox.appendChild(msg);
    alert("📢 New message from an attendee!");
    input.value = "";
  }
}

function downloadCertificate() {
  if (!registered) return alert("❗ You must register first.");
  const certPopup = window.open("", "Certificate", "width=700,height=500");
  if (!certPopup) {
    alert("⚠️ Please allow popups in your browser to view the certificate.");
    return;
  }

  certPopup.document.write(`
    <html>
      <head>
        <title>Certificate of Attendance</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            text-align: center;
            background: #f0f8ff;
            padding: 2rem;
          }
          .cert {
            border: 6px double #1e3a8a;
            padding: 2rem;
            background: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            border-radius: 12px;
          }
          h1 { color: #1e3a8a; margin-bottom: 0; }
          h2 { color: #111827; }
          h3 { color: #1e3a8a; }
          p { font-size: 1.1rem; color: #333; }
          button {
            margin-top: 2rem;
            padding: 0.5rem 1.5rem;
            font-size: 1rem;
            border-radius: 6px;
            background: #0d1b2a;
            color: white;
            border: none;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="cert">
          <h1>🎓 Certificate of Attendance 🎓</h1>
          <p>This certifies that</p>
          <h2>Malak Abuelkhier</h2>
          <p>has successfully attended</p>
          <h3>${selectedWorkshop.title}</h3>
          <p>on ${new Date().toLocaleDateString()}</p>
          <p style="margin-top:2rem; font-style: italic;">SCAD Career Development Office</p>
          <button onclick="window.print()">🖨 Print Certificate</button>
        </div>
      </body>
    </html>
  `);
  certPopup.document.close();
}

