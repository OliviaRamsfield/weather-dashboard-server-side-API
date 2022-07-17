var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#user-form")
var city = cityInputEl.value.trim()
var currentWeatherContainerEl = document.querySelector("#city-weather-container")
var fiveDayContainerEl = document.querySelector("#future-forecast")

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();
    console.log(cityInputEl.value)

    if (city) {
        getLatLon(city);
        console.log(city);
        //clear old content
        cityInputEl.value = ""
    } else {
        alert("Please enter a valid city")
    }



function getLatLon () {
    // //personal key from OpenWeather api
    var apiKey = "41a56cf98d8a606201c73d9d3aa3cd7f"
    //format OpenWeather api url to change city into lat and long
    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "+1&limit=5&appid=" + apiKey
    //make a request
    var response = fetch(geoApiUrl)
        .then(function(response) {
            //response was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);

                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    getWeather(lat, lon);
            })
        }
});
}
}

var getWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&limit=5&units=imperial&appid=41a56cf98d8a606201c73d9d3aa3cd7f"
    console.log("This is the url " + apiUrl);
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //gathering current weather information
                const icon = data.current.weather[0].icon;
                console.log(`this is the icon ${icon}`);
                const temp = data.current.temp;
                console.log(`this is the temp ${temp}`);
                const wind = data.current.wind_speed;
                console.log(`this is the wind ${wind}`);
                const humidity = data.current.humidity;
                console.log(`this is the humidity ${humidity}`);
                const uvIndex = data.current.uvi;
                console.log(`this is the UV Index ${uvIndex}`);

                displayCurrentWeather(temp, wind, humidity, uvIndex, icon);
                
                //gathering 5-day forecast information
                const fiveDayForecast = data.daily
                // const dayOneHumid = data.daily[1].humidity;
                // console.log(`this is the humidity ${dayOneHumid}`);
                // const dayOneTemp = data.daily[1].temp.day;
                // console.log(`this is the temp ${dayOneTemp}`);
                // const dayOneWind = data.daily[1].wind_speed;
                // console.log(`this is the wind ${dayOneWind}`);
            })
        }
    })
}

var displayCurrentWeather = function (temp, wind, humidity, uvIndex, icon) {
    //check if API returned any weather
    if (currentWeatherContainerEl.length === 0) {
        currentWeatherContainerEl.textContent = "No Weather Available"
        return;
    }
    //clear old content
    currentWeatherContainerEl.textContent = ""
    //format weather information
    var weatherIconEl = document.createElement("img")
    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    weatherIconEl.classList.add("icons")
    weatherIconEl.alt = "image of current weather condition"
    weatherIconEl.src = iconUrl
    currentWeatherContainerEl.appendChild(weatherIconEl)
    var weatherTempEl = document.createElement("li")
    weatherTempEl.textContent = "Temp: " + temp + "°F"
    currentWeatherContainerEl.appendChild(weatherTempEl)
    var weatherWindEl = document.createElement("li")
    weatherWindEl.textContent = "Wind: " + wind + " MPH"
    currentWeatherContainerEl.appendChild(weatherWindEl)
    var weatherHumidityEl = document.createElement("li")
    weatherHumidityEl.textContent = "Humidity: " + humidity + "%"
    currentWeatherContainerEl.appendChild(weatherHumidityEl)
    var weatherUviEl = document.createElement("li")
    weatherUviEl.textContent = "UV Index: " + uvIndex
    currentWeatherContainerEl.appendChild(weatherUviEl)
}

var displayFiveDay = function () {
    //clear old content
    fiveDayContainerEl.textContent = ""
    //loop over future days array
    for (var i = 0; i < fiveDayForecast.length; i++) {
        
    }
}

//add event listeners to form container
cityContainerEl.addEventListener("submit", formSubmitHandler);

//API key: 41a56cf98d8a606201c73d9d3aa3cd7f