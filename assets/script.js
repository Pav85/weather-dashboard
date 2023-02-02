// console.log('hello world!');

var APIkey = "11f628af2243468c36a25b569b68d689";

var citySearch = $("#search-input");
// var searchBtn = $("#search-button");
// var history = $("#history");
var cityBtnArray = [];

var city = $(this).attr("data-name");

$("#search-button").addClass("btn btn-primary");

function renderCityButtons() {
    
    $("#history").empty();

    for (var i = 0; i < cityBtnArray.length; i++) {
        
        var a = $("<button>");
    
        a.addClass("btn btn-secondary buttonHistory");  

        // a.attr("city-button");

        a.attr("data-name", cityBtnArray[i]);
        // a.attr("class", "btn btn-primary");
        // a.attr("class", "btn btn-secondary buttonHistory");
        // a.text(cityBtnArray[i]);
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
});

// $(document).on("click", ".buttonHistory", displayWeather)

renderCityButtons();






