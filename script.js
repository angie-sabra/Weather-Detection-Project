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

  
    data.list.forEach(forecast => {
        const forecastDate = forecast.dt_txt.split(' ')[0];
        if (forecastDate === currentDate) {
            maxTemp = Math.max(maxTemp, forecast.main.temp_max);
            minTemp = Math.min(minTemp, forecast.main.temp_min);
         
            if (description === '') {
                description = forecast.weather[0].description;
            }
        }
    });

  
    const firstForecast = data.list.find(forecast => forecast.dt_txt.split(' ')[0] === currentDate);
    if (firstForecast) {
        const temp = firstForecast.main.temp;
        temperatureElement.innerHTML = `${temp} °C <span style="color:white; font-size:20px;">overcast</span>`;
    } else {
        temperatureElement.textContent = 'No temperature data available for today';
    }

    const Today = new Date().toISOString().split('T')[0];
    const TodayName = getDayName(Today)
    if (maxTemp !== -Infinity && minTemp !== Infinity) {
        descriptionElement.innerHTML = `
      
            ${TodayName} ${maxTemp} °   ${minTemp} ° <br><br>
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

