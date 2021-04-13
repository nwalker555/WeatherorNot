$(document).ready(function () {

    var cityName = $("#city-name").val();

    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    $(".currentDate").append(date)
    console.log(date)

    function currentWeather(cityName) {
        console.log("Hey, It's Nathan City!!!")
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=02ee6639ef50d2e5526f633ee63986c3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var tempConversion = ((response.main.temp - 273.15) * 1.8) + 32;
            var temp = tempConversion.toFixed(1);
            console.log(tempConversion)
            var temperature = $(".city-temp").text("Temperature: " + temp + "°F");
            $(".city-temp").append(temperature);
            var city = $("#city").text(response.name);
            // $("#card-title").append(city);
            var humidity = $(".city-humidity1").text("Humidity: " + response.main.humidity);
            $(".city-humidity1").append(humidity);
            var wind = $(".city-wind").text("Wind Speed: " + response.wind.speed);
            $(".city-wind").append(wind);
            var iconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            console.log(response.weather[0].icon);
            $("#card-img").attr('src', "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            var latitude = response.coord.lat;
            var longtitude = response.coord.lon;
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&exclude=hourly,minutely" + "&appid=02ee6639ef50d2e5526f633ee63986c3",
                method: "GET"
            }).then(function (coordinates) {
                console.log(coordinates);
                var uv = $(".city-uv").text("UV Index: " + coordinates.daily[0].uvi).css("background-color", uvcolor);
                if (uv > 2 && uv <= 4) {
                    
                }
            });
        });
    };

    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

    function pastCities() {
        $(".searchHistory").empty();
        for (i = 0; i < searchedCities.length; i++) {
            var previousCities = $('<button/>');
            var pastSearch = searchedCities[i];
            previousCities.text(searchedCities[i].trim());
            previousCities.addClass("btn btn-outline-primary 1");
            previousCities.attr('id', 'cityPast');
            previousCities.attr('name', searchedCities[i]);
            $(".searchHistory").append(previousCities);
        };
    };

    function futureWeather(cityName) {
        console.log("why aren't you working?")
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=02ee6639ef50d2e5526f633ee63986c3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var futureResults = response.list;
            for (let i = 0; i < 5; i++) {
                var futureCard = $('<div>').addClass("card col-2");
                var futureBody = $('<div>').addClass("card-body");
                var futureConversion = ((futureResults[i].main.temp - 273.15) * 1.8) + 32;
                var futureTempe = futureConversion.toFixed(1);
                console.log(futureTempe);
                // the date, an icon representation of weather conditions, the temperature, and the humidity
                var futureDate = $('<p>').text(date)
                var futureIcon = $('<img>').attr("src", "http://openweathermap.org/img/w/" + futureResults[i].weather[0].icon + ".png")
                var futureTemp = $('<p>').text("Temperature: " + futureTempe + "°F");
                var futureHumi = $('<p>').text("Humidity: " + futureResults[i].main.humidity);
                console.log(futureResults[i].main.humidity);
                futureBody.append(futureDate, futureIcon, futureTemp, futureHumi)
                futureCard.append(futureBody);
                $("#futureWeather").append(futureCard);
            }
        });
    };


    $("#search").click(function () {
        var cityName = $("#city-name").val();
        searchedCities.push(cityName);
        localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
        $("#card-img").empty();
        $(".card-title").empty();
        $(".city-temp").empty();
        $(".city-humidity").empty();
        $(".city-wind").empty();
        $(".city-uv").empty();
        $("#futureWeather").empty();
        console.log(cityName);
        currentWeather(cityName);
        futureWeather(cityName);
        pastCities();
    });

    $(".searchHistory").on('click', function(searchedCities) {
        console.log(cityName);
        $("#card-img").empty();
        $(".card-title").empty();
        $(".city-temp").empty();
        $(".city-humidity").empty();
        $(".city-wind").empty();
        $(".city-uv").empty();
        $("#futureWeather").empty();
        console.log("Hey, It's Nathan City!!!")
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCities + "&appid=02ee6639ef50d2e5526f633ee63986c3",
            method: "GET"
        }).then(function (response) {
            var tempConversion = ((response.main.temp - 273.15) * 1.8) + 32;
            var temp = tempConversion.toFixed(1);
            console.log(tempConversion)
            var temperature = $(".city-temp").text("Temperature: " + temp + "°F");
            $(".city-temp").append(temperature);
            var city = $("#city").text(response.name);
            // $("#card-title").append(city);
            var humidity = $(".city-humidity1").text("Humidity: " + response.main.humidity);
            $(".city-humidity1").append(humidity);
            var wind = $(".city-wind").text("Wind Speed: " + response.wind.speed);
            $(".city-wind").append(wind);
            var iconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            console.log(response.weather[0].icon);
            $("#card-img").attr('src', "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        });
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchedCities + "&appid=02ee6639ef50d2e5526f633ee63986c3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var futureResults = response.list;
            for (let i = 0; i < 5; i++) {
                var futureCard = $('<div>').addClass("card col-2");
                var futureBody = $('<div>').addClass("card-body");
                var futureConversion = ((futureResults[i].main.temp - 273.15) * 1.8) + 32;
                var futureTempe = futureConversion.toFixed(1);
                console.log(futureTempe);
                // the date, an icon representation of weather conditions, the temperature, and the humidity
                var futureDate = $('<p>').text(date)
                var futureIcon = $('<img>').attr("src", "http://openweathermap.org/img/w/" + futureResults[i].weather[0].icon + ".png")
                var futureTemp = $('<p>').text("Temperature: " + futureTempe + "°F");
                var futureHumi = $('<p>').text("Humidity: " + futureResults[i].main.humidity);
                console.log(futureResults[i].main.humidity);

                futureBody.append(futureDate, futureIcon, futureTemp, futureHumi)
                futureCard.append(futureBody);
                $("#futureWeather").append(futureCard);
            };
        });
    });
});