function place (Country, Province, State, City, Zipcode, County, Elevation) {
    this.country = Country;
    this.province = Province;
    this.state = State;
    this.city = City;
    this.zipcode = Zipcode;
    this.county = County;
    this.elevation = Elevation;
    this.printCountry = function() { return this.country;};
    this.printProvince = function() { return this.province;};
    this.printState = function() { return this.state;};
    this.printCity = function() {return this.city;};
    this.printCounty = function() { return this.county;};
    this.elevation = function() { return this.elevation;};
    /*
    this.printHierarchy = function() {return this.printCity()+' '+this.printState()+' '+
                                this.printCountry();};
    */
    this.printHierarchy = function() {
        return (this.printCity() + ' ' + (this.state === undefined ? this.printProvince() : this.printState() ) + ' '
                    +this.printCountry() );};
    
}

function Request(url) {
    var responseText_loc;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url,true);
    console.log(url);
    xhttp.setRequestHeader("Content-type","application/json");

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            // alert(xhttp.responseText);
            responseText_loc = xhttp.responseText;
            // console.log("1. "+responseText_loc);

            var LocationData = JSON.parse(responseText_loc);
            console.log(LocationData);
            if(LocationData.length >= 1) {
                console.log("multi");
                multiResponse(LocationData);
            } else {
                console.log("single")
                singleResponse(LocationData);
            }
            
        }
    }

    xhttp.send();
    // console.log("2. "+responseText_loc);

}


function singleResponse(data) {

    var somePlace = new place(data.country, data.state, data.province, data.city);
    console.log(somePlace.printCity());
    console.log(somePlace.printState());
    console.log(somePlace.printProvince());
    console.log(somePlace.printCountry());
    
    return somePlace;

    
}

function multiResponse(data) {
    var Areas = [];
   
   for(i = 0; i < data.length; i++) {
       Areas.push( new place (data[i].country, data[i].province, data[i].state,
    data[i].city));
   }

   for (k = 0; k < Areas.length; k++) {
       console.log("Country: "+Areas[k].printCountry());
       console.log("Province: "+Areas[k].printProvince());
       console.log("State: "+Areas[k].printState());
       console.log("City: "+Areas[k].printCity());
       console.log("Hierarchy: "+Areas[k].printHierarchy())
   }
   

}




