// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Scroll-based Navbar Highlight =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

function highlightMenu() {
  let scrollPos = window.scrollY + 150; // offset for fixed header
  sections.forEach(sec => {
    if (
      scrollPos >= sec.offsetTop &&
      scrollPos < sec.offsetTop + sec.offsetHeight
    ) {
      const id = sec.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === #${id}) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightMenu);
window.addEventListener('load', highlightMenu);

// ===== Theme Toggle =====
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.style.setProperty('--bg', '#ffffff');
      document.documentElement.style.setProperty('color', '#000');
      document.documentElement.style.setProperty('--card', '#f6f6f6');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('color');
      document.documentElement.style.removeProperty('--card');
    }
  });
}

// ===== Reveal / Fade-in on Scroll =====
function reveal() {
  document
    .querySelectorAll('.card, .cert-card, .about-right, .hero-inner')
    .forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      } else {
        el.style.opacity = 0;
        el.style.transform = 'translateY(12px)';
      }
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===== Expand / Collapse “Learn More” =====
document.querySelectorAll('.card .learn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const card = link.closest('.card');
    card.classList.toggle('open');
    if (card.classList.contains('open')) {
      link.textContent = 'Show Less ↑';
    } else {
      link.textContent = 'Learn More ↓';
    }
  });
});

