// Animated background: twinkling stars, shooting stars, city windows.
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- city windows ---
  const g = document.querySelector('.skyline.near .windows');
  if (g) {
    const ns = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 90; i++) {
      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', Math.random() * 1600);
      r.setAttribute('y', 80 + Math.random() * 130);
      r.setAttribute('width', 4); r.setAttribute('height', 5);
      r.style.animationDelay = (-Math.random() * 6) + 's';
      r.style.animationDuration = (4 + Math.random() * 8) + 's';
      g.appendChild(r);
    }
  }

  // --- stars ---
  const c = document.getElementById('stars');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, stars = [], shoot = null;
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.round(w * h / 5000) }, () => ({
      x: Math.random() * w, y: Math.random() * h * .85, r: Math.random() * 1.3 + .2,
      p: Math.random() * Math.PI * 2, s: .5 + Math.random() * 1.5,
    }));
  }
  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const a = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.p + t / 1000 * s.s))) * (1 - s.y / h);
      ctx.globalAlpha = a; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    }
    if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w * .7, y: Math.random() * h * .35, life: 0 };
    if (shoot) {
      shoot.life += 1;
      const len = 90, x = shoot.x + shoot.life * 9, y = shoot.y + shoot.life * 3.5;
      const grd = ctx.createLinearGradient(x, y, x - len, y - len * .39);
      grd.addColorStop(0, 'rgba(255,255,255,.9)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalAlpha = Math.max(0, 1 - shoot.life / 40);
      ctx.strokeStyle = grd; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - len, y - len * .39); ctx.stroke();
      if (shoot.life > 40) shoot = null;
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(frame);
  }
  size(); addEventListener('resize', size);
  requestAnimationFrame(frame);
})();
