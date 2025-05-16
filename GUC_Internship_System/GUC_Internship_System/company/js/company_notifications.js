// Company Registration and Document Upload Notifications

// Function to send email notification
function sendEmailNotification(email, subject, message) {
    // In a real implementation, this would make an API call to your backend
    console.log('Sending email to:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    
    // Example of how the email would be structured
    const emailContent = {
        to: email,
        subject: subject,
        body: message
    };
    
    // Here you would typically make an API call to your backend
    // fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(emailContent)
    // });
}

// Function to handle company registration notification
function handleCompanyRegistration(companyData) {
    const { companyName, officialEmail } = companyData;
    
    const subject = 'Company Registration Confirmation - GUC Internship System';
    const message = `
        Dear ${companyName},
        
        Thank you for registering with the GUC Internship System. Your registration has been received and is being processed.
        
        We will review your submitted documents and get back to you shortly.
        
        Best regards,
        GUC Internship System Team
    `;
    
    sendEmailNotification(officialEmail, subject, message);
}

// Function to handle document upload notification
function handleDocumentUpload(companyData) {
    const { companyName, officialEmail } = companyData;
    
    const subject = 'Documents Received - GUC Internship System';
    const message = `
        Dear ${companyName},
        
        We have received your uploaded documents. Our team will review them and update your registration status accordingly.
        
        You will receive another notification once the review is complete.
        
        Best regards,
        GUC Internship System Team
    `;
    
    sendEmailNotification(officialEmail, subject, message);
}

// Function to handle registration approval notification
function handleRegistrationApproval(companyData) {
    const { companyName, officialEmail } = companyData;
    
    const subject = 'Registration Approved - GUC Internship System';
    const message = `
        Dear ${companyName},
        
        Congratulations! Your company registration has been approved.
        
        You can now:
        1. Post internship opportunities
        2. Review student applications
        3. Manage your internship program
        
        Log in to your account to get started.
        
        Best regards,
        GUC Internship System Team
    `;
    
    sendEmailNotification(officialEmail, subject, message);
}

// Function to handle registration rejection notification
function handleRegistrationRejection(companyData, reason) {
    const { companyName, officialEmail } = companyData;
    
    const subject = 'Registration Update - GUC Internship System';
    const message = `
        Dear ${companyName},
        
        We regret to inform you that your registration could not be approved at this time.
        
        Reason: ${reason}
        
        Please review the requirements and submit a new registration if you wish to try again.
        
        Best regards,
        GUC Internship System Team
    `;
    
    sendEmailNotification(officialEmail, subject, message);
}

// Export functions for use in other files
export {
    handleCompanyRegistration,
    handleDocumentUpload,
    handleRegistrationApproval,
    handleRegistrationRejection
}; 