// lab7.js - Lab 7
// Author: Jeremy Miller
// Date: 10/24/24

// takes user input and sorts the letters of their input (name)
function sortUserName() {
  var userName = window.prompt("Hi. Please tell me your name so I can fix it.");
  console.log("userName =", userName);

  var nameArray = userName.split('');
  console.log("nameArray =", nameArray);

  var nameArraySort = nameArray.sort();
  console.log("nameArraySort =", nameArraySort);

  var nameSorted = nameArraySort.join('');
  console.log("nameSorted =", nameSorted);

  return nameSorted;
}

// Update the HTML content with the sorted name
document.addEventListener('DOMContentLoaded', function() {
  var sortedName = sortUserName();
  document.getElementById('sortedNameDisplay').innerHTML = "Here is your sorted name: " + sortedName + "<br>";
});
