const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function hexToRgba(hex, alpha) {
    const clean = hex.replace('#', '');
    const expanded = clean.length === 3
        ? clean.split('').map(c => c + c).join('')
        : clean;
    const r = parseInt(expanded.substring(0, 2), 16);
    const g = parseInt(expanded.substring(2, 4), 16);
    const b = parseInt(expanded.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatTime(seconds) {
    if (seconds < 60) return seconds + 's';
    return Math.floor(seconds / 60) + 'm ' + (seconds % 60) + 's';
}
