var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#user-form")

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);
        console.log(city);
        //clear old content
        cityInputEl.value = ""
    } else {
        alert("Please enter a valid city")
    }
}

function getWeather () {
    //personal key from OpenWeather api
    var apiKey = "41a56cf98d8a606201c73d9d3aa3cd7f"
    //format OpenWeather api url
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "+1&limit=5&appid=" + apiKey
    //make a request
    var response = fetch(apiUrl)
        .then(function(response) {
            //response was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                })
            } else {
                alert("Error: City Not Found")
            }
        })
};

//add event listeners to form container
cityContainerEl.addEventListener("submit", formSubmitHandler);

//API key: 41a56cf98d8a606201c73d9d3aa3cd7f