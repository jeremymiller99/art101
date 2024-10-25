// index.js - Lab 6
// Author: Jeremy Miller
// Date: 10/24/24

// Variables

myTransport = ["Ford Fusion", "car", "hybrid"];

// MyMainRide Object
myMainRide = {
  make: "Ford",
  model: "Fusion",
  color: "White",
  year: 2016,

  // Returns the year of my car
  age: function(){
    return 2024 - this.year;
  }
}

// Output
document.writeln("Kiunds of transport I use: ", myTransport, "</br>");

document.writeln("My Main Ride: <pre", 
  JSON.stringify(myMainRide, null, "\t"), "</pre>"
);