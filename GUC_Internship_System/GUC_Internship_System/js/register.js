document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const companyName = document.getElementById('companyName').value.trim();
  const companyEmail = document.getElementById('companyEmail').value.trim();
  const companyPhone = document.getElementById('companyPhone').value.trim();
  const companyAddress = document.getElementById('companyAddress').value.trim();
  const companyLogo = document.getElementById('companyLogo').files[0];

  if (!companyName || !companyEmail || !companyPhone || !companyAddress || !companyLogo) {
    displayMessage('Please fill in all fields and upload a logo.', true);
    return;
  }

  // Simulate form submission and success
  displayMessage('Company registered successfully!', false);

  // Clear form
  this.reset();
});

function displayMessage(message, isError) {
  const messageElem = document.getElementById('registerMessage');
  messageElem.textContent = message;
  messageElem.style.color = isError ? 'red' : 'green';
}

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
