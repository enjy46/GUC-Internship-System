document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const companyName = document.getElementById("companyName").value.trim();
    const companyEmail = document.getElementById("companyEmail").value.trim();
    const companyPhone = document.getElementById("companyPhone").value.trim();
    const companyAddress = document
      .getElementById("companyAddress")
      .value.trim();
    const companyLogo = document.getElementById("companyLogo").files[0];

    if (
      !companyName ||
      !companyEmail ||
      !companyPhone ||
      !companyAddress ||
      !companyLogo
    ) {
      displayMessage("Please fill in all fields and upload a logo.", true);
      return;
    }

    // Display success message
    displayMessage("Registered successfully!", false);

    // Clear form
    this.reset();
  });

function displayMessage(message, isError) {
  const messageElem = document.getElementById("registerMessage");
  messageElem.textContent = message; // Set the message text
  messageElem.style.color = isError ? "red" : "green"; // Set the color based on error or success
  messageElem.style.display = "block"; // Ensure the message is visible
}

document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
