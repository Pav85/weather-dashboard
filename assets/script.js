// console.log('hello world!');

var APIkey = "11f628af2243468c36a25b569b68d689";

var citySearch = $("#search-input");
// var searchBtn = $("#search-button");
// var history = $("#history");
var cityBtnArray = [];

function displayWeather() {

   
    var city = $(this).attr("data-name");

    // var city = $(event.target).attr("data-name");

    // var city = "warsaw";
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=warsaw&appid=11f628af2243468c36a25b569b68d689"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        console.log(response);
        

        var weatherDiv = $("#today");
        
        var cityName = response.city.name;

        var pOne = $("<p>").text(cityName);
        
        weatherDiv.append(pOne);

        var todayDate = moment().format("MM/DD/YYYY");

        var pTwo = $("<p>").text(todayDate);
        
        weatherDiv.append(pTwo);


    });

};

$("#search-button").addClass("btn btn-primary");

function renderCityButtons() {
    
    $("#history").empty();   

    for (var i = 0; i < cityBtnArray.length; i++) {
        
        var a = $("<button>");
    
        a.addClass("btn btn-secondary buttonHistory");  

        // var cityData = cityBtnArray[i];
        
        a.attr("data-name", cityBtnArray[i]);
        
        a.text(cityBtnArray[i]);

        $("#history").append(a);
    }

}

// this function renders buttons after clikcking the search button

$("#search-button").on("click", function(event) {
    event.preventDefault();

    var city = $("#search-input").val().trim();

    citySearch.val("");

    cityBtnArray.push(city);

    renderCityButtons();

    console.log(city);
});

$(document).on("click", ".buttonHistory", displayWeather);
$(document).on("click", ".search-button", displayWeather);

renderCityButtons();






