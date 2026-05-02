function setupBattle() {
    $$('.difficulty-btns .config-btn').forEach(b => b.addEventListener('click', () => {
        S.bDiff = b.dataset.difficulty;
        S.aiWpm = AI_WPM[S.bDiff];
        $$('.difficulty-btns .config-btn').forEach(x => x.classList.toggle('active', x === b));
    }));
    $$('.duration-btns .config-btn').forEach(b => b.addEventListener('click', () => {
        S.bDur = parseInt(b.dataset.bduration);
        $$('.duration-btns .config-btn').forEach(x => x.classList.toggle('active', x === b));
    }));
    $('#battle-start').addEventListener('click', startBattle);
    $('#battle-restart').addEventListener('click', resetBattle);
}

function showCountdown(cb) {
    const overlay = document.createElement('div');
    overlay.className = 'countdown-overlay';
    overlay.id = 'countdown-overlay';
    $('#battle-arena').appendChild(overlay);
    let count = 3;
    overlay.textContent = count;
    const iv = setInterval(() => {
        count--;
        if (count > 0) overlay.textContent = count;
        else if (count === 0) overlay.textContent = 'GO!';
        else {
            clearInterval(iv);
            overlay.remove();
            cb();
        }
    }, 800);
}

function startBattle() {
    S.bWords = rndWords(200);
    S.bWIdx = 0;
    S.bCIdx = 0;
    S.bOk = 0;
    S.bBad = 0;
    S.bStarted = false;
    S.finished = false;
    S.bTimeLeft = S.bDur;
    S.aiWIdx = 0;
    S.aiCIdx = 0;
    S.bActive = false;

    $('.battle-config').classList.add('hidden');
    $('#battle-arena').classList.remove('hidden');
    $('#battle-results').classList.add('hidden');
    $('#battle-timer').textContent = S.bTimeLeft;
    $('#player-wpm').textContent = '0 wpm';
    $('#ai-wpm').textContent = '0 wpm';
    $('#player-progress').style.width = '0%';
    $('#ai-progress').style.width = '0%';

    renderBattleWords();

    showCountdown(() => {
        S.bActive = true;
        $('#battle-input').focus();
        startBattleTimer();
    });
}

function renderBattleWords() {
    renderWords('#battle-words-wrapper');
    updBattleCaret();
}

function battleKey(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === 'Backspace') { e.preventDefault(); battleBksp(); return; }
    if (e.key.length !== 1) return;
    e.preventDefault();
    if (!S.bStarted) startBattleTimer();
    battleType(e.key);
}

function startBattleTimer() {
    if (S.bStarted) return;
    S.bStarted = true;
    S.bStart = Date.now();
    S.bTimer = setInterval(() => {
        S.bTimeLeft--;
        $('#battle-timer').textContent = S.bTimeLeft;
        updBattleProgress();
        if (S.bTimeLeft <= 0) finishBattle();
    }, 1000);
    startAI();
}

function battleType(ch) {
    const wEls = $$('#battle-words-wrapper .word');
    if (S.bWIdx >= S.bWords.length) return;
    const wEl = wEls[S.bWIdx];
    const word = S.bWords[S.bWIdx];

    if (ch === ' ') {
        if (S.bCIdx === 0) return;
        const allOk = wEl.querySelectorAll('.letter.incorrect,.letter.extra').length === 0 && S.bCIdx >= word.length;
        if (!allOk) wEl.classList.add('error');
        S.bOk += wEl.querySelectorAll('.letter.correct').length;
        S.bBad += wEl.querySelectorAll('.letter.incorrect,.letter.extra').length;
        S.bWIdx++;
        S.bCIdx = 0;
    } else {
        if (S.bCIdx < word.length) {
            const ls = wEl.querySelectorAll('.letter');
            if (ch === word[S.bCIdx]) ls[S.bCIdx].classList.add('correct');
            else ls[S.bCIdx].classList.add('incorrect');
            S.bCIdx++;
        } else {
            const s = document.createElement('span');
            s.className = 'letter extra';
            s.textContent = ch;
            wEl.appendChild(s);
            S.bCIdx++;
        }
    }
    updBattleCaret();
    updBattleProgress();
    if (S.sound) playClick();
}

function battleBksp() {
    const wEls = $$('#battle-words-wrapper .word');
    if (S.bWIdx === 0 && S.bCIdx === 0) return;
    if (S.bCIdx === 0) {
        S.bWIdx--;
        const wEl = wEls[S.bWIdx];
        wEl.classList.remove('error');
        S.bCIdx = wEl.querySelectorAll('.letter').length;
    }
    S.bCIdx--;
    const wEl = wEls[S.bWIdx];
    const ls = wEl.querySelectorAll('.letter');
    if (ls[S.bCIdx] && ls[S.bCIdx].classList.contains('extra')) {
        ls[S.bCIdx].remove();
    } else if (ls[S.bCIdx]) {
        ls[S.bCIdx].classList.remove('correct', 'incorrect');
    }
    updBattleCaret();
}

function startAI() {
    const cpm = S.aiWpm * 5;
    const baseMs = 60000 / cpm;

    function aiStep() {
        if (!S.bActive || S.aiWIdx >= S.bWords.length) return;
        const word = S.bWords[S.aiWIdx];
        if (S.aiCIdx < word.length) {
            S.aiCIdx++;
        } else {
            S.aiWIdx++;
            S.aiCIdx = 0;
        }
        updAICaret();
        updBattleProgress();
        S.aiTimer = setTimeout(aiStep, baseMs * (0.85 + Math.random() * 0.3));
    }

    S.aiTimer = setTimeout(aiStep, baseMs * (0.85 + Math.random() * 0.3));
}

function updBattleCaret() {
    updCaret('#battle-caret', '#battle-words-wrapper', '#battle-text-display', S.bWIdx, S.bCIdx, S.bStarted);
}

function updBattleProgress() {
    if (!S.bStarted) return;
    const elapsed = (Date.now() - S.bStart) / 1000;
    if (elapsed < 0.5) return;
    const pChars = S.bOk + S.bBad;
    const pWpm = Math.round((pChars / 5) / (elapsed / 60));
    const totalChars = S.bWords.reduce((a, w) => a + w.length + 1, 0);
    let aiTotal = 0;
    for (let i = 0; i < S.aiWIdx && i < S.bWords.length; i++) aiTotal += S.bWords[i].length + 1;
    aiTotal += S.aiCIdx;
    const aiWpm = Math.round((aiTotal / 5) / (elapsed / 60));
    $('#player-wpm').textContent = pWpm + ' wpm';
    $('#ai-wpm').textContent = aiWpm + ' wpm';
    const pPct = Math.min(100, (pChars / totalChars) * 100);
    const aiPct = Math.min(100, (aiTotal / totalChars) * 100);
    $('#player-progress').style.width = pPct + '%';
    $('#ai-progress').style.width = aiPct + '%';
}

function spawnConfetti() {
    const colors = ['--accent', '--error', '--text'];
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-particle';
        p.style.cssText = `left:${Math.random() * 100}%;background:var(${colors[i % 3]});animation-delay:${Math.random() * 0.5}s;animation-duration:${1 + Math.random()}s`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }
}

function finishBattle() {
    if (S.bTimer) { clearTimeout(S.bTimer); clearInterval(S.bTimer); S.bTimer = null; }
    if (S.aiTimer) { clearTimeout(S.aiTimer); S.aiTimer = null; }
    S.bActive = false;
    S.finished = true;

    const elapsed = (Date.now() - S.bStart) / 1000;
    const pWpm = Math.round((S.bOk / 5) / (elapsed / 60));
    let aiTotal = 0;
    for (let i = 0; i < S.aiWIdx && i < S.bWords.length; i++) aiTotal += S.bWords[i].length;
    aiTotal += S.aiCIdx;
    const aiWpm = Math.round((aiTotal / 5) / (elapsed / 60));
    const pAcc = (S.bOk + S.bBad) > 0 ? Math.round(S.bOk / (S.bOk + S.bBad) * 100) : 0;

    $('#battle-arena').classList.add('hidden');
    $('#battle-results').classList.remove('hidden');
    $('#battle-player-final-wpm').textContent = pWpm;
    $('#battle-ai-final-wpm').textContent = aiWpm;
    $('#battle-player-final-acc').textContent = pAcc + '% acc';
    $('#battle-ai-final-acc').textContent = '99% acc';

    const w = $('#battle-winner');
    if (pWpm > aiWpm) {
        w.textContent = 'You Win!';
        w.className = 'battle-winner win';
        S.bWon++;
        spawnConfetti();
    } else if (pWpm < aiWpm) {
        w.textContent = 'You Lose';
        w.className = 'battle-winner lose';
    } else {
        w.textContent = 'Draw!';
        w.className = 'battle-winner draw';
    }
    S.bTotal++;
    save();
}

function resetBattle() {
    if (S.bTimer) { clearTimeout(S.bTimer); clearInterval(S.bTimer); S.bTimer = null; }
    if (S.aiTimer) { clearTimeout(S.aiTimer); S.aiTimer = null; }
    S.bActive = false;
    S.finished = false;
    S.bStarted = false;
    $('#battle-arena').classList.add('hidden');
    $('#battle-results').classList.add('hidden');
    $('.battle-config').classList.remove('hidden');
}
