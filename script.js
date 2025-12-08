<script>
/* -----------------------------------------------------------------------
   Unified UI script for:
   - smooth scrolling (hash links)
   - navbar highlight
   - theme toggle (with localStorage)
   - reveal / fade-in on scroll (IntersectionObserver)
   - Learn More expand/collapse (animated)
   Paste once near </body>.
   ----------------------------------------------------------------------- */

(function () {
  'use strict';

  /* ------------------- Smooth scroll for hash links (+ a11y) ------------------- */
  function smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    // Use smooth scroll; set temporary tabindex for focus
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // cleanup tabindex after animation
    setTimeout(() => el.removeAttribute('tabindex'), 1200);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    // only intercept same-page anchors
    const href = link.getAttribute('href');
    if (href === '#' || href.length <= 1) return;
    link.addEventListener('click', function (e) {
      const target = document.querySelector(href);
      if (!target) return; // allow default if not found
      e.preventDefault();
      smoothScrollTo(href);
      // update URL without jumping
      if (history.pushState) history.pushState(null, '', href);
    });
  });

  /* ------------------- Navbar highlight using IntersectionObserver ------------------- */
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  if (navLinks.length && sections.length) {
    // Create observer to watch sections crossing middle of viewport
    const opts = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        } else {
          // if we are leaving a section we don't necessarily remove active here,
          // we'll let the newly intersecting section set the active class.
        }
      });
    }, opts);

    sections.forEach(s => obs.observe(s));

    // Edge case: mark contact/footer active near bottom
    window.addEventListener('scroll', () => {
      const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 60);
      if (nearBottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        const contactLink = document.querySelector('.nav a[href="#contact"]');
        if (contactLink) contactLink.classList.add('active');
      }
    }, { passive: true });
  }

  /* ------------------- Theme toggle (persist) ------------------- */
  (function themeInit() {
    const themeBtn = document.getElementById('themeToggle');
    // load last theme
    const stored = localStorage.getItem('theme');
    if (stored === 'light') document.documentElement.classList.add('light');

    if (!themeBtn) return;
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      // (Optional) update any CSS custom properties here if needed
    });
  })();

  /* ------------------- Reveal / Fade-in on scroll (IntersectionObserver) ------------------- */
  (function revealInit() {
    const revealTargets = document.querySelectorAll('.card, .cert-card, .about-right, .hero-inner, .skills-card, .skills-interests');
    if (!revealTargets.length) return;

    // set initial style (in case CSS not set)
    revealTargets.forEach(el => {
      el.style.opacity = el.style.opacity || 0;
      el.style.transform = el.style.transform || 'translateY(12px)';
      el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.95,.2,1)';
    });

    const rObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        } else {
          // keep them visible after they crossed once (optional)
          // entry.target.style.opacity = 0;
          // entry.target.style.transform = 'translateY(12px)';
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(t => rObs.observe(t));
  })();

  /* ------------------- Expand / Collapse "Learn More" (smooth height) ------------------- */
  (function expandInit() {
    const learnBtns = document.querySelectorAll('.card .learn');
    if (!learnBtns.length) return;

    learnBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const card = btn.closest('.card');
        if (!card) return;
        const hidden = card.querySelector('.hidden');
        if (!hidden) return;

        const isOpen = hidden.classList.contains('open');

        // Close all other cards (optional behavior kept)
        document.querySelectorAll('.card .hidden.open').forEach(other => {
          if (other === hidden) return;
          other.style.maxHeight = null;
          other.classList.remove('open');
          const otherBtn = other.closest('.card')?.querySelector('.learn');
          if (otherBtn) otherBtn.textContent = 'Learn More ↓';
        });

        if (!isOpen) {
          // open
          hidden.style.maxHeight = hidden.scrollHeight + 'px';
          hidden.classList.add('open');
          btn.textContent = 'Show Less ↑';
        } else {
          // close
          hidden.style.maxHeight = null;
          hidden.classList.remove('open');
          btn.textContent = 'Learn More ↓';
        }
      });
    });

    // make hidden content smoothly animate height via CSS if not present
    const style = document.createElement('style');
    style.textContent = `
      .card .hidden { max-height: 0; overflow: hidden; transition: max-height 420ms cubic-bezier(.2,.9,.2,1); }
      .card .hidden.open { overflow: visible; }
    `;
    document.head.appendChild(style);
  })();

  /* ------------------- Optional: gentle debounce utility (if needed later) ------------------- */
  function debounce(fn, wait = 80) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Expose helper on window (optional) for debugging
  window.__viisnu_ui = { smoothScrollTo, debounce };

})(); 
</script>



