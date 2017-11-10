/*
    Felix Huang #013427386
    11/9/2017
*/

// This is a function for creating a 'place' object.
// The object contains name:value pairs that describe the 'place' object
function place (Country, Province, State, City, Zipcode, County, Elevation,Timezone) {
    this.country = Country;
    this.province = Province;
    this.state = State;
    this.city = City;
    this.zipcode = Zipcode;
    this.county = County;
    this.elevation = Elevation;
    this.timezone = Timezone;
    
    // Methods for accessing 'place' object data 
    this.printCountry = function() { 
        return this.country;
    };

    this.printProvince = function() { 
        return this.province;
    };

    this.printState = function() { 
        return this.state;
    };

    this.printCity = function() {
        return this.city;
    };
    this.printCounty = function() { 
        return this.county;
    };

    this.elevation = function() { 
        return this.elevation;
    };

    this.printHierarchy = function() {
        return (this.printCity() + ' ' + (this.state === undefined ? this.printProvince() : this.printState() ) 
        + ' ' +this.printCountry() );
    };

    this.printElevation  = function() {
        return this.timezone;
    }
    
}

// This is a function to request information about a place.
// This function works if the data is stored in JSON format
// The function can handle a single JSON object or multiple
// JSON objects encased in [ ] 
function requestInfo() {
    // The variable will store the response from the GET
    var responseLocation;

    // Create the request to access data source
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","data.json",true);
    xhttp.setRequestHeader("Content-type","application/json");

    // This function fires whenever xhttp.readyState changes.
    // Whenever the state has changed and the response to GET was
    // successful, extract data from the response. 
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {

            // The request response will return data from the data source
            // which will be parsed
            responseLocation = xhttp.responseText;
            var locationJSON = JSON.parse(responseLocation);
            
            // This condition will call the appropriate function if response received
            // had multiple JSON objects or only a single one. 
            if(locationJSON.length >= 1) {
                addSingle(locationJSON);
            } else {
                addMultiple(locationJSON);
            }
            
        }
    }

    xhttp.send();
}

// This function is for adding a single 'place' object.
function addSingle(data) {

    var somePlace = new place(data.country, data.state, data.province, data.city);  
    return somePlace;
}

// This function is for adding multiple 'place' objects
function addMultiple(data) {
    // Create an array to store 'place' objects
    var areas = [];
   
    // Add 'place' objects to the array 
   for(i = 0; i < data.length; i++) {
       areas.push( new place (data[i].country, 
                            data[i].province, 
                            data[i].state,
                             data[i].city));
   }

   return areas;

}




