// Load suggested jobs when the page loads
window.onload = function() {
  loadSuggestedJobs();
};

function loadSuggestedJobs() {
  const jobListContainer = document.getElementById("jobListContainer");
  const studentProfile = JSON.parse(localStorage.getItem("studentProfile")) || {};
  
  // Mock job data with match reasons
  const jobs = [
    {
      title: "Software Development Intern",
      company: "Microsoft",
      rating: 4.5,
      location: "Cairo, Egypt",
      description: "Join our team to work on cutting-edge software development projects. Gain hands-on experience with modern technologies and best practices.",
      matchReason: "Matches your Computer Science major and software development interests"
    },
    {
      title: "Data Science Intern",
      company: "IBM",
      rating: 4.2,
      location: "Cairo, Egypt",
      description: "Work on real-world data science projects, including machine learning and data analysis. Perfect for students interested in AI and data.",
      matchReason: "Based on your previous data analysis activities"
    },
    {
      title: "Web Development Intern",
      company: "Google",
      rating: 4.8,
      location: "Cairo, Egypt",
      description: "Develop and maintain web applications using modern frameworks. Learn from experienced developers in a collaborative environment.",
      matchReason: "Matches your software development interests"
    },
    {
      title: "Business Intelligence Intern",
      company: "Oracle",
      rating: 4.0,
      location: "Cairo, Egypt",
      description: "Work with business intelligence tools and help create data-driven solutions for enterprise clients.",
      matchReason: "Combines your technical skills with business interests"
    }
  ];

  // Filter and sort jobs based on student profile
  const filteredJobs = jobs.filter(job => {
    const interests = studentProfile.interests.toLowerCase();
    return job.title.toLowerCase().includes(interests) || 
           job.description.toLowerCase().includes(interests);
  });

  // Clear previous results
  jobListContainer.innerHTML = "";

  if (filteredJobs.length === 0) {
    jobListContainer.innerHTML = `
      <div class="job-card">
        <p>Complete your profile to get personalized job suggestions!</p>
      </div>
    `;
    return;
  }

  // Render job cards
  filteredJobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

    const title = document.createElement("h3");
    title.textContent = job.title;
    jobCard.appendChild(title);

    const company = document.createElement("div");
    company.className = "company";
    company.innerHTML = `
      <i class="fas fa-building"></i>
      ${job.company}
      <span class="rating">${job.rating} ★</span>
    `;
    jobCard.appendChild(company);

    const location = document.createElement("div");
    location.className = "location";
    location.innerHTML = `
      <i class="fas fa-map-marker-alt"></i>
      ${job.location}
    `;
    jobCard.appendChild(location);

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = job.description;
    jobCard.appendChild(description);

    const matchReason = document.createElement("div");
    matchReason.className = "match-reason";
    matchReason.innerHTML = `
      <i class="fas fa-check-circle"></i>
      ${job.matchReason}
    `;
    jobCard.appendChild(matchReason);

    jobListContainer.appendChild(jobCard);
  });
}

// Mock data for internships
const internships = [
  {
    title: "Software Development Intern",
    company: "Microsoft",
    rating: 4.5,
    location: "Cairo, Egypt",
    description: "Join our team to work on cutting-edge software development projects. Gain hands-on experience with modern technologies and best practices."
  },
  {
    title: "Data Science Intern",
    company: "IBM",
    rating: 4.2,
    location: "Cairo, Egypt",
    description: "Work on real-world data science projects, including machine learning and data analysis. Perfect for students interested in AI and data."
  },
  {
    title: "Web Development Intern",
    company: "Google",
    rating: 4.8,
    location: "Cairo, Egypt",
    description: "Develop and maintain web applications using modern frameworks. Learn from experienced developers in a collaborative environment."
  },
  {
    title: "Business Intelligence Intern",
    company: "Oracle",
    rating: 4.0,
    location: "Cairo, Egypt",
    description: "Work with business intelligence tools and help create data-driven solutions for enterprise clients."
  }
];

// Function to render job cards
function renderJobs() {
  const jobListContainer = document.getElementById('jobListContainer');
  if (!jobListContainer) {
    console.error('Could not find jobListContainer element');
    return;
  }

  // Clear existing content
  jobListContainer.innerHTML = '';

  // Add each job card
  internships.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <div class="company">
        <span>${job.company}</span>
        <span class="rating">${job.rating} ★</span>
      </div>
      <div class="location">
        <span>${job.location}</span>
      </div>
      <p class="description">${job.description}</p>
    `;
    jobListContainer.appendChild(jobCard);
  });
}

// Initialize jobs when the page loads
window.onload = function() {
  console.log('Page loaded, rendering jobs...');
  renderJobs();
}; 