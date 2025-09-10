// Funções utilitárias para o dashboard

// Formata números grandes
export function formatLargeNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

// Formata bytes para KB, MB, GB, etc.
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Gera um ID único
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Salva o layout do dashboard no localStorage
export function saveDashboardLayout(widgets) {
    try {
        localStorage.setItem('dashboard_layout', JSON.stringify(widgets));
    } catch (e) {
        console.error('Failed to save dashboard layout:', e);
    }
}

// Carrega o layout do dashboard do localStorage
export function loadDashboardLayout() {
    try {
        const saved = localStorage.getItem('dashboard_layout');
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.error('Failed to load dashboard layout:', e);
        return null;
    }
}

// Exporta o dashboard como PNG
export async function exportDashboardAsPng() {
    // Esta função requer a biblioteca html2canvas
    // Você precisaria adicionar: <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    if (typeof html2canvas === 'undefined') {
        throw new Error('html2canvas library not loaded');
    }

    const container = document.querySelector('.container');
    if (!container) {
        throw new Error('Dashboard container not found');
    }

    try {
        const canvas = await html2canvas(container, {
            backgroundColor: '#0a0a0a',
            scale: 2, // Melhor qualidade
            useCORS: true
        });

        const link = document.createElement('a');
        link.download = `dashboard-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        throw new Error('Failed to export dashboard: ' + error.message);
    }
}