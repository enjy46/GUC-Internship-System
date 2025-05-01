const internships = [
  {
    company: "Innovatech",
    title: "Frontend Developer Intern",
    duration: "3+ months",
    paid: true,
    salary: 1500,
    industry: "Tech",
    skills: ["HTML", "CSS", "JavaScript"],
    description: "Work on UI enhancements and responsive web design.",
  },
  {
    company: "FinanceCorp",
    title: "Accounting Intern",
    duration: "2 months",
    paid: false,
    salary: 0,
    industry: "Finance",
    skills: ["Excel", "Accounting Basics"],
    description: "Assist with financial reporting and data entry.",
  },
  {
    company: "HealthLife",
    title: "Medical Research Assistant",
    duration: "1 month",
    paid: true,
    salary: 1200,
    industry: "Healthcare",
    skills: ["Data Analysis", "Research Methods"],
    description: "Support ongoing clinical trials and research documentation.",
  }
];

const listContainer = document.getElementById("internshipList");
const searchInput = document.getElementById("searchTitle");
const industryFilter = document.getElementById("industryFilter");
const durationFilter = document.getElementById("durationFilter");
const paidFilter = document.getElementById("paidFilter");

function renderInternships(data) {
  listContainer.innerHTML = "";
  if (data.length === 0) {
    listContainer.innerHTML = "<p>No internships found.</p>";
    return;
  }

  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "internship-card";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Company:</strong> ${item.company}</p>
      <p><strong>Duration:</strong> ${item.duration}</p>
      <button onclick="viewInternship(${index})">View Details</button>
      <button onclick="applyToInternship(${index})">Apply</button>
    `;
    listContainer.appendChild(div);
  });
}

function viewInternship(index) {
  const i = internships[index];
  alert(`Internship Details:\n\nTitle: ${i.title}\nCompany: ${i.company}\nDuration: ${i.duration}\nPaid: ${i.paid ? "Yes" : "No"}\nSalary: ${i.paid ? i.salary + " EGP" : "Unpaid"}\nSkills: ${i.skills.join(", ")}\n\nDescription:\n${i.description}`);
}

function applyToInternship(index) {
  const internship = internships[index];
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");

  // Prevent duplicate applications
  const alreadyApplied = applications.some(app => app.internship.title === internship.title && app.internship.company === internship.company);
  if (alreadyApplied) {
    alert("You have already applied to this internship.");
    return;
  }

  const newApplication = {
    internship,
    status: "pending",
    documents: []
  };

  applications.push(newApplication);
  localStorage.setItem("applications", JSON.stringify(applications));

  alert("Application submitted! You can view it in your dashboard.");
}

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const industry = industryFilter.value;
  const duration = durationFilter.value;
  const paid = paidFilter.value;

  const filtered = internships.filter(i =>
    (i.title.toLowerCase().includes(search) || i.company.toLowerCase().includes(search)) &&
    (industry === "" || i.industry === industry) &&
    (duration === "" || i.duration === duration) &&
    (paid === "" || (paid === "paid" ? i.paid : !i.paid))
  );

  renderInternships(filtered);
}

searchInput.addEventListener("input", applyFilters);
industryFilter.addEventListener("change", applyFilters);
durationFilter.addEventListener("change", applyFilters);
paidFilter.addEventListener("change", applyFilters);

renderInternships(internships);
