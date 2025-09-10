export function updateSystemTime() {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

    // UTC Time
    document.getElementById('utcTime').textContent = utc.toTimeString().split(' ')[0];

    // Progress calculations
    const startOfYear = new Date(utc.getFullYear(), 0, 1);
    const endOfYear = new Date(utc.getFullYear() + 1, 0, 1);
    const yearProgress = ((utc - startOfYear) / (endOfYear - startOfYear)) * 100;

    const startOfDay = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
    const dayProgress = ((utc - startOfDay) / (24 * 60 * 60 * 1000)) * 100;

    const startOfHour = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate(), utc.getHours());
    const hourProgress = ((utc - startOfHour) / (60 * 60 * 1000)) * 100;

    const startOfMinute = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate(), utc.getHours(), utc.getMinutes());
    const minuteProgress = ((utc - startOfMinute) / (60 * 1000)) * 100;

    // Update progress bars
    updateProgress('year', yearProgress);
    updateProgress('day', dayProgress);
    updateProgress('hour', hourProgress);
    updateProgress('minute', minuteProgress);

    // Update Stardate
    updateStardate();
}

function updateProgress(type, value) {
    const progressElement = document.getElementById(type + 'Progress');
    const percentElement = document.getElementById(type + 'Percent');
    if (progressElement && percentElement) {
        progressElement.style.width = Math.min(100, Math.max(0, value)) + '%';
        percentElement.textContent = value.toFixed(1) + '%';
    }
}

function updateStardate() {
    const now = new Date();
    const stardate = 2458849.5 + (now.getTime() / 86400000);
    const stardateElement = document.getElementById('stardate');
    if (stardateElement) {
        stardateElement.textContent = stardate.toFixed(1);
    }
}

export function startSystemTime() {
    updateSystemTime(); // Atualiza imediatamente
    setInterval(updateSystemTime, 1000); // Atualiza a cada segundo
}