// ===============================
// 📂 app.js - Dashboard 
// ===============================

// --- MÓDULOS ANTIGOS ---
import { updateSystemTime, startSystemTime } from './widgets/universal_time.js';
import { initSystemResources, startSystemResources } from './widgets/system_resources.js';
import { initMainChart, startMainChart } from './widgets/main_chart.js';
import { initWeather, startWeather } from './widgets/weather.js';
import { initCrypto, startCrypto } from './widgets/crypto.js';
import { initPomodoro } from './widgets/pomodoro.js';
import { initNotes } from './widgets/notes.js';

// --- MÓDULOS NOVOS ---
import { initClipboardManager } from './widgets/clipboard-manager.js';
import { initQuickCalculator } from './widgets/quick-calculator.js';
import { initTodoList } from './widgets/todo-list.js';
import { initFocusMode } from './widgets/focus-mode.js';
import { initSystemNotes } from './widgets/system-notes.js';
import { initMediaTracker } from './widgets/media-tracker.js';

// ==========================================================
// 🎬 MATRIX EFFECT
// ==========================================================
function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    if (!matrixBg) return;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    matrixBg.innerHTML = '';

    const count = window.innerWidth < 768 ? 20 : 50;
    for (let i = 0; i < count; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 3 + 's';
        char.style.animationDuration = (3 + Math.random() * 2) + 's';
        matrixBg.appendChild(char);
    }
}

// ==========================================================
// 🕐 UNIVERSAL TIME
// ==========================================================
async function initUniversalTime() {
    updateSystemTime();
    return Promise.resolve();
}

// ==========================================================
// 🚀 MAIN INIT FUNCTION
// ==========================================================
async function initApp() {
    console.log('🚀 Inicializando Dashboard...');

    createMatrixRain();
    window.addEventListener('resize', createMatrixRain);

    // Helper para inicializar módulos de forma isolada
    async function safeInit(name, fn) {
        try {
            console.log(`➡️ ${name}...`);
            await fn();
            console.log(`✅ ${name}`);
        } catch (err) {
            console.error(`❌ Falha em ${name}:`, err);
        }
    }

    // --- Antigos ---
    await safeInit("Universal Time", initUniversalTime);
    await safeInit("System Resources", initSystemResources);
    await safeInit("Main Chart", initMainChart);
    await safeInit("Weather", initWeather);
    await safeInit("Crypto", initCrypto);
    await safeInit("Pomodoro", initPomodoro);
    await safeInit("Notes", initNotes);

    // --- Novos ---
    await safeInit("Clipboard Manager", initClipboardManager);
    await safeInit("Quick Calculator", initQuickCalculator);
    await safeInit("To-Do List", initTodoList);
    await safeInit("Focus Mode", initFocusMode);
    await safeInit("System Notes", initSystemNotes);
    await safeInit("Media Tracker", initMediaTracker);

    // Loops contínuos (só nos antigos)
    try { startSystemTime(); } catch {}
    try { startSystemResources(); } catch {}
    try { startMainChart(); } catch {}
    try { startWeather(); } catch {}
    try { startCrypto(); } catch {}

    // Mensagem final
    const alertElement = document.getElementById('systemAlert');
    if (alertElement) {
        alertElement.innerHTML = '✅ All systems online <span class="terminal-cursor"></span>';
    }
    console.log('✨ Dashboard inicializado!');
}

// ==========================================================
// ⏳ DOM Ready
// ==========================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
