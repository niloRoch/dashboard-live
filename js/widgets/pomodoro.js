// Pomodoro Widget - js/widgets/pomodoro.js

class PomodoroWidget {
    constructor() {
        this.timerInterval = null;
        this.timeLeft = 0;
        this.isRunning = false;
        this.isWorkSession = true; // true = work, false = break
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    setTime(seconds) {
        this.timeLeft = seconds;
        const timeDisplay = document.getElementById('pomodoroTime');
        if (timeDisplay) {
            timeDisplay.textContent = this.formatTime(this.timeLeft);
        }
    }

    startTimer() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const startBtn = document.getElementById('pomodoroStart');
        const statusDisplay = document.getElementById('pomodoroStatus');
        
        if (startBtn) startBtn.textContent = '⏸️ Pause';
        if (statusDisplay) statusDisplay.textContent = `Status: ${this.isWorkSession ? 'Working' : 'On Break'}...`;

        this.timerInterval = setInterval(() => {
            if (this.timeLeft <= 0) {
                this.completeSession();
                return;
            }
            
            this.timeLeft--;
            const timeDisplay = document.getElementById('pomodoroTime');
            if (timeDisplay) {
                timeDisplay.textContent = this.formatTime(this.timeLeft);
            }
        }, 1000);
    }

    pauseTimer() {
        if (!this.isRunning) return;
        
        clearInterval(this.timerInterval);
        this.isRunning = false;
        
        const startBtn = document.getElementById('pomodoroStart');
        const statusDisplay = document.getElementById('pomodoroStatus');
        
        if (startBtn) startBtn.textContent = '▶️ Resume';
        if (statusDisplay) statusDisplay.textContent = 'Status: Paused';
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.isWorkSession = true;
        
        const workInput = document.getElementById('workMinutes');
        const workMinutes = workInput ? parseInt(workInput.value) : 25;
        
        this.setTime(workMinutes * 60);
        
        const startBtn = document.getElementById('pomodoroStart');
        const statusDisplay = document.getElementById('pomodoroStatus');
        
        if (startBtn) startBtn.textContent = '▶️ Start';
        if (statusDisplay) statusDisplay.textContent = 'Status: Ready';
    }

    completeSession() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.isWorkSession = !this.isWorkSession;
        
        const workInput = document.getElementById('workMinutes');
        const breakInput = document.getElementById('breakMinutes');
        const startBtn = document.getElementById('pomodoroStart');
        const statusDisplay = document.getElementById('pomodoroStatus');
        
        const workMinutes = workInput ? parseInt(workInput.value) : 25;
        const breakMinutes = breakInput ? parseInt(breakInput.value) : 5;
        
        this.setTime(this.isWorkSession ? workMinutes * 60 : breakMinutes * 60);
        
        if (startBtn) startBtn.textContent = '▶️ Start';
        if (statusDisplay) {
            statusDisplay.textContent = `Status: Session ended! ${this.isWorkSession ? 'Ready for work?' : 'Ready for break?'}`;
        }
        
        // Play notification sound
        this.playNotificationSound();
        
        // Show notification if supported
        this.showNotification();
    }

    playNotificationSound() {
        try {
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (error) {
            console.log('Audio not supported:', error);
        }
    }

    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: this.isWorkSession ? 'Work session ready!' : 'Break time ready!',
                icon: '/favicon.ico'
            });
        } else if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification();
                }
            });
        }
    }

    init() {
        console.log('Initializing Pomodoro widget...');
        
        const startBtn = document.getElementById('pomodoroStart');
        const pauseBtn = document.getElementById('pomodoroPause');
        const resetBtn = document.getElementById('pomodoroReset');
        const workInput = document.getElementById('workMinutes');
        const breakInput = document.getElementById('breakMinutes');

        if (!startBtn || !pauseBtn || !resetBtn || !workInput || !breakInput) {
            console.warn('Pomodoro elements not found');
            return;
        }

        // Set initial time
        this.setTime(parseInt(workInput.value) * 60);

        // Event listeners
        startBtn.addEventListener('click', () => {
            if (this.isRunning) {
                this.pauseTimer();
            } else {
                this.startTimer();
            }
        });

        pauseBtn.addEventListener('click', () => this.pauseTimer());
        resetBtn.addEventListener('click', () => this.resetTimer());

        workInput.addEventListener('change', () => {
            if (!this.isRunning && this.isWorkSession) {
                this.setTime(parseInt(workInput.value) * 60);
            }
        });

        breakInput.addEventListener('change', () => {
            if (!this.isRunning && !this.isWorkSession) {
                this.setTime(parseInt(breakInput.value) * 60);
            }
        });

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        console.log('Pomodoro widget initialized');
    }

    destroy() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const pomodoroWidget = new PomodoroWidget();
    pomodoroWidget.init();
});