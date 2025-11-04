// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Theme toggle (simple)
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

// Reveal on scroll
function reveal() {
  document.querySelectorAll('.card, .cert, .about-right, .hero-inner')
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
// Fade-in certificates on scroll
const certs = document.querySelectorAll('.cert');
window.addEventListener('scroll', () => {
  certs.forEach(cert => {
    const rect = cert.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      cert.classList.add('visible');
    }
  });
});


// Expand / collapse for project cards
document.querySelectorAll('.card .learn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const card = link.closest('.card');
    card.classList.toggle('open');
  });
});

