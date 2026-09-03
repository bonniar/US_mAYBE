function go(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function confetti() {
    const symbols = ['❤️', '💕', '✨', '🌸', '💗'];
    for (let i = 0; i < 45; i++) {
        const s = document.createElement('span');
        s.className = 'confetti';
        s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        s.style.left = Math.random() * 100 + 'vw';
        s.style.animationDelay = Math.random() * 1.2 + 's';
        s.style.fontSize = (14 + Math.random() * 18) + 'px';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 4500);
    }
}

function sendWhatsApp(message) {
    const phone = '27780594548';
    window.location.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
}

// ============================================
// PAGE NAVIGATION FUNCTIONS
// ============================================

// From index.html → why.html
function goToWhy() {
    window.location.href = 'why.html';
}

// From why.html → heard.html
function goToHeard() {
    window.location.href = 'heard.html';
}

// From heard.html → chance.html
function goToChance() {
    window.location.href = 'chance.html';
}

// From respect.html → honesty.html
function goToHonesty() {
    window.location.href = 'honesty.html';
}

// From honesty.html → try.html
function goToTry() {
    window.location.href = 'try.html';
}

// From try.html → question.html
function goToQuestion() {
    window.location.href = 'question.html';
}

// ============================================
// HELPER FUNCTIONS FOR localStorage
// ============================================

function saveAnswers() {
    // Get existing answers from localStorage
    let answers = localStorage.getItem('userAnswers');
    if (answers) {
        answers = JSON.parse(answers);
    } else {
        answers = {
            relationship: '',
            finalDecision: '',
            weeks: ''
        };
    }
    localStorage.setItem('userAnswers', JSON.stringify(answers));
    return answers;
}

function getAnswers() {
    let answers = localStorage.getItem('userAnswers');
    if (answers) {
        return JSON.parse(answers);
    }
    return {
        relationship: '',
        finalDecision: '',
        weeks: ''
    };
}

function updateAnswerField(field, value) {
    let answers = getAnswers();
    answers[field] = value;
    localStorage.setItem('userAnswers', JSON.stringify(answers));
}

// ============================================
// CHANCE PAGE FUNCTIONS
// ============================================

function giveChance() {
    confetti();
    document.getElementById('chanceResponse').className = '';
    document.getElementById('chanceResponse').innerHTML = '<p><strong>That\'s all I wanted to hear. 😌❤️</strong><br>Now you get to choose how long you want us to genuinely give this a try.</p>';
    setTimeout(() => {
        const w = document.getElementById('weeksChoice');
        w.classList.remove('hidden');
        w.scrollIntoView({ behavior: 'smooth' });
    }, 900);
}

function sayNo() {
    const no = document.getElementById('noButton');
    const response = document.getElementById('chanceResponse');
    const clicks = Number(no.dataset.clicks || 0) + 1;
    no.dataset.clicks = clicks;

    if (clicks === 1) {
        response.className = '';
        response.innerHTML = '<p><strong>Come on 😭❤️</strong><br>Give us a chance first. I\'m not asking you to decide everything today.</p>';
    } else if (clicks === 2) {
        response.className = '';
        response.innerHTML = '<p><strong>I think you mistakenly clicked an invalid answer 😭😂</strong><br>Let me ask you again…</p><p class="quote"><strong>Can you give us a chance? ❤️</strong></p>';
    } else {
        response.className = '';
        response.innerHTML = '<p><strong>Since you don\'t want to… catch me 😌😭</strong><br>But I\'m asking you one last time — can we at least give us a chance?</p>';
    }

    if (clicks >= 2) {
        no.textContent = 'No 😭';
        no.style.position = 'relative';
        no.style.left = (Math.random() * 160 - 80) + 'px';
        no.style.top = (Math.random() * 80 - 40) + 'px';
    }
}

// ============================================
// WEEKS SELECTION
// ============================================

function chooseWeeks(weeks) {
    const weekText = weeks === 1 ? "week" : "weeks";
    const weekValue = weeks + " " + weekText;
    updateAnswerField('weeks', weekValue);
    
    // Redirect to respect.html
    window.location.href = 'respect.html';
}

// ============================================
// QUESTION PAGE FUNCTIONS
// ============================================

function yes() {
    confetti();
    updateAnswerField('finalDecision', "Yes, let's try ❤️");
    
    // Redirect to how.html
    window.location.href = 'how.html';
}

function needTime() {
    updateAnswerField('finalDecision', "I need more time to think ❤️");
    
    // Redirect to how.html
    window.location.href = 'how.html';
}

// ============================================
// HOW PAGE - Save relationship answer
// ============================================

function saveRelationshipAnswer() {
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('relationshipType');
            if (input && input.value.trim()) {
                updateAnswerField('relationship', input.value.trim());
                
                // Redirect to review.html
                window.location.href = 'review.html';
            } else {
                alert('Please type your answer before submitting.');
            }
        });
    }
}

// ============================================
// REVIEW PAGE FUNCTIONS
// ============================================

function loadReviewPage() {
    const answers = getAnswers();
    
    const reviewContent = document.getElementById('reviewContent');
    if (!reviewContent) return;
    
    let html = '';
    
    // Show relationship answer
    if (answers.relationship) {
        html += `
            <div style="background:#ffffff0b;padding:15px;border-radius:12px;margin-bottom:12px;text-align:left;">
                <p style="font-size:13px;color:#e9cbd2;margin:0 0 4px 0;">💭 What you want us to be:</p>
                <p style="font-size:18px;margin:0;"><strong>${answers.relationship}</strong></p>
                <button class="secondary" onclick="editAnswer('relationship')" style="padding:6px 14px;font-size:12px;margin-top:8px;">✏️ Edit</button>
            </div>
        `;
    }
    
    // Show weeks
    if (answers.weeks) {
        html += `
            <div style="background:#ffffff0b;padding:15px;border-radius:12px;margin-bottom:12px;text-align:left;">
                <p style="font-size:13px;color:#e9cbd2;margin:0 0 4px 0;">⏰ Time you're willing to try:</p>
                <p style="font-size:18px;margin:0;"><strong>${answers.weeks}</strong></p>
                <button class="secondary" onclick="editAnswer('weeks')" style="padding:6px 14px;font-size:12px;margin-top:8px;">✏️ Edit</button>
            </div>
        `;
    }
    
    // Show final decision
    if (answers.finalDecision) {
        html += `
            <div style="background:#ffffff0b;padding:15px;border-radius:12px;margin-bottom:12px;text-align:left;">
                <p style="font-size:13px;color:#e9cbd2;margin:0 0 4px 0;">💝 Your final decision:</p>
                <p style="font-size:18px;margin:0;"><strong>${answers.finalDecision}</strong></p>
                <button class="secondary" onclick="editAnswer('finalDecision')" style="padding:6px 14px;font-size:12px;margin-top:8px;">✏️ Edit</button>
            </div>
        `;
    }
    
    if (!html) {
        html = '<p style="color:#e9cbd2;">No answers found. Please go back and answer the questions first.</p>';
    }
    
    reviewContent.innerHTML = html;
}

function editAnswer(field) {
    const answers = getAnswers();
    const editFields = document.getElementById('editFields');
    editFields.classList.remove('hidden');
    
    const editRelationship = document.getElementById('editRelationship');
    const editWeeks = document.getElementById('editWeeks');
    const editFinalDecision = document.getElementById('editFinalDecision');
    
    // Reset borders
    editRelationship.style.borderColor = '#ffffff22';
    editWeeks.style.borderColor = '#ffffff22';
    editFinalDecision.style.borderColor = '#ffffff22';
    
    // Set values
    editRelationship.value = answers.relationship || '';
    editWeeks.value = answers.weeks || '';
    editFinalDecision.value = answers.finalDecision || '';
    
    // Highlight the field being edited
    if (field === 'relationship') {
        editRelationship.style.borderColor = '#ff6b81';
    } else if (field === 'weeks') {
        editWeeks.style.borderColor = '#ff6b81';
    } else if (field === 'finalDecision') {
        editFinalDecision.style.borderColor = '#ff6b81';
    }
    
    // Scroll to edit fields
    setTimeout(() => {
        editFields.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function updateAnswer() {
    const editRelationship = document.getElementById('editRelationship');
    const editWeeks = document.getElementById('editWeeks');
    const editFinalDecision = document.getElementById('editFinalDecision');
    
    // Update only if values are provided
    let answers = getAnswers();
    
    if (editRelationship.value.trim()) {
        answers.relationship = editRelationship.value.trim();
    }
    if (editWeeks.value.trim()) {
        answers.weeks = editWeeks.value.trim();
    }
    if (editFinalDecision.value.trim()) {
        answers.finalDecision = editFinalDecision.value.trim();
    }
    
    localStorage.setItem('userAnswers', JSON.stringify(answers));
    
    // Hide edit fields and reload
    document.getElementById('editFields').classList.add('hidden');
    loadReviewPage();
    confetti();
}

function sendAllToWhatsApp() {
    const answers = getAnswers();
    let message = "📋 *My Answers:*\n\n";
    
    if (answers.relationship) {
        message += "💭 What I want us to be:\n" + answers.relationship + "\n\n";
    }
    
    if (answers.weeks) {
        message += "⏰ Time I'm willing to try:\n" + answers.weeks + "\n\n";
    }
    
    if (answers.finalDecision) {
        message += "💝 My final decision:\n" + answers.finalDecision + "\n\n";
    }
    
    // If no answers, show a default message
    if (!answers.relationship && !answers.weeks && !answers.finalDecision) {
        message += "No answers have been recorded yet. Please go back and complete the questions first. ❤️\n\n";
    }
    
    message += "❤️ Sent with love 💕";
    
    sendWhatsApp(message);
}

// ============================================
// INITIALIZATION - Detect page and run appropriate functions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Load review page if on review.html
    if (currentPage === 'review.html') {
        loadReviewPage();
    }
    
    // Save relationship answer from how.html
    if (currentPage === 'how.html') {
        saveRelationshipAnswer();
    }
    
    // Initialize answers in localStorage if not present
    if (!localStorage.getItem('userAnswers')) {
        const defaultAnswers = {
            relationship: '',
            finalDecision: '',
            weeks: ''
        };
        localStorage.setItem('userAnswers', JSON.stringify(defaultAnswers));
    }
});