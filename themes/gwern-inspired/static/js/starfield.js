/* starfield.js — quiet night-sky canvas for raahulsingh.net
   Draws twinkling stars and rare shooting stars.
   Hidden in light mode via CSS (--sky:0). Respects prefers-reduced-motion. */
(function () {
  if (document.getElementById("sky")) return;
  var canvas = document.createElement("canvas");
  canvas.id = "sky";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, stars = [], shoot = null, nextShoot = 15000;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function glow() {
    var v = getComputedStyle(document.documentElement).getPropertyValue("--glow").trim();
    return v || "222,234,255";
  }
  var glowColor = glow();

  function build() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    glowColor = glow();
    var n = Math.min(420, Math.floor((w * h) / 5200));
    stars = [];
    for (var i = 0; i < n; i++) {
      var big = Math.random() < 0.07;
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        r: big ? 1.1 + Math.random() * 0.9 : 0.3 + Math.random() * 0.7,
        base: (big ? 0.5 : 0.22) + Math.random() * 0.35,
        tw: 0.4 + Math.random() * 1.6, ph: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.16
      });
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = reduce ? s.base : s.base * (0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.ph));
      var col = s.warm ? "255,236,206" : glowColor;
      ctx.fillStyle = "rgba(" + col + "," + Math.max(0, a) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      if (s.r > 1.0) {
        ctx.fillStyle = "rgba(" + col + "," + (a * 0.12) + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.4, 0, 6.2832); ctx.fill();
      }
    }

    // shooting star — rare (every 25–55 s)
    if (!reduce) {
      if (!shoot && t > nextShoot) {
        shoot = { x: Math.random() * w * 0.7 + w * 0.15, y: Math.random() * h * 0.4,
                  life: 0, len: 90 + Math.random() * 70, vx: 3.4 + Math.random() * 2, vy: 1.5 + Math.random() * 1.2 };
      }
      if (shoot) {
        shoot.life++; shoot.x += shoot.vx; shoot.y += shoot.vy;
        var tx = shoot.x - shoot.vx * (shoot.len / 5), ty = shoot.y - shoot.vy * (shoot.len / 5);
        var g = ctx.createLinearGradient(shoot.x, shoot.y, tx, ty);
        g.addColorStop(0, "rgba(" + glowColor + ",0.9)");
        g.addColorStop(1, "rgba(" + glowColor + ",0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(tx, ty); ctx.stroke();
        if (shoot.x > w + 100 || shoot.y > h + 100 || shoot.life > 120) {
          shoot = null; nextShoot = t + 25000 + Math.random() * 30000;
        }
      }
    }

    requestAnimationFrame(frame);
  }

  build();
  window.addEventListener("resize", build);
  requestAnimationFrame(frame);
})();
