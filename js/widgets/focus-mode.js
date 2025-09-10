export function initFocusMode() {
    const container = document.getElementById('focusModeToggle');
    if (!container) {
        console.warn('Focus Mode container not found');
        return;
    }

    let isFocusMode = false;

    container.innerHTML = `
        <button id="toggleFocusMode" class="pomodoro-controls button" style="width: 100%; padding: 8px; font-size: 14px;">
            🎯 Ativar Focus Mode
        </button>
    `;

    const toggleBtn = document.getElementById('toggleFocusMode');

    function applyFocusMode() {
        const panels = document.querySelectorAll('.panel');
        panels.forEach(panel => {
            const isPomodoro = panel.querySelector('#pomodoroTime');
            const isMainChart = panel.querySelector('#mainChartCanvas') || panel.querySelector('#mainChart');
            if (!isPomodoro && !isMainChart) {
                panel.style.opacity = isFocusMode ? '1' : '0.2';
                panel.style.pointerEvents = isFocusMode ? 'auto' : 'none';
            } else {
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'auto';
            }
        });

        toggleBtn.textContent = isFocusMode ? '🎯 Ativar Focus Mode' : '✅ Desativar Focus Mode';
        toggleBtn.style.background = isFocusMode ? '' : '#ec4899';
        toggleBtn.style.color = isFocusMode ? '' : '#0a0a0a';
    }

    toggleBtn.addEventListener('click', () => {
        isFocusMode = !isFocusMode;
        applyFocusMode();
    });

    // Aplica o estado inicial
    applyFocusMode();

    console.log('Intialized Focus Mode Toggle');
}