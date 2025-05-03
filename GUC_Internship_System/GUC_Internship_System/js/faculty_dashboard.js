// Function to download evaluations as a PDF
function downloadEvaluations() {
  const evaluations = JSON.parse(localStorage.getItem("evaluations")) || {};
  const content = Object.entries(evaluations).map(([name, evaluation]) => 
    `Name: ${name}\nEvaluation: ${evaluation}\n\n`
  ).join("");
  generatePDF("Evaluations", content);
}