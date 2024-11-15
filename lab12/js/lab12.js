/*
   lab12.js - This simple JavaScript/jQuery script gets a value from an input field and outputs a modified version.

   Requirements: jQuery must be loaded for this script to work.

   Author: Jeremy Miller
   Date: 2024
*/

// Function to determine the Hogwarts house
function sortingHat(str) {
   let mod = str.length % 4;
   if (mod === 0) {
       return "Gryffindor";
   } else if (mod === 1) {
       return "Ravenclaw";
   } else if (mod === 2) {
       return "Slytherin";
   } else if (mod === 3) {
       return "Hufflepuff";
   }
}

// Event listener for button click
document.addEventListener("DOMContentLoaded", function() {
   let btn = document.getElementById("button");
   btn.addEventListener("click", function() {
       let name = document.getElementById("input").value; // Fixed input field value retrieval
       if (name.trim() === "") {
           alert("Please enter a valid name.");
           return;
       }
       let house = sortingHat(name);
       let newText = "<p>The Sorting Hat has sorted you into " + house + ".</p>";
       document.getElementById("output").innerHTML = newText;
   });
});
