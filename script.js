// =====================================================
// DOM ELEMENTS
// =====================================================
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const projectCards = document.querySelectorAll('.project-card');

// =====================================================
// HEADER SCROLL
// =====================================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// =====================================================
// MOBILE MENU
// =====================================================
menuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Animate toggle
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(5px)';
        spans[1].style.transform = 'rotate(-45deg) translateY(-5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.transform = '';
    });
});

// =====================================================
// SMOOTH SCROLL
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .stat-card, .skill-item, .about-content, .contact-content').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
    fadeInObserver.observe(el);
});

// =====================================================
// PROJECT CARD TILT EFFECT
// =====================================================
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// =====================================================
// MAGNETIC BUTTONS
// =====================================================
const magneticBtns = document.querySelectorAll('.btn, .social-btn, .contact-email');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// =====================================================
// PARALLAX SHAPES
// =====================================================
const shapes = document.querySelectorAll('.hero-shape');

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;

    shapes.forEach((shape, index) => {
        const factor = (index + 1) * 2;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

// =====================================================
// COUNTER ANIMATION
// =====================================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const isInfinity = target === '∞';

    if (isInfinity) {
        element.textContent = '∞';
        return;
    }

    const numericTarget = parseInt(target);
    if (isNaN(numericTarget)) {
        element.textContent = target;
        return;
    }

    const increment = numericTarget / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < numericTarget) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = numericTarget + '+';
        }
    }

    updateCounter();
}

// Observe stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const target = stat.textContent.replace('+', '');
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// =====================================================
// CONSOLE MESSAGE
// =====================================================
console.log(`
%c👋 Merhaba!

%cBu siteyi inceliyorsun demek ki.
İyi bir geliştiricisin!

🚀 GitHub: https://github.com/berkaykw
📧 Email: berkaykw@gmail.com

Birlikte harika projeler geliştirelim!
`,
    'font-size: 24px; font-weight: bold; color: #ff4d4d;',
    'font-size: 12px; color: #888;'
);
