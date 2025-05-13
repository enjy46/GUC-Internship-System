document.addEventListener('DOMContentLoaded', function() {
  const majorCoursesDropdown = document.getElementById('majorCoursesDropdown');
  const selectableCourses = document.getElementById('selectableCourses');
  const manualCourseInput = document.getElementById('manualCourseInput');

  if (!majorCoursesDropdown || !selectableCourses || !manualCourseInput) {
    console.error('Missing DOM elements:', {
      majorCoursesDropdown: !!majorCoursesDropdown,
      selectableCourses: !!selectableCourses,
      manualCourseInput: !!manualCourseInput
    });
    showFeedback('Error loading courses. Please refresh the page.', 'error');
    return;
  }

  loadMajorCourses();
  loadSelectedCourses();

  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  if (sidebarToggle && sidebar && mainContent) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('collapsed');
    });
  } else {
    console.warn('Sidebar elements missing:', {
      sidebarToggle: !!sidebarToggle,
      sidebar: !!sidebar,
      mainContent: !!mainContent
    });
  }
});

// Constants for localStorage keys
const LS_KEYS = {
  PROFILE: "studentProfile",
  HELPFUL_COURSES: "helpfulCourses"
};

// Courses by major
const coursesByMajor = {
  CS: [
    "Data Structures and Algorithms", "Computer Programming", "Web Development",
    "Databases", "Introduction to Networks", "Software Engineering",
    "Theory of Computation", "Information Security", "Data Mining",
    "Human Computer Interaction"
  ],
  Eng: [
    "Thermodynamics", "Circuit Analysis", "Fluid Mechanics",
    "Mathematics", "Computer Programming Lab"
  ],
  Business: [
    "Management", "Economics", "Financial Accounting", "Marketing",
    "Finance", "Organizational Behavior", "Management Accounting",
    "Micro-economics", "Enterprise Systems", "Business Law",
    "Human Resource Management", "Auditing", "Corporate Finance",
    "Taxation", "Research Methodology"
  ]
};

function loadMajorCourses() {
  const majorCoursesDropdown = document.getElementById('majorCoursesDropdown');
  if (!majorCoursesDropdown) {
    console.error('majorCoursesDropdown not found');
    return;
  }

  let profile;
  try {
    profile = JSON.parse(localStorage.getItem(LS_KEYS.PROFILE));
    console.log('Profile loaded:', profile);
  } catch (e) {
    console.error('Error parsing studentProfile:', e);
    showFeedback('Error loading profile. Please set your major in Profile.', 'error');
    majorCoursesDropdown.innerHTML = '<option value="">Error loading profile</option>';
    return;
  }

  majorCoursesDropdown.innerHTML = '';

  if (!profile || !profile.major) {
    majorCoursesDropdown.innerHTML = '<option value="">Please select a major in your profile</option>';
    showFeedback('No major selected. Visit Profile to set your major.', 'error');
    return;
  }

  // Normalize major to match coursesByMajor keys
  const majorMap = {
    'Computer Science': 'CS',
    'Engineering': 'Eng',
    'Business Administration': 'Business'
  };
  const normalizedMajor = majorMap[profile.major] || profile.major;
  console.log('Original major:', profile.major, 'Normalized major:', normalizedMajor);

  const courses = coursesByMajor[normalizedMajor] || [];
  console.log('Courses for major:', courses);

  if (courses.length === 0) {
    majorCoursesDropdown.innerHTML = '<option value="">No courses available for this major</option>';
    showFeedback(`No courses found for major: ${profile.major}. Please check your profile.`, 'error');
    return;
  }

  const fragment = document.createDocumentFragment();
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    fragment.appendChild(option);
  });
  majorCoursesDropdown.appendChild(fragment);
}

function loadSelectedCourses() {
  const selectableCourses = document.getElementById('selectableCourses');
  if (!selectableCourses) {
    console.error('selectableCourses not found');
    return;
  }

  let selectedCourses;
  try {
    selectedCourses = JSON.parse(localStorage.getItem(LS_KEYS.HELPFUL_COURSES)) || [];
    console.log('Selected courses:', selectedCourses);
  } catch (e) {
    console.error('Error parsing helpfulCourses:', e);
    showFeedback('Error loading selected courses.', 'error');
    return;
  }

  selectableCourses.innerHTML = '';

  if (selectedCourses.length === 0) {
    selectableCourses.innerHTML = '<li>No helpful courses selected yet.</li>';
    return;
  }

  const fragment = document.createDocumentFragment();
  selectedCourses.forEach(course => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.value = course;
    checkbox.name = 'helpfulCourses';
    checkbox.id = `course-${course.replace(/\s+/g, '-')}`;
    checkbox.addEventListener('change', () => {
      if (!checkbox.checked) {
        removeCourse(course);
      }
    });

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = ` ${course}`;

    li.appendChild(checkbox);
    li.appendChild(label);
    fragment.appendChild(li);
  });
  selectableCourses.appendChild(fragment);
}

function addManualCourse() {
  const manualCourseInput = document.getElementById('manualCourseInput');
  if (!manualCourseInput) {
    console.error('manualCourseInput not found');
    return;
  }

  const course = manualCourseInput.value.trim();
  
  if (!course) {
    showFeedback('Please enter a course name.', 'error');
    return;
  }

  let selectedCourses;
  try {
    selectedCourses = JSON.parse(localStorage.getItem(LS_KEYS.HELPFUL_COURSES)) || [];
  } catch (e) {
    console.error('Error parsing helpfulCourses:', e);
    showFeedback('Error accessing selected courses.', 'error');
    return;
  }

  if (selectedCourses.includes(course)) {
    showFeedback('This course is already added.', 'error');
    return;
  }

  selectedCourses.push(course);
  try {
    localStorage.setItem(LS_KEYS.HELPFUL_COURSES, JSON.stringify(selectedCourses));
  } catch (e) {
    console.error('Error saving helpfulCourses:', e);
    showFeedback('Error saving course.', 'error');
    return;
  }

  manualCourseInput.value = '';
  loadSelectedCourses();
  showFeedback('Course added successfully!', 'success');
}

function saveSelectedCourses() {
  const majorCoursesDropdown = document.getElementById('majorCoursesDropdown');
  if (!majorCoursesDropdown) {
    console.error('majorCoursesDropdown not found');
    return;
  }

  const selectedOptions = Array.from(majorCoursesDropdown.selectedOptions).map(opt => opt.value);
  if (selectedOptions.length === 0) {
    showFeedback('Please select at least one course.', 'error');
    return;
  }

  let currentCourses;
  try {
    currentCourses = JSON.parse(localStorage.getItem(LS_KEYS.HELPFUL_COURSES)) || [];
  } catch (e) {
    console.error('Error parsing helpfulCourses:', e);
    showFeedback('Error accessing selected courses.', 'error');
    return;
  }

  const updatedCourses = [...new Set([...currentCourses, ...selectedOptions])];
  try {
    localStorage.setItem(LS_KEYS.HELPFUL_COURSES, JSON.stringify(updatedCourses));
  } catch (e) {
    console.error('Error saving helpfulCourses:', e);
    showFeedback('Error saving courses.', 'error');
    return;
  }

  loadSelectedCourses();
  showFeedback('Helpful courses saved successfully!', 'success');
}

function removeCourse(course) {
  let selectedCourses;
  try {
    selectedCourses = JSON.parse(localStorage.getItem(LS_KEYS.HELPFUL_COURSES)) || [];
  } catch (e) {
    console.error('Error parsing helpfulCourses:', e);
    showFeedback('Error accessing selected courses.', 'error');
    return;
  }

  selectedCourses = selectedCourses.filter(c => c !== course);
  try {
    localStorage.setItem(LS_KEYS.HELPFUL_COURSES, JSON.stringify(selectedCourses));
  } catch (e) {
    console.error('Error saving helpfulCourses:', e);
    showFeedback('Error removing course.', 'error');
    return;
  }

  loadSelectedCourses();
  showFeedback('Course removed successfully!', 'success');
}

function showFeedback(message, type) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.textContent = message;
  
  // Change the class based on the message content
  if (message === 'Course removed successfully!') {
    feedbackDiv.className = `feedback error`;
  } else {
    feedbackDiv.className = `feedback ${type}`;
  }
  
  feedbackDiv.setAttribute('role', 'alert');
  document.body.appendChild(feedbackDiv);

  setTimeout(() => {
    feedbackDiv.classList.add('show');
  }, 100);

  feedbackDiv.addEventListener('click', () => {
    feedbackDiv.classList.remove('show');
    setTimeout(() => feedbackDiv.remove(), 300);
  });

  setTimeout(() => {
    feedbackDiv.classList.remove('show');
    setTimeout(() => feedbackDiv.remove(), 300);
  }, 5000);
}