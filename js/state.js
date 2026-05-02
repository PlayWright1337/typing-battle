const S = {
    page: 'test', type: 'time', timeVal: 30, wordVal: 25, lang: 'english',
    punct: false, nums: false, theme: 'default_dark', fontIdx: 0, fontSize: 20,
    caret: 'line', smooth: true, sound: false, soundType: 'click',
    words: [], wIdx: 0, cIdx: 0, started: false, finished: false,
    startTime: 0, timer: null, timeLeft: 30,
    ok: 0, bad: 0, extra: 0, miss: 0, wpmLog: [], rawLog: [], wordsDone: 0,
    bDiff: 'medium', bDur: 30, bActive: false, bTimer: null, bTimeLeft: 30,
    bWords: [], bWIdx: 0, bCIdx: 0, bStarted: false, bStart: 0,
    bOk: 0, bBad: 0, aiWpm: 60, aiTimer: null, aiWIdx: 0, aiCIdx: 0,
    hist: [], bWon: 0, bTotal: 0,
    missedKeys: {}
};

const AI_WPM = { easy: 30, medium: 60, hard: 90, expert: 120, impossible: 160 };

function save() {
    const d = {
        theme: S.theme, fontIdx: S.fontIdx, fontSize: S.fontSize,
        caret: S.caret, smooth: S.smooth, sound: S.sound, soundType: S.soundType,
        lang: S.lang, hist: S.hist.slice(-100), bWon: S.bWon, bTotal: S.bTotal,
        missedKeys: S.missedKeys
    };
    try { localStorage.setItem('tb', JSON.stringify(d)); } catch(e) {}
}

function load() {
    try {
        const d = JSON.parse(localStorage.getItem('tb'));
        if (d) Object.assign(S, d);
    } catch(e) {}
}

function applyFont() {
    const f = FONTS[S.fontIdx] || FONTS[0];
    document.documentElement.style.setProperty('--font', f.family);
    document.documentElement.style.setProperty('--font-size', S.fontSize + 'px');
}
