const searchCityBtn = document.getElementById("searchCity");
const cityInput = document.getElementById("city");
const dateEl = document.getElementById("dateStamp");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humid");
const uvEl = document.getElementById("UV");
const cityOutput = document.getElementById("cityWeather")
const weatherIcon = document.getElementById("icon")
const dates = document.getElementsByName("date")
const dailyIcon = document.getElementsByName("icons")
const dailyTemp = document.getElementsByName("temperature")
const dailyWind = document.getElementsByName("windSpeed")
const dailyHumid = document.getElementsByName("humidity")
const fiveDay = document.getElementById("weather2")
const searchedCity = document.getElementById("menu")
const searchHist = [];


// takes user input and saves to local storage
function handleSearch(event) {
    event.preventDefault();
    let search = cityInput.value;
    fiveDay.style.display = "block";

  
    if (search) {
        getLocation(search);

    } else {
        alert("Please enter a valid City")
    }

};

    // gets long and lat of user input and displays city name to screen
  const getLocation = function (search){
    let requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search + '&limit=1&appid=75e435a88e4bd5b36dbaea785d477577';  //geocodeing API

    fetch(requestUrl)
    .then (function (responce){
        if (responce.ok){
            responce.json()
    .then (function (data){
        console.log(data);

        if (data.length > 0){
            let cityOut = data[0].name;
            cityOutput.textContent = cityOut;
            let lattitude = data[0].lat; 
            let longitude = data[0].lon;
        getWeather(lattitude,longitude);
        searchHist.push(cityOut);
        addHistory();
        } else {
            alert("Please enter a valid City")
        }
    });

        } else  {
            alert('Error:' + responce.statusText)
        }
    })
    

  };
   // gets weather for area and displays weather info to screen
  const getWeather = function (lattitude,longitude){
      let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lattitude + '&lon=' + longitude + '&exclude=minutely,hourly,alerts&units=imperial&appid=75e435a88e4bd5b36dbaea785d477577';

      fetch(weatherURL)
      .then (function (responce){
        if (responce.ok){
            responce.json()
    .then (function (data){
        console.log(data);
        let temp = data.current.temp;
        tempEl.textContent = "Temp: " + temp + "°F";
        let wind = data.current.wind_speed;
        windEl.textContent = "Wind Speed: " + wind + "MPH";
        let humidity = data.current.humidity;
        humidityEl.textContent = "Humidity: " + humidity;
        let uvIndex = data.current.uvi;
        uvEl.textContent = "UV Index: " + uvIndex;
            
            if (uvIndex < 5) {
                uvEl.setAttribute("class", "favorable")  
            } else if (uvIndex >= 5 && uvIndex < 8)
                uvEl.setAttribute("class", "moderate")
            else {
                uvEl.setAttribute("class", "moderate")
            };
        
        let unixDate = data.current.dt;
        let milliseconds = unixDate * 1000;
        let date = new Date(milliseconds);
        let dateStamp = date.toLocaleDateString();
        dateEl.textContent = "(" + dateStamp + ")";

        //uses font awesome to display large weather icon
        if (data.current.weather[0].main = "Clouds") {
            weatherIcon.setAttribute( "class", "fas fa-cloud");
       } else if (data.current.weather[0].main = "Thunderstorm"){
        weatherIcon.setAttribute( "class", "fas fa-bolt");
       } else if (data.current.weather[0].main = "Drizzle") {
        weatherIcon.setAttribute( "class", "fas fa-cloud-rain");
       } else if (data.current.weather[0].main = "Rain") {
        weatherIcon.setAttribute( "class", "fas fa-cloud-rain");
       } else if (data.current.weather[0].main = "Snow") {
        weatherIcon.setAttribute( "class", "fas fa-snowflake");
       } else  {
           weatherIcon.setAttribute( "class", "fas fa-sun");
       };

       forcast(data);
      });
  }
})
  };

  function forcast(data){
    
    for (let i = 0; i < 5; i++) {
        
       let date = data.daily[i].dt;
       let milliseconds = date * 1000;
       let dateTime = new Date(milliseconds);
       let dailyDate = dateTime.toLocaleDateString();
       dates[i].textContent = dailyDate;
       let image = data.daily[i].weather[0].icon
       const URL = "https://openweathermap.org/img/wn/" + image + "@2x.png";
       dailyIcon[i].setAttribute ("src", URL);
       dailyTemp[i].textContent = "Temp: " + data.daily[i].temp.day + " °F";
       dailyWind[i].textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
       dailyHumid[i].textContent = "Humidity: " + data.daily[i].humidity;

    }
  };
  
  function addHistory() {
      searchedCity.style.display ="block";
      while(searchedCity.firstChild) {
          searchedCity.removeChild(searchedCity.firstChild);
      }
      for (i= 0; i< searchHist.length; i++){
        
         let element = document.createElement("button");
         element.appendChild(document.createTextNode(searchHist[i]));
         element.setAttribute ("class", "searchBtn");
         element.setAttribute ("id" ,"button" + i)
         searchedCity.appendChild(element);

      }

  };

searchedCity.addEventListener("click", function (event) {
    console.log(event.target);
    let search = event.target.innerText;
    getLocation(search);

});

searchCityBtn.addEventListener('click', handleSearch);