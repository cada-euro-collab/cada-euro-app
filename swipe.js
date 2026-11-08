// Navegación deslizando entre pantallas de Cada Euro
(() => {
  const area = document.getElementById('content');
  const tabs = [...document.querySelectorAll('.nav button')];
  let inicio = null;

  area.addEventListener('touchstart', e => {
    inicio = null;
    if (e.touches.length !== 1 ||
        e.target.closest('button,a,input,select,textarea')) return;
    inicio = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }, { passive: true });

  area.addEventListener('touchend', e => {
    if (!inicio || !document.getElementById('overlay').classList.contains('hidden')) return;
    const dx = e.changedTouches[0].clientX - inicio.x;
    const dy = e.changedTouches[0].clientY - inicio.y;
    inicio = null;
    if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    const i = tabs.findIndex(b => b.classList.contains('active'));
    const siguiente = tabs[i + (dx < 0 ? 1 : -1)];
    if (!siguiente) return;

    siguiente.click();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      area.animate(
        [{ opacity: 0.7, transform: 'translateX(15px)' },
         { opacity: 1, transform: 'translateX(0)' }],
        { duration: 170, easing: 'ease-out' }
      );
    }
  }, { passive: true });
})();
