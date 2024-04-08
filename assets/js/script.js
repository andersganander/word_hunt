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

/**
 * Show instruction-html in board_area
 * 
 */
function showInstructions() {
    
}

/**
 * Add clicked letter to the right position in the answer_area 
 */
function addLetter() {
    
}

/**
 * Check if the word in the answer_area equals the picked word
 *  
 */
function checkWord() {
    
}

/**
 * Remove all letters in the answer_area
 *  
 */
function clearWord() {
    
}

/**
 * 
 */
function endGame() {
    
}

/**
 * 
 * @param {string} word 
 * @returns 
 */
function scrambleLetters(word) {
    
    return scrambledWord;
}

/**
 * Show the next letter in the picked word
 */
function showLetter() {
    
}

