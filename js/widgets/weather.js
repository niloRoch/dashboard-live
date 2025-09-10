// Weather Widget - js/widgets/weather.js

class WeatherWidget {
    constructor() {
        this.API_KEY = '28c3e441ab705e8a663bffd1a56b6f83';
        this.currentLocation = 'London';
        this.updateInterval = null;
    }

    async fetchWeatherData(location) {
        try {
            console.log(`Fetching weather for: ${location}`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${this.API_KEY}&units=metric`);
            
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Weather data received:', data);

            return {
                temp: data.main.temp,
                main: data.weather[0].main,
                description: data.weather[0].description,
                wind_speed: Math.round(data.wind.speed * 2.237), // m/s to mph
                humidity: data.main.humidity,
                pressure: data.main.pressure
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    async fetchWeatherForecast(location) {
        try {
            console.log(`Fetching forecast for: ${location}`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${this.API_KEY}&units=metric`);
            
            if (!response.ok) {
                throw new Error(`Forecast API error: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Forecast data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            throw error;
        }
    }

    async updateDisplay() {
        try {
            console.log('Updating weather display...');
            
            const contentDiv = document.getElementById('weatherContent');
            const forecastDiv = document.getElementById('weatherForecast');
            
            if (contentDiv) {
                contentDiv.innerHTML = `
                    <div class="weather-desc loading">Loading weather data...</div>
                    <div class="weather-temp">--°C</div>
                    <div class="weather-details">Fetching data...</div>
                `;
            }
            
            if (forecastDiv) {
                forecastDiv.innerHTML = '<div style="color: #0a0a0a; text-align: center;">Loading forecast...</div>';
            }

            const currentData = await this.fetchWeatherData(this.currentLocation);
            
            if (!currentData) {
                throw new Error('No weather data received');
            }

            console.log('Updating UI with weather data:', currentData);

            if (contentDiv) {
                contentDiv.innerHTML = `
                    <div class="weather-desc">${currentData.description.charAt(0).toUpperCase() + currentData.description.slice(1)}</div>
                    <div class="weather-temp">${Math.round(currentData.temp)}°C</div>
                    <div class="weather-details">${currentData.main} • ${currentData.wind_speed} mph</div>
                `;
            }

            const forecastData = await this.fetchWeatherForecast(this.currentLocation);
            
            if (forecastData && forecastData.list && forecastDiv) {
                console.log('Updating forecast UI...');
                
                const dailyData = forecastData.list.filter((item, index) => {
                    const date = new Date(item.dt * 1000);
                    return date.getHours() === 12;
                }).slice(0, 5);

                if (dailyData.length === 0) {
                    const fallbackDaily = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
                    dailyData.push(...fallbackDaily);
                }

                let forecastHTML = '';
                dailyData.forEach((day, index) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const temp = Math.round(day.main.temp);
                    
                    forecastHTML += `
                        <div class="forecast-day">
                            <span class="forecast-date">${dayName}</span>
                            <span class="forecast-temp">${temp}°C</span>
                        </div>
                    `;
                });

                forecastDiv.innerHTML = forecastHTML;
            } else {
                console.warn('No forecast data available');
                if (forecastDiv) {
                    forecastDiv.innerHTML = '<div style="color: #0a0a0a; text-align: center;">No forecast data</div>';
                }
            }

            console.log('Weather update completed successfully');

        } catch (error) {
            console.error('Error updating weather display:', error);
            
            const contentDiv = document.getElementById('weatherContent');
            if (contentDiv) {
                contentDiv.innerHTML = `
                    <div class="weather-desc error">Error loading weather</div>
                    <div class="weather-temp">--°C</div>
                    <div class="weather-details">${error.message}</div>
                `;
            }

            const forecastDiv = document.getElementById('weatherForecast');
            if (forecastDiv) {
                forecastDiv.innerHTML = '<div style="color: #ff0040; text-align: center;">Forecast unavailable</div>';
            }
        }
    }

    init() {
        console.log('Initializing weather widget...');
        
        const locationSelect = document.getElementById('weatherLocation');
        if (locationSelect) {
            locationSelect.addEventListener('change', (e) => {
                this.currentLocation = e.target.value;
                console.log(`Weather location changed to: ${this.currentLocation}`);
                this.updateDisplay();
            });
        }

        this.updateDisplay();
        this.updateInterval = setInterval(() => this.updateDisplay(), 10 * 60 * 1000);
        
        console.log('Weather widget initialized');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const weatherWidget = new WeatherWidget();
    weatherWidget.init();
});