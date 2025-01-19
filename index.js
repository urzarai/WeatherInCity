const apikey = 'ae9c0bdea072445b1f38a0648706f029';
const input = document.querySelector(".input-box");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

btn.addEventListener("click", () => {
    let city = input.value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const iconCode = data.weather[0].icon;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;

            const weatherCity = data.name;
            const weatherCountry = data.sys.country;
            weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

            let tempCelsius = data.main.temp - 273.15;
            temperature.innerHTML = `${tempCelsius.toFixed(2)}°C`;

            const weatherDescription = data.weather[0].description;
            description.innerHTML = weatherDescription;
        })
        .catch(error => {
            weather.innerHTML = 'City not found';
            icon.innerHTML = '';
            temperature.innerHTML = '';
            description.innerHTML = '';
        });
}