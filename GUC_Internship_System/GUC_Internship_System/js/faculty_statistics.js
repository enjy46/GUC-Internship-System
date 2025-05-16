// Function to load and update statistics
function loadStatistics() {
    // Simulated data - replace with actual API calls
    const statistics = {
        totalStudents: 150,
        totalCompanies: 45,
        activeInternships: 80,
        completedInternships: 70,
        averageRating: 4.2,
        averageDuration: 45,
        totalEvaluations: 120,
        totalFeedback: 95
    };

    // Update real-time statistics
    document.getElementById('totalStudents').textContent = statistics.totalStudents;
    document.getElementById('totalCompanies').textContent = statistics.totalCompanies;
    document.getElementById('activeInternships').textContent = statistics.activeInternships;
    document.getElementById('completedInternships').textContent = statistics.completedInternships;

    // Update detailed statistics
    document.getElementById('averageRating').textContent = statistics.averageRating.toFixed(1);
    document.getElementById('averageDuration').textContent = `${statistics.averageDuration} days`;
    document.getElementById('totalEvaluations').textContent = statistics.totalEvaluations;
    document.getElementById('totalFeedback').textContent = statistics.totalFeedback;

    // Load major-wise statistics
    loadMajorStatistics('all');
}

// Function to load major-wise statistics
function loadMajorStatistics(major) {
    // Simulated data - replace with actual API calls
    const majorStats = {
        CS: { students: 50, internships: 30, rating: 4.3, companies: 20 },
        IS: { students: 40, internships: 25, rating: 4.1, companies: 15 },
        DS: { students: 35, internships: 20, rating: 4.4, companies: 12 },
        AI: { students: 25, internships: 15, rating: 4.5, companies: 10 }
    };

    let stats;
    if (major === 'all') {
        // Calculate averages for all majors
        stats = {
            students: Object.values(majorStats).reduce((sum, stat) => sum + stat.students, 0),
            internships: Object.values(majorStats).reduce((sum, stat) => sum + stat.internships, 0),
            rating: Object.values(majorStats).reduce((sum, stat) => sum + stat.rating, 0) / Object.keys(majorStats).length,
            companies: Object.values(majorStats).reduce((sum, stat) => sum + stat.companies, 0)
        };
    } else {
        stats = majorStats[major];
    }

    // Update major-wise statistics
    document.getElementById('majorStudents').textContent = stats.students;
    document.getElementById('majorInternships').textContent = stats.internships;
    document.getElementById('majorRating').textContent = stats.rating.toFixed(1);
    document.getElementById('majorCompanies').textContent = stats.companies;
}

// Function to generate PDF report
function generatePDFReport() {
    // Show loading state
    const button = document.querySelector('.btn-submit');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Report...';
    button.disabled = true;

    // Simulate API call - replace with actual PDF generation
    setTimeout(() => {
        // Reset button state
        button.innerHTML = originalText;
        button.disabled = false;

        // Show success message
        showNotification('Report generated successfully!', 'success');
    }, 2000);
}

// Function to show notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load initial statistics
    loadStatistics();

    // Add event listener for major filter
    document.getElementById('majorFilter').addEventListener('change', (e) => {
        loadMajorStatistics(e.target.value);
    });
}); 