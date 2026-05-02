function genTest() {
    if (S.type === 'quote') {
        S.words = QUOTES[Math.floor(Math.random() * QUOTES.length)].split(' ');
    } else {
        S.words = rndWords(S.type === 'words' ? S.wordVal : 200);
    }
    renderWords('#words-wrapper');
    updCaret('#caret', '#words-wrapper', '#text-display', S.wIdx, S.cIdx, S.started);
}

function typeChar(ch) {
    const wEls = $$('#words-wrapper .word');
    if (S.wIdx >= S.words.length) return;
    const wEl = wEls[S.wIdx];
    const ls = wEl.querySelectorAll('.letter');
    const word = S.words[S.wIdx];

    if (ch === ' ') {
        if (S.cIdx === 0) return;
        let allCorrect = true;
        ls.forEach(l => { if (!l.classList.contains('correct')) allCorrect = false; });
        if (S.cIdx < word.length) allCorrect = false;
        if (!allCorrect) wEl.classList.add('error');
        S.ok += Array.from(ls).filter(l => l.classList.contains('correct')).length;
        S.bad += Array.from(ls).filter(l => l.classList.contains('incorrect') || l.classList.contains('extra')).length;
        S.miss += Math.max(0, word.length - S.cIdx);
        S.wordsDone++;
        S.wIdx++;
        S.cIdx = 0;
        if (S.type === 'words' && S.wordsDone >= S.wordVal) { finishTest(); return; }
        if (S.type === 'quote' && S.wIdx >= S.words.length) { finishTest(); return; }
        updWordCount();
    } else {
        if (S.cIdx < word.length) {
            const l = ls[S.cIdx];
            if (ch === word[S.cIdx]) {
                l.classList.add('correct');
            } else {
                l.classList.add('incorrect');
                S.missedKeys = S.missedKeys || {};
                S.missedKeys[word[S.cIdx]] = (S.missedKeys[word[S.cIdx]] || 0) + 1;
            }
            S.cIdx++;
        } else {
            const s = document.createElement('span');
            s.className = 'letter extra';
            s.textContent = ch;
            wEl.appendChild(s);
            S.cIdx++;
            S.extra++;
        }
    }
    updCaret('#caret', '#words-wrapper', '#text-display', S.wIdx, S.cIdx, S.started);
    logWpm();
    updLiveWpm();
    if (S.sound) playClick();
}

function bksp() {
    const wEls = $$('#words-wrapper .word');
    if (S.wIdx === 0 && S.cIdx === 0) return;
    if (S.cIdx === 0) {
        S.wIdx--;
        S.wordsDone = Math.max(0, S.wordsDone - 1);
        const wEl = wEls[S.wIdx];
        const ls = wEl.querySelectorAll('.letter');
        S.cIdx = ls.length;
        wEl.classList.remove('error');
        const extras = wEl.querySelectorAll('.extra');
        if (extras.length) { extras[extras.length - 1].remove(); S.cIdx--; S.extra--; }
    } else {
        const wEl = wEls[S.wIdx];
        const ls = wEl.querySelectorAll('.letter');
        S.cIdx--;
        const l = ls[S.cIdx];
        if (l.classList.contains('extra')) { l.remove(); S.extra--; }
        else { l.classList.remove('correct', 'incorrect'); l.textContent = S.words[S.wIdx][S.cIdx]; }
    }
    updCaret('#caret', '#words-wrapper', '#text-display', S.wIdx, S.cIdx, S.started);
}

function startTest() {
    S.started = true;
    S.startTime = Date.now();
    S.wpmLog = [];
    S.rawLog = [];
    if (S.type === 'time') {
        S.timeLeft = S.timeVal;
        $('#timer-display').classList.remove('hidden');
        $('#timer-value').textContent = S.timeLeft;
        S.timer = setInterval(() => {
            S.timeLeft--;
            $('#timer-value').textContent = S.timeLeft;
            if (S.timeLeft <= 0) finishTest();
        }, 1000);
    }
    if (S.type === 'words') {
        $('#word-count-display').classList.remove('hidden');
        updWordCount();
    }
    const liveWpm = $('#live-wpm');
    if (liveWpm) liveWpm.classList.remove('hidden');
    updCaret('#caret', '#words-wrapper', '#text-display', S.wIdx, S.cIdx, S.started);
    if (S.sound) playClick();
}

function stopTest() {
    if (S.timer) { clearInterval(S.timer); S.timer = null; }
    S.started = false;
}

function resetTest() {
    stopTest();
    S.wIdx = 0;
    S.cIdx = 0;
    S.started = false;
    S.finished = false;
    S.ok = 0;
    S.bad = 0;
    S.extra = 0;
    S.miss = 0;
    S.wordsDone = 0;
    S.wpmLog = [];
    S.rawLog = [];
    $('#timer-display').classList.add('hidden');
    $('#word-count-display').classList.add('hidden');
    $('#results').classList.add('hidden');
    $('#test-container').style.display = '';
    const liveWpm = $('#live-wpm');
    if (liveWpm) liveWpm.classList.add('hidden');
    genTest();
}

function logWpm() {
    if (!S.started) return;
    const elapsed = (Date.now() - S.startTime) / 1000;
    if (elapsed < 1) return;
    const sec = Math.floor(elapsed);
    const gross = (S.ok + S.bad + S.extra) / 5 / (elapsed / 60);
    const net = Math.max(0, gross - (S.bad + S.extra) / (elapsed / 60));
    S.wpmLog[sec] = Math.round(net);
    S.rawLog[sec] = Math.round(gross);
}

function finishTest() {
    stopTest();
    S.finished = true;
    const elapsed = (Date.now() - S.startTime) / 1000;
    const lastWord = $$('#words-wrapper .word')[S.wIdx];
    if (lastWord && S.cIdx > 0) {
        const ls = lastWord.querySelectorAll('.letter');
        S.ok += Array.from(ls).filter(l => l.classList.contains('correct')).length;
        S.bad += Array.from(ls).filter(l => l.classList.contains('incorrect') || l.classList.contains('extra')).length;
        S.miss += Math.max(0, S.words[S.wIdx] ? S.words[S.wIdx].length - S.cIdx : 0);
        S.wordsDone++;
    }
    const total = S.ok + S.bad + S.extra + S.miss;
    const gross = total / 5 / (elapsed / 60);
    const wpm = Math.max(0, Math.round((S.ok / 5) / (elapsed / 60)));
    const raw = Math.round(gross);
    const acc = total > 0 ? Math.round(S.ok / total * 100) : 0;
    const vals = S.wpmLog.filter(v => v !== undefined);
    const mean = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const variance = vals.length ? vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length : 0;
    const consistency = mean > 0 ? Math.round((1 - Math.sqrt(variance) / mean) * 100) : 0;

    $('#result-wpm').textContent = wpm;
    $('#result-acc').textContent = acc + '%';
    $('#result-raw').textContent = raw;
    $('#result-chars').textContent = S.ok + '/' + S.bad + '/' + S.extra + '/' + S.miss;
    $('#result-consistency').textContent = Math.max(0, consistency) + '%';
    $('#result-time').textContent = Math.round(elapsed) + 's';

    $('#test-container').style.display = 'none';
    $('#results').classList.remove('hidden');
    const liveWpm = $('#live-wpm');
    if (liveWpm) liveWpm.classList.add('hidden');

    drawChart('#chart-canvas', S.wpmLog, S.rawLog);

    S.hist.push({ wpm, raw, acc, time: Math.round(elapsed), mode: S.type, lang: S.lang, date: Date.now() });
    save();
}

function updWordCount() {
    const el = $('#word-count-value');
    if (el) el.textContent = S.wordsDone + '/' + S.wordVal;
}

function setupCfg() {
    $('[data-mode="punctuation"]').addEventListener('click', function() {
        S.punct = !S.punct;
        this.classList.toggle('active', S.punct);
        resetTest();
    });
    $('[data-mode="numbers"]').addEventListener('click', function() {
        S.nums = !S.nums;
        this.classList.toggle('active', S.nums);
        resetTest();
    });
    $$('#type-group .config-btn').forEach(b => b.addEventListener('click', () => {
        S.type = b.dataset.type;
        $$('#type-group .config-btn').forEach(x => x.classList.toggle('active', x === b));
        updValBtns();
        resetTest();
    }));
}

function updValBtns() {
    const g = $('#value-group');
    g.innerHTML = '';
    const vals = S.type === 'time' ? [15, 30, 60, 120] : S.type === 'words' ? [10, 25, 50, 100] : null;
    if (!vals) {
        g.innerHTML = '<button class="config-btn active">' + (S.type === 'quote' ? 'random' : 'free') + '</button>';
        return;
    }
    const cur = S.type === 'time' ? S.timeVal : S.wordVal;
    vals.forEach(v => {
        const b = document.createElement('button');
        b.className = 'config-btn' + (v === cur ? ' active' : '');
        b.textContent = v;
        b.addEventListener('click', () => {
            if (S.type === 'time') S.timeVal = v; else S.wordVal = v;
            g.querySelectorAll('.config-btn').forEach(x => x.classList.toggle('active', x === b));
            resetTest();
        });
        g.appendChild(b);
    });
}
