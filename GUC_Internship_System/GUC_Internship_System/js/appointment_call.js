// appointment_call.js

let appointments = [];
let inCall = false;

function requestAppointment() {
  const name = document.getElementById('studentName').value.trim();
  const reason = document.getElementById('appointmentReason').value.trim();
  const status = document.getElementById('appointmentStatus');

  if (!name || !reason) {
    status.textContent = "❗ Please fill out your name and reason.";
    return;
  }

  const newApp = {
    name,
    reason,
    accepted: null,
    online: true
  };
  appointments.push(newApp);
  renderAppointments();
  status.textContent = "✅ Appointment request sent.";
  document.getElementById('studentName').value = "";
  document.getElementById('appointmentReason').value = "";
}

function renderAppointments() {
  const list = document.getElementById('appointmentList');
  list.innerHTML = '';
  appointments.forEach((app, i) => {
    const div = document.createElement('div');
    div.className = 'appointment-item';
    div.innerHTML = `
      <p><strong>Name:</strong> ${app.name}</p>
      <p><strong>Reason:</strong> ${app.reason}</p>
      <p><strong>Status:</strong> ${app.accepted === null ? 'Pending' : app.accepted ? 'Accepted ✅' : 'Rejected ❌'}</p>
      <p><strong>Online:</strong> ${app.online ? '🟢' : '🔴'}</p>
      ${app.accepted === null ? `
        <button onclick="respondToAppointment(${i}, true)">Accept</button>
        <button onclick="respondToAppointment(${i}, false)">Reject</button>
      ` : app.accepted && app.online ? `
        <button onclick="startCall(${i})">📞 Start Call</button>
      ` : ''}
    `;
    list.appendChild(div);
  });
}

function respondToAppointment(index, accept) {
  appointments[index].accepted = accept;
  renderAppointments();
  alert(accept ? "✅ Appointment accepted." : "❌ Appointment rejected.");
}

function startCall(index) {
  document.getElementById('callSection').classList.remove('hidden');
  document.getElementById('callStatus').textContent = `🔗 You are now in a call with ${appointments[index].name}`;
  inCall = true;
}

function toggleVideo() {
  alert("🎥 Video toggled.");
}

function toggleMic() {
  alert("🎤 Microphone toggled.");
}

function shareScreen() {
  alert("🖥 Screen sharing started.");
}

function leaveCall() {
  document.getElementById('callSection').classList.add('hidden');
  document.getElementById('callStatus').textContent = '';
  alert("❌ You left the call.");
  inCall = false;
}
