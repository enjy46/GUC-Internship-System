const form = document.getElementById('profileForm');
const message = document.getElementById('message');
const majorSelect = document.getElementById('major');
const courseField = document.getElementById('courses');

// Predefined course lists by major
const courseListByMajor = {
  "Applied Arts": [
    "Design Basics", "Visual Communication", "Digital Illustration"
  ],
  "Architecture": [
    "Architectural Design", "Building Materials", "Urban Planning"
  ],
  "Business": [
    "Principles of Management", "Marketing", "Accounting"
  ],
  "Business Informatics": [
    "Information Systems", "Business Intelligence", "Data Analytics"
  ],
  "Engineering": [
    "Statics", "Thermodynamics", "Control Systems"
  ],
  "Law": [
    "Constitutional Law", "Criminal Law", "Legal Writing"
  ],
  "Pharmacy": [
    "Pharmacology", "Pharmaceutics", "Toxicology"
  ]
};

// Auto-fill course field when major is selected
if (majorSelect && courseField) {
  majorSelect.addEventListener('change', function () {
    const selectedMajor = majorSelect.value;
    const courses = courseListByMajor[selectedMajor] || [];
    courseField.value = courses.join(', ');
  });
}

// Save profile form
if (form && message) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const semester = document.getElementById('semester').value;

    if (!fullName || !semester) {
      message.textContent = 'Please fill out all required fields.';
      message.className = 'error';
      return;
    }

    message.textContent = 'Your profile has been successfully updated!';
    message.className = 'success';

    setTimeout(() => (message.textContent = ''), 3000);
    form.reset();
  });
} else {
  console.error('Form or message element not found.');
}
