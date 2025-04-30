document.getElementById('companyRegisterForm').addEventListener('submit', function(e) {
    const email = document.getElementById('officialEmail').value;
    const logo = document.getElementById('companyLogo').files[0];
    const docs = document.getElementById('documents').files;

    // Check if company logo is uploaded
    if (!logo) {
        alert("Please upload a company logo.");
        e.preventDefault(); // Prevent form submission
        return;
    }

    // Ensure at least one document is uploaded
    if (docs.length === 0) {
        alert("Please upload proof documents.");
        e.preventDefault();
        return;
    }

    // Very basic email check
    if (!email.includes('@')) {
        alert("Please enter a valid email.");
        e.preventDefault();
    }
});
