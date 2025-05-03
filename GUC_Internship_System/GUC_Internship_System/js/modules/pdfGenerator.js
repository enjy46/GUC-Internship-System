// Function to generate and download a PDF
function generatePDF(title, content) {
  const { jsPDF } = window.jspdf; // Access jsPDF from the library
  const doc = new jsPDF();

  // Add title to the PDF
  doc.setFontSize(16);
  doc.text(title, 10, 10);

  // Add content to the PDF
  doc.setFontSize(12);
  doc.text(content, 10, 20, { maxWidth: 180 });

  // Save the PDF
  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}