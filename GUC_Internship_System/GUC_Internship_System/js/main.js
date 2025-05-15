document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  // Test credentials (replace with actual authentication)
  const credentials = {
    'company@example.com': { password: 'pass123', role: 'company' },
    'student@example.com': { password: 'pass123', role: 'student' },
    'scad@example.com': { password: 'pass123', role: 'scad' },
    'faculty@example.com': { password: 'pass123', role: 'faculty' },
    'malakabuelkhier@example.com': { password: 'pass123', role: 'student' },
    'pro@example.com': { password: 'pro123', role: 'pro' }
  };

  // Check if email exists and password matches
  if (credentials[email] && credentials[email].password === password) {
    const role = credentials[email].role;
    
    // Redirect based on role
    switch (role) {
      case 'company':
        window.location.href = 'company/company_dashboard.html';
        break;
      case 'student':
        if (email === 'malakabuelkhier@example.com') {
          window.location.href = 'pro_dashboard.html';
        } else {
          window.location.href = 'student/student_dashboard.html';
        }
        break;
      case 'scad':
        window.location.href = 'scad_dashboard.html';
        break;
      case 'faculty':
        window.location.href = 'faculty/faculty_dashboard.html';
        break;
      case 'pro':
        window.location.href = 'student/pro_dashboard.html';
        break;
    }
  } else {
    // Show error message with animation
    errorMsg.style.display = 'block';
    errorMsg.style.animation = 'none';
    errorMsg.offsetHeight; // Trigger reflow
    errorMsg.style.animation = 'shake 0.5s ease-in-out';
    
    // Clear password field
    document.getElementById('password').value = '';
  }
});
