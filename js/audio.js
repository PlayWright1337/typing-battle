function playClick() {
    if (!S.sound) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        if (S.soundType === 'click') {
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(600, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.04);
        } else if (S.soundType === 'pop') {
            oscillator.type = 'sine';
            const freq = 300 + Math.random() * 100;
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.06);
            gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.06);
        } else {
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.03);
        }
    } catch(e) {}
}
