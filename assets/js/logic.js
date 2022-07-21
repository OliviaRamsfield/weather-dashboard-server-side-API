var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#user-form")
// var city = cityInputEl.value.trim()
var currentWeatherContainerEl = document.querySelector("#city-weather-container")
var fiveDayContainerEl = document.querySelector("#future-forecast")
var dayOneEl = document.querySelector("#dayOne")
//getting the current day using moment.js
var todaysDate = moment().format('(M/D/YYYY)').toString();

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
        // cityInputEl.value = ""
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
                const dayOneData = {
                    icon: data.daily[1].weather[0].icon,
                    humidity: data.daily[1].humidity,
                    temp: data.daily[1].temp.day,
                    wind: data.daily[1].wind_speed
                }
                console.log(dayOneData)
                const dayTwoData = {
                    icon: data.daily[2].weather[0].icon,
                    humidity: data.daily[2].humidity,
                    temp: data.daily[2].temp.day,
                    wind: data.daily[2].wind_speed
                }
                console.log(dayTwoData)
                const dayThreeData = {
                    icon: data.daily[3].weather[0].icon,
                    humidity: data.daily[3].humidity,
                    temp: data.daily[3].temp.day,
                    wind: data.daily[3].wind_speed
                }
                console.log(dayThreeData)
                const dayFourData = {
                    icon: data.daily[4].weather[0].icon,
                    humidity: data.daily[4].humidity,
                    temp: data.daily[4].temp.day,
                    wind: data.daily[4].wind_speed
                }
                console.log(dayFourData)
                const dayFiveData = {
                    icon: data.daily[5].weather[0].icon,
                    humidity: data.daily[5].humidity,
                    temp: data.daily[5].temp.day,
                    wind: data.daily[5].wind_speed
                }
                console.log(dayFiveData)

                //make an array
                const fiveDayFore = [dayOneData, dayTwoData, dayThreeData, dayFourData, dayFiveData]
                console.log(fiveDayFore)

                displayFiveDay(fiveDayFore)
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
    var currentCity = document.createElement("h2")
    currentCity.textContent = cityInputEl.value
    console.log(currentCity)
    currentCity.classList.add("font-weight-bold")
    currentWeatherContainerEl.appendChild(currentCity)
    var currentDay = document.createElement("h2")
    currentDay.innerHTML = todaysDate
    currentDay.classList.add("font-weight-bold")
    currentWeatherContainerEl.appendChild(currentDay)
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

var displayFiveDay = function (fiveDayFore) {
     //clear old content
    //  fiveDayContainerEl.textContent = ""
    
    //format five day weather information
    fiveDayFore.forEach(createCard)

    function createCard () {
        const fiveDayForeEl = document.createElement("div")
        console.log("The weather is working")
        fiveDayForeEl.classList = "card-item"
        fiveDayForeEl.textContent = JSON.stringify(fiveDayFore)
        fiveDayContainerEl.appendChild(fiveDayForeEl)
    }
}


//add event listeners to form container
cityContainerEl.addEventListener("submit", formSubmitHandler);

//API key: 41a56cf98d8a606201c73d9d3aa3cd7f