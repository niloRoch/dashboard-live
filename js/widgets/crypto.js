// Crypto Widget - js/widgets/crypto.js

class CryptoWidget {
    constructor() {
        this.currentCrypto = 'bitcoin';
        this.chart = null;
        this.updateInterval = null;
        this.priceHistory = [];
        this.maxHistoryPoints = 50;
    }

    async fetchCryptoData(cryptoId) {
        try {
            console.log(`Fetching crypto data for: ${cryptoId}`);
            
            // Fetch current price and basic info
            const priceResponse = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true&include_last_updated_at=true`
            );
            
            if (!priceResponse.ok) {
                throw new Error(`Price API error: ${priceResponse.status}`);
            }
            
            const priceData = await priceResponse.json();
            
            // Fetch historical data for chart (7 days)
            const historyResponse = await fetch(
                `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7&interval=hourly`
            );
            
            if (!historyResponse.ok) {
                throw new Error(`History API error: ${historyResponse.status}`);
            }
            
            const historyData = await historyResponse.json();
            
            console.log('Crypto data received:', priceData, historyData);
            
            return {
                price: priceData[cryptoId].usd,
                change24h: priceData[cryptoId].usd_24h_change,
                marketCap: priceData[cryptoId].usd_market_cap,
                volume: priceData[cryptoId].usd_24h_vol,
                lastUpdated: priceData[cryptoId].last_updated_at,
                priceHistory: historyData.prices || []
            };
            
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            throw error;
        }
    }

    formatPrice(price) {
        if (price >= 1) {
            return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
            return `$${price.toFixed(6)}`;
        }
    }

    formatChange(change) {
        const color = change >= 0 ? '#22c55e' : '#ff0040';
        const sign = change >= 0 ? '+' : '';
        return `<span style="color: ${color}">${sign}${change.toFixed(2)}%</span>`;
    }

    async updateChart() {
        const canvas = document.getElementById('cryptoChart');
        if (!canvas) return;

        try {
            const data = await this.fetchCryptoData(this.currentCrypto);
            
            // Update price display
            document.getElementById('cryptoPrice').textContent = this.formatPrice(data.price);
            document.getElementById('crypto24h').innerHTML = this.formatChange(data.change24h);
            
            // For demo purposes, generate some mock data for other timeframes
            // In a real implementation, you'd fetch actual data for these periods
            const mockChange1h = (Math.random() - 0.5) * 2; // -1% to +1%
            const mockChange4h = data.change24h * 0.4; // Approximate
            const mockChange7d = data.change24h * 1.8; // Approximate
            
            document.getElementById('crypto1h').innerHTML = this.formatChange(mockChange1h);
            document.getElementById('crypto4h').innerHTML = this.formatChange(mockChange4h);
            document.getElementById('crypto7d').innerHTML = this.formatChange(mockChange7d);

            // Update chart
            this.drawChart(canvas, data.priceHistory);

        } catch (error) {
            console.error('Error updating crypto chart:', error);
            
            // Show error state
            document.getElementById('cryptoPrice').textContent = '$--';
            document.getElementById('crypto1h').innerHTML = '<span style="color: #888;">--%</span>';
            document.getElementById('crypto4h').innerHTML = '<span style="color: #888;">--%</span>';
            document.getElementById('crypto24h').innerHTML = '<span style="color: #888;">--%</span>';
            document.getElementById('crypto7d').innerHTML = '<span style="color: #888;">--%</span>';
        }
    }

    drawChart(canvas, priceHistory) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        if (!priceHistory || priceHistory.length === 0) {
            // Draw "No data" message
            ctx.fillStyle = '#888';
            ctx.font = '12px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('No chart data available', width / 2, height / 2);
            return;
        }

        // Prepare data
        const prices = priceHistory.map(point => point[1]);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = maxPrice - minPrice;
        
        // Draw grid
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.lineWidth = 0.5;
        
        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i <= 6; i++) {
            const x = (width / 6) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw price line
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        prices.forEach((price, index) => {
            const x = (index / (prices.length - 1)) * width;
            const y = height - ((price - minPrice) / priceRange) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    init() {
        console.log('Initializing crypto widget...');
        
        const selector = document.getElementById('cryptoSelector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.currentCrypto = e.target.value;
                console.log(`Crypto changed to: ${this.currentCrypto}`);
                this.priceHistory = []; // Reset history for new crypto
                this.updateChart();
            });
        }

        // Set up canvas with high DPI support
        const canvas = document.getElementById('cryptoChart');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
        }

        // Initial update
        this.updateChart();
        
        // Update every 2 minutes (CoinMarketCap has rate limits)
        this.updateInterval = setInterval(() => this.updateChart(), 2 * 60 * 1000);
        
        console.log('Crypto widget initialized with CoinMarketCap API');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cryptoWidget = new CryptoWidget();
    cryptoWidget.init();
});