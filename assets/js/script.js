var citySearch = $("#search-input");

// local storage

function initLS() {
  const citiesFromLS = JSON.parse(localStorage.getItem("citySearchHistory"));

  if (!citiesFromLS) {
    localStorage.setItem("citySearchHistory", JSON.stringify([]));
  }
}

initLS();

function displayWeather() {
  let city;

  if ($(this).attr("data-name") === undefined) {
    city = citySearch.val();
  } else {
    city = $(this).attr("data-name");
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
    console.log(response);

    var weatherDiv = $("#today");
    weatherDiv.empty();

    var oneDay = $("<div class='oneDayBox'>"); // not sure if i will need this class here

    var cityName = response.city.name;

    var todayDate = moment().format("MM/DD/YYYY");

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

// function below capitalises the first letter of the city name

function capitaliseFirstLetter(cityName) {
  return cityName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// function below generates buttons with cities that were searched

function renderCityButtons() {
  $("#history").empty();

  const cityBtnArray = JSON.parse(localStorage.getItem("citySearchHistory"));

  for (var i = 0; i < cityBtnArray.length; i++) {
    var a = $("<button>");

    a.addClass("btn btn-secondary buttonHistory");

    var capitalisedCityName = capitaliseFirstLetter(cityBtnArray[i]);

    a.attr("data-name", capitalisedCityName);

    a.text(capitalisedCityName);

    $("#history").append(a);
  }
}

// click events for buttons

$("#search-button").on("click", function (event) {
  event.preventDefault();
  // displayWeather();

  var city = $("#search-input").val().trim();

  if (city !== "") {
    displayWeather();

    citySearch.val("");

    let cityBtnArray = JSON.parse(localStorage.getItem("citySearchHistory"));
    if (!cityBtnArray.includes(city)) {
      cityBtnArray.push(city);
      localStorage.setItem("citySearchHistory", JSON.stringify(cityBtnArray));
    }

    renderCityButtons();
  }
});

$(document).on("click", ".buttonHistory", displayWeather);

renderCityButtons();
