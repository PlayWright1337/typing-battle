# ⌨ Typing Battle
### Test Mode
- **Time** — type as many words as possible within a set time limit (15 / 30 / 60 / 120s)
- **Words** — complete a fixed number of words (10 / 25 / 50 / 100)
- **Quote** — type a random quote to completion
- **Zen** — free typing with no timer or word limit
- Optional **punctuation** and **numbers** modifiers
- Live WPM chart shown in results
- Stats tracked: WPM, raw WPM, accuracy, consistency, character breakdown, time

### Battle Mode (vs AI)
- Race against an AI bot in real time
- Choose difficulty: **easy** (30 wpm) · **medium** (60 wpm) · **hard** (90 wpm) · **expert** (120 wpm) · **impossible** (160 wpm)
- Choose duration: **15s** · **30s** · **60s**
- Live progress bars for you and the AI
- End screen with winner announcement and final stats

### Settings
| Option | Choices |
|---|---|
| Theme | 33 themes (see full list below) |
| Font | JetBrains Mono · Fira Code · Source Code Pro · IBM Plex Mono · Roboto Mono |
| Font Size | 14 – 32 px (slider) |
| Caret Style | line · block · underline |
| Smooth Caret | on · off |
| Sound | on · off |
| Language | English · Russian · Code JS · Code Python |

### Statistics Page
- Tests completed, average WPM, best WPM, average accuracy, battles won, total time typing
- Full recent test history with per-test details
- One-click stats reset

---

## Themes

33 built-in themes across dark and light variants:

| Dark | Light |
|---|---|
| Dark (Default) | Light |
| Serika Dark | Paper |
| Monokai | Catppuccin Latte |
| Dracula | Solarized Light |
| Nord | Ice |
| Gruvbox Dark | |
| Solarized Dark | |
| Tokyo Night | |
| Catppuccin Mocha | |
| Rose Pine | |
| One Dark | |
| Ayu Dark | |
| Ocean | |
| Matrix | |
| Cyberpunk | |
| Sunset | |
| Synthwave | |
| Everforest | |
| Kanagawa | |
| Night Owl | |
| GitHub Dark | |
| Material Ocean | |
| Horizon | |
| Cobalt2 | |
| Palenight | |
| Mint | |
| Coral | |

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Tab` + `Enter` | Restart / next test |
| `Esc` | Stop current test |

---

## Project Structure

```
typing-battle/
├── index.html          # Single-page app shell
├── css/
│   ├── base.css        # CSS variables, resets, global styles
│   ├── animations.css  # Keyframe animations & transitions
│   ├── layout.css      # Header, nav, footer, page layout
│   ├── test.css        # Test area, words, caret, results
│   ├── battle.css      # Battle arena, progress bars, scores
│   ├── settings.css    # Theme grid, font grid, controls
│   └── stats.css       # Stats cards, history list
└── js/
    ├── words.js        # Word lists (English, Russian, JS, Python)
    ├── themes.js       # Theme palette definitions + font list
    ├── utils.js        # DOM helpers ($, $$)
    ├── state.js        # Global state (S), localStorage save/load
    ├── audio.js        # Keystroke sound engine
    ├── chart.js        # WPM chart renderer (Canvas API)
    ├── render.js       # Word/caret rendering & caret positioning
    ├── test.js         # Test logic (input handling, WPM calc)
    ├── battle.js       # Battle mode logic (AI simulation)
    ├── settings.js     # Settings UI rendering & event bindings
    ├── stats.js        # Stats page rendering & history
    └── app.js          # App init, navigation, keyboard shortcuts
```

---

## Getting Started

No installation or build step required.

1. Clone or download the repository
2. Open `index.html` in any modern browser

```
typing-battle/index.html
```

All settings and statistics are persisted automatically in `localStorage`.

---

## Browser Support

Works in all modern browsers that support ES6+ and the Canvas API:  
Chrome · Firefox · Edge · Safari
