// Handle profile update form submission
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Fetch input values
    const interests = document.getElementById('interests').value.trim();
    const internships = document.getElementById('internships').value.trim();
    const activities = document.getElementById('activities').value.trim();
    const major = document.getElementById('majorSelect').value;
    const semester = document.getElementById('semesterSelect').value;
  
    // Save profile data in localStorage (for demo purposes)
    const profile = {
      interests,
      internships,
      activities,
      major,
      semester
    };
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  
    alert("Profile updated successfully!");
    populateSuggestions(interests);
  });
  
  // Load profile from localStorage if exists
  window.onload = function () {
    const profile = JSON.parse(localStorage.getItem('studentProfile'));
    if (profile) {
      document.getElementById('interests').value = profile.interests;
      document.getElementById('internships').value = profile.internships;
      document.getElementById('activities').value = profile.activities;
      document.getElementById('majorSelect').value = profile.major;
      document.getElementById('semesterSelect').value = profile.semester;
  
      populateSuggestions(profile.interests);
    }
  };
  
  // Dummy suggested companies
  const allSuggestions = [
    {
      name: "TechSpark",
      interest: "AI",
      industry: "Technology",
      recommendedBy: "Intern 2023"
    },
    {
      name: "MediSoft",
      interest: "Healthcare",
      industry: "Software",
      recommendedBy: "Intern 2024"
    },
    {
      name: "FinScope",
      interest: "Finance",
      industry: "Banking",
      recommendedBy: "Intern 2024"
    },
    {
      name: "EduWare",
      interest: "Education",
      industry: "EdTech",
      recommendedBy: "Intern 2023"
    }
  ];
  
  // Display filtered company suggestions based on interest
  function populateSuggestions(interest) {
    const list = document.getElementById('suggestedList');
    list.innerHTML = ""; // Clear previous suggestions
  
    const filtered = allSuggestions.filter(c => interest && c.interest.toLowerCase().includes(interest.toLowerCase()));
  
    if (filtered.length === 0) {
      list.innerHTML = "<li>No matching companies found. Try updating your interests.</li>";
    } else {
      filtered.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${c.name}</strong> - Industry: ${c.industry} <br><em>Recommended by: ${c.recommendedBy}</em>`;
        list.appendChild(li);
      });
    }
  }
  