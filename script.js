// const apiKey = '00692e79133b445958fd8ce821fdec37';

// document.getElementById("submit").addEventListener('click', presentWeather);

// function presentWeather() {
//     const cityName = document.getElementById("city-name").value;
//     if (cityName === '') {
//         alert("Please enter a city name.");
//     } else {
//         getWeather(cityName);
//     }
// }

// async function getWeather(city) {
//     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`; // Use 'forecast' endpoint for 5-day weather
//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();
//         displayWeather(data);
//     } 
//     catch (error) {
//         alert(error.message);
//     }
// }

// function displayWeather(data) {
//     const weatherInformation = document.getElementById("weather-info");
//     weatherInformation.innerHTML = '';

//     // Iterate over the list of forecasts, taking one forecast per day
//     const forecasts = data.list;
//     const dailyForecasts = {};

//     forecasts.forEach((forecast) => {
//         const date = forecast.dt_txt.split(' ')[0];
//         if (!dailyForecasts[date]) {
//             dailyForecasts[date] = {
//                 temp: forecast.main.temp,
//                 feels_like:forecast.main.feels_like,
//                 temp_max:forecast.main.temp_max,
//                 temp_min:forecast.main.temp_min,
//                 pressure:forecast.main.pressure,
//                 wind_speed:forecast.wind.speed,
//                 description: forecast.weather[0].description,
//                 humidity: forecast.main.humidity,
//                 wind: forecast.wind.speed,
//                 date: date,
//                 visibility:forecast.visibility,
//             };
//         }
//     });

//     Object.values(dailyForecasts).forEach((forecast) => {
//         const dayName = getDayName(forecast.date);
//         weatherInformation.innerHTML += `
//             <div class="day-forecast">
//                 <h3>${dayName} (${forecast.date})</h3>
//                 <p><strong>Temperature:</strong> ${forecast.temp} °C</p>
//                 <p><strong>Weather:</strong> ${forecast.description}</p>
//                 <p><strong>Humidity:</strong> ${forecast.humidity}%</p>
//                 <p><strong>Wind Speed:</strong> ${forecast.wind} m/s</p>


//             </div>
//         `;
//     });




// }
// function getDayName(dateString) {
//     const date = new Date(dateString);
//     const options = { weekday: 'long' };
//     return new Intl.DateTimeFormat('en-US', options).format(date);
// }