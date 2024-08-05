const apiKey = '00692e79133b445958fd8ce821fdec37';


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async function(position) {
        const { latitude, longitude } = position.coords;
        await getWeather(latitude, longitude);
    }, function(error) {
        alert("Unable to retrieve your location. Please enter a city manually.");
    });
} else {
    alert("Geolocation is not supported by your browser. Please enter a city manually.");
}

async function getWeather(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Unable to fetch weather data');
        const data = await response.json();
        const cityName = data.city.name; 
        displayWeather(data, cityName);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data, cityName) {
    const weatherInformation = document.getElementById("weather-info");
    weatherInformation.innerHTML = `<h2>Weather in ${cityName}</h2>`; 

    const forecasts = data.list;
    const dailyForecasts = {};

    forecasts.forEach((forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                temp: forecast.main.temp,
                description: forecast.weather[0].description,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                visibility:forecast.visibility,
                pressure:forecast.main.pressure,
                feels_like:forecast.main.feels_like,
                date: date,
            };
        }
    });

    Object.values(dailyForecasts).forEach((forecast) => {
        const dayName = getDayName(forecast.date);
        weatherInformation.innerHTML += `
            <div class="day-forecast">
                <h3>${dayName} (${forecast.date})</h3>
                <p><strong>Temperature:</strong> ${forecast.temp} °C</p>
                <p><strong>Weather:</strong> ${forecast.description}</p>
                <p><strong>Humidity:</strong> ${forecast.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${forecast.wind} m/s</p>
                
            </div>
        `;
    });
}


function getDayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
