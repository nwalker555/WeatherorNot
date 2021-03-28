$(document).ready(function () {

    var cityName = $("#city-name").val();

    function currentWeather(cityName) {
        console.log("Hey, It's Nathan City!!!")
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=02ee6639ef50d2e5526f633ee63986c3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // localStorage.setItem('searchedCities', JSON.stringify(cityName));
            
            var tempConversion = ((response.main.temp-273.15)*1.8)+32;
            console.log(tempConversion)
            var temperature = $("<p>");
            temperature.text("Temperature: " + tempConversion);
            $(".city-temp").append(temperature);
            var city = $("<h1>");
            city.text(response.name);
            $("#city").append(city);
            var humidity = $("<p>");
            humidity.text("Humidity: " + response.main.humidity);
            $(".city-humidity").append(humidity);
            var wind = $("<p>");
            wind.text("Wind Speed: " + response.wind.speed);
            $(".city-wind").append(wind);
            var iconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            console.log(response.weather[0].icon);
            $("#card-img").attr('src', "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        })
    };

    // var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

    function pastCities(cityName) {
        $(".pastCity").empty();
        var previousCities = $('<li/>');
        previousCities.text(cityName);
        $(".pastCity").append(previousCities);
    }

    // function displayInfo(cityName) {
    //     $.ajax({
    //         url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=02ee6639ef50d2e5526f633ee63986c3",
    //         method: "GET"
    //     }).then(function (response) {

    // }

    $("#search").click(function (event) {
        var cityName = $("#city-name").val();
        localStorage.setItem('searchedCities', JSON.stringify(cityName));
        var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
        console.log(searchedCities);
        searchedCities.push(cityName);
        $(".card-img-top").empty();
        $(".card-title").empty();
        $(".city-temp").empty();
        $(".city-humidity").empty();
        $(".city-wind").empty();
        $(".city-uv").empty();
        console.log(cityName);
        currentWeather(cityName);
        pastCities(cityName);
        futureWeather();
    });


    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    $(".currentDate").append(date)
    console.log(date)
})