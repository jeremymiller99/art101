/*
   lab10.js - This simple JavaScript/jQuery script uses buttons to modify some elements on the page

   Requirements: jQuery must be loaded for this script to work.

   Author: Jeremy Miller
   Date: 2024
*/

// Generate random text function
function generateRandomText() {
   const text = "hello friend";
   const min = 3;
   const max = text.length; // Ensure max doesn't exceed the available text length
   const randLen = Math.floor(Math.random() * (max - min + 1)) + min;
   // Get a random starting index within bounds
   const randStart = Math.floor(Math.random() * (text.length - randLen + 1));
   // Generate the random text
   return text.slice(randStart, randStart + randLen);
}

// Document ready
$(document).ready(function () {
   // Click listener for button
   $("#make-convo").click(function () {
       // Get new fake dialogue
       const newText = generateRandomText();
       // Append a new div to the output div
       $("#output").append('<div class="text"><p>' + newText + '</p></div>');
   });
});
