document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const files = document.getElementById('documentUpload').files;
  const statusElem = document.getElementById('uploadStatus');

  if (files.length === 0) {
    statusElem.textContent = 'Please select at least one document to upload.';
    statusElem.style.color = 'red';
    return;
  }

  // Simulate upload process
  statusElem.textContent = 'Uploading documents...';
  statusElem.style.color = 'black';

  setTimeout(() => {
    statusElem.textContent = 'Documents uploaded successfully!';
    statusElem.style.color = 'green';
    document.getElementById('uploadForm').reset();
  }, 1500);
});

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
