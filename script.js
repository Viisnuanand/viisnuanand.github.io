/* Unified site script
   - Beacon analytics (keeps original behavior)
   - Smooth scrolling for hash links + a11y focus
   - Navbar highlight via IntersectionObserver (robust)
   - Theme toggle (persist in localStorage)
   - Reveal/fade-in using IntersectionObserver
   - Learn More expand/collapse with smooth height
   - Skills quick-jump and visibility handling
*/

/* ======================= Beacon analytics (original) ======================= */
(function(){
  try {
    if (!sessionStorage.getItem('portfolio_notified')) {
      sessionStorage.setItem('portfolio_notified','1');
      const payload = { page: location.pathname, referrer: document.referrer, ua: navigator.userAgent };
      const url = "https://crimson-dawn-f894.viisnuanand-s.workers.dev/";
      const data = JSON.stringify(payload);
      const sent = navigator.sendBeacon && navigator.sendBeacon(url, new Blob([data], { type: 'application/json' }));
      if (!sent) {
        fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body:data, keepalive:true })
          .catch(()=>{});
      }
    }
  } catch(e) {
    try { fetch("https://crimson-dawn-f894.viisnuanand-s.workers.dev/", { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({page:location.pathname}), keepalive:true }); } catch(e2){}
  }
})();

/* ================= Smooth scroll for hash links (+ accessibility) ================= */
(function(){
  function smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.setAttribute('tabindex','-1');
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { try { el.removeAttribute('tabindex'); } catch(e){} }, 1100);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.length <= 1) return;
    link.addEventListener('click', function(e){
      const target = document.querySelector(href);
      if (!target) return; // allow default
      e.preventDefault();
      smoothScrollTo(href);
      if (history.pushState) history.pushState(null, '', href);
    });
  });
})();

/* ================= Navbar highlight using IntersectionObserver ================= */
(function(){
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!navLinks.length || !sections.length) return;

  const obsOpts = { root: null, rootMargin: '0px 0px -45% 0px', threshold: 0 };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, obsOpts);

  sections.forEach(s => obs.observe(s));

  // Edge case: bottom of page => activate contact
  window.addEventListener('scroll', () => {
    const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 60);
    if (nearBottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      const contactLink = document.querySelector('.nav a[href="#contact"]');
      if (contactLink) contactLink.classList.add('active');
    }
  }, { passive: true });
})();

/* ================= Theme toggle (persist in localStorage) ================= */
(function(){
  const themeToggleBtn = document.getElementById('themeToggle');
  // restore
  if (localStorage.getItem('theme') === 'light') document.documentElement.classList.add('light');
  if (!themeToggleBtn) return;
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
})();

/* ================= Reveal / Fade-in on scroll (IntersectionObserver) ================= */
(function(){
  const revealTargets = document.querySelectorAll('.card, .cert-card, .about-right, .hero-inner, .skills-card, .skills-interests');
  if (!revealTargets.length) return;
  revealTargets.forEach(el=>{
    el.style.opacity = el.style.opacity || 0;
    el.style.transform = el.style.transform || 'translateY(12px)';
    el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.95,.2,1)';
  });

  const rObs = new IntersectionObserver((entries, ob)=> {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Apply inline styles for compatibility
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        ob.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(t => rObs.observe(t));
})();

/* ================= Expand / Collapse "Learn More" (smooth height) ================= */
(function(){
  function initLearnMore() {
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

        // Close other open cards
        document.querySelectorAll('.card .hidden.open').forEach(other => {
          if (other === hidden) return;
          other.style.maxHeight = null;
          other.classList.remove('open');
          const otherBtn = other.closest('.card')?.querySelector('.learn');
          if (otherBtn) otherBtn.textContent = 'Learn More ↓';
        });

        if (!isOpen) {
          hidden.style.maxHeight = hidden.scrollHeight + 'px';
          hidden.classList.add('open');
          btn.textContent = 'Show Less ↑';
        } else {
          hidden.style.maxHeight = null;
          hidden.classList.remove('open');
          btn.textContent = 'Learn More ↓';
        }
      });
    });

    // append CSS for smooth height if not present
    if (!document.getElementById('learn-more-style')) {
      const s = document.createElement('style');
      s.id = 'learn-more-style';
      s.textContent = `.card .hidden { max-height: 0; overflow: hidden; transition: max-height 420ms cubic-bezier(.2,.9,.2,1); } .card .hidden.open { overflow: visible; }`;
      document.head.appendChild(s);
    }
  }
  initLearnMore();
})();

/* ================= Skills quick-jump creation & observer ================= */
(function(){
  // create button only if not exists
  if (!document.querySelector('.quick-skills')) {
    const a = document.createElement('a');
    a.href = '#skills';
    a.className = 'quick-skills';
    a.setAttribute('aria-label','Jump to Skills');
    a.textContent = 'Skills';
    document.body.appendChild(a);
  }
  // smooth scroll for skills specifically (redundant-safe)
  document.querySelectorAll('a[href="#skills"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const el = document.getElementById('skills');
      if (!el) return;
      el.setAttribute('tabindex','-1');
      el.focus({preventScroll:true});
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(()=> el.removeAttribute('tabindex'), 1000);
      if (history.pushState) history.pushState(null, '', '#skills');
    });
  });

  // mark skills cards visible when intersecting
  const skillsTargets = document.querySelectorAll('.skills-card, .skills-interests');
  if (skillsTargets.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    skillsTargets.forEach(t => io.observe(t));
  }
})();




