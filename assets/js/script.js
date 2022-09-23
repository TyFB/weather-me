var id = "6bcbcac3a98788f037ad4dbe334a7207";
$('.btn').click(function (e) {
    e.preventDefault();
    var city = $('#cityname').val();
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + id)
    .then(function (data) {
        $(".today").append('<h3 class="mr-3">' + data.name + '</h3>')
        //$(".today").append('<p>Temperature:'+data.main.temp&degf+'</p>'')
    });
    console.log(city);
    console.log(data);
});