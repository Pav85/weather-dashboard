// console.log('hello world!');

var APIkey = "11f628af2243468c36a25b569b68d689";

var citySearch = $("#search-input");
var searchBtn = $("#search-button");
var history = $("#history");
var cityBtnArray = [];

var renderCityButtons = function() {
    
    $("#history").empty();

    for (var i = 0; i < cityBtnArray.length; i++) {
        var a = $("<button>");

        a.attr("history", cityBtnArray[i]);
        a.attr("class", "btn btn-primary");
        // a.attr("class", "btn btn-secondary");
        a.text(cityBtnArray[i]);
        $("#history").append(a);
    }

}

searchBtn.on("click", function(event) {
    event.preventDefault();

    var city = $(searchBtn).val().trim();
    cityBtnArray.push(city);

    renderCityButtons();
})






