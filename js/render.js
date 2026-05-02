function rndWords(n) {
    const src = WORDS[S.lang] || WORDS.english;
    const r = [];
    for (let i = 0; i < n; i++) {
        let w = src[Math.floor(Math.random() * src.length)];
        if (S.punct && Math.random() < 0.12) w += [',', '.', '!', '?', ';', ':'][Math.floor(Math.random() * 6)];
        if (S.punct && Math.random() < 0.04 && i > 0) w = w[0].toUpperCase() + w.slice(1);
        if (S.nums && Math.random() < 0.08) w = String(Math.floor(Math.random() * 1000));
        r.push(w);
    }
    return r;
}

function renderWords(wrapperId) {
    const wr = $(wrapperId);
    wr.innerHTML = '';
    wr.style.transform = 'translateY(0)';
    const words = wrapperId === '#words-wrapper' ? S.words : S.bWords;
    words.forEach(word => {
        const d = document.createElement('div');
        d.className = 'word';
        for (const ch of word) {
            const s = document.createElement('span');
            s.className = 'letter';
            s.textContent = ch;
            d.appendChild(s);
        }
        wr.appendChild(d);
    });
}

function updCaret(caretId, wrapperId, displayId, wIdx, cIdx, started) {
    const c = $(caretId);
    if (!c) return;
    c.className = 'caret';
    if (S.smooth) c.classList.add('smooth');
    if (S.caret === 'block') c.classList.add('block');
    if (S.caret === 'underline') c.classList.add('underline');
    if (started) c.classList.add('typing');
    const wEls = $$(wrapperId + ' .word');
    if (!wEls[wIdx]) return;
    const ls = wEls[wIdx].querySelectorAll('.letter');
    let t;
    if (cIdx < ls.length) t = ls[cIdx];
    else if (ls.length) t = ls[ls.length - 1];
    if (!t) return;
    const r = t.getBoundingClientRect();
    const p = $(displayId).getBoundingClientRect();
    c.style.left = ((cIdx >= ls.length ? r.right : r.left) - p.left) + 'px';
    c.style.top = (r.top - p.top) + 'px';
    c.style.height = r.height + 'px';
    const wr = $(wrapperId);
    const lh = r.height * 1.6;
    if (r.top - p.top > lh * 1.5) {
        const cur = parseFloat(wr.style.transform.replace(/[^0-9.-]/g, '')) || 0;
        wr.style.transform = `translateY(${cur - lh}px)`;
    }
}

function updAICaret() {
    const c = $('#battle-ai-caret');
    if (!c) return;
    c.className = 'caret ai-caret';
    const wEls = $$('#battle-words-wrapper .word');
    if (!wEls[S.aiWIdx]) return;
    const ls = wEls[S.aiWIdx].querySelectorAll('.letter');
    let t;
    if (S.aiCIdx < ls.length) t = ls[S.aiCIdx];
    else if (ls.length) t = ls[ls.length - 1];
    if (!t) return;
    const r = t.getBoundingClientRect();
    const p = $('#battle-text-display').getBoundingClientRect();
    c.style.left = ((S.aiCIdx >= ls.length ? r.right : r.left) - p.left) + 'px';
    c.style.top = (r.top - p.top) + 'px';
    c.style.height = r.height + 'px';
}

function updLiveWpm() {
    if (!S.started) return;
    const el = $('#live-wpm');
    if (!el) return;
    const elapsed = (Date.now() - S.startTime) / 1000;
    if (elapsed < 1) return;
    const wpm = Math.max(0, Math.round((S.ok / 5) / (elapsed / 60)));
    el.textContent = wpm + ' wpm';
}
