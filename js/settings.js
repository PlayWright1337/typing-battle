function setupSettings() {
    $('#font-size-slider').addEventListener('input', e => {
        S.fontSize = parseInt(e.target.value);
        $('#font-size-value').textContent = S.fontSize + 'px';
        applyFont();
        save();
    });

    $$('#caret-options .config-btn').forEach(b => b.addEventListener('click', () => {
        S.caret = b.dataset.caret;
        $$('#caret-options .config-btn').forEach(x => x.classList.toggle('active', x === b));
        save();
    }));

    $$('[data-smooth]').forEach(b => b.addEventListener('click', () => {
        S.smooth = b.dataset.smooth === 'on';
        $$('[data-smooth]').forEach(x => x.classList.toggle('active', x === b));
        save();
    }));

    $$('[data-sound]').forEach(b => b.addEventListener('click', () => {
        S.sound = b.dataset.sound === 'on';
        $$('[data-sound]').forEach(x => x.classList.toggle('active', x === b));
        save();
    }));

    $$('[data-sound-type]').forEach(b => b.addEventListener('click', () => {
        S.soundType = b.dataset.soundType;
        $$('[data-sound-type]').forEach(x => x.classList.toggle('active', x === b));
        save();
    }));

    $$('#lang-options .config-btn').forEach(b => b.addEventListener('click', () => {
        S.lang = b.dataset.lang;
        $$('#lang-options .config-btn').forEach(x => x.classList.toggle('active', x === b));
        resetTest();
        save();
    }));
}

function renderSettings() {
    const tg = $('#theme-grid');
    tg.innerHTML = '';
    Object.keys(THEMES).forEach(k => {
        const t = THEMES[k];
        const card = document.createElement('div');
        card.className = 'theme-card' + (S.theme === k ? ' active' : '');
        card.style.background = t.bg;
        card.innerHTML = `
            <div class="theme-preview">
                <div class="theme-preview-color" style="background:${t.accent}"></div>
                <div class="theme-preview-color" style="background:${t.text}"></div>
                <div class="theme-preview-color" style="background:${t.sub}"></div>
                <div class="theme-preview-color" style="background:${t.error}"></div>
            </div>
            <div class="theme-name" style="color:${t.text}">${t.name}</div>
        `;
        card.addEventListener('click', () => {
            S.theme = k;
            applyTheme(k);
            $$('.theme-card').forEach(c => c.classList.toggle('active', c === card));
            save();
        });
        tg.appendChild(card);
    });

    const fg = $('#font-grid');
    fg.innerHTML = '';
    FONTS.forEach((f, i) => {
        const card = document.createElement('div');
        card.className = 'font-card' + (S.fontIdx === i ? ' active' : '');
        card.style.fontFamily = f.family;
        card.textContent = f.name;
        card.addEventListener('click', () => {
            S.fontIdx = i;
            applyFont();
            $$('.font-card').forEach(c => c.classList.toggle('active', c === card));
            save();
        });
        fg.appendChild(card);
    });

    const slider = $('#font-size-slider');
    if (slider) slider.value = S.fontSize;
    const fsVal = $('#font-size-value');
    if (fsVal) fsVal.textContent = S.fontSize + 'px';

    $$('#caret-options .config-btn').forEach(b => b.classList.toggle('active', b.dataset.caret === S.caret));
    $$('[data-smooth]').forEach(b => b.classList.toggle('active', (b.dataset.smooth === 'on') === S.smooth));
    $$('[data-sound]').forEach(b => b.classList.toggle('active', (b.dataset.sound === 'on') === S.sound));
    $$('#lang-options .config-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === S.lang));
    $$('[data-sound-type]').forEach(b => b.classList.toggle('active', b.dataset.soundType === S.soundType));
}
