var place = {};

function Request(url) {
    var responseText_loc;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url,true);
    console.log(url);
    xhttp.setRequestHeader("Content-type","application/json");

    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            // alert(xhttp.responseText);
            responseText_loc = xhttp.responseText;
            console.log("1. "+responseText_loc);
            extractData(responseText_loc);
        }
    }

    xhttp.send();
    // console.log("2. "+responseText_loc);

}

function cityName() {
    return place.city;
}

function provinceName() {
    return place.province;
}

function stateName() {
    return place.state;
}

function countryName() {
    return place.country;
}

function hierarchy() {
    return countryName() + stateName() + cityName();
}


function extractData(data) {
    console.log(data);
    
    var LocationData = JSON.parse(data);
    
    
     
    
        console.log(LocationData[0]);

        var area_instance = LocationData[0];
        place.country = area_instance.country;
        console.log(place.country);
    
        if(area_instance.hasOwnProperty('state')) {
    
            place.state = area_instance.state;
            console.log(place.state);
        }
        else {
            place.province = area_instance.province;
            console.log(place.province);
        }
    
        place.city = area_instance.city;
        console.log(place.city);
    
}

