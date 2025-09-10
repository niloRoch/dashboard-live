let mainChartInstance = null;

export async function initMainChart() {
    const ctx = document.getElementById('mainChartCanvas');
    if (!ctx) {
        console.warn('Main Chart Canvas not found');
        return;
    }

    // Destroi a instância anterior, se existir
    if (mainChartInstance) {
        mainChartInstance.destroy();
    }

    // Cria um novo gráfico
    mainChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 60}, (_, i) => ''),
            datasets: [{
                label: 'Network Traffic (Mbps)',
                data: Array.from({length: 60}, () => Math.random() * 100 + 50),
                borderColor: '#a855f7',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: true
            }, {
                label: 'Latency (ms)',
                data: Array.from({length: 60}, () => Math.random() * 50 + 10),
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: true,
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(168, 85, 247, 0.1)'
                    },
                    ticks: {
                        color: '#a855f7',
                        font: {
                            size: 10
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });

    console.log('Intialized Main Chart');
}

export function startMainChart() {
    setInterval(() => {
        if (!mainChartInstance) return;

        // Atualiza os dados do gráfico
        const netData = mainChartInstance.data.datasets[0].data;
        const latData = mainChartInstance.data.datasets[1].data;

        // Remove o primeiro ponto
        netData.shift();
        latData.shift();

        // Adiciona um novo ponto
        netData.push(Math.random() * 100 + 50);
        latData.push(Math.random() * 50 + 10);

        // Atualiza o gráfico
        mainChartInstance.update();
    }, 2000); // Atualiza a cada 2 segundos
}