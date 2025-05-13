function searchJobs() {
  const jobListContainer = document.getElementById("jobListContainer");
  const keyword = document.getElementById("jobSearchInput").value.toLowerCase();
  const location = document.getElementById("locationSearchInput").value.toLowerCase();

  // Mock job data
  const jobs = [
    {
      title: "Senior Cloud Infrastructure Engineer",
      company: "Arrow Electronics, Inc.",
      rating: 3.4,
      location: "Cairo, Egypt",
      description: "You will play a key role in cloud architecture, automation, and operational excellence. While AWS is the primary platform, experience with Azure is a strong plus."
    },
    {
      title: "Senior Data Intelligence Engineer",
      company: "Arrow Electronics, Inc.",
      rating: 3.4,
      location: "Cairo, Egypt",
      description: "The Senior Data Intelligence Engineer will be a key contributor to the Data Intelligence team, responsible for leading the analysis, visualization, and interpretation of complex data."
    }
  ];

  // Filter jobs based on keyword and location
  const filteredJobs = jobs.filter(job => {
    const matchesKeyword = job.title.toLowerCase().includes(keyword) || job.company.toLowerCase().includes(keyword);
    const matchesLocation = location === "" || job.location.toLowerCase().includes(location);
    return matchesKeyword && matchesLocation;
  });

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


