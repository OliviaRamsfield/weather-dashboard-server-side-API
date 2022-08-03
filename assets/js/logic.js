var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#user-form")
// var city = cityInputEl.value.trim()
var currentWeatherContainerEl = document.querySelector("#city-weather-container")
var fiveDayContainerEl = document.querySelector("#future-forecast")
var searchHistoryContainerEl = document.querySelector("#past-city-buttons")
//getting the current day using moment.js
var todaysDate = moment().format('(M/D/YYYY)').toString();
// dayOneDate = moment(todaysDate).add(1, "days").format('(M/D/YYYY)').toString();
// dayTwoDate = moment(dayOneDate).add(1, "days").format('(M/D/YYYY)').toString();
// dayThreeDate = moment(dayTwoDate).add(1, "days").format('(M/D/YYYY)').toString();
// dayFourDate = moment(dayThreeDate).add(1, "days").format('(M/D/YYYY)').toString();
// dayFiveDate = moment(dayeFourDate).add(1, "days").format('(M/D/YYYY)').toString();

// dateArr [dayOneDate, dayTwoDate, dayThreeDate, dayFourDate, dayFiveDate]

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();
    console.log(cityInputEl.value)
    //saveCity function call to save to search history
    saveCity(city)

    if (city) {
        getLatLon(city);
        console.log(city);
        //clear old content
        // cityInputEl.value = ""
    } else {
        alert("Please enter a valid city")
    }



function getLatLon () {
    //personal key from OpenWeather api
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


//function to save and display city in search history
var saveCity = function (city) {
    //save city to local storage
    localStorage.setItem(location, city)
    console.log(localStorage)
    //get city from local storage
    var savedCity = localStorage.getItem(location)
    var savedCityEl = document.createElement("button")
    savedCityEl.classList.add("btn", "btn-secondary", "btn-large", "btn-block")
    savedCityEl.setAttribute("data-city", city)
    savedCityEl.textContent = savedCity
    searchHistoryContainerEl.appendChild(savedCityEl)
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
                    date: data.daily[1].dt,
                    icon: data.daily[1].weather[0].icon,
                    humidity: data.daily[1].humidity,
                    temp: data.daily[1].temp.day,
                    wind: data.daily[1].wind_speed
                }
                console.log(dayOneData)
                const dayTwoData = {
                    date: data.daily[2].dt,
                    icon: data.daily[2].weather[0].icon,
                    humidity: data.daily[2].humidity,
                    temp: data.daily[2].temp.day,
                    wind: data.daily[2].wind_speed
                }
                console.log(dayTwoData)
                const dayThreeData = {
                    date: data.daily[3].dt,
                    icon: data.daily[3].weather[0].icon,
                    humidity: data.daily[3].humidity,
                    temp: data.daily[3].temp.day,
                    wind: data.daily[3].wind_speed
                }
                console.log(dayThreeData)
                const dayFourData = {
                    date: data.daily[4].dt,
                    icon: data.daily[4].weather[0].icon,
                    humidity: data.daily[4].humidity,
                    temp: data.daily[4].temp.day,
                    wind: data.daily[4].wind_speed
                }
                console.log(dayFourData)
                const dayFiveData = {
                    date: data.daily[5].dt,
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
    weatherIconEl.classList.add("icon")
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
    weatherUviEl.classList.add("colorChange")
    weatherUviEl.textContent = "UV Index: " + uvIndex
    currentWeatherContainerEl.appendChild(weatherUviEl)

    //UV Index color change function call
    colorCode(uvIndex)
}  

//function to change the color of the UV Index box
var colorCode = function (uvIndex) {
    var colorChange = document.querySelector(".colorChange")
    if (uvIndex < 2) {
        colorChange.classList.add("favorable")
        colorChange.classList.remove("moderate", "severe")
    } else if (uvIndex > 2 && uvIndex < 8) {
        colorChange.classList.add("moderate")
        colorChange.classList.remove("favorable", "severe")
    } else if (uvIndex >= 8) {
        colorChange.classList.add("severe")
        colorChange.classList.remove("favorable", "moderate")
    }
}


var displayFiveDay = function (fiveDayFore) {
     //clear old content
     fiveDayContainerEl.textContent = ""
    
    //format five day weather information
    fiveDayFore.forEach(createCard)

    function createCard (day) {
        const fiveDayForeEl = document.createElement("div")
        fiveDayForeEl.classList.add("card-item")
        const dayDate = document.createElement("h3")
        dayDate.classList.add("date")
        console.log(dayDate)
        fiveDayForeEl.append(dayDate)
        const dayIcon = document.createElement("img")
        const dayIconUrl = "http://openweathermap.org/img/wn/" + day.icon + "@2x.png"
        dayIcon.classList.add("icons")
        dayIcon.alt = "image of current weather condition"
        dayIcon.src = dayIconUrl
        fiveDayForeEl.appendChild(dayIcon)
        const dayTemp = document.createElement("p")
        dayTemp.textContent = "Temp: " + day.temp + "°F"
        fiveDayForeEl.append(dayTemp)
        const dayWind = document.createElement("p")
        dayWind.textContent = "Wind: " + day.wind + " MPH"
        fiveDayForeEl.append(dayWind)
        const dayHumidity = document.createElement("p")
        dayHumidity.textContent = "Humidity: " + day.humidity + "%"
        fiveDayForeEl.append(dayHumidity)
        fiveDayContainerEl.appendChild(fiveDayForeEl)
        }

    // function displayDate (dayDate) {
    //     for (var i = 0; i < dateArr.length; i++) {
    //         currentFiveDay = document.querySelector(".date")
    //         currentFiveDay.textContent = dayDate
    //         fiveDayForeEl.append(currentFiveDay)
    //     }
    // }
    // displayDate(dateArr);
}

//retireve weather data from search history
// var pastSearch = function (savedCity) {
//     //just rewrite a function?
//     getLatLon(savedCity)
// };

//add event listeners to form container
cityContainerEl.addEventListener("submit", formSubmitHandler);
//add event listener to search history buttons
// searchHistoryContainerEl.addEventListener("click", pastSearch);