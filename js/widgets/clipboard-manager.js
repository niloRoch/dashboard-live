// Clipboard Manager Widget - js/widgets/clipboard-manager.js

class ClipboardManagerWidget {
    constructor() {
        this.lastCopiedText = this.loadLastCopied();
    }

    loadLastCopied() {
        try {
            return localStorage.getItem('lastCopiedText') || 'Nada copiado ainda.';
        } catch {
            return 'Nada copiado ainda.';
        }
    }

    updateClipboard(text) {
        this.lastCopiedText = text;
        try {
            localStorage.setItem('lastCopiedText', text);
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
        this.render();
    }

    async pasteToClipboard() {
        try {
            if (this.lastCopiedText && this.lastCopiedText !== 'Nada copiado ainda.') {
                await navigator.clipboard.writeText(this.lastCopiedText);
                alert('Texto copiado de volta para a área de transferência!');
            }
        } catch (err) {
            console.error('Falha ao copiar: ', err);
            alert('Falha ao acessar a área de transferência. Verifique as permissões do navegador.');
        }
    }

    render() {
        const container = document.getElementById('clipboardManager');
        if (!container) return;

        container.innerHTML = `
            <div class="panel-title">📋 Clipboard Manager</div>
            <div style="font-size: 12px; margin: 10px 0; padding: 8px; background: rgba(168, 85, 247, 0.1); border-radius: 4px; word-break: break-all; max-height: 80px; overflow-y: auto;">
                ${this.lastCopiedText || 'Nada copiado ainda.'}
            </div>
            <button id="pasteClipboardBtn" class="pomodoro-controls button" style="width: 100%; padding: 8px; background: #1e1b4b; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; cursor: pointer;">📋 Colar</button>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const pasteBtn = document.getElementById('pasteClipboardBtn');
        if (pasteBtn) {
            pasteBtn.addEventListener('click', () => this.pasteToClipboard());
        }
    }

    init() {
        console.log('Initializing Clipboard Manager widget...');
        this.render();

        // Listen for copy events
        document.addEventListener('copy', async (e) => {
            let copiedText = '';
            if (window.getSelection) {
                copiedText = window.getSelection().toString();
            }
            if (copiedText) {
                this.updateClipboard(copiedText);
            }
        });

        // Try to read clipboard on load (if permitted)
        if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
                if (result.state === 'granted' || result.state === 'prompt') {
                    navigator.clipboard.readText().then(text => {
                        if (text && text !== this.lastCopiedText) {
                            this.updateClipboard(text);
                        }
                    }).catch(err => {
                        console.warn('Não foi possível ler da área de transferência automaticamente:', err);
                    });
                }
            });
        }

        console.log('Clipboard Manager widget initialized');
    }
}

// Quick Calculator Widget - js/widgets/quick-calculator.js

class QuickCalculatorWidget {
    constructor() {
        this.currentExpression = '';
        this.currentResult = '= ?';
    }

    calculate() {
        const input = document.getElementById('calcInput');
        const resultDiv = document.getElementById('calcResult');
        
        if (!input || !resultDiv) return;

        try {
            // Enhanced security: only allow basic math operations and Math functions
            const allowedExpression = input.value
                .replace(/[^0-9+\-*/().\s]/g, '') // Remove non-math characters
                .replace(/Math\./g, 'Math.'); // Allow Math functions

            // Additional safety: use Function constructor instead of eval
            const result = Function('"use strict"; return (' + allowedExpression + ')')();
            
            if (typeof result === 'number' && isFinite(result)) {
                resultDiv.textContent = `= ${result}`;
                resultDiv.style.color = '#ec4899';
            } else {
                throw new Error('Invalid result');
            }
        } catch (error) {
            resultDiv.textContent = 'Erro na expressão';
            resultDiv.style.color = '#ff0040';
        }
    }

    render() {
        const container = document.getElementById('quickCalculator');
        if (!container) return;

        container.innerHTML = `
            <div class="panel-title">🧮 Quick Calculator</div>
            <input type="text" id="calcInput" placeholder="Digite 2+2*3..." style="width: 100%; padding: 8px; margin: 10px 0; background: #0a0a0a; color: #a855f7; border: 1px solid #a855f7; border-radius: 4px; font-family: 'Orbitron', monospace;">
            <div style="font-size: 14px; font-weight: bold; color: #ec4899; margin: 5px 0;" id="calcResult">= ?</div>
            <div style="font-size: 10px; color: #888;">Suporta: +, -, *, /, (, ), Math.PI, Math.sqrt(), etc.</div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const input = document.getElementById('calcInput');
        if (input) {
            input.addEventListener('input', () => this.calculate());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculate();
                }
            });
        }
    }

    init() {
        console.log('Initializing Quick Calculator widget...');
        this.render();
        console.log('Quick Calculator widget initialized');
    }
}

// Focus Mode Widget - js/widgets/focus-mode.js

class FocusModeWidget {
    constructor() {
        this.isFocusMode = false;
        this.focusOverlay = null;
    }

    toggleFocusMode() {
        this.isFocusMode = !this.isFocusMode;
        
        if (this.isFocusMode) {
            this.enableFocusMode();
        } else {
            this.disableFocusMode();
        }
        
        this.updateButton();
    }

    enableFocusMode() {
        // Create focus overlay
        this.focusOverlay = document.createElement('div');
        this.focusOverlay.id = 'focusOverlay';
        this.focusOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #a855f7;
            font-family: 'Orbitron', monospace;
            backdrop-filter: blur(5px);
        `;

        this.focusOverlay.innerHTML = `
            <div style="text-align: center; max-width: 600px; padding: 40px;">
                <h1 style="font-size: 3em; margin-bottom: 20px; color: #ec4899;">🎯 FOCUS MODE</h1>
                <p style="font-size: 1.2em; margin-bottom: 30px; line-height: 1.6;">
                    Minimize distractions. Focus on what matters most right now.
                </p>
                <div style="font-size: 4em; margin: 30px 0;" id="focusTimer">25:00</div>
                <div style="margin: 20px 0;">
                    <button id="focusStartTimer" style="margin: 0 10px; padding: 10px 20px; background: #1e1b4b; color: #a855f7; border: 2px solid #a855f7; border-radius: 8px; cursor: pointer; font-size: 1.1em;">Start Timer</button>
                    <button id="focusExitMode" style="margin: 0 10px; padding: 10px 20px; background: transparent; color: #ff0040; border: 2px solid #ff0040; border-radius: 8px; cursor: pointer; font-size: 1.1em;">Exit Focus</button>
                </div>
                <div style="margin-top: 40px; font-size: 0.9em; color: #888;">
                    Press ESC to exit focus mode
                </div>
            </div>
        `;

        document.body.appendChild(this.focusOverlay);

        // Add escape key listener
        this.handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                this.disableFocusMode();
                this.updateButton();
            }
        };
        document.addEventListener('keydown', this.handleKeyPress);

        // Add button listeners
        const startTimerBtn = document.getElementById('focusStartTimer');
        const exitBtn = document.getElementById('focusExitMode');

        if (startTimerBtn) {
            startTimerBtn.addEventListener('click', () => this.startFocusTimer());
        }

        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                this.disableFocusMode();
                this.updateButton();
            });
        }

        console.log('Focus mode enabled');
    }

    disableFocusMode() {
        if (this.focusOverlay) {
            document.body.removeChild(this.focusOverlay);
            this.focusOverlay = null;
        }

        if (this.handleKeyPress) {
            document.removeEventListener('keydown', this.handleKeyPress);
        }

        if (this.focusTimerInterval) {
            clearInterval(this.focusTimerInterval);
        }

        this.isFocusMode = false;
        console.log('Focus mode disabled');
    }

    startFocusTimer() {
        let timeLeft = 25 * 60; // 25 minutes
        const timerEl = document.getElementById('focusTimer');
        const startBtn = document.getElementById('focusStartTimer');

        if (startBtn) startBtn.textContent = 'Timer Running...';

        this.focusTimerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (timerEl) {
                timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }

            if (timeLeft <= 0) {
                clearInterval(this.focusTimerInterval);
                if (timerEl) timerEl.textContent = '✅ DONE!';
                if (startBtn) startBtn.textContent = 'Start New Timer';
                
                // Play notification
                try {
                    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                    audio.play().catch(e => console.log('Audio play failed:', e));
                } catch (e) {
                    console.log('Audio not supported');
                }
                return;
            }

            timeLeft--;
        }, 1000);
    }

    updateButton() {
        const container = document.getElementById('focusModeToggle');
        if (!container) return;

        container.innerHTML = `
            <div class="panel-title">🎯 Focus Mode</div>
            <button id="toggleFocusBtn" style="
                width: 100%; 
                padding: 20px; 
                font-size: 18px; 
                font-weight: bold;
                background: ${this.isFocusMode ? '#ff0040' : '#1e1b4b'}; 
                color: ${this.isFocusMode ? '#ffffff' : '#a855f7'}; 
                border: 2px solid ${this.isFocusMode ? '#ff0040' : '#a855f7'}; 
                border-radius: 8px; 
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                ${this.isFocusMode ? '🔴 Exit Focus Mode' : '🎯 Enter Focus Mode'}
            </button>
            <div style="font-size: 12px; color: #888; text-align: center; margin-top: 10px;">
                ${this.isFocusMode ? 'Focus mode is active' : 'Click to minimize distractions'}
            </div>
        `;

        const button = document.getElementById('toggleFocusBtn');
        if (button) {
            button.addEventListener('click', () => this.toggleFocusMode());
        }
    }

    render() {
        this.updateButton();
    }

    init() {
        console.log('Initializing Focus Mode widget...');
        this.render();
        console.log('Focus Mode widget initialized');
    }
}

// Initialize all widgets when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const clipboardManager = new ClipboardManagerWidget();
    clipboardManager.init();
    
    const quickCalculator = new QuickCalculatorWidget();
    quickCalculator.init();
    
    const focusMode = new FocusModeWidget();
    focusMode.init();
});