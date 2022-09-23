var cities = [];
var id = "6bcbcac3a98788f037ad4dbe334a7207";
// stores searched cities
function saveCity() {
    localStorage.setItem("searches", JSON.stringify(cities));
}
// adds any saved searches as a button
function searchedCity() {
    var city = $('#cityname').val();
    $(".cities").empty();
    cities.forEach(function(search) {
        $(".cities").prepend($('<button class="list-group-item list-group-item-action cityButton">' + city +'</button>'));
    });
}
// loads cities saved in local
function init() {
    var savedCity = JSON.parse(localStorage.getItem("searches"));
    if (savedCity !== null) {
        cities = savedCity
    }
    searchedCity();
}
init();
// When the button is clicked the function will get the forecast from the api
$('.btn').click(function (e) {
    e.preventDefault();
    var city = $('#cityname').val();
    var weatherDay = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + id + "&units=imperial";
    $.ajax({
        url: weatherDay,
        method: "GET"
    }).then(function (data) {
        $(".today").append('<h3>' + data.name + '</h3>');
        $(".today").append('<p>Temperature:' + data.main.temp + ' &degF</p>');
        $(".today").append('<p>Feels Like:' + data.main.feels_like + ' &degF</p>');
        $(".today").append('<p>Wind Speed:' + data.wind.speed + ' mph</p>');
        $(".today").append('<p>Humidity:' + data.main.humidity + '%</p>')
    });
    var days = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&appid=" + id + "&units=imperial";
    $.ajax({
        url: days,
        method: "GET"
    }).then(function (data) {
        for (i = 0; i < data.list.length; i++) {
            if (data.list[i] != -1) {
                var date = data.list[i];
                $(".forecast").append('<div class="card"><h4>' + date.dt_txt + '</h4>');
                $(".forecast").append('<p>Temp:' + date.main.temp + '&degF</p>');
                $(".forecast").append('<p>Humid:' + date.main.humidity + '%</p>')
            }
        };

    });
    saveCity();
});