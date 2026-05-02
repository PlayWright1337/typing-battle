function setupStats() {
    $('#clear-stats').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all statistics?')) {
            S.hist = [];
            S.bWon = 0;
            S.bTotal = 0;
            S.missedKeys = {};
            save();
            renderStats();
        }
    });
}

function renderStats() {
    const totalTests = S.hist.length;
    const avgWpm = totalTests ? Math.round(S.hist.reduce((a, b) => a + b.wpm, 0) / totalTests) : 0;
    const bestWpm = totalTests ? Math.max(...S.hist.map(h => h.wpm)) : 0;
    const avgAcc = totalTests ? Math.round(S.hist.reduce((a, b) => a + b.acc, 0) / totalTests) : 0;
    const totalTime = Math.round(S.hist.reduce((a, b) => a + (b.time || 0), 0) / 60);

    $('#stat-tests').textContent = totalTests;
    $('#stat-avg-wpm').textContent = avgWpm;
    $('#stat-best-wpm').textContent = bestWpm;
    $('#stat-avg-acc').textContent = avgAcc + '%';
    $('#stat-battles-won').textContent = S.bWon + '/' + S.bTotal;
    $('#stat-total-time').textContent = totalTime + 'm';

    const hl = $('#history-list');
    hl.innerHTML = '';
    if (totalTests === 0) {
        hl.innerHTML = '<div class="history-empty">No tests completed yet. Start typing!</div>';
    } else {
        S.hist.slice().reverse().slice(0, 20).forEach(h => {
            const item = document.createElement('div');
            item.className = 'history-item';
            const date = new Date(h.date).toLocaleDateString();
            item.innerHTML = `<div class="history-wpm">${h.wpm} wpm</div><div class="history-acc">${h.acc}% acc</div><div class="history-mode">${h.mode}${h.lang ? ' \xb7 ' + h.lang : ''}</div><div class="history-date">${date}</div>`;
            hl.appendChild(item);
        });
    }

    if (S.hist.length >= 2 && typeof drawStatsChart === 'function') {
        drawStatsChart('#stats-chart-canvas', S.hist.slice(-20));
    }

    const missedKeys = S.missedKeys || {};
    const sortedKeys = Object.entries(missedKeys).sort((a, b) => b[1] - a[1]).slice(0, 5);
    let mk = $('#missed-keys');
    if (!mk) {
        mk = document.createElement('div');
        mk.id = 'missed-keys';
        mk.className = 'missed-keys';
        const clearBtn = $('#clear-stats');
        if (clearBtn && clearBtn.parentNode) {
            clearBtn.parentNode.insertBefore(mk, clearBtn);
        }
    }
    if (sortedKeys.length > 0) {
        mk.innerHTML = '<h3>Most Missed Keys</h3><div class="missed-keys-list">' +
            sortedKeys.map(([key, count]) => `<span class="missed-key-badge">${key} <small>${count}</small></span>`).join('') +
            '</div>';
        mk.style.display = '';
    } else {
        mk.style.display = 'none';
    }
}
