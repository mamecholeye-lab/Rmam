// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Date Filter for Predictions
const dateButtons = document.querySelectorAll('.date-btn');
dateButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        dateButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you would typically filter predictions based on date
        // For demo, we'll just show a message
        console.log(`Showing predictions for: ${button.textContent}`);
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.email || !data.phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success message
            alert('Subscription request sent successfully! We will contact you within 30 minutes with payment details.');
            
            // Reset form
            this.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log data (in real app, send to server)
            console.log('Subscription Data:', data);
            
            // Here you would typically send the data to your email
            // For now, we'll log it and show success message
            const emailBody = `New Subscription Request:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Package: ${data.package}
Message: ${data.message || 'N/A'}`;
            
            console.log('Email would be sent to: mamecholeye@gmail.com');
            console.log('Email content:', emailBody);
            
        }, 1500);
    });
}

// Update Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// View Analysis Button Click
document.querySelectorAll('.analysis-btn').forEach(button => {
    button.addEventListener('click', function() {
        const matchCard = this.closest('.match-card');
        const teams = matchCard.querySelector('.teams').textContent;
        
        alert(`Detailed analysis for ${teams} would be shown here. This feature is available for premium subscribers.`);
    });
});

// Real-time Results Update (Simulated)
function updateResults() {
    const results = [
        { status: 'won', match: 'Liverpool vs Everton', prediction: '1 & Over 2.5', odds: '2.10', result: '3-1' },
        { status: 'won', match: 'Bayern vs Dortmund', prediction: 'GG', odds: '1.85', result: '2-2' },
        { status: 'lost', match: 'Atletico vs Sevilla', prediction: '1X', odds: '1.50', result: '0-1' }
    ];
    
    // In a real app, you would fetch from an API
    console.log('Results would be updated from server');
}

// Initialize some features on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add current date to results
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
    
    // Update today's date in results table
    document.querySelectorAll('.table-row:not(.table-header)').forEach((row, index) => {
        if (index === 0) {
            row.children[0].textContent = 'Today';
        } else if (index === 1) {
            row.children[0].textContent = 'Yesterday';
        }
    });
    
    // Initialize with first date button active
    dateButtons[0].classList.add('active');
    
    // Add animation to stats on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.stat-box, .package-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    /* Make sure elements start hidden */
    .stat-box,
    .package-card,
    .contact-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);

