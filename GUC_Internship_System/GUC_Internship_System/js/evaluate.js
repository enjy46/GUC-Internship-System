const evaluationForm = document.getElementById('evaluationForm');
const evaluationText = document.getElementById('evaluationText');
const ratingInputs = document.getElementsByName('rating');
const evaluationsList = document.getElementById('evaluationItems');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
let evaluations = [];
let currentEvaluationIndex = null;

// Save Evaluation
evaluationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const rating = [...ratingInputs].find(input => input.checked)?.value;

  if (currentEvaluationIndex === null) {
    // Create new evaluation
    evaluations.push({ text: evaluationText.value, rating });
  } else {
    // Update existing evaluation
    evaluations[currentEvaluationIndex] = { text: evaluationText.value, rating };
    currentEvaluationIndex = null;
    saveBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
  }

  evaluationText.value = '';
  [...ratingInputs].forEach(input => (input.checked = false));
  renderEvaluations();
});

// Render Evaluations
function renderEvaluations() {
  evaluationsList.innerHTML = '';
  evaluations.forEach((evaluation, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>Evaluation:</strong> ${evaluation.text}</p>
      <p><strong>Rating:</strong> ${evaluation.rating}</p>
      <button onclick="editEvaluation(${index})">Edit</button>
      <button onclick="deleteEvaluation(${index})">Delete</button>
    `;
    evaluationsList.appendChild(li);
  });
}

// Edit Evaluation
window.editEvaluation = function (index) {
  const evaluation = evaluations[index];
  evaluationText.value = evaluation.text;
  [...ratingInputs].forEach(input => {
    input.checked = input.value === evaluation.rating;
  });

  currentEvaluationIndex = index;
  saveBtn.style.display = 'none';
  updateBtn.style.display = 'inline-block';
  deleteBtn.style.display = 'inline-block';
};

// Delete Evaluation
window.deleteEvaluation = function (index) {
  evaluations.splice(index, 1);
  renderEvaluations();
  evaluationText.value = '';
  [...ratingInputs].forEach(input => (input.checked = false));
  currentEvaluationIndex = null;
  saveBtn.style.display = 'inline-block';
  updateBtn.style.display = 'none';
  deleteBtn.style.display = 'none';
}
