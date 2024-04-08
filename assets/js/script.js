// Handle event DOMContentLoaded
document.addEventListener('DOMContentLoaded', startGame());

/**
 * Function to be called when start game button is clicked
 * 
 */
function startGame(){
    // Pick a random word
    const nineletterWords = ["ADVENTURE", "BRILLIANT", "CHOCOLATE", "DANGEROUS", "EDUCATION"];
    const pickedWord = nineletterWords[Math.floor(Math.random() * nineletterWords.length)]

    // Put letters in board area (unrandomly now... will be changed to random)
    const squares = document.getElementsByClassName('letter_square');
    for (let i = 0; i<squares.length; i++) {
        let square = squares[i];
        square.textContent=pickedWord[i];
    }

    // Start timer and show on screen

    // Update score 
    console.log("Game started...")
}

