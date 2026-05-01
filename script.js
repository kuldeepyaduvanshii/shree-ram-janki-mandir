// ============================================
// Initialize on Page Load
// ============================================
window.addEventListener('load', () => {
    createParticles();
    playShankhSound();
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 30,
            disable: false
        });
    }
});
// ============================================
// Dark Mode Toggle
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ============================================
// Mobile Menu with Overlay - Portfolio Style
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

let scrollPosition = 0;

function openMenu() {
    scrollPosition = window.scrollY;
    
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    overlay.classList.add('active');
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.classList.add('menu-open');
    
    navMenu.scrollTop = 0;
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('menu-open');
    
    window.scrollTo(0, scrollPosition);
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open')) {
            if (!navMenu.contains(e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}
// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    });
}

// ============================================
// Back to Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offset = 75;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============================================
// Active Nav Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` ||
            (current === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ============================================
// Particle Effect
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.35 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 8 + 8}s ${Math.random() * 4}s infinite ease-in-out;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

const particleKeyframes = document.createElement('style');
particleKeyframes.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(12px, -20px) scale(1.4); opacity: 0.6; }
        50% { transform: translate(-6px, -35px) scale(1); opacity: 0.3; }
        75% { transform: translate(-16px, -12px) scale(1.2); opacity: 0.5; }
    }
`;
document.head.appendChild(particleKeyframes);

// ============================================
// Shankh Sound on First Visit
// ============================================
function playShankhSound() {
    if (sessionStorage.getItem('shankhPlayed')) return;
    
    const shankhAudio = new Audio('shankh.mp3');
    shankhAudio.volume = 0.5; // 50% - better user experience
    
    shankhAudio.play().then(() => {
        console.log('🕉️ शंख ध्वनि - जय श्री राम!');
        sessionStorage.setItem('shankhPlayed', 'true');
    }).catch(() => {
        function playOnInteraction() {
            shankhAudio.play();
            sessionStorage.setItem('shankhPlayed', 'true');
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        }
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    });
}

// ============================================
// Console Welcome
// ============================================
console.log(`
    🕉️ श्री राम जानकी मंदिर 🕉️
    खेड़ी, खण्डवा (म.प्र.)
    
    जय श्री राम! 🚩
`);











// ============================================
// Gallery Lightbox
// ============================================
function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightbox.classList.add('active');
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox on click outside image
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});


// ============================================
// Image Protection
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const protectedImages = document.querySelectorAll('.gallery-photo-card img, .gallery-featured-card img, .gallery-stack-card img');
    
    protectedImages.forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });
});




// Phone OTP
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let currentVerificationId = '';

window.showPhoneLogin = function() {
    document.getElementById('phoneLogin').style.display = 'block';
    document.getElementById('loginBtn').parentElement.style.display = 'none';
};

// Recaptcha setup
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sendOtpBtn', {
    size: 'invisible',
    callback: () => {}
});

window.sendOTP = function() {
    const phone = '+91' + document.getElementById('phoneNumber').value;
    const status = document.getElementById('otpStatus');
    
    if (phone.length !== 13) {
        status.style.display = 'block';
        status.style.color = '#EF4444';
        status.textContent = '❌ 10 अंकों का नंबर डालें';
        return;
    }
    
    status.style.display = 'block';
    status.style.color = '#F59E0B';
    status.textContent = '⏳ OTP भेजा जा रहा है...';
    document.getElementById('sendOtpBtn').disabled = true;
    
    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
        .then(result => {
            currentVerificationId = result.verificationId;
            document.getElementById('otpSection').style.display = 'block';
            document.getElementById('sendOtpBtn').style.display = 'none';
            status.style.color = '#22C55E';
            status.textContent = '✅ OTP भेज दिया गया!';
        })
        .catch(error => {
            status.style.color = '#EF4444';
            status.textContent = '❌ ' + error.message;
            document.getElementById('sendOtpBtn').disabled = false;
        });
};

window.verifyOTP = function() {
    const otp = document.getElementById('otpCode').value;
    const status = document.getElementById('otpStatus');
    const credential = PhoneAuthProvider.credential(currentVerificationId, otp);
    
    signInWithCredential(auth, credential)
        .then(() => {
            status.style.color = '#22C55E';
            status.textContent = '🎉 लॉगिन सफल!';
        })
        .catch(() => {
            status.style.color = '#EF4444';
            status.textContent = '❌ गलत OTP';
        });
};
