// Handle event DOMContentLoaded
document.addEventListener('DOMContentLoaded', init());

/**
 * Initializes event listeners etc
 */
function init() {
    const letters = document.getElementsByClassName('letter_square');
    for (const letter of letters) {
        letter.addEventListener('click',handleSquareClicked);
    }

    document.getElementById('btn_blender').addEventListener('click', handleBtnBlender);

    startGame();
}


/**
 * Event handler for click events on elements with class="letter_square"
 * Adds the letter in the clicked square and adds it to the hidden field userWord
 *
 * @param {*} event 
 */
function handleSquareClicked (event){
    const element = event.target;
    document.getElementById("userWord").value += element.innerText;
    //console.log('Text: '+element.innerText);
    const letterBoxes = document.getElementsByClassName('user_letter');
    for (const letter of letterBoxes) {
        if (letter.innerText === '_'){
            letter.innerText = element.innerText;
            break;
        }
    }
    
    //console.log('Text: '+document.getElementById("userWord").value);
}

/**
 * 
 * @param {*} event 
 */
function handleBtnBlender (event){
    console.log("Blender button pressed...");
    const boardLetters = getLettersFromBoardAsString();
    putLettersOnBoard(scrambleLetters(boardLetters));
}


/**
 * Function to be called when start game button is clicked
 * 
 */
function startGame(){
    // Pick a random word
    const nineletterWords = ["ADVENTURE", "BRILLIANT", "CHOCOLATE", "DANGEROUS", "EDUCATION"];
    const pickedWord = nineletterWords[Math.floor(Math.random() * nineletterWords.length)]
    const scrambledWord = scrambleLetters(pickedWord);

    // Put letters in board area 
    putLettersOnBoard(scrambledWord);

    // Start timer and show on screen

    // Update score 
    console.log("Game started...")
}

/**
 * 
 * @param {*} scrambledWord 
 */
function putLettersOnBoard(scrambledWord) {
    const squares = document.getElementsByClassName('letter_square');
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.textContent = scrambledWord[i];
    }
}

/**
 * 
 */
function getLettersFromBoardAsString() {
    const squares = document.getElementsByClassName('letter_square');
    let letters = '';
    for (let i = 0; i < squares.length; i++) {
        letters += squares[i].innerText;
    }
    console.log("getLettersFromBoardAsString returning:"+letters)
    return letters;
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

