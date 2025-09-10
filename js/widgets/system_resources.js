let isInitialized = false;

export async function initSystemResources() {
    if (isInitialized) return;
    isInitialized = true;

    // Simula dados iniciais
    updateSystemData();
    console.log('Intialized System Resources Widget');
}

export function startSystemResources() {
    setInterval(updateSystemData, 2000); // Atualiza a cada 2 segundos
}

function updateSystemData() {
    // Simula dados de CPU e RAM com pequenas variações
    const baseRam = 65;
    const baseCpu = 40;

    const ramUsage = Math.min(98, Math.max(5, baseRam + (Math.random() - 0.5) * 8));
    const cpuUsage = Math.min(95, Math.max(10, baseCpu + (Math.random() - 0.5) * 15));

    // Atualiza a UI
    const ramUsageElement = document.getElementById('ramUsage');
    const ramPercentElement = document.getElementById('ramPercent');
    const cpuUsageElement = document.getElementById('cpuUsage');
    const cpuPercentElement = document.getElementById('cpuPercent');

    if (ramUsageElement) ramUsageElement.style.width = ramUsage.toFixed(0) + '%';
    if (ramPercentElement) ramPercentElement.textContent = ramUsage.toFixed(0) + '%';
    if (cpuUsageElement) cpuUsageElement.style.width = cpuUsage.toFixed(0) + '%';
    if (cpuPercentElement) cpuPercentElement.textContent = cpuUsage.toFixed(0) + '%';

    // Simula dados de memória
    const totalMemory = 32;
    const usedMemory = (ramUsage / 100) * totalMemory;
    const swapUsed = 2.1 + (Math.random() - 0.5) * 0.5;
    const cache = 4.2 + (Math.random() - 0.5) * 1;
    const buffer = 1.8 + (Math.random() - 0.5) * 0.5;

    document.getElementById('memoryTotal').textContent = `${usedMemory.toFixed(1)}GB / ${totalMemory}GB`;
    document.getElementById('swapUsage').textContent = `${swapUsed.toFixed(1)}GB / 8GB`;
    document.getElementById('cacheUsage').textContent = `${cache.toFixed(1)}GB`;
    document.getElementById('bufferUsage').textContent = `${buffer.toFixed(1)}GB`;

    // Simula dados do MongoDB
    const baseCount = 847293;
    const mongoCount = baseCount + Math.floor(Math.random() * 500);
    document.getElementById('mongoCount').textContent = mongoCount.toLocaleString();
    document.getElementById('mongoCollections').textContent = '24';
    document.getElementById('mongoSize').textContent = '2.8GB';
    document.getElementById('mongoStatus').innerHTML = 'ACTIVE <span class="processing-indicator"></span>';

    // Simula dados do Kafka
    const kafkaInflight = 1200 + Math.floor(Math.random() * 200);
    const processedPerSec = 500 + Math.floor(Math.random() * 50);
    const queueSize = 80 + Math.floor(Math.random() * 20);

    document.getElementById('kafkaInflight').textContent = kafkaInflight.toLocaleString();
    document.getElementById('processedPerSec').textContent = processedPerSec;
    document.getElementById('queueSize').textContent = queueSize;

    // Simula dados do CPU Cores
    const cpuCoresElement = document.getElementById('cpuCores');
    const cpuCoresCountElement = document.getElementById('cpuCoresCount');
    const threadsElement = document.getElementById('threads');
    const uptimeElement = document.getElementById('uptime');
    const temperatureElement = document.getElementById('temperature');

    if (cpuCoresElement && !cpuCoresElement.innerHTML) {
        cpuCoresElement.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const core = document.createElement('div');
            core.className = 'core';
            if (Math.random() > 0.3) {
                core.classList.add('active');
            }
            cpuCoresElement.appendChild(core);
        }
    } else if (cpuCoresElement) {
        // Atualiza o estado dos cores
        const cores = cpuCoresElement.querySelectorAll('.core');
        cores.forEach(core => {
            if (Math.random() > 0.5) {
                core.classList.add('active');
            } else {
                core.classList.remove('active');
            }
        });
    }

    if (cpuCoresCountElement) cpuCoresCountElement.textContent = '8';
    if (threadsElement) threadsElement.textContent = '16';
    if (uptimeElement) uptimeElement.textContent = '72h ' + Math.floor(Math.random() * 60) + 'm';
    if (temperatureElement) temperatureElement.textContent = Math.floor(60 + Math.random() * 15) + '°C';
}