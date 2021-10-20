const searchCityBtn = document.getElementById('searchCity');
const cityInput = document.getElementById('city');

function handleSearch(event) {
    event.preventDefault();
    let search = cityInput.value;

    if (search) {
        getLocation(search);
        //clear city info on page
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

   
 //getWeather






searchCityBtn.addEventListener('click', handleSearch);