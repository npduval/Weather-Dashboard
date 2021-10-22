const searchCityBtn = document.getElementById('searchCity');
const cityInput = document.getElementById('city');
const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humid');
const uvEl = document.getElementById('UV');
const cityOutput = document.getElementById('cityWeather')
//display previously searched cities to page

//Dev Notes: add a control for when no city is found
function handleSearch(event) {
    event.preventDefault();
    let search = cityInput.value;

    if (search) {
        getLocation(search);
        cityOutput.textContent = cityInput.value;
        localStorage.setItem("City" , cityInput.value);
    } else {
        alert("Please enter a valid City, State search")
    }

};
  const getLocation = function (search){
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search + ',USA&limit=1&appid=75e435a88e4bd5b36dbaea785d477577';  //geocodeing API

    fetch(requestUrl)
    .then (function (responce){
        if (responce.ok){
            responce.json()
    .then (function (data){
        console.log(data);

        let lattitude = data[0].lat; 
        let longitude = data[0].lon;
        getWeather(lattitude,longitude);
    });

        } else  {
            alert('Error:' + responce.statusText)
        }
    })
    

  };
   
  const getWeather = function (lattitude,longitude){
      let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lattitude + '&lon=' + longitude + '&exclude=minutely,hourly,alerts&units=imperial&appid=75e435a88e4bd5b36dbaea785d477577';

      fetch(weatherURL)
      .then (function (responce){
        if (responce.ok){
            responce.json()
    .then (function (data){
        console.log(data);
        let temp = data.current.temp;
        tempEl.textContent = "Temp: " + temp + "f";
        let wind = data.current.wind_speed;
        windEl.textContent = "Wind Speed: " + wind + "mph";
        let humidity = data.current.humidity;
        humidityEl.textContent = "Humidity: " + humidity;
        let uvIndex = data.current.uvi;
        uvEl.textContent = "UV Index: " + uvIndex;

        //if else for UV 

        //display 5 day weather - displays the date, 
        // an icon representation of weather conditions, 
        // the temperature, the wind speed, and the humidity
      });
  }
})
  };





searchCityBtn.addEventListener('click', handleSearch);