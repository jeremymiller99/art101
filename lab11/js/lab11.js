/*
   lab11.js - This simple JavaScript/jQuery script gets a value from an input field and outputs a modified version.

   Requirements: jQuery must be loaded for this script to work.

   Author: Jeremy Miller
   Date: 2024
*/

// Sorts the characters of a string in alphabetical order.
function sortString(inputString) {
   // Convert string to an array, sort it, and join it back into a string
   return inputString.split('').sort().join('');
}

// Document ready function to ensure DOM is fully loaded
$(document).ready(function () {
   // Click listener for the button
   $("#submit").click(function () {
       // Get the value of the input field
       const userName = $("#user-name").val().trim();

       // Check if input is not empty
       if (userName === "") {
           $("#output").html('<div class="text"><p>Please enter a name.</p></div>');
           return;
       }

       // Sort the string
       const userNameSorted = sortString(userName);

       // Append a new div to our output div
       $("#output").html('<div class="text"><p>' + userNameSorted + '</p></div>');
   });
});
