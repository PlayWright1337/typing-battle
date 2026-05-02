(function() {
'use strict';

function cycleTheme() {
    const keys = Object.keys(THEMES);
    const i = (keys.indexOf(S.theme) + 1) % keys.length;
    S.theme = keys[i];
    applyTheme(S.theme);
    save();
    if (S.page === 'settings') renderSettings();
}

function setupNav() {
    $$('#nav .nav-btn').forEach(b => b.addEventListener('click', () => goPage(b.dataset.page)));
}

function goPage(p) {
    S.page = p;
    stopTest();
    $$('#nav .nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === p));
    $$('.page').forEach(el => el.classList.remove('active'));
    const map = { test: '#test-page', battle: '#battle-page', settings: '#settings-page', stats: '#stats-page' };
    if (map[p]) $(map[p]).classList.add('active');
    $('#config-bar').style.display = p === 'test' ? '' : 'none';
    if (p === 'test') resetTest();
    if (p === 'stats') renderStats();
    if (p === 'settings') renderSettings();
}

let tabPressed = false;

function onKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        tabPressed = true;
        setTimeout(() => tabPressed = false, 500);
        return;
    }
    if (e.key === 'Enter' && tabPressed) {
        e.preventDefault();
        if (S.page === 'test') resetTest();
        return;
    }
    if (e.key === 'Escape') {
        if (S.started) { stopTest(); resetTest(); }
        return;
    }
    if (S.page === 'test' && !S.finished) testKey(e);
    if (S.page === 'battle' && S.bActive && !S.finished) battleKey(e);
}

function testKey(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if ($('#results') && !$('#results').classList.contains('hidden')) return;
    if (e.key === 'Backspace') { e.preventDefault(); bksp(); return; }
    if (e.key.length !== 1) return;
    e.preventDefault();
    if (!S.started) startTest();
    typeChar(e.key);
}

function init() {
    load();
    applyTheme(S.theme);
    applyFont();
    setupNav();
    setupCfg();
    setupSettings();
    setupBattle();
    setupStats();
    document.addEventListener('keydown', onKey);
    $('#text-display').addEventListener('click', () => $('#typing-input').focus());
    $('#theme-toggle').addEventListener('click', cycleTheme);
    $('#restart-btn').addEventListener('click', resetTest);
    genTest();
    updValBtns();
}

init();
})();
