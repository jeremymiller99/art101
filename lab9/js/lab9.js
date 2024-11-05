/*
   lab9.js - This simple JavaScript/jQuery script uses buttons to modify some elements on the page

   Requirements: jQuery must be loaded for this script to work.

   Author: Jeremy Miller
   Date: 2024
*/

// Add buttons to sections
$("#challenge").append("<button id='button-challenge'>Make Special</button>");
$("#problems").append("<button id='button-problems'>Make Special</button>");
$("#reflection").append("<button id='button-reflection'>Make Special</button>");

// Add click listeners to the buttons
$("#button-challenge").click(function() {
   // Toggle "special" class on the challenge section
   $("#challenge").toggleClass("special");
});

$("#button-problems").click(function() {
   // Toggle "special" class on the problems section
   $("#problems").toggleClass("special");
});

$("#button-reflection").click(function() {
   // Toggle "special" class on the output section
   $("#reflection").toggleClass("special");
});
