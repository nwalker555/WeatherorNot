$(document).ready(function () {

    var cityName = $("#city-name").val();

    function generateweather(cityName) {
        console.log("Hey, It's Nathan City!!!")
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=02ee6639ef50d2e5526f633ee63986c3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('searchedCities', JSON.stringify(cityName))
        })
    };

    var searchedCities = JSON.parse(localStorage.getItem('searchedCities'));

    function pastCities(cityName) {
        $(".searchHistory").empty();
        for (x = 0; x < searchedCities.length; x++) {
            var previousCities = $('<button/>');
            previousCities.attr("searchedCities", cityName)
            $(".searchHistory").append(previousCities)
        }
    }

    function displayInfo(cityName) {
        var tempConversion = 9 / 5(cityName.main.temp - 273) + 32;
        console.log(tempConversion)
        var temperature = $("<p>");
        temperature.text(cityName.main.temp);
    }

    $("#search").click(function (event) {
        var cityName = $("#city-name").val();
        console.log(cityName);
        generateweather(cityName);
        pastCities(cityName);
        displayInfo();
    });


    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    $(".date").append(date)
    console.log(date)
})