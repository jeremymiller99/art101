/*
   lab13.js - This simple JavaScript/jQuery script gets a value from an input field and outputs a modified version.

   Requirements: jQuery must be loaded for this script to work.

   Author: Jeremy Miller
   Date: 2024
*/
let maxNums = 4; 
let outputElement = document.getElementById("output");

function getFactorObj() {
    let factorObj = {};
    for (let factor = 0; factor < maxNums; factor++) {
        let numId = "num" + factor;
        let textId = "text" + factor;
        let numVal = document.getElementById(numId)?.value;
        let textVal = document.getElementById(textId)?.value;
        console.log(`${factor}) num: ${numVal}, text: ${textVal}`);
        if (numVal && textVal) {
            factorObj[numVal] = textVal;
        }
    }
    return factorObj;
}

function outputToPage(str) {
    let newElement = document.createElement("p");
    newElement.textContent = str;
    outputElement.appendChild(newElement);
}

function fizzBuzzBoom(max, factorObj) {
    for (let i = 1; i <= max; i++) { 
        let outputStr = "";
        for (let factor in factorObj) {
            if (i % factor == 0) {
                outputStr += factorObj[factor];
            }
        }
        if (outputStr) {
            outputStr = ` - ${outputStr}!`;
        }
        outputToPage(i.toString() + outputStr);
    }
}

function reportError(str) {
    outputElement.innerHTML = `<div class="error">${str}</div>`;
}

document.getElementById("submit").addEventListener("click", function () {
    let max = document.getElementById("max")?.value;
    if (!max) {
        reportError("You must provide a maximum!");
        return;
    }
    let factorObj = getFactorObj();
    outputElement.innerHTML = ""; // Clear output
    fizzBuzzBoom(max, factorObj);
    outputElement.classList.add("cols");
});