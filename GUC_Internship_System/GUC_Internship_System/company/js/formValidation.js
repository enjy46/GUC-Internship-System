import { handleCompanyRegistration, handleDocumentUpload } from './company_notifications.js';

document.getElementById('companyRegisterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const companyName = document.getElementById('companyName').value;
    const email = document.getElementById('officialEmail').value;
    const logo = document.getElementById('companyLogo').files[0];
    const docs = document.getElementById('documents').files;

    // Check if company logo is uploaded
    if (!logo) {
        alert("Please upload a company logo.");
        return;
    }

    // Ensure at least one document is uploaded
    if (docs.length === 0) {
        alert("Please upload proof documents.");
        return;
    }

    // Very basic email check
    if (!email.includes('@')) {
        alert("Please enter a valid email.");
        return;
    }

    // If all validations pass, send notifications
    const companyData = {
        companyName: companyName,
        officialEmail: email
    };

    // Send registration confirmation
    handleCompanyRegistration(companyData);
    
    // Send document upload confirmation
    handleDocumentUpload(companyData);

    // Store company data in localStorage
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    companies.push({
        name: companyName,
        email: email,
        status: 'pending',
        registrationDate: new Date().toISOString()
    });
    localStorage.setItem('companies', JSON.stringify(companies));

    // Show success message
    alert('Registration successful! Please check your email for confirmation.');
    
    // Reset form
    this.reset();
});
