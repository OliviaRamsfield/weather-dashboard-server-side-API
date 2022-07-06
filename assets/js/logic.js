var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#user-form")
var city = cityInputEl.value.trim()

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
                    //getWeather(lat, lon);
            })
        }
});
}
}

var getWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&limit=5&appid=41a56cf98d8a606201c73d9d3aa3cd7f"
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {})
        }
    })
}

//add event listeners to form container
cityContainerEl.addEventListener("submit", formSubmitHandler);

//API key: 41a56cf98d8a606201c73d9d3aa3cd7f