/*
   lab12.js - This simple JavaScript/jQuery script gets a value from an input field and outputs a modified version.

   Requirements: jQuery must be loaded for this script to work.

   Author: Jeremy Miller
   Date: 2024
*/

function sortingHat(str){
   mod = str.length % 4;
   if(mod == 0){
      return "Gryffindor";
   } else if (mod == 1){
      return "Ravenclaw";
   } else if (mod == 2){
      return "Slytherin";
   } else if (mod == 3){
      return "Hufflepuff";
   }
}

var btn = document.getElementsById("button");
btn.addEventListener("click", function(){
   var name = document.getElementById("input").ariaValueMax;
   var house = sortingHat(name);
   newText = "<p>The Sorting Hat has sorted you into " + house + "</p>";
   document.getElementById("output").innerHTML = newText;
})