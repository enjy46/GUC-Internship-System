// JavaScript for student courses page

window.onload = function () {
  const coursesSection = document.querySelector('section.card');
  coursesSection.innerHTML = '<p>Courses related to your major will be shown here.</p>';
};
// JavaScript for student courses page

// Sample data for courses in major
const majorCourses = [
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "Database Systems",
  "Computer Networks",
  "Software Engineering"
];

let selectedCourses = [];

window.onload = function () {
  loadMajorCourses();
  loadSelectedCourses();
};

function loadMajorCourses() {
  const majorCoursesDropdown = document.getElementById('majorCoursesDropdown');
  majorCoursesDropdown.innerHTML = '';
  majorCourses.forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    majorCoursesDropdown.appendChild(option);
  });
}

function loadSelectedCourses() {
  const selectableCourses = document.getElementById('selectableCourses');
  selectableCourses.innerHTML = '';
  selectedCourses.forEach(course => {
    const li = document.createElement('li');
    li.textContent = course;
    selectableCourses.appendChild(li);
  });
}

function addManualCourse() {
  const manualCourseInput = document.getElementById('manualCourseInput');
  const course = manualCourseInput.value.trim();
  if (course && !selectedCourses.includes(course)) {
    selectedCourses.push(course);
    manualCourseInput.value = '';
    loadSelectedCourses();
  }
}

function saveSelectedCourses() {
  const majorCoursesDropdown = document.getElementById('majorCoursesDropdown');
  const selectedOptions = Array.from(majorCoursesDropdown.selectedOptions).map(opt => opt.value);
  selectedCourses = [...new Set([...selectedCourses, ...selectedOptions])];
  loadSelectedCourses();
  alert('Selected courses saved successfully.');
}
