// Chave da API do OpenWeatherMap (substitua pela sua)
const WEATHER_API_KEY = '28c3e441ab705e8a663bffd1a56b6f83'; // Substitua por sua chave

// Chave da API do CoinGecko (não é necessária para uso básico)
const CRYPTO_API_KEY = 'YOUR_COINGECKO_API_KEY';

export async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();

        return {
            temp: data.main.temp,
            main: data.weather[0].main,
            description: data.weather[0].description,
            wind_speed: Math.round(data.wind.speed * 2.237), // m/s to mph
            humidity: data.main.humidity,
            pressure: data.main.pressure
        };
    } catch (error) {
        console.error('Erro ao buscar dados meteorológicos:', error);
        throw error;
    }
}

export async function fetchWeatherForecast(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar previsão meteorológica:', error);
        throw error;
    }
}

export async function fetchCryptoData(cryptoId) {
    try {
        // Busca dados atuais
        const currentResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        if (!currentResponse.ok) {
            throw new Error(`Crypto API error (current): ${currentResponse.status}`);
        }
        const currentData = await currentResponse.json();

        // Busca dados históricos (últimas 24h para gráfico)
        const sparklineResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=1`);
        if (!sparklineResponse.ok) {
            throw new Error(`Crypto API error (sparkline): ${sparklineResponse.status}`);
        }
        const sparklineData = await sparklineResponse.json();

        // Busca mudanças de preço
        const priceChangeResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoId}&price_change_percentage=1h,24h,7d`);
        if (!priceChangeResponse.ok) {
            throw new Error(`Crypto API error (price change): ${priceChangeResponse.status}`);
        }
        const priceChangeData = await priceChangeResponse.json();

        const priceChanges = priceChangeData[0] || {};

        return {
            current_price: currentData.market_data.current_price.usd,
            price_change_percentage_1h_in_currency: priceChanges.price_change_percentage_1h_in_currency || 0,
            price_change_percentage_24h: priceChanges.price_change_percentage_24h || 0,
            price_change_percentage_7d: priceChanges.price_change_percentage_7d || 0,
            sparkline: sparklineData.prices.map(point => point[1]), // Array de preços
            name: currentData.name,
            symbol: currentData.symbol.toUpperCase()
        };
    } catch (error) {
        console.error('Erro ao buscar dados de criptomoeda:', error);
        throw error;
    }
}