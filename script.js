// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
} else {
    const systemPrefersDark = prefersDarkScheme.matches;
    document.body.classList.toggle('dark-mode', systemPrefersDark);
    updateThemeIcon(systemPrefersDark);
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Scroll Progress Bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
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

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const hamburgerIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = ['Adarsh Tiwari', 'a Developer', 'a Devops Engineer', 'a Mentor', 'a Problem Solver'];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 800);
            return;
        }
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
            return;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        typeWriter();
    }, 500);
});

// Particle.js
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#3b82f6' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Stats Counter
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    
    stats.forEach(stat => {
        const targetValue = stat.getAttribute('data-target');
        if (!targetValue) return;
        
        const target = parseInt(targetValue);
        let current = 0;
        const increment = target / 50;
        const isLargeNumber = target > 1000;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                
                if (isLargeNumber) {
                    if (current >= 1000 && current < 1000000) {
                        stat.innerText = Math.floor(current / 1000) + 'K+';
                    } else if (current >= 1000000) {
                        stat.innerText = Math.floor(current / 1000000) + 'M+';
                    } else {
                        stat.innerText = Math.floor(current) + '+';
                    }
                } else {
                    stat.innerText = Math.floor(current) + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (isLargeNumber) {
                    if (target >= 1000000) {
                        stat.innerText = (target / 1000000) + 'M+';
                    } else if (target >= 1000) {
                        stat.innerText = (target / 1000) + 'K+';
                    } else {
                        stat.innerText = target + '+';
                    }
                } else {
                    stat.innerText = target + '+';
                }
                stat.setAttribute('data-counted', 'true');
            }
        };
        
        updateCounter();
    });
    
    animated = true;
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight - 100;
}

function checkStats() {
    const aboutSection = document.querySelector('#about');
    if (aboutSection && isElementInViewport(aboutSection) && !animated) {
        animateStats();
    }
}

window.addEventListener('scroll', checkStats);
window.addEventListener('load', checkStats);