/* JavaScript for student reports page */
document.addEventListener('DOMContentLoaded', function () {
  // Check if localStorage is available
  if (!isLocalStorageAvailable()) {
    showFeedback('Local storage is not available. Reports cannot be saved.', 'error');
    document.getElementById('reportList').innerHTML = '<p>Error: Unable to access storage.</p>';
    return;
  }

  // Initialize the page
  loadReportList();
  populateAppealDropdown();
  loadComments();

  // Expose functions to global scope for onclick handlers
  window.saveReport = saveReport;
  window.submitFinalReport = submitFinalReport;
  window.deleteReport = deleteReport;
  window.downloadReportAsPDF = downloadReportAsPDF;
  window.submitAppeal = submitAppeal;
  window.editReport = editReport;
});

// Sample data for demonstration (replace with actual backend integration)
let reports = [];
let comments = [];
let notifications = [];

// Check localStorage availability
function isLocalStorageAvailable() {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Load data from localStorage
function loadData() {
  try {
    reports = JSON.parse(localStorage.getItem('reports')) || [];
    comments = JSON.parse(localStorage.getItem('reportComments')) || [];
    notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    console.log('Loaded data:', { reports, comments, notifications });
  } catch (e) {
    console.error('Error loading localStorage:', e);
    showFeedback('Error loading reports. Please try again.', 'error');
  }
}

// Save data to localStorage
function saveData() {
  try {
    localStorage.setItem('reports', JSON.stringify(reports));
    localStorage.setItem('reportComments', JSON.stringify(comments));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    console.log('Saved data:', { reports, comments, notifications });
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    showFeedback('Error saving reports. Please try again.', 'error');
  }
}

// Generate unique report ID
function generateReportId() {
  let counter = parseInt(localStorage.getItem('reportIdCounter')) || 0;
  counter += 1;
  localStorage.setItem('reportIdCounter', counter);
  return `report_${counter}`;
}

// Load report list
function loadReportList() {
  loadData();
  const reportList = document.getElementById('reportList');
  reportList.innerHTML = '';
  console.log('Rendering reports:', reports);

  if (reports.length === 0) {
    reportList.innerHTML = '<p>No reports available.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  reports.forEach((report) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${report.title}</td>
      <td>${report.status}</td>
      <td>
        <button class="dashboard-btn btn-save" onclick="editReport('${report.id}')">Edit</button>
        <button class="dashboard-btn btn-download" onclick="downloadReportAsPDF('${report.id}')">Download PDF</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  reportList.appendChild(table);
}

// Populate the appeal dropdown with flagged or rejected reports
function populateAppealDropdown() {
  loadData();
  const appealSelect = document.getElementById('reportToAppeal');
  appealSelect.innerHTML = '<option value="">Select a report to appeal</option>';

  reports.forEach((report) => {
    if (['flagged', 'rejected'].includes(report.status)) {
      const option = document.createElement('option');
      option.value = report.id;
      option.textContent = report.title;
      appealSelect.appendChild(option);
    }
  });
}

// Load comments for flagged or rejected reports
function loadComments() {
  loadData();
  const commentsContainer = document.getElementById('commentsContainer');
  commentsContainer.innerHTML = '';

  const flaggedOrRejectedReports = reports.filter(r => ['flagged', 'rejected'].includes(r.status));
  if (flaggedOrRejectedReports.length === 0 || comments.length === 0) {
    commentsContainer.innerHTML = '<p>No comments available.</p>';
    return;
  }

  comments.forEach(comment => {
    if (flaggedOrRejectedReports.some(r => r.title === comment.reportTitle)) {
      const commentElement = document.createElement('div');
      commentElement.className = 'comment-item';
      commentElement.innerHTML = `
        <p><strong>${comment.author}</strong> (${new Date(comment.date).toLocaleString()}):</p>
        <p>${comment.text}</p>
      `;
      commentsContainer.appendChild(commentElement);
    }
  });
}

// Save or update report
function saveReport() {
  const title = document.getElementById('reportTitle').value.trim();
  const intro = document.getElementById('reportIntro').value.trim();
  const body = document.getElementById('reportBody').value.trim();
  const form = document.getElementById('internshipReportForm');
  const reportId = form.dataset.reportId;

  if (!title || !intro || !body) {
    showFeedback('Please fill in all fields.', 'error');
    return;
  }

  loadData();
  const report = {
    id: reportId || generateReportId(),
    title,
    intro,
    body,
    status: reportId ? reports.find(r => r.id === reportId)?.status || 'draft' : 'draft',
    date: new Date().toISOString(),
  };

  if (reportId) {
    // Update existing report
    const index = reports.findIndex(r => r.id === reportId);
    if (index !== -1) {
      reports[index] = report;
      showFeedback('Report updated successfully!', 'success');
    } else {
      showFeedback('Report not found for update.', 'error');
      return;
    }
  } else {
    // Create new report
    reports.push(report);
    showFeedback('Report saved successfully!', 'success');
  }

  saveData();
  form.reset();
  form.dataset.reportId = '';
  loadReportList();
  populateAppealDropdown();
}

// Submit final report
function submitFinalReport() {
  const title = document.getElementById('reportTitle').value.trim();
  const intro = document.getElementById('reportIntro').value.trim();
  const body = document.getElementById('reportBody').value.trim();
  const form = document.getElementById('internshipReportForm');
  const reportId = form.dataset.reportId;

  if (!title || !intro || !body) {
    showFeedback('Please fill in all fields to submit.', 'error');
    return;
  }

  loadData();
  const report = {
    id: reportId || generateReportId(),
    title,
    intro,
    body,
    status: 'submitted',
    date: new Date().toISOString(),
  };

  if (reportId) {
    const index = reports.findIndex(r => r.id === reportId);
    if (index !== -1) {
      reports[index] = report;
    } else {
      showFeedback('Report not found for submission.', 'error');
      return;
    }
  } else {
    reports.push(report);
  }

  saveData();
  addNotification(`Report "${title}" has been submitted.`, 'success');
  showFeedback('Report submitted successfully!', 'success');
  form.reset();
  form.dataset.reportId = '';
  loadReportList();
  populateAppealDropdown();
}

// Delete report
function deleteReport() {
  const title = document.getElementById('reportTitle').value.trim();
  if (!title) {
    showFeedback('Please enter a report title to delete.', 'error');
    return;
  }

  loadData();
  const index = reports.findIndex(report => report.title === title);
  if (index === -1) {
    showFeedback('Report not found.', 'error');
    return;
  }

  reports.splice(index, 1);
  saveData();
  showFeedback('Report deleted successfully!', 'success');
  document.getElementById('internshipReportForm').reset();
  document.getElementById('internshipReportForm').dataset.reportId = '';
  loadReportList();
  populateAppealDropdown();
}

// Download report as PDF
function downloadReportAsPDF(reportId) {
  let report;
  if (reportId) {
    loadData();
    report = reports.find(r => r.id === reportId);
    if (!report) {
      showFeedback('Report not found.', 'error');
      return;
    }
  } else {
    const title = document.getElementById('reportTitle').value.trim();
    const intro = document.getElementById('reportIntro').value.trim();
    const body = document.getElementById('reportBody').value.trim();
    if (!title || !intro || !body) {
      showFeedback('Please fill in all fields to download.', 'error');
      return;
    }
    report = { title, intro, body };
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(16);
  doc.text('Internship Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Title: ${report.title}`, 20, 30);
  doc.text('Introduction:', 20, 40);
  doc.text(report.intro, 20, 50, { maxWidth: 170 });
  doc.text('Report Body:', 20, 80);
  doc.text(report.body, 20, 90, { maxWidth: 170 });

  doc.save(`${report.title}_Report.pdf`);
}

// Submit appeal
function submitAppeal() {
  const reportId = document.getElementById('reportToAppeal').value;
  const appealMessage = document.getElementById('appealMessage').value.trim();

  if (!reportId || !appealMessage) {
    showFeedback('Please select a report and enter an appeal message.', 'error');
    return;
  }

  loadData();
  const report = reports.find(r => r.id === reportId);
  if (!report) {
    showFeedback('Selected report not found.', 'error');
    return;
  }

  const appeal = {
    reportId,
    reportTitle: report.title,
    message: appealMessage,
    date: new Date().toISOString(),
  };

  let appeals = JSON.parse(localStorage.getItem('appeals')) || [];
  appeals.push(appeal);
  localStorage.setItem('appeals', JSON.stringify(appeals));

  addNotification(`Appeal submitted for "${appeal.reportTitle}".`, 'success');
  showFeedback(`Appeal submitted for "${appeal.reportTitle}"!`, 'success');
  document.getElementById('appealMessage').value = '';
  document.getElementById('reportToAppeal').value = '';
}

// Edit report
function editReport(reportId) {
  loadData();
  const report = reports.find(r => r.id === reportId);
  if (!report) {
    showFeedback('Report not found.', 'error');
    return;
  }
  document.getElementById('reportTitle').value = report.title;
  document.getElementById('reportIntro').value = report.intro;
  document.getElementById('reportBody').value = report.body;
  document.getElementById('internshipReportForm').dataset.reportId = reportId;
}

// Add notification
function addNotification(message, type) {
  const notification = {
    message,
    type,
    date: new Date().toISOString(),
  };
  notifications.push(notification);
  saveData();
}

// Show feedback
function showFeedback(message, type) {
  const feedback = document.createElement('div');
  feedback.className = `feedback ${type} show`;
  feedback.textContent = message;
  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.classList.remove('show');
    setTimeout(() => feedback.remove(), 400);
  }, 3000);
}