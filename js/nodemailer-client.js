/**
 * Radiance Hair & Skin Clinic - Nodemailer Client
 * Frontend JavaScript to connect with Nodemailer backend
 */

// Contact form handler
function sendContactEmail() {
    const name = document.getElementById('txtname').value.trim();
    const email = document.getElementById('txtemail').value.trim();
    const phone = document.getElementById('txtphone').value.trim();
    const message = document.getElementById('txtmessage').value.trim();

    // Validate required fields
    if (!name || !email || !message) {
        showMessage('error', 'Please fill in all required fields (Name, Email, and Message)');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Please enter a valid email address');
        return false;
    }

    // Show loading state
    const submitBtn = document.getElementById('sendEmailBtn') || document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> SENDING...';
    submitBtn.disabled = true;

    // Send to backend (works with both local server and Netlify functions)
    fetch('https://radiance-hair-skin-clinic.onrender.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('success', data.message);
                document.getElementById('contactForm').reset();
            } else {
                showMessage('error', data.message || 'Failed to send email');
            }
        })
        .catch(error => {
            console.error('Email sending error:', error);
            showMessage('error', 'Sorry, there was an error sending your message. Please check your internet connection and try again.');
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });

    return false;
}

// Newsletter subscription handler
function sendNewsletterEmail(email) {
    if (!email) {
        showMessage('error', 'Please enter your email address');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Please enter a valid email address');
        return false;
    }

    // Show loading state
    const submitBtn = event.target;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> SUBSCRIBING...';
    submitBtn.disabled = true;

    // Send to Nodemailer backend
    fetch('https://radiance-hair-skin-clinic.onrender.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('success', data.message);
                const emailInput = submitBtn.closest('form').querySelector('.newsletter-email');
                if (emailInput) emailInput.value = '';
            } else {
                showMessage('error', data.message || 'Failed to subscribe');
            }
        })
        .catch(error => {
            console.error('Newsletter subscription error:', error);
            showMessage('error', 'Sorry, there was an error processing your subscription. Please try again later.');
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });

    return false;
}

// Message display function
function showMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.nodemailer-message');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `nodemailer-message alert alert-${type === 'success' ? 'success' : 'danger'}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 400px;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
        font-family: Arial, sans-serif;
    `;

    // Set colors based on type
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '2px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '2px solid #f5c6cb';
    }

    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
                <i class="fa fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" style="margin-right: 8px;"></i>
                ${message}
            </div>
            <button type="button" class="close" style="background: none; border: none; font-size: 18px; cursor: pointer; margin-left: 10px; color: inherit;">&times;</button>
        </div>
    `;

    // Add close functionality
    messageDiv.querySelector('.close').onclick = function () {
        messageDiv.remove();
    };

    // Add to page
    document.body.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize contact form
document.addEventListener('DOMContentLoaded', function () {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            sendContactEmail();
        });
    }

    // Newsletter form submissions
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = form.querySelector('.newsletter-email');
            if (emailInput) {
                sendNewsletterEmail(emailInput.value);
            }
        });
    });

    // Newsletter button clicks
    const newsletterBtns = document.querySelectorAll('.newsletter-btn');
    newsletterBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const form = btn.closest('form');
            const emailInput = form.querySelector('.newsletter-email');
            if (emailInput) {
                sendNewsletterEmail(emailInput.value);
            }
        });
    });
});

// Override existing functions if they exist
window.sendSimpleEmail = sendContactEmail;
window.sendNewsletterSubscription = sendNewsletterEmail;
