// System Monitor Effects - js/effects/system-monitor.js

class SystemMonitorEffect {
    constructor() {
        this.metricsUpdateInterval = null;
        this.chartUpdateInterval = null;
        this.coreAnimationInterval = null;
    }

    animateCores() {
        const cores = document.querySelectorAll('.core');
        cores.forEach((core, index) => {
            setTimeout(() => {
                if (Math.random() > 0.3) {
                    core.classList.add('active');
                } else {
                    core.classList.remove('active');
                }
            }, index * 200);
        });
    }

    updateMetrics() {
        // Simulate real-time data changes
        const ramUsage = 65 + Math.random() * 10;
        const cpuUsage = 40 + Math.random() * 20;
        const mongoCount = 847293 + Math.floor(Math.random() * 1000);
        const kafkaInflight = 1200 + Math.floor(Math.random() * 200);
        const processedPerSec = 500 + Math.floor(Math.random() * 50);
        const queueSize = 80 + Math.floor(Math.random() * 20);

        this.updateElement('ramUsage', 'width', ramUsage + '%');
        this.updateElement('ramPercent', 'textContent', ramUsage.toFixed(0) + '%');
        this.updateElement('cpuUsage', 'width', cpuUsage + '%');
        this.updateElement('cpuPercent', 'textContent', cpuUsage.toFixed(0) + '%');
        this.updateElement('mongoCount', 'textContent', mongoCount.toLocaleString());
        this.updateElement('kafkaInflight', 'textContent', kafkaInflight.toLocaleString());
        this.updateElement('processedPerSec', 'textContent', processedPerSec.toString());
        this.updateElement('queueSize', 'textContent', queueSize.toString());

        // Update temperature with color coding
        const temperature = 60 + Math.random() * 15;
        const tempEl = document.getElementById('temperature');
        if (tempEl) {
            tempEl.textContent = `${temperature.toFixed(0)}°C`;
            if (temperature > 70) {
                tempEl.style.color = '#ff0040';
            } else if (temperature > 65) {
                tempEl.style.color = '#ec4899';
            } else {
                tempEl.style.color = '#a855f7';
            }
        }

        // Update uptime
        const uptimeEl = document.getElementById('uptime');
        if (uptimeEl) {
            const now = Date.now();
            const startTime = parseInt(localStorage.getItem('dashboardStartTime')) || now;
            const uptime = now - startTime;
            
            const hours = Math.floor(uptime / (1000 * 60 * 60));
            const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
            
            uptimeEl.textContent = `${hours}h ${minutes}m`;
        }
    }

    updateElement(id, property, value) {
        const element = document.getElementById(id);
        if (element) {
            if (property === 'width') {
                element.style.width = value;
            } else if (property === 'textContent') {
                element.textContent = value;
            }
        }
    }

    createChart() {
        const chart = document.getElementById('mainChart');
        if (!chart) return;
        
        chart.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const line = document.createElement('div');
            line.className = 'chart-line';
            line.style.left = i * 2 + 'px';
            line.style.height = Math.random() * 180 + 20 + 'px';
            line.style.animationDelay = Math.random() * 2 + 's';
            
            // Add gradient colors based on height
            const height = parseInt(line.style.height);
            if (height > 150) {
                line.style.background = 'linear-gradient(to top, #ff0040, #ec4899)';
            } else if (height > 100) {
                line.style.background = 'linear-gradient(to top, #ec4899, #a855f7)';
            } else {
                line.style.background = 'linear-gradient(to top, #a855f7, #22c55e)';
            }
            
            chart.appendChild(line);
        }
    }

    updateSystemAlert() {
        const alertElement = document.getElementById('systemAlert');
        if (alertElement) {
            setTimeout(() => {
                alertElement.innerHTML = '✅ All systems online <span class="terminal-cursor"></span>';
            }, 2000);
        }
    }

    // Memory status updates
    updateMemoryStats() {
        // Simulate memory statistics
        const totalMemory = 32; // GB
        const usedMemory = 12.4 + (Math.random() * 2); // GB
        const swapTotal = 8; // GB
        const swapUsed = 2.1 + (Math.random() * 0.5); // GB
        const cacheUsed = 4.2 + (Math.random() * 0.8); // GB
        const bufferUsed = 1.8 + (Math.random() * 0.4); // GB

        this.updateElement('memoryTotal', 'textContent', `${usedMemory.toFixed(1)}GB / ${totalMemory}GB`);
        this.updateElement('swapUsage', 'textContent', `${swapUsed.toFixed(1)}GB / ${swapTotal}GB`);
        this.updateElement('cacheUsage', 'textContent', `${cacheUsed.toFixed(1)}GB`);
        this.updateElement('bufferUsage', 'textContent', `${bufferUsed.toFixed(1)}GB`);
    }

    init() {
        console.log('Initializing System Monitor Effects...');
        
        // Set dashboard start time for uptime calculation
        if (!localStorage.getItem('dashboardStartTime')) {
            localStorage.setItem('dashboardStartTime', Date.now().toString());
        }
        
        // Initial updates
        this.updateMetrics();
        this.updateMemoryStats();
        this.createChart();
        this.updateSystemAlert();
        
        // Set up intervals
        this.metricsUpdateInterval = setInterval(() => {
            this.updateMetrics();
            this.updateMemoryStats();
        }, 2000);
        
        this.chartUpdateInterval = setInterval(() => this.createChart(), 5000);
        this.coreAnimationInterval = setInterval(() => this.animateCores(), 3000);
        
        console.log('System Monitor Effects initialized');
    }

    destroy() {
        if (this.metricsUpdateInterval) clearInterval(this.metricsUpdateInterval);
        if (this.chartUpdateInterval) clearInterval(this.chartUpdateInterval);
        if (this.coreAnimationInterval) clearInterval(this.coreAnimationInterval);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const systemMonitor = new SystemMonitorEffect();
    systemMonitor.init();
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const systemMonitor = new SystemMonitorEffect();
    systemMonitor.init();
});