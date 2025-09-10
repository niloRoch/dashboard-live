// Universal Time Widget - js/widgets/universal-time.js

class UniversalTimeWidget {
    constructor() {
        this.updateInterval = null;
    }

    updateStardate() {
        const now = new Date();
        // Star Trek stardate calculation: Julian day number - 2323000
        const julianDay = (now.getTime() / 86400000) + 2440587.5;
        const stardate = julianDay - 2323000;
        
        const stardateEl = document.getElementById('stardate');
        if (stardateEl) {
            stardateEl.textContent = stardate.toFixed(1);
        }
    }

    updateTime() {
        const now = new Date();
        
        // Get true UTC time (not affected by local timezone)
        const utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
                            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        
        // Format UTC time display
        const utcTimeEl = document.getElementById('utcTime');
        if (utcTimeEl) {
            const hours = now.getUTCHours().toString().padStart(2, '0');
            const minutes = now.getUTCMinutes().toString().padStart(2, '0');
            const seconds = now.getUTCSeconds().toString().padStart(2, '0');
            utcTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
        }
        
        // Calculate progress for various time cycles
        this.calculateTimeProgress(now);
        this.updateStardate();
    }

    calculateTimeProgress(now) {
        // Year progress (UTC)
        const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
        const endOfYear = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1));
        const yearProgress = ((now - startOfYear) / (endOfYear - startOfYear)) * 100;
        
        // Day progress (UTC)
        const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const dayProgress = ((now - startOfDay) / (24 * 60 * 60 * 1000)) * 100;
        
        // Hour progress (UTC)
        const startOfHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 
                                              now.getUTCDate(), now.getUTCHours()));
        const hourProgress = ((now - startOfHour) / (60 * 60 * 1000)) * 100;
        
        // Minute progress (UTC)
        const startOfMinute = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 
                                                now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes()));
        const minuteProgress = ((now - startOfMinute) / (60 * 1000)) * 100;
        
        // Update progress bars
        this.updateProgress('year', yearProgress);
        this.updateProgress('day', dayProgress);
        this.updateProgress('hour', hourProgress);
        this.updateProgress('minute', minuteProgress);
    }

    updateProgress(type, value) {
        const progressEl = document.getElementById(type + 'Progress');
        const percentEl = document.getElementById(type + 'Percent');
        
        if (progressEl) {
            progressEl.style.width = Math.min(100, Math.max(0, value)) + '%';
        }
        
        if (percentEl) {
            percentEl.textContent = value.toFixed(1) + '%';
        }
    }

    getTimeZoneInfo() {
        const now = new Date();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = -now.getTimezoneOffset();
        const offsetHours = Math.floor(Math.abs(offset) / 60);
        const offsetMinutes = Math.abs(offset) % 60;
        const offsetSign = offset >= 0 ? '+' : '-';
        
        return {
            timeZone: timeZone,
            offset: `UTC${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`,
            localTime: now.toLocaleTimeString()
        };
    }

    updateStatusIndicators() {
        // Update GPS and SYNC status (simulated)
        const gpsStatus = Math.random() > 0.1 ? 'LOCKED' : 'SEARCHING';
        const syncStatus = Math.random() > 0.05 ? 'ACTIVE' : 'SYNCING';
        
        const statusBar = document.querySelector('.status-bar');
        if (statusBar) {
            statusBar.innerHTML = `
                <span>🛰️ GPS: ${gpsStatus}</span>
                <span>🔗 SYNC: ${syncStatus}</span>
            `;
        }
    }

    init() {
        console.log('Initializing Universal Time widget...');
        
        // Initial update
        this.updateTime();
        this.updateStatusIndicators();
        
        // Update every second for accurate time display
        this.updateInterval = setInterval(() => {
            this.updateTime();
        }, 1000);
        
        // Update status indicators every 10 seconds
        setInterval(() => {
            this.updateStatusIndicators();
        }, 10000);
        
        // Log timezone info for debugging
        const tzInfo = this.getTimeZoneInfo();
        console.log('Universal Time widget initialized:', tzInfo);
        console.log('Current UTC time:', new Date().toISOString());
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const universalTimeWidget = new UniversalTimeWidget();
    universalTimeWidget.init();
});