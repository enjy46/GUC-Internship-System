document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const scoreInput = document.getElementById('score-input');
    const scoreDisplay = document.getElementById('score-display');
    const scoreVisibilityToggle = document.getElementById('score-visibility');
    const assessmentList = document.getElementById('assessment-list');
    const assessmentModal = document.getElementById('assessment-modal');
    const quizModal = document.getElementById('quiz-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Sample assessment data
    const assessments = [
        {
            id: 1,
            title: "Technical Skills Assessment",
            description: "Test your technical knowledge in programming, algorithms, and problem-solving.",
            duration: "60 minutes",
            questions: 30,
            difficulty: "Intermediate"
        },
        {
            id: 2,
            title: "Soft Skills Evaluation",
            description: "Evaluate your communication, teamwork, and leadership abilities.",
            duration: "45 minutes",
            questions: 25,
            difficulty: "Beginner"
        },
        {
            id: 3,
            title: "Industry Knowledge Test",
            description: "Test your understanding of industry trends, tools, and best practices.",
            duration: "90 minutes",
            questions: 40,
            difficulty: "Advanced"
        }
    ];

    // Sample quiz questions
    const quizQuestions = [
        {
            id: 1,
            question: 'What is the correct HTML element for the largest heading?',
            options: [
                { id: 'a', text: '<h1>' },
                { id: 'b', text: '<heading>' },
                { id: 'c', text: '<head>' },
                { id: 'd', text: '<h6>' }
            ],
            correctAnswer: 'a'
        },
        {
            id: 2,
            question: 'Which CSS property is used to change the text color?',
            options: [
                { id: 'a', text: 'text-color' },
                { id: 'b', text: 'color' },
                { id: 'c', text: 'font-color' },
                { id: 'd', text: 'text-style' }
            ],
            correctAnswer: 'b'
        }
    ];

    // Initialize the page
    function initializePage() {
        displayAssessments();
        setupEventListeners();
        loadUserScore();
    }

    // Display available assessments
    function displayAssessments() {
        assessmentList.innerHTML = assessments.map(assessment => `
            <div class="assessment-card">
                <h3>${assessment.title}</h3>
                <p>${assessment.description}</p>
                <div class="assessment-details">
                    <span><i class="fas fa-clock"></i> ${assessment.duration}</span>
                    <span><i class="fas fa-list-ol"></i> ${assessment.questions} Questions</span>
                    <span><i class="fas fa-signal"></i> ${assessment.difficulty}</span>
                </div>
                <button class="btn" onclick="window.startAssessment(${assessment.id})">Start Assessment</button>
            </div>
        `).join('');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Score visibility toggle
        scoreVisibilityToggle.addEventListener('change', function() {
            scoreDisplay.style.display = this.checked ? 'block' : 'none';
            saveScoreVisibility(this.checked);
        });

        // Close modal buttons
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.classList.add('hidden');
            });
        });

        // Score input form
        scoreInput.addEventListener('submit', function(e) {
            e.preventDefault();
            const score = this.querySelector('input[type="number"]').value;
            saveScore(score);
            updateScoreDisplay(score);
        });
    }

    // Load user's score from localStorage
    function loadUserScore() {
        const savedScore = localStorage.getItem('userScore');
        const isVisible = localStorage.getItem('scoreVisibility') === 'true';
        
        if (savedScore) {
            updateScoreDisplay(savedScore);
        }
        
        scoreVisibilityToggle.checked = isVisible;
        scoreDisplay.style.display = isVisible ? 'block' : 'none';
    }

    // Save score to localStorage
    function saveScore(score) {
        localStorage.setItem('userScore', score);
        showNotification('Score saved successfully!');
    }

    // Save score visibility preference
    function saveScoreVisibility(isVisible) {
        localStorage.setItem('scoreVisibility', isVisible);
    }

    // Update score display
    function updateScoreDisplay(score) {
        scoreDisplay.textContent = `Current Score: ${score}`;
    }

    // Start assessment
    window.startAssessment = function(id) {
        const assessment = assessments.find(a => a.id === id);
        if (!assessment) return;

        const modal = document.getElementById('assessment-modal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>${assessment.title}</h3>
                <button class="close-btn" onclick="window.closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>${assessment.description}</p>
                <div class="assessment-info">
                    <p><strong>Duration:</strong> ${assessment.duration}</p>
                    <p><strong>Questions:</strong> ${assessment.questions}</p>
                    <p><strong>Difficulty:</strong> ${assessment.difficulty}</p>
                </div>
                <div class="modal-actions">
                    <button class="btn" onclick="window.startQuiz(${assessment.id})">Begin Assessment</button>
                    <button class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    };

    // Close modal
    window.closeModal = function() {
        const modal = document.getElementById('assessment-modal');
        modal.classList.add('hidden');
    };

    // Start quiz
    window.startQuiz = function(id) {
        const assessment = assessments.find(a => a.id === id);
        if (!assessment) return;

        const modal = document.getElementById('quiz-modal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Sample quiz questions
        const questions = [
            {
                question: "What is the time complexity of binary search?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                correct: 1
            },
            {
                question: "Which of the following is not a programming paradigm?",
                options: ["Object-Oriented", "Functional", "Procedural", "Sequential"],
                correct: 3
            }
        ];

        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>${assessment.title}</h3>
                <button class="close-btn" onclick="window.closeQuiz()">&times;</button>
            </div>
            <div class="quiz-container">
                ${questions.map((q, index) => `
                    <div class="quiz-question">
                        <h4>Question ${index + 1}</h4>
                        <p>${q.question}</p>
                        <div class="quiz-options">
                            ${q.options.map((option, i) => `
                                <label class="quiz-option">
                                    <input type="radio" name="q${index}" value="${i}">
                                    ${option}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                <div class="quiz-actions">
                    <button class="btn" onclick="window.submitQuiz()">Submit Answers</button>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    };

    // Close quiz
    window.closeQuiz = function() {
        const modal = document.getElementById('quiz-modal');
        modal.classList.add('hidden');
    };

    // Submit quiz
    window.submitQuiz = function() {
        // Here you would typically calculate the score and show results
        alert('Quiz submitted! Your results will be available shortly.');
        window.closeQuiz();
    };

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize the page
    initializePage();
}); 