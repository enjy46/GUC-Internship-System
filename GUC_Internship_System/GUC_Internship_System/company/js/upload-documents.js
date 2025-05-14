// Get DOM elements
const uploadBtn = document.getElementById("uploadBtn");
const uploadForm = document.getElementById("uploadForm");
const documentUpload = document.getElementById("documentUpload");
const uploadStatus = document.getElementById("uploadStatus");
const documentModal = document.getElementById("documentModal");
const documentDetailsForm = document.getElementById("documentDetailsForm");
const cancelUploadBtn = document.getElementById("cancelUploadBtn");

// Store selected files
let selectedFiles = [];

// Event listener for file selection
documentUpload.addEventListener("change", function() {
  selectedFiles = Array.from(this.files);
  
  if (selectedFiles.length === 0) {
    displayMessage("Please select at least one document to upload.", true);
  } else {
    displayMessage(`${selectedFiles.length} file(s) selected`, false);
  }
});

// Event listener for upload button
uploadBtn.addEventListener("click", function() {
  if (selectedFiles.length === 0) {
    displayMessage("Please select at least one document to upload.", true);
    return;
  }
  
  // Show the modal for document details
  documentModal.style.display = "flex";
});

// Event listener for cancel button in modal
cancelUploadBtn.addEventListener("click", function() {
  documentModal.style.display = "none";
  documentDetailsForm.reset();
});

// Event listener for document details form submission
documentDetailsForm.addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Get form values
  const documentType = document.getElementById("documentType").value;
  const documentDescription = document.getElementById("documentDescription").value;
  const expiryDate = document.getElementById("expiryDate").value;
  const isConfidential = document.getElementById("isConfidential").value;
  
  // Simulate upload process with document details
  console.log("Uploading documents with details:", {
    files: selectedFiles.map(file => file.name),
    documentType,
    documentDescription,
    expiryDate,
    isConfidential
  });
  
  // Close the modal
  documentModal.style.display = "none";
  
  // Show success message
  displayMessage("Documents uploaded successfully with additional details!", false);
  
  // Reset forms
  uploadForm.reset();
  documentDetailsForm.reset();
  selectedFiles = [];
});

// Display message function
function displayMessage(message, isError) {
  uploadStatus.textContent = message;
  uploadStatus.style.color = isError ? "red" : "green";
  uploadStatus.style.display = "block";
}

// Highlight the active navigation link
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// Close modal if user clicks outside of it
window.addEventListener("click", function(event) {
  if (event.target === documentModal) {
    documentModal.style.display = "none";
    documentDetailsForm.reset();
  }
});
