/*
   lab15.js 
   Author: Jeremy Miller
   Date: 2024
*/

$(document).ready(function () {
    // Set the button text
    $('#activate').text('Get Random Pokémon Team');

    // Event listener for button click
    $('#activate').on('click', function () {
        // Clear the output section
        $('#output').html('<p>Loading your Pokémon team...</p>');

        // Generate an array of 6 random Pokémon IDs
        const teamPromises = [];
        for (let i = 0; i < 6; i++) {
            const randomId = Math.floor(Math.random() * 1010) + 1;
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
            teamPromises.push($.ajax({ url: apiUrl, method: 'GET' }));
        }

        // Fetch all 6 Pokémon concurrently
        Promise.all(teamPromises)
            .then((responses) => {
                // Build the team display
                const teamHtml = responses.map((data) => {
                    const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                    const pokemonImage = data.sprites.front_default;
                    const pokemonTypes = data.types.map(type => type.type.name).join(', ');

                    return `
                        <div class="pokemon">
                            <img src="${pokemonImage}" alt="${pokemonName}">
                            <h3>${pokemonName}</h3>
                            <p>${pokemonTypes}</p>
                        </div>
                    `;
                }).join('');

                // Update the #output section with the team
                $('#output').html(`
                    <h2>Your Pokémon Team</h2>
                    <div class="pokemon-team">${teamHtml}</div>
                `);
            })
            .catch(() => {
                // Handle errors
                $('#output').html('<p>Error fetching Pokémon data. Please try again.</p>');
            });
    });
});
