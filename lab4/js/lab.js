// index.js - Pseudocode for Tetris
// Author: Jeremy Miller
// Date: 10/17

// Initialize the game
    // Set up the empty game board (grid)
    // Initialize the first tetromino (falling block)
    // Prepare the upcoming tetrominoes in a queue

// Main game loop
    // While the game is active:
        // Print the current state of the board
            // Display the grid with the current tetromino and any placed blocks

        // Get player's input (move or rotate tetromino)
            // Move the tetromino left, right, or down
            // Rotate the tetromino if needed

        // Update the game state
            // Move the tetromino down automatically over time
            // Check for collision with walls, floor, or other blocks
            // If the tetromino lands:
                // Lock the tetromino into place on the board
                // Check for completed lines and clear them
                // Increase score if any lines are cleared
                // Spawn a new tetromino from the queue

        // Check for game over condition
            // If a new tetromino cannot be placed, the game ends

// End the game
    // Display the final score
    // Optionally, allow the player to restart or quit
