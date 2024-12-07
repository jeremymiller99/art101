/*
   lab16.js 
   Author: Jeremy Miller
   Date: 2024
*/

$(document).ready(function () {
    $("#activate").click(function () {
        console.log("Button clicked, starting AJAX request");
        // Display a loading message while the API call is in progress
        $("#comic-content").html("<p>Loading comic...</p>");

        // First, get the latest comic number
        $.ajax({
            url: "https://cors.bridged.cc/https://xkcd.com/info.0.json",
            type: "GET",
            dataType: "json",
            success: function (response) {
                const latestComic = response;
                const latestComicNum = latestComic.num;

                // Generate a random comic number
                const randomComicNum = Math.floor(Math.random() * latestComicNum) + 1;

                // Fetch the random comic
                $.ajax({
                    url: `https://cors.bridged.cc/https://xkcd.com/${randomComicNum}/info.0.json`,
                    type: "GET",
                    dataType: "json",
                    success: function (comicObj) {
                        // Populate the comic-content div with the comic details
                        $("#comic-content").html(`
                            <h3>${comicObj.title}</h3>
                            <img src="${comicObj.img}" alt="${comicObj.alt}" title="${comicObj.alt}">
                            <p>${comicObj.alt}</p>
                        `);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // Display an error message
                        $("#comic-content").html(`<p>Error fetching comic: ${textStatus}</p>`);
                        console.error("Error:", textStatus, errorThrown);
                        console.error("Response Text:", jqXHR.responseText);
                        console.error("Status Code:", jqXHR.status);
                        console.error("Status Text:", jqXHR.statusText);
                        console.error("Response JSON:", jqXHR.responseJSON);
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Display an error message
                $("#comic-content").html(`<p>Error fetching latest comic: ${textStatus}</p>`);
                console.error("Error:", textStatus, errorThrown);
                console.error("Response Text:", jqXHR.responseText);
                console.error("Status Code:", jqXHR.status);
                console.error("Status Text:", jqXHR.statusText);
                console.error("Response JSON:", jqXHR.responseJSON);
            }
        });
    });
});
