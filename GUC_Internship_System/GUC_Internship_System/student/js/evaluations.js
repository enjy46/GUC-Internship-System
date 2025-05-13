document.addEventListener('DOMContentLoaded', function() {
  loadCompanies();
  loadEvaluation();

  const form = document.getElementById('companyEvaluationForm');
  if (form) {
    form.addEventListener('submit', submitEvaluation);
  }

  const editBtn = document.getElementById('editEvaluation');
  if (editBtn) {
    editBtn.addEventListener('click', editEvaluation);
  }

  const deleteBtn = document.getElementById('deleteEvaluation');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteEvaluation);
  }
});

function loadCompanies() {
  const companies = ['Tech Corp', 'Data Inc', 'Web Solutions', 'AI Innovations', 'Cloud Systems'];
  const companySelect = document.getElementById('companySelect');
  
  if (companySelect) {
    companies.forEach(company => {
      const option = document.createElement('option');
      option.value = company;
      option.textContent = company;
      companySelect.appendChild(option);
    });
  }
}

function loadEvaluation() {
  const evaluation = JSON.parse(localStorage.getItem('companyEvaluation'));
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationDisplay = document.getElementById('evaluationDisplay');
  const evaluationContent = document.getElementById('evaluationContent');

  if (evaluation && evaluationForm && evaluationDisplay && evaluationContent) {
    evaluationForm.style.display = 'none';
    evaluationDisplay.style.display = 'block';
    evaluationContent.innerHTML = `
      <p><strong>Company:</strong> ${evaluation.company}</p>
      <p><strong>Evaluation:</strong> ${evaluation.text}</p>
      <p><strong>Recommendation:</strong> ${evaluation.recommend ? 'Recommended' : 'Not recommended'}</p>
    `;
  } else if (evaluationForm && evaluationDisplay) {
    evaluationForm.style.display = 'block';
    evaluationDisplay.style.display = 'none';
  }
}

function submitEvaluation(e) {
  e.preventDefault();
  const company = document.getElementById('companySelect').value;
  const text = document.getElementById('evaluationText').value;
  const recommend = document.getElementById('recommendCompany').checked;

  const evaluation = { company, text, recommend };
  localStorage.setItem('companyEvaluation', JSON.stringify(evaluation));
  
  showFeedback('Evaluation submitted successfully!', 'success');
  loadEvaluation();
}

function editEvaluation() {
  const evaluation = JSON.parse(localStorage.getItem('companyEvaluation'));
  if (evaluation) {
    document.getElementById('companySelect').value = evaluation.company;
    document.getElementById('evaluationText').value = evaluation.text;
    document.getElementById('recommendCompany').checked = evaluation.recommend;

    document.getElementById('evaluationForm').style.display = 'block';
    document.getElementById('evaluationDisplay').style.display = 'none';
  }
}

function deleteEvaluation() {
  if (confirm('Are you sure you want to delete your evaluation?')) {
    localStorage.removeItem('companyEvaluation');
    showFeedback('Evaluation deleted successfully!', 'warning');
    loadEvaluation();
  }
}

function showFeedback(message, type) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.textContent = message;
  feedbackDiv.className = `feedback ${type}`;
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