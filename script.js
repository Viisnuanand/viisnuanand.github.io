/* =========================
   Smooth Scroll for Nav Links
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* =========================
   Debounce Helper
   ========================= */
function debounce(fn, wait = 12) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* =========================
   Scroll-Based Navbar Highlight
   ========================= */

const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));

function highlightMenu() {
  const scrollPos = window.scrollY + 150;

  let currentId = null;
  for (const sec of sections) {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      currentId = sec.id;
      break;
    }
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (currentId && link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
}

/* =========================
   Reveal Animations
   ========================= */

function reveal() {
  const elements = document.querySelectorAll(
    '.card, .cert-card, .about-right, .hero-inner, .skill-panel'
  );

  const windowH = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < windowH - 80) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(12px)';
    }
  });
}

/* =========================
   Theme Toggle
   ========================= */

const themeBtn = document.getElementById('themeToggle');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    html.classList.toggle('light');

    if (html.classList.contains('light')) {
      html.style.setProperty('--bg', '#ffffff');
      html.style.setProperty('--text', '#111111');
      html.style.setProperty('--card', '#f6f6f6');
      html.style.setProperty('--muted', '#6b6b6b');
    } else {
      html.style.removeProperty('--bg');
      html.style.removeProperty('--text');
      html.style.removeProperty('--card');
      html.style.removeProperty('--muted');
    }
  });
}

/* =========================
   Expand / Collapse "Learn More"
   ========================= */

document.querySelectorAll('.card .learn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const card = link.closest('.card');
    if (!card) return;

    card.classList.toggle('open');
    link.textContent = card.classList.contains('open')
      ? 'Show Less ↑'
      : 'Learn More ↓';
  });
});

/* =========================
   Init on Load + Scroll
   ========================= */

window.addEventListener('load', () => {
  highlightMenu();
  reveal();
});

window.addEventListener(
  'scroll',
  debounce(() => {
    highlightMenu();
    reveal();
  }, 12)
);


