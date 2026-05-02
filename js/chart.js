function drawChart(canvasId, wpmLog, rawLog) {
  const canvas =
    document.querySelector(canvasId) || document.getElementById(canvasId);
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const W = rect.width,
    H = rect.height;
  const pad = { top: 12, right: 12, bottom: 28, left: 12 };
  const pw = W - pad.left - pad.right;
  const ph = H - pad.top - pad.bottom;

  const cs = getComputedStyle(document.documentElement);
  const accent = cs.getPropertyValue("--accent").trim();
  const sub = cs.getPropertyValue("--sub").trim();

  ctx.clearRect(0, 0, W, H);

  const all = [...wpmLog, ...rawLog].filter((v) => v > 0);
  if (!all.length) return;

  const maxY = Math.ceil((Math.max(...all) * 1.2) / 10) * 10;
  const n = Math.max(wpmLog.length, rawLog.length);
  const toX = (i) => pad.left + (n > 1 ? (i / (n - 1)) * pw : pw / 2);
  const toY = (v) => pad.top + ph - (v / maxY) * ph;

  ctx.font = "11px monospace";

  for (let i = 0; i <= 5; i++) {
    const y = pad.top + (i / 5) * ph;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = hexToRgba(sub, 0.3);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + pw, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = sub;
    ctx.textAlign = "right";
    ctx.fillText(Math.round(maxY * (1 - i / 5)), pad.left + pw - 4, y - 3);
  }

  const drawLine = (data, color, width, glow) => {
    if (data.length < 2) return;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (glow) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
    }
    data.forEach((v, i) => {
      i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v));
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  drawLine(rawLog, sub, 1.5, false);
  drawLine(wpmLog, accent, 2.5, true);

  wpmLog.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(toX(i), toY(v), 3, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
  });

  const lx = pad.left + pw - 88;
  const ly = H - 10;
  ctx.textAlign = "left";
  ctx.fillStyle = sub;
  ctx.fillRect(lx, ly - 8, 10, 10);
  ctx.fillText("raw", lx + 13, ly + 2);
  ctx.fillStyle = accent;
  ctx.fillRect(lx + 48, ly - 8, 10, 10);
  ctx.fillText("wpm", lx + 61, ly + 2);
}

function drawStatsChart(canvasId, histData) {
  const canvas =
    document.querySelector(canvasId) || document.getElementById(canvasId);
  if (!canvas || !histData || !histData.length) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const W = rect.width,
    H = rect.height;
  const pad = { top: 24, right: 16, bottom: 28, left: 16 };
  const pw = W - pad.left - pad.right;
  const ph = H - pad.top - pad.bottom;

  const cs = getComputedStyle(document.documentElement);
  const accent = cs.getPropertyValue("--accent").trim();
  const sub = cs.getPropertyValue("--sub").trim();
  const bg = cs.getPropertyValue("--bg").trim();

  ctx.clearRect(0, 0, W, H);

  const data = histData.slice(-20);
  const n = data.length;
  if (!n) return;

  const wpmVals = data.map((d) => d.wpm);
  const maxY = Math.ceil((Math.max(...wpmVals) * 1.2) / 10) * 10 || 100;
  const toX = (i) => pad.left + (n > 1 ? (i / (n - 1)) * pw : pw / 2);
  const toY = (v) => pad.top + ph - (v / maxY) * ph;

  ctx.font = "11px monospace";

  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (i / 4) * ph;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = hexToRgba(sub, 0.25);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + pw, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = sub;
    ctx.textAlign = "right";
    ctx.fillText(Math.round(maxY * (1 - i / 4)), pad.left - 2, y + 4);
  }

  if (n < 2) {
    ctx.beginPath();
    ctx.arc(toX(0), toY(data[0].wpm), 4, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
    return;
  }

  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
  grad.addColorStop(0, hexToRgba(accent, 0.3));
  grad.addColorStop(1, hexToRgba(accent, 0));

  ctx.beginPath();
  data.forEach((d, i) => {
    i === 0 ? ctx.moveTo(toX(i), toY(d.wpm)) : ctx.lineTo(toX(i), toY(d.wpm));
  });
  ctx.lineTo(toX(n - 1), pad.top + ph);
  ctx.lineTo(toX(0), pad.top + ph);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  data.forEach((d, i) => {
    i === 0 ? ctx.moveTo(toX(i), toY(d.wpm)) : ctx.lineTo(toX(i), toY(d.wpm));
  });
  ctx.stroke();

  data.forEach((d, i) => {
    ctx.beginPath();
    ctx.arc(toX(i), toY(d.wpm), 3, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
  });

  const lx = toX(n - 1);
  const ly = toY(data[n - 1].wpm);
  const label = data[n - 1].wpm + " wpm";
  ctx.font = "bold 11px monospace";
  const labelW = ctx.measureText(label).width + 12;
  ctx.fillStyle = bg;
  ctx.fillRect(lx - labelW / 2, ly - 25, labelW, 16);
  ctx.fillStyle = accent;
  ctx.textAlign = "center";
  ctx.fillText(label, lx, ly - 12);

  ctx.fillStyle = sub;
  ctx.font = "11px monospace";
  ctx.textAlign = "center";
  const step = Math.ceil(n / 5);
  data.forEach((d, i) => {
    if (i === 0 || i === n - 1 || i % step === 0) {
      ctx.fillText(i + 1, toX(i), pad.top + ph + 18);
    }
  });
}
