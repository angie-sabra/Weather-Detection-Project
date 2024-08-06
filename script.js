const apiKey = '00692e79133b445958fd8ce821fdec37';

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async function (position) {
        const { latitude, longitude } = position.coords;
        await getWeather(latitude, longitude);
    }, function (error) {
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
    const cityElement = document.getElementById("cityName");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description-info");
    cityElement.textContent = cityName;

    const currentDate = new Date().toISOString().split('T')[0];
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let description = '';

    // Find today's weather details
    const todayWeather = data.list.find(forecast => forecast.dt_txt.split(' ')[0] === currentDate);

    if (todayWeather) {
        maxTemp = todayWeather.main.temp_max;
        minTemp = todayWeather.main.temp_min;
        const temp = todayWeather.main.temp;
        description = todayWeather.weather[0].description;
        
        temperatureElement.innerHTML = `${temp} °C <span style="color:white; font-size:20px;">overcast</span>`;
        
        // Update "Feels Like"
        const feelsLikeElement = document.getElementById("feels_like");
        if (feelsLikeElement) {
            feelsLikeElement.innerHTML += `Feels like:<br><br> `;
            feelsLikeElement.innerHTML += `${todayWeather.main.feels_like} °`;

        }

        // Update Humidity
        const humidityElement = document.getElementById("humidity");
        if (humidityElement) {
            humidityElement.innerHTML = `Humidity:<br><br> ${todayWeather.main.humidity}  %`;
        }

        // Update Wind Speed
        const windElement = document.getElementById("wind");
        if (windElement) {
            windElement.innerHTML = `Wind: <br><br> ${todayWeather.wind.speed} min/h`;
        }

        // Update Visibility
        const visibilityElement = document.getElementById("visibility");
        if (visibilityElement) {
            visibilityElement.innerHTML = `Visibility:<br><br> ${(todayWeather.visibility / 1000).toFixed(1)} mi`;
        }

        // Update Pressure
        const pressureElement = document.getElementById("pressure");
        if (pressureElement) {
            pressureElement.innerHTML = `Pressure: <br><br>${todayWeather.main.pressure} hPa`;
        }
    } else {
        temperatureElement.textContent = 'No temperature data available for today';
    }

    const today = new Date().toISOString().split('T')[0];
    const todayName = getDayName(today);
    if (maxTemp !== -Infinity && minTemp !== Infinity) {
        descriptionElement.innerHTML = `
            ${todayName} ${maxTemp} °   ${minTemp} ° <br><br>
            Air quality: ${description}
        `;
    } else {
        descriptionElement.textContent = 'No weather data available for today';
    }
}

function getDayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


