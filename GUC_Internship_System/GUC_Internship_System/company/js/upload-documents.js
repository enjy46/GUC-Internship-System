document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const files = document.getElementById("documentUpload").files;

    if (files.length === 0) {
      displayMessage("Please select at least one document to upload.", true);
      return;
    }

    // Simulate upload process
    displayMessage("Documents uploaded successfully!", false);

    // Clear the form
    this.reset();
  });
// Clear form
function displayMessage(message, isError) {
  const messageElem = document.getElementById("registerMessage");
  messageElem.textContent = message; // Set the message text
  messageElem.style.color = isError ? "red" : "green"; // Set the color based on error or success
  messageElem.style.display = "block"; // Ensure the message is visible
}

// Highlight the active navigation link
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
