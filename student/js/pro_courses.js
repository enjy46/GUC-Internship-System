document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');

  // Course data structure with 5 courses per semester
  const coursesBySemester = {
    "64": {
      title: "Winter 2024",
      courses: [
        { code: "INSY714", name: "IT Project Management", status: "Active" },
        { code: "CTRL606", name: "Taxation", status: "Active" },
        { code: "OPER602", name: "Operations II", status: "Active" },
        { code: "BINF609", name: "Enterprise System Applications", status: "Active" },
        { code: "CSEN603", name: "Software Engineering", status: "Active" }
      ]
    },
    "62": {
      title: "Spring 2024",
      courses: [
        { code: "FINC505", name: "Corporate Finance for Business Informatics", status: "Active" },
        { code: "CTRL505", name: "Auditing", status: "Active" },
        { code: "CSEN507", name: "Theory of Computation for BINF", status: "Active" },
        { code: "MGMT501", name: "Business Ethics", status: "Active" },
        { code: "BINF506", name: "Research Methodology for BINF", status: "Active" }
      ]
    },
    "61": {
      title: "Winter 2023",
      courses: [
        { code: "BINF405", name: "Information and Communication Architecture II", status: "Active" },
        { code: "HROB203", name: "Human Resources Management for BI", status: "Active" },
        { code: "CSEN401", name: "Computer Programming Lab", status: "Active" },
        { code: "BINF406", name: "Digital Transformation", status: "Active" },
        { code: "RPW401", name: "Research Paper Writing (A2)", status: "Active" }
      ]
    },
    "59": {
      title: "Spring 2023",
      courses: [
        { code: "CPS402", name: "Communication & Presentation Skills (A2)", status: "Active" },
        { code: "BINF302", name: "Enterprise Systems I", status: "Active" },
        { code: "CSIS301", name: "Data Structures & Algorithms", status: "Active" },
        { code: "BINF303", name: "Information & Communication Architecture I", status: "Active" },
        { code: "MATH305", name: "Mathematics for Business Informatics III", status: "Active" }
      ]
    },
    "58": {
      title: "Winter 2022",
      courses: [
        { code: "CSEN202", name: "Introduction to Computer Programming", status: "Active" },
        { code: "Math204", name: "Mathematics for business informatics II", status: "Active" },
        { code: "LAWS201", name: "Principles of Law", status: "Active" },
        { code: "DE202", name: "Basic German 2", status: "Active" },
        { code: "AS102", name: "English for Academic Purposes (A1)", status: "Active" }
      ]
    }
  };

  // Load saved selected courses from localStorage
  let selectedCourses = [];
  try {
    selectedCourses = JSON.parse(localStorage.getItem('helpfulCourses')) || [];
    console.log('Loaded selected courses:', selectedCourses);
  } catch (e) {
    console.error('Error loading saved courses:', e);
  }

  // Function to create a semester card
  function createSemesterCard(seasonId, seasonData) {
    console.log('Creating semester card for:', seasonId, seasonData);
    const card = document.createElement('div');
    card.className = 'semester-card';
    
    const header = document.createElement('div');
    header.className = 'semester-header';
    header.innerHTML = `<span class="semester-title">Season: ${seasonId} - ${seasonData.title}</span>`;
    
    const courseList = document.createElement('div');
    courseList.className = 'course-list';
    
    seasonData.courses.forEach(course => {
      const courseItem = document.createElement('div');
      courseItem.className = 'course-item';
      
      const isSelected = selectedCourses.includes(course.code);
      
      courseItem.innerHTML = `
        <input type="checkbox" class="course-checkbox" id="${course.code}" 
               ${isSelected ? 'checked' : ''}>
        <div class="course-info">
          <div class="course-code">${course.code}</div>
          <div class="course-name">${course.name}</div>
          <div class="course-status">${course.status}</div>
        </div>
      `;
      
      const checkbox = courseItem.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          if (!selectedCourses.includes(course.code)) {
            selectedCourses.push(course.code);
            console.log('Course selected:', course.code);
          }
        } else {
          selectedCourses = selectedCourses.filter(code => code !== course.code);
          console.log('Course deselected:', course.code);
        }
      });
      
      courseList.appendChild(courseItem);
    });
    
    card.appendChild(header);
    card.appendChild(courseList);
    return card;
  }

  // Initialize the page
  function initializePage() {
    console.log('Initializing page...');
    const semesterGrid = document.getElementById('semesterGrid');
    if (!semesterGrid) {
      console.error('Semester grid not found!');
      return;
    }

    // Clear existing content
    semesterGrid.innerHTML = '';
    console.log('Cleared semester grid');

    // Add semester cards in reverse chronological order
    const sortedSeasons = Object.keys(coursesBySemester).sort((a, b) => b - a);
    sortedSeasons.forEach(seasonId => {
      const card = createSemesterCard(seasonId, coursesBySemester[seasonId]);
      semesterGrid.appendChild(card);
      console.log('Added card for season:', seasonId);
    });
  }

  // Save selected courses
  window.saveSelectedCourses = function() {
    console.log('Saving courses:', selectedCourses);
    try {
      localStorage.setItem('helpfulCourses', JSON.stringify(selectedCourses));
      showFeedback('Courses saved successfully!', 'success');
      console.log('Courses saved successfully');
    } catch (e) {
      console.error('Error saving courses:', e);
      showFeedback('Error saving courses. Please try again.', 'error');
    }
  };

  // Feedback message function
  function showFeedback(message, type) {
    console.log('Showing feedback:', message, type);
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }

    const feedbackDiv = document.createElement('div');
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback ${type}`;
    document.body.appendChild(feedbackDiv);

    // Trigger reflow
    feedbackDiv.offsetHeight;

    // Show feedback
    feedbackDiv.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
      feedbackDiv.classList.remove('show');
      setTimeout(() => feedbackDiv.remove(), 300);
    }, 3000);
  }

  // Initialize the page
  initializePage();
});