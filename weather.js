var cityName = $("#city-name").val();

function generateweather(response) {
    $.ajax({
        url: "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=02ee6639ef50d2e5526f633ee63986c3",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
};

$("#search").click(function(event){
    event.preventDefault();
    console.log(cityName);
});

var today = new Date();
var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
$(".date").append(date)
console.log(date)