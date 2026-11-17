// Mobile nav, theme toggle, projects carousel, footer year. The page works without this file.
(function () {
  var root = document.documentElement;

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('nav')) setOpen(false);
    });
  }

  // Theme toggle: follows the system until the visitor picks one
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.dataset.theme ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Projects carousel: arrows page one view at a time; shown only when tiles overflow
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.cards');
    var btns = carousel.querySelectorAll('.carousel-btn');
    if (!track || btns.length !== 2) return;
    var prev = btns[0], next = btns[1];
    var update = function () {
      var overflow = track.scrollWidth > track.clientWidth + 1;
      prev.hidden = next.hidden = !overflow;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = Number(btn.dataset.dir);
        var smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
        track.scrollBy({ left: dir * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
      });
    });
    track.addEventListener('scroll', update, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    else window.addEventListener('resize', update);
    update();
  });
})();
