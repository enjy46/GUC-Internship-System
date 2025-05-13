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

function loadCompanies() {
  const companies = ['Tech Corp', 'Data Inc', 'Web Solutions', 'AI Innovations', 'Cloud Systems'];
  const companySelect = document.getElementById('companySelect');
  
  if (companySelect) {
    companySelect.innerHTML = '<option value="">Choose a company</option>';
    companies.forEach(company => {
      const option = document.createElement('option');
      option.value = company;
      option.textContent = company;
      companySelect.appendChild(option);
    });
  } else {
    console.error('companySelect not found');
  }
}

function loadEvaluation() {
  const evaluation = JSON.parse(localStorage.getItem('companyEvaluation'));
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationDisplay = document.getElementById('evaluationDisplay');
  const evaluationContent = document.getElementById('evaluationContent');

  if (!evaluationForm || !evaluationDisplay || !evaluationContent) {
    console.error('Missing DOM elements:', {
      evaluationForm: !!evaluationForm,
      evaluationDisplay: !!evaluationDisplay,
      evaluationContent: !!evaluationContent
    });
    showFeedback('Error loading evaluation. Please refresh the page.', 'error');
    return;
  }

  if (evaluation) {
    evaluationForm.style.display = 'none';
    evaluationDisplay.style.display = 'block';
    evaluationContent.innerHTML = `
      <p><strong>Company:</strong> ${evaluation.company}</p>
      <p><strong>Evaluation:</strong> ${evaluation.text}</p>
      <p><strong>Recommendation:</strong> ${evaluation.recommend ? 'Recommended' : 'Not recommended'}</p>
    `;
    document.getElementById('editEvaluation').style.display = 'inline-block';
    document.getElementById('deleteEvaluation').style.display = 'inline-block';
  } else {
    evaluationForm.style.display = 'block';
    evaluationDisplay.style.display = 'none';
    document.getElementById('editEvaluation').style.display = 'none';
    document.getElementById('deleteEvaluation').style.display = 'none';
  }
}

function submitEvaluation(e) {
  e.preventDefault();
  const companySelect = document.getElementById('companySelect');
  const evaluationText = document.getElementById('evaluationText');
  const recommend = document.getElementById('recommendCompany');

  if (!companySelect || !evaluationText || !recommend) {
    showFeedback('Error loading form. Please refresh the page.', 'error');
    return;
  }

  const company = companySelect.value;
  const text = evaluationText.value.trim();
  const recommendChecked = recommend.checked;

  if (!company) {
    showFeedback('Please select a company.', 'error');
    return;
  }
  if (!text) {
    showFeedback('Please enter an evaluation.', 'error');
    return;
  }

  const evaluation = { company, text, recommend: recommendChecked };
  try {
    localStorage.setItem('companyEvaluation', JSON.stringify(evaluation));
  } catch (e) {
    console.error('Error saving evaluation:', e);
    showFeedback('Error saving evaluation.', 'error');
    return;
  }
  
  showFeedback('Evaluation submitted successfully!', 'success');
  loadEvaluation();
}

function editEvaluation() {
  const evaluation = JSON.parse(localStorage.getItem('companyEvaluation'));
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationDisplay = document.getElementById('evaluationDisplay');

  if (!evaluation || !evaluationForm || !evaluationDisplay) {
    showFeedback('Error loading evaluation. Please refresh the page.', 'error');
    return;
  }

  document.getElementById('companySelect').value = evaluation.company;
  document.getElementById('evaluationText').value = evaluation.text;
  document.getElementById('recommendCompany').checked = evaluation.recommend;

  evaluationForm.style.display = 'block';
  evaluationDisplay.style.display = 'none';
}

function deleteEvaluation() {
  if (confirm('Are you sure you want to delete your evaluation?')) {
    try {
      localStorage.removeItem('companyEvaluation');
    } catch (e) {
      console.error('Error deleting evaluation:', e);
      showFeedback('Error deleting evaluation.', 'error');
      return;
    }
    showFeedback('Evaluation deleted successfully!', 'error'); // Changed to 'error' for red color
    loadEvaluation();
  }
}

function showFeedback(message, type) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.textContent = message;
  feedbackDiv.className = `feedback ${type}`;
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