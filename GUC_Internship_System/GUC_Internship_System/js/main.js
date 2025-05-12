document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;
  const errorMsg = document.getElementById('errorMsg');

  const credentials = {
    company: { email: "company@example.com", password: "pass123" },
    student: { email: "student@example.com", password: "pass123" },
    scad:    { email: "scad@example.com", password: "pass123" },
    faculty: { email: "faculty@example.com", password: "pass123" },
    malak:   { email: "malakabuelkhier@example.com", password: "pass123" }
  };

  if (role === 'student') {
    if (email === credentials.malak.email && password === credentials.malak.password) {
      window.location.href = 'pro_dashboard.html';
      return;
    } else if (email === credentials.student.email && password === credentials.student.password) {
      window.location.href = 'student_dashboard.html';
      return;
    }
  } else if (credentials[role] && credentials[role].email === email && credentials[role].password === password) {
    switch (role) {
      case 'company':
        window.location.href = 'company_dashboard.html';
        break;
      case 'scad':
        window.location.href = 'scad_dashboard.html';
        break;
      case 'faculty':
        window.location.href = 'faculty_dashboard.html';
        break;
    }
  } else {
    errorMsg.style.display = 'block';
  }
});
