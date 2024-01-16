var citySearch = $("#search-input");

// function to handle local storage

function initLS() {
  const citiesFromLS = JSON.parse(localStorage.getItem("citySearchHistory"));

  if (!citiesFromLS) {
    localStorage.setItem("citySearchHistory", JSON.stringify([]));
  }
}

initLS();

// function to get coordinates for a city

function getCoordinates(city, callback) {
  const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;

  $.ajax({
    url: geocodeURL,
    method: "GET",
    success: function (data) {
      if (data.length > 0) {
        const coordinates = { lat: data[0].lat, lon: data[0].lon };
        callback(coordinates);
      }
    },
  });
}

// function to display five day forecast

function displayFiveDayForecast(coordinates) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIkey}&units=metric`;

  $.ajax({
    url: forecastURL,
    method: "GET",
    success: function (response) {
      $("#forecast").empty();
      for (let i = 0; i < response.list.length; i += 8) {
        const forecastData = response.list[i];

        const date = new Date(forecastData.dt_txt).toLocaleDateString();
        const temp = forecastData.main.temp;
        const humidity = forecastData.main.humidity;
        const weatherIconCode = forecastData.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

        const forecastDiv = $(`<div class='fiveDaysBox'>`);
        forecastDiv.append(`<h3>${date}</h3>`);
        forecastDiv
          .append(`<img src="${iconURL}" alt="Weather icon">`)
          .addClass("text-center");
        forecastDiv.append(`<p>Temp: ${temp} °C</p>`);
        forecastDiv.append(`<p>Humidity: ${humidity}%</p>`);

        $("#forecast").append(forecastDiv);
      }
    },
  });
}

function displayWeather(city = null) {
  if (!city) {
    city = $(this).attr("data-name") || citySearch.val();
  }

  if (!city) {
    return;
  }

  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=metric";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var weatherDiv = $("#today");
    weatherDiv.empty();

    var oneDay = $("<div class='oneDayBox'>");

    var cityName = response.city.name;

    var todayDate = moment().format("DD/MM/YYYY");

    var iconCode = response.list[0].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("<p>").attr("src", iconURL);

    var iconImage = $("<img src=" + iconURL + ">");

    var pOne = $("<h1>").text(cityName + " (" + todayDate + ") ");

    weatherDiv.append(oneDay);
    oneDay.append(pOne);
    pOne.append(iconImage);

    var cityTemp = response.list[0].main.temp;
    var pTwo = $("<p>").text("Temp: " + cityTemp.toFixed(0) + " °C");

    oneDay.append(pTwo);

    var cityWind = response.list[0].wind.speed * 3.6; // m/s to km/h formula
    var pThree = $("<p>").text("Wind Speed: " + cityWind.toFixed(1) + " Km/h");

    oneDay.append(pThree);

    var cityHumidity = response.list[0].main.humidity;
    var pFour = $("<p>").text("Humidity: " + cityHumidity + "%");

    oneDay.append(pFour);
  });
}

$("#search-button").addClass("btn btn-primary");

// function below capitalizes the first letter of the city name

function capitalizeFirstLetter(cityName) {
  return cityName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// function below generates buttons with cities that were searched

function renderCityButtons() {
  $("#history").empty();

  const cityBtnArray = JSON.parse(localStorage.getItem("citySearchHistory"));

  for (
    var i = Math.max(cityBtnArray.length - 10, 0);
    i < cityBtnArray.length;
    i++
  ) {
    var a = $("<button>");

    a.addClass("btn btn-secondary buttonHistory");

    var capitalisedCityName = capitalizeFirstLetter(cityBtnArray[i]);

    a.attr("data-name", capitalisedCityName);

    a.text(capitalisedCityName);

    $("#history").append(a);
  }
}

// click events for buttons

$("#search-button").on("click", function (event) {
  event.preventDefault();

  var city = $("#search-input").val().trim();

  if (!city) {
    return;
  }

  getCoordinates(city, function (coordinates) {
    displayWeather(city);
    displayFiveDayForecast(coordinates);
  });

  // Clear the search input
  citySearch.val("");

  // Handle local storage for city search history
  let cityBtnArray = JSON.parse(localStorage.getItem("citySearchHistory"));
  var capitalisedCity = capitalizeFirstLetter(city);

  if (cityBtnArray.length >= 10) {
    cityBtnArray.shift();
  }

  if (!cityBtnArray.includes(capitalisedCity)) {
    cityBtnArray.push(capitalisedCity);
    localStorage.setItem("citySearchHistory", JSON.stringify(cityBtnArray));
  }

  // Render the city buttons again
  renderCityButtons();
});

$(document).on("click", ".buttonHistory", function () {
  var city = $(this).attr("data-name");

  getCoordinates(city, function (coordinates) {
    displayWeather(city);
    displayFiveDayForecast(coordinates);
  });
});

renderCityButtons();
