/* =============================================
   CHETAN EARTH MOVERS - JAVASCRIPT
   Interactive functionality and form handling
   ============================================= */

// =============================================
// DOM READY - Initialize when page loads
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeForm();
    initializeScrollAnimations();
    console.log('Chetan Earth Movers website loaded successfully');
});

// =============================================
// MOBILE MENU TOGGLE
// =============================================

function initializeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = event.target.closest('.navbar');
            if (!isClickInside) {
                navMenu.classList.remove('active');
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// =============================================
// CONTACT FORM HANDLING
// =============================================

function initializeForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const projectType = document.getElementById('projectType')?.value || '';
            const projectDetails = document.getElementById('projectDetails')?.value || '';

            // Validate required fields
            if (!fullName) {
                showFormMessage('Please enter your full name', 'error');
                return;
            }

            if (!phone) {
                showFormMessage('Please enter your phone number', 'error');
                return;
            }

            if (!projectType) {
                showFormMessage('Please select a project type', 'error');
                return;
            }

            if (!projectDetails) {
                showFormMessage('Please enter project details', 'error');
                return;
            }

            // Validate email if provided
            if (email && !isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // All validation passed
            const formData = {
                fullName: fullName,
                email: email,
                phone: phone,
                projectType: projectType,
                projectDetails: projectDetails,
                timestamp: new Date().toLocaleString(),
                userAgent: navigator.userAgent
            };

            // Save to localStorage
            saveFormData(formData);

            // Show success message
            showFormMessage('Thank you! We have received your message. We will contact you shortly.', 'success');

            // Reset form
            form.reset();

            // Scroll to message
            setTimeout(() => {
                document.getElementById('formMessage')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }
}

// =============================================
// EMAIL VALIDATION
// =============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =============================================
// DISPLAY FORM MESSAGE
// =============================================

function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'form-message ' + type;
        
        // Auto-hide error after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                messageElement.className = 'form-message';
            }, 5000);
        }
    }
}

// =============================================
// SAVE FORM DATA TO LOCALSTORAGE
// =============================================

function saveFormData(data) {
    try {
        // Get existing submissions
        let submissions = JSON.parse(localStorage.getItem('chetanFormSubmissions')) || [];
        
        // Add new submission
        submissions.push(data);
        
        // Save back to localStorage
        localStorage.setItem('chetanFormSubmissions', JSON.stringify(submissions));
        
        console.log('Form submission saved. Total submissions:', submissions.length);
    } catch (e) {
        console.log('LocalStorage not available, but form was processed');
    }
}

// =============================================
// SCROLL ANIMATIONS
// =============================================

function initializeScrollAnimations() {
    const elements = document.querySelectorAll(
        '.project-card, .value-card, .equipment-card, .client-card, .contact-card, ' +
        '.service-item, .why-card, .location-card, .highlight-box'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// =============================================
// PHONE NUMBER FORMATTING
// =============================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        // Format as +91 XXXXX XXXXX
        if (value.length > 0) {
            if (value.length <= 2) {
                this.value = '+91 ' + value;
            } else if (value.length <= 7) {
                this.value = '+91 ' + value.slice(0, 5) + ' ' + value.slice(5);
            } else {
                this.value = '+91 ' + value.slice(0, 5) + ' ' + value.slice(5, 10);
            }
        }
    });
}

// =============================================
// SMOOTH SCROLL ANCHOR LINKS
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTER
// =============================================

window.addEventListener('load', function() {
    updateActiveNav();
});

window.addEventListener('scroll', function() {
    updateActiveNav();
});

function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// =============================================
// VIEW FORM SUBMISSIONS (For debugging)
// =============================================

function viewFormSubmissions() {
    try {
        const submissions = JSON.parse(localStorage.getItem('chetanFormSubmissions')) || [];
        console.table(submissions);
        return submissions;
    } catch (e) {
        console.log('Error retrieving submissions:', e);
        return [];
    }
}

// =============================================
// EXPORT FORM SUBMISSIONS AS CSV
// =============================================

function exportFormSubmissions() {
    try {
        const submissions = JSON.parse(localStorage.getItem('chetanFormSubmissions')) || [];
        
        if (submissions.length === 0) {
            alert('No form submissions to export');
            return;
        }

        // Create CSV header
        const headers = Object.keys(submissions[0]);
        let csv = headers.join(',') + '\n';

        // Add data rows
        submissions.forEach(submission => {
            const values = headers.map(header => {
                let value = submission[header] || '';
                // Escape quotes in CSV
                value = String(value).replace(/"/g, '""');
                // Wrap in quotes if contains comma
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = '"' + value + '"';
                }
                return value;
            });
            csv += values.join(',') + '\n';
        });

        // Download CSV
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', 'chetan_form_submissions_' + new Date().toISOString().slice(0, 10) + '.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        console.log('Exported ' + submissions.length + ' submissions');
    } catch (e) {
        console.error('Error exporting submissions:', e);
    }
}

// =============================================
// CLEAR FORM SUBMISSIONS (Use with caution)
// =============================================

function clearFormSubmissions() {
    if (confirm('Are you sure you want to clear all form submissions? This cannot be undone.')) {
        try {
            localStorage.removeItem('chetanFormSubmissions');
            console.log('All form submissions cleared');
        } catch (e) {
            console.error('Error clearing submissions:', e);
        }
    }
}

// =============================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// =============================================

window.viewFormSubmissions = viewFormSubmissions;
window.exportFormSubmissions = exportFormSubmissions;
window.clearFormSubmissions = clearFormSubmissions;

// =============================================
// PAGE LOAD COMPLETION
// =============================================

console.log('%cChetan Earth Movers', 'color: #6B5344; font-size: 18px; font-weight: bold;');
console.log('%cEarth Moving & Excavation Contractors', 'color: #FF8C42; font-size: 14px;');
console.log('%cBangalore, Karnataka | Since 1999', 'color: #333; font-size: 12px;');
console.log('%cTo view form submissions, run: viewFormSubmissions()', 'color: #666; font-size: 11px; font-style: italic;');
console.log('%cTo export submissions as CSV, run: exportFormSubmissions()', 'color: #666; font-size: 11px; font-style: italic;');
