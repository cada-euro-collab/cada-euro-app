// Cada Euro: deslizar entre todas las secciones
(() => {
  const app = document.getElementById('app');
  const content = document.getElementById('content');
  const tabs = [...document.querySelectorAll('.nav button')];
  let start = null;

  app.addEventListener('touchstart', e => {
    start = null;
    if (e.touches.length !== 1 ||
        !document.getElementById('overlay').classList.contains('hidden') ||
        e.target.closest('input, textarea, select, [contenteditable]')) return;
    start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  app.addEventListener('touchend', e => {
    if (!start || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    start = null;

    if (Math.abs(dx) < 75 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    const i = tabs.findIndex(b => b.classList.contains('active'));
    const next = tabs[i + (dx < 0 ? 1 : -1)];
    if (!next) return;

    e.preventDefault();
    next.click();

    if (content.animate &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      content.animate(
        [{ opacity: 0.65, transform: 'translateX(12px)' },
         { opacity: 1, transform: 'translateX(0)' }],
        { duration: 180, easing: 'ease-out' }
      );
    }
  }, { passive: false });

  app.addEventListener('touchcancel', () => { start = null; });
})();
