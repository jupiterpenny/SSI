

var geocoder;
var url;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction() {
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();



}

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    callWeather(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                //formatted address
                console.log(results[2].formatted_address)
                document.getElementById("location").innerHTML = results[2].formatted_address;
                //find country name
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {


                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city = results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                console.log(city.short_name + " " + city.long_name)


            } else {
                console.log("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

function callWeather(latt, lng) {
    latt = Math.round(latt);
    lng = Math.round(lng);

    console.log(latt, lng);
    var api = "https://api.openweathermap.org/data/2.5/weather?lat=";
    var lat = latt + "&lon=";
    var lon = lng;
    var key = "&APPID=69a51bd48e3a8c5d517b57900136ecd9&units=metric";

    url = api + lat + lon + key;
    gettingJSON(url);
}

function gettingJSON(url) {
    console.log("jquery loaded");
    $.getJSON(url, function(data) {

        console.log(JSON.stringify(data));

        document.getElementById("temperature").innerHTML = data.main.temp;

        var weather = data.weather[0].id;
        var temperature = data.main.temp;
        var temps = Math.round(temperature);



        var icon = ("<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");


        document.getElementById("temperature").innerHTML = " " + icon + temps + "&#8451;";
    });



}


function display_c(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('display_ct()',refresh)
}

function display_ct() {
    var strcount
    var x = new Date()
    var x1=x.toUTCString();// changing the display to UTC string
    document.getElementById('ct').innerHTML = x1;
    tt=display_c();
}