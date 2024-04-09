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
    const scrambledWord = scrambleLetters(pickedWord);

    // Put letters in board area (unrandomly now... will be changed to random)
    const squares = document.getElementsByClassName('letter_square');
    for (let i = 0; i<squares.length; i++) {
        let square = squares[i];
        square.textContent = scrambledWord[i];
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
 * Takes a word as input, scrambles the letters and
 * returns the new word.
 * 
 * @param {string} word 
 * @returns string
 */
function scrambleLetters(word) { 
    const origLen = word.length;
    let newLen = origLen;
    let newWord='';
    let x = 0;
    for (let i=0;i<origLen;i++){
        let x = Math.floor(Math.random()*newLen);
        newWord += word.charAt(x);
        word = word.substring(0,x) + word.substring(x+1,newLen+1);
        newLen = word.length;
    }
    return newWord;
}

/**
 * Show the next letter in the picked word
 */
function showLetter() {
    
}

