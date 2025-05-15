// Mock internship data
const internships = [
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

// Function to render job cards
function renderJobs(filteredJobs) {
  const jobListContainer = document.getElementById("jobListContainer");

  // Clear previous results
  jobListContainer.innerHTML = "";

  if (filteredJobs.length === 0) {
    jobListContainer.innerHTML = "<p>No jobs found matching your criteria.</p>";
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
    company.textContent = job.company;
    jobCard.appendChild(company);

    const rating = document.createElement("span");
    rating.className = "rating";
    rating.textContent = `${job.rating} ★`;
    company.appendChild(rating);

    const location = document.createElement("div");
    location.className = "location";
    location.textContent = job.location;
    jobCard.appendChild(location);

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = job.description;
    jobCard.appendChild(description);

    jobListContainer.appendChild(jobCard);
  });
}

// Function to search jobs
function searchJobs() {
  const keyword = document.getElementById("jobSearchInput").value.toLowerCase();
  const location = document.getElementById("locationSearchInput").value.toLowerCase();

  // Filter jobs based on keyword and location
  const filteredJobs = internships.filter(job => {
    const matchesKeyword = job.title.toLowerCase().includes(keyword) || job.company.toLowerCase().includes(keyword);
    const matchesLocation = location === "" || job.location.toLowerCase().includes(location);
    return matchesKeyword && matchesLocation;
  });

  // Call the render function to update the displayed jobs
  renderJobs(filteredJobs);
}

// Render the jobs initially when the page loads
window.onload = function() {
  renderJobs(internships);  // Call this to display the internship data initially
}
