/* =========================================================
   SKILLS ICON CLOUD — TagCloud.js (vanilla, ~6KB, no deps)
   Renders tech logos (Devicon CDN) as HTML content instead
   of plain text, rotating in a 3D sphere.
   ========================================================= */
(function initIconCloud() {
  const container = document.getElementById('iconCloud');
  if (!container) return;

  const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

  const stack = [
    { name: 'HTML5',      icon: `${DEVICON_BASE}/html5/html5-original.svg` },
    { name: 'CSS3',       icon: `${DEVICON_BASE}/css3/css3-original.svg` },
    { name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
    { name: 'PHP',        icon: `${DEVICON_BASE}/php/php-original.svg` },
    { name: 'Laravel',    icon: `${DEVICON_BASE}/laravel/laravel-original.svg` },
    { name: 'React',      icon: `${DEVICON_BASE}/react/react-original.svg` },
    { name: 'Bootstrap',  icon: `${DEVICON_BASE}/bootstrap/bootstrap-original.svg` },
    { name: 'MySQL',      icon: `${DEVICON_BASE}/mysql/mysql-original.svg` },
    { name: 'Python',     icon: `${DEVICON_BASE}/python/python-original.svg` },
    { name: 'Git',        icon: `${DEVICON_BASE}/git/git-original.svg` },
    { name: 'GitHub',     icon: `${DEVICON_BASE}/github/github-original.svg` },
  ];

  // The markup already ships a static grid of the same icons as a
  // fallback (.icon-grid-fallback), so the section always looks right
  // even if the cloud library or the icon CDN fails to load. Only
  // swap in the animated cloud once we're sure it can actually build.
  if (typeof TagCloud === 'undefined') return;

  const items = stack.map(
    (t) => `<img src="${t.icon}" alt="${t.name}" title="${t.name}" loading="lazy">`
  );

  const fallbackHTML = container.innerHTML;

  try {
    container.innerHTML = '';
    TagCloud('#iconCloud', items, {
      radius: 160,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
        useHTML: true,
    });
  } catch (err) {
    // Something went wrong building the cloud — put the static grid back.
    container.innerHTML = fallbackHTML;
    console.warn('Icon cloud failed to initialize, keeping static grid.', err);
  }
})();

/* =========================================================
   NAVBAR — collapse the mobile menu after a link is tapped,
   and add a subtle shadow once the page is scrolled.
   ========================================================= */
document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

(function navScrollState() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* =========================================================
   PROJECT CARDS — reveal once, as they enter the viewport
   (single deliberate moment per card, not a page-wide effect)
   ========================================================= */
(function revealProjectCards() {
  const cards = document.querySelectorAll('.project-card.fade-up');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    cards.forEach((card) => card.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 90);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
  );

   cards.forEach((card) => observer.observe(card));

  // شبكة أمان: لو أي كارت مطلعش يظهر لأي سبب، نظهره إجباري بعد 3 ثواني
  setTimeout(() => {
    cards.forEach((card) => card.classList.add('is-visible'));
  }, 3000);
})();

document.documentElement.classList.add('js-ready');
