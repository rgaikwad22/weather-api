// variable declaration for selectors  
var city = document.querySelector(".city-input"),
  submitBtn = document.querySelector(".submit-btn"),
  weather = document.querySelector('.weather'),
  error = document.querySelector(".error-text"),
  inputError = document.querySelector(".input-grp"),
  weatherIcon = document.querySelector(".weather-img img"),
  weatherCondition = document.querySelector(".weather-condition img");


// global variable declaratiion 
var data,
  p;

// event declarations
submitBtn.addEventListener("click", showWeatherData)
city.addEventListener("focusout", () => checkCity(city));

// function declaration
function showWeatherData() {
  var errorRemove = document.querySelector(".error");

  if (city.value === "") {
    checkCity(city);
  } else {
    if (errorRemove && city.value.length > 0) {
      errorRemove.remove();
    }
    var cityName = city.value,
      apiKey = '470d3d3b756f579e03cf3c0cde172fd1';
    var fetchPromise = fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + `&appid=${apiKey}`);
    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      data = res;
      if (data.cod === 200 && city.value.length > 0) {
        var temp = document.querySelector(".temperature"),
          cityName = document.querySelector(".city-name"),
          humidity = document.querySelector(".humidity"),
          presure = document.querySelector(".pressure"),
          windSpeed = document.querySelector(".wind-speed"),
          weatherMain = document.querySelector(".weather-main"),
          weatherDescription = document.querySelector(".weather-desc"),
          clouds = document.querySelector(".clouds"),
          visibility = document.querySelector(".visibility");

        weather.classList.add("weather-info")
        error.classList.add("error");
        error.classList.remove("error")

        temp.innerHTML = Math.floor(data.main.temp - 273.15) + ' °C';
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + '%';
        presure.innerHTML = data.main.pressure + ' mbar';
        windSpeed.innerHTML = Math.floor(data.wind.speed * 1.609) + ' km/h';
        weatherMain.innerHTML = data.weather[0].main;
        weatherDescription.innerHTML = data.weather[0].description;
        clouds.innerHTML = data.clouds.all + "%";
        visibility.innerHTML = data.visibility / 1000 + ' km';
        
        console.log(data.weather[0].main)
        if (data.weather[0].main === "Clouds") { 
          weatherIcon.src = "assets/images/clouds.png";
          weatherCondition.src = "assets/images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
          weatherIcon.src = "assets/images/clear.png";
          weatherCondition.src = "assets/images/clear.png";
        }else if (data.weather[0].main === "Rain") {
          weatherIcon.src = "assets/images/rain.png";
          weatherCondition.src = "assets/images/rain.png";
        }else if (data.weather[0].main === "Drizzle") {
          weatherIcon.src = "assets/images/drizzle.png";
          weatherCondition.src = "assets/images/drizzle.png";
        }else if (data.weather[0].main === "Mist") {
          weatherIcon.src = "assets/images/mist.png";
          weatherCondition.src = "assets/images/mist.png";
        }else if (data.weather[0].main === "Haze") {
          weatherIcon.src = "assets/images/haze.png";
          weatherCondition.src = "assets/images/haze.png";
        }
      } else {
        var errorText;
        fetchPromise.then(res => {
          errorText = res.statusText;
          weather.classList.add("weather")
          error.classList.add("error");
          weather.classList.remove("weather-info")
          error.innerHTML = errorText;
        })
      }
    })
  }
}

function checkCity(fieldName) {
  var cityNameValue = fieldName.value.trim(),
      errorRemove = document.querySelector(".error");

  if (cityNameValue === "") {
    var errorText = "*city cannot be empty!";
    var errorParent = fieldName.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  if (errorRemove && city.value.length > 0) {
    errorRemove.remove();
  }
}

function showError(errorText, errorParent) {
  var showError = errorParent.querySelector(".error");
  if (showError && !null) {
    showError.remove();
  }
  p = document.createElement("p");
  p.innerText = errorText;
  errorParent.appendChild(p);
  p.classList.add("error");
}