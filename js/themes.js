const THEMES = {
    default_dark: {
        name: "Dark (Default)",
        bg: "#323437",
        bgSecondary: "#2c2e31",
        text: "#d1d0c5",
        textDim: "#646669",
        accent: "#e2b714",
        error: "#ca4754",
        errorExtra: "#7e2a33",
        correct: "#d1d0c5",
        caret: "#e2b714",
        sub: "#646669"
    },
    serika_dark: {
        name: "Serika Dark",
        bg: "#323437",
        bgSecondary: "#2c2e31",
        text: "#d1d0c5",
        textDim: "#646669",
        accent: "#e2b714",
        error: "#ca4754",
        errorExtra: "#7e2a33",
        correct: "#d1d0c5",
        caret: "#e2b714",
        sub: "#646669"
    },
    monokai: {
        name: "Monokai",
        bg: "#272822",
        bgSecondary: "#1e1f1c",
        text: "#f8f8f2",
        textDim: "#75715e",
        accent: "#f92672",
        error: "#fd971f",
        errorExtra: "#9c5d1b",
        correct: "#f8f8f2",
        caret: "#f92672",
        sub: "#75715e"
    },
    dracula: {
        name: "Dracula",
        bg: "#282a36",
        bgSecondary: "#21222c",
        text: "#f8f8f2",
        textDim: "#6272a4",
        accent: "#bd93f9",
        error: "#ff5555",
        errorExtra: "#993333",
        correct: "#f8f8f2",
        caret: "#bd93f9",
        sub: "#6272a4"
    },
    nord: {
        name: "Nord",
        bg: "#2e3440",
        bgSecondary: "#272c36",
        text: "#d8dee9",
        textDim: "#4c566a",
        accent: "#88c0d0",
        error: "#bf616a",
        errorExtra: "#7a3d43",
        correct: "#d8dee9",
        caret: "#88c0d0",
        sub: "#4c566a"
    },
    gruvbox: {
        name: "Gruvbox Dark",
        bg: "#282828",
        bgSecondary: "#1d2021",
        text: "#ebdbb2",
        textDim: "#665c54",
        accent: "#fabd2f",
        error: "#fb4934",
        errorExtra: "#9d3020",
        correct: "#ebdbb2",
        caret: "#fabd2f",
        sub: "#665c54"
    },
    solarized_dark: {
        name: "Solarized Dark",
        bg: "#002b36",
        bgSecondary: "#073642",
        text: "#839496",
        textDim: "#586e75",
        accent: "#b58900",
        error: "#dc322f",
        errorExtra: "#8b1f1d",
        correct: "#839496",
        caret: "#b58900",
        sub: "#586e75"
    },
    tokyo_night: {
        name: "Tokyo Night",
        bg: "#1a1b26",
        bgSecondary: "#16161e",
        text: "#a9b1d6",
        textDim: "#565f89",
        accent: "#7aa2f7",
        error: "#f7768e",
        errorExtra: "#9c4a59",
        correct: "#a9b1d6",
        caret: "#7aa2f7",
        sub: "#565f89"
    },
    catppuccin: {
        name: "Catppuccin Mocha",
        bg: "#1e1e2e",
        bgSecondary: "#181825",
        text: "#cdd6f4",
        textDim: "#585b70",
        accent: "#cba6f7",
        error: "#f38ba8",
        errorExtra: "#9a5869",
        correct: "#cdd6f4",
        caret: "#cba6f7",
        sub: "#585b70"
    },
    rose_pine: {
        name: "Rose Pine",
        bg: "#191724",
        bgSecondary: "#1f1d2e",
        text: "#e0def4",
        textDim: "#6e6a86",
        accent: "#c4a7e7",
        error: "#eb6f92",
        errorExtra: "#94465c",
        correct: "#e0def4",
        caret: "#c4a7e7",
        sub: "#6e6a86"
    },
    one_dark: {
        name: "One Dark",
        bg: "#282c34",
        bgSecondary: "#21252b",
        text: "#abb2bf",
        textDim: "#5c6370",
        accent: "#61afef",
        error: "#e06c75",
        errorExtra: "#8c4349",
        correct: "#abb2bf",
        caret: "#61afef",
        sub: "#5c6370"
    },
    ayu_dark: {
        name: "Ayu Dark",
        bg: "#0a0e14",
        bgSecondary: "#0d1117",
        text: "#bfbdb6",
        textDim: "#565b66",
        accent: "#e6b450",
        error: "#d95757",
        errorExtra: "#883737",
        correct: "#bfbdb6",
        caret: "#e6b450",
        sub: "#565b66"
    },
    light: {
        name: "Light",
        bg: "#ffffff",
        bgSecondary: "#f0f0f0",
        text: "#2c2c2c",
        textDim: "#b0b0b0",
        accent: "#e2b714",
        error: "#ca4754",
        errorExtra: "#e8a0a7",
        correct: "#2c2c2c",
        caret: "#e2b714",
        sub: "#b0b0b0"
    },
    paper: {
        name: "Paper",
        bg: "#eeeeee",
        bgSecondary: "#e0e0e0",
        text: "#444444",
        textDim: "#b2b2b2",
        accent: "#444444",
        error: "#d44",
        errorExtra: "#e99",
        correct: "#444444",
        caret: "#444444",
        sub: "#b2b2b2"
    },
    ocean: {
        name: "Ocean",
        bg: "#0b1929",
        bgSecondary: "#0a1525",
        text: "#a3c4e0",
        textDim: "#3a5a7c",
        accent: "#00bcd4",
        error: "#ff6b6b",
        errorExtra: "#993f3f",
        correct: "#a3c4e0",
        caret: "#00bcd4",
        sub: "#3a5a7c"
    },
    matrix: {
        name: "Matrix",
        bg: "#0d0208",
        bgSecondary: "#0a0108",
        text: "#00ff41",
        textDim: "#003b00",
        accent: "#00ff41",
        error: "#ff0000",
        errorExtra: "#660000",
        correct: "#00ff41",
        caret: "#00ff41",
        sub: "#003b00"
    },
    cyberpunk: {
        name: "Cyberpunk",
        bg: "#120024",
        bgSecondary: "#0e001c",
        text: "#e0d0ff",
        textDim: "#5a3d7a",
        accent: "#ff00ff",
        error: "#ff3366",
        errorExtra: "#992040",
        correct: "#e0d0ff",
        caret: "#ff00ff",
        sub: "#5a3d7a"
    },
    sunset: {
        name: "Sunset",
        bg: "#1a1020",
        bgSecondary: "#150c1a",
        text: "#e8d0c0",
        textDim: "#6a5060",
        accent: "#ff6b35",
        error: "#ff4444",
        errorExtra: "#992929",
        correct: "#e8d0c0",
        caret: "#ff6b35",
        sub: "#6a5060"
    },
    catppuccin_latte: {
        name: "Catppuccin Latte",
        bg: "#eff1f5",
        bgSecondary: "#e6e9ef",
        text: "#4c4f69",
        textDim: "#9ca0b0",
        accent: "#8839ef",
        error: "#d20f39",
        errorExtra: "#f5c6cb",
        correct: "#4c4f69",
        caret: "#8839ef",
        sub: "#9ca0b0"
    },
    synthwave: {
        name: "Synthwave",
        bg: "#1a1333",
        bgSecondary: "#140f28",
        text: "#ff79c6",
        textDim: "#6272a4",
        accent: "#f72585",
        error: "#ff4444",
        errorExtra: "#661111",
        correct: "#ff79c6",
        caret: "#f72585",
        sub: "#6272a4"
    },
    everforest: {
        name: "Everforest",
        bg: "#2d353b",
        bgSecondary: "#272e33",
        text: "#d3c6aa",
        textDim: "#5c6a72",
        accent: "#a7c080",
        error: "#e67e80",
        errorExtra: "#933434",
        correct: "#d3c6aa",
        caret: "#a7c080",
        sub: "#5c6a72"
    },
    kanagawa: {
        name: "Kanagawa",
        bg: "#1f1f28",
        bgSecondary: "#16161d",
        text: "#dcd7ba",
        textDim: "#54546d",
        accent: "#957fb8",
        error: "#c34043",
        errorExtra: "#7a2a2c",
        correct: "#dcd7ba",
        caret: "#957fb8",
        sub: "#54546d"
    },
    night_owl: {
        name: "Night Owl",
        bg: "#011627",
        bgSecondary: "#010e1a",
        text: "#d6deeb",
        textDim: "#4b6479",
        accent: "#82aaff",
        error: "#ef5350",
        errorExtra: "#8b0000",
        correct: "#d6deeb",
        caret: "#82aaff",
        sub: "#4b6479"
    },
    github_dark: {
        name: "GitHub Dark",
        bg: "#0d1117",
        bgSecondary: "#090d12",
        text: "#e6edf3",
        textDim: "#484f58",
        accent: "#2f81f7",
        error: "#f85149",
        errorExtra: "#6e2e2b",
        correct: "#e6edf3",
        caret: "#2f81f7",
        sub: "#484f58"
    },
    solarized_light: {
        name: "Solarized Light",
        bg: "#fdf6e3",
        bgSecondary: "#eee8d5",
        text: "#657b83",
        textDim: "#93a1a1",
        accent: "#268bd2",
        error: "#dc322f",
        errorExtra: "#f1c0bf",
        correct: "#657b83",
        caret: "#268bd2",
        sub: "#93a1a1"
    },
    material_ocean: {
        name: "Material Ocean",
        bg: "#0f111a",
        bgSecondary: "#090b10",
        text: "#8f93a2",
        textDim: "#464b5d",
        accent: "#84ffff",
        error: "#ff5370",
        errorExtra: "#891528",
        correct: "#8f93a2",
        caret: "#84ffff",
        sub: "#464b5d"
    },
    horizon: {
        name: "Horizon",
        bg: "#1c1e26",
        bgSecondary: "#16181f",
        text: "#e0e0e0",
        textDim: "#6c6f93",
        accent: "#fab38e",
        error: "#e95678",
        errorExtra: "#8b2c44",
        correct: "#e0e0e0",
        caret: "#fab38e",
        sub: "#6c6f93"
    },
    cobalt2: {
        name: "Cobalt2",
        bg: "#132738",
        bgSecondary: "#0d1e2c",
        text: "#ffffff",
        textDim: "#0d6b96",
        accent: "#ffc600",
        error: "#ff0000",
        errorExtra: "#660000",
        correct: "#ffffff",
        caret: "#ffc600",
        sub: "#0d6b96"
    },
    palenight: {
        name: "Palenight",
        bg: "#292d3e",
        bgSecondary: "#1e2030",
        text: "#a6accd",
        textDim: "#4b526d",
        accent: "#c792ea",
        error: "#f07178",
        errorExtra: "#7a3538",
        correct: "#a6accd",
        caret: "#c792ea",
        sub: "#4b526d"
    },
    ice: {
        name: "Ice",
        bg: "#e8f4f8",
        bgSecondary: "#d4ecf7",
        text: "#2c3e50",
        textDim: "#95a5a6",
        accent: "#3498db",
        error: "#e74c3c",
        errorExtra: "#f8c8c5",
        correct: "#2c3e50",
        caret: "#3498db",
        sub: "#95a5a6"
    },
    coral: {
        name: "Coral",
        bg: "#1a1a2e",
        bgSecondary: "#16213e",
        text: "#e8c9c9",
        textDim: "#6b4c6b",
        accent: "#ff6b6b",
        error: "#ff9f43",
        errorExtra: "#7d4d20",
        correct: "#e8c9c9",
        caret: "#ff6b6b",
        sub: "#6b4c6b"
    },
    mint: {
        name: "Mint",
        bg: "#0d2137",
        bgSecondary: "#071828",
        text: "#b0d4c5",
        textDim: "#2d6a4f",
        accent: "#52b788",
        error: "#e63946",
        errorExtra: "#7a1b20",
        correct: "#b0d4c5",
        caret: "#52b788",
        sub: "#2d6a4f"
    }
};

const FONTS = [
    { name: "JetBrains Mono", family: "'JetBrains Mono', monospace" },
    { name: "Fira Code", family: "'Fira Code', monospace" },
    { name: "Source Code Pro", family: "'Source Code Pro', monospace" },
    { name: "IBM Plex Mono", family: "'IBM Plex Mono', monospace" },
    { name: "Roboto Mono", family: "'Roboto Mono', monospace" }
];

function hexToRgba(hex, alpha) {
    const clean = hex.replace("#", "");
    const expanded = clean.length === 3
        ? clean.split("").map(c => c + c).join("")
        : clean;
    const r = parseInt(expanded.substring(0, 2), 16);
    const g = parseInt(expanded.substring(2, 4), 16);
    const b = parseInt(expanded.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyTheme(themeKey) {
    const theme = THEMES[themeKey];
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--bg-secondary", theme.bgSecondary);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--text-dim", theme.textDim);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--error", theme.error);
    root.style.setProperty("--error-extra", theme.errorExtra);
    root.style.setProperty("--correct", theme.correct);
    root.style.setProperty("--caret", theme.caret);
    root.style.setProperty("--sub", theme.sub);
    root.style.setProperty("--accent-bg", hexToRgba(theme.accent, 0.08));
}
