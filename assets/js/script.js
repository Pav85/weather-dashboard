
var citySearch = $("#search-input");

var cityBtnArray = [];

function displayWeather() {

   
    const city = $(this).attr("data-name");


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;

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

        // var pThree = $("<p>").text(response.list[0].main.temp);
        
        // weatherDiv.append(pThree);


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

// $(document).on("click", ".search-button", displayWeather);

renderCityButtons();






