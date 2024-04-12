// Handle event DOMContentLoaded
document.addEventListener('DOMContentLoaded', init());

// GLOBAL VARIABLES
// Global variable that contains value for score reduction 
let scoreReduction = 0;
// Global variable that holds the state of the game 
let gameIsOn = false;

/**
 * Initializes event listeners etc
 */
function init() {
   /* Event listeners for the letters */
    const letters = document.getElementsByClassName('letter_square');
    for (const letter of letters) {
        letter.addEventListener('click',handleSquareClicked);
    }

    /* Event listeners for buttons in general_controls area*/
    document.getElementById('btn_start').addEventListener('click', startGame);
    

    /* Event listeners for buttons in controls area*/
    document.getElementById('btn_blender').addEventListener('click', handleBtnBlender);
    document.getElementById('btn_erase').addEventListener('click', handleBtnErase);
    document.getElementById('btn_enter').addEventListener('click', handleBtnEnter);
    document.getElementById('btn_letter').addEventListener('click', handleBtnLetter);

    /*startGame();*/
}


/**
 * Event handler for click events on elements with class="letter_square"
 * Adds the letter in the clicked square and to the next free letter box in the answer_area
 *
 * @param {*} event 
 */
function handleSquareClicked (event){
    const element = event.target;
    
    const letterBoxes = document.getElementsByClassName('user_letter');
    for (const letter of letterBoxes) {
        if (letter.innerText === '_'){
            letter.innerText = element.innerText;
            break;
        }
    }
    
}

/**
 * 
 * @param {*} event 
 */
function handleBtnBlender (event){
    console.log("Blender button pressed...");
    // Reduce score and send message to user
    scoreReduction = 25;
    writeMessage('Scramble letters: -'+scoreReduction+' p');

    const boardLetters = getLettersFromBoardAsString();
    putLettersOnBoard(scrambleLetters(boardLetters));
}

/**
 * 
 */
function handleBtnErase() {
     
    const letterBoxes = document.getElementsByClassName('user_letter');
    for (let i=0;i<letterBoxes.length;i++) {
        if(letterBoxes[i].innerText === '_'){
            if(i>0){
                letterBoxes[i-1].innerText = '_';
                /* Reduce score and write message to user */
                scoreReduction = 10;
                writeMessage('Erase letter: -'+scoreReduction+' p');
            }
        }
    }
    addColorToUserInputLetters('white');
}

/**
 * 
 */
function handleBtnEnter() {
   const pickedWord = document.getElementById('pickedWord').value;
   console.log("Picked: "+pickedWord);
   const userWord = getLettersFromUserInputAsString();
    console.log("User: "+userWord);
   if (pickedWord === userWord) {
       endGame();
   } else {
        console.log("INININCORRECT !!!");
        addColorToUserInputLetters('indianred');
   }
}

/**
 * 
 */
function handleBtnLetter() {
    const pickedWord = document.getElementById('pickedWord').value;
    const userLetters = document.getElementsByClassName('user_letter');

    /* Reduce score and write message to user */
    scoreReduction = 50;
    writeMessage('Next letter: -'+scoreReduction+' p');
    
    for (let i = 0; i < userLetters.length;i++){
        if(userLetters[i].innerText === '_'){
            userLetters[i].innerText = pickedWord[i];
            break;
        }
    }
}

/**
 * Set things up after a game is finished and prepare for a new game
 */
function prepareNewGame(){

}

/**
 * Function to be called when start game button is clicked
 * 
 */
function startGame(){
    // Disable buttons that won't be used during the game
    document.getElementById("btn_start").disabled = true;
    document.getElementById("btn_info").disabled = true;
    document.getElementById("btn_dark").disabled = true;
    document.getElementById("btn_highscore").disabled = true;

    // Make start and info buttons grey
    document.getElementById("btn_start").classList.remove("btn_green");
    document.getElementById("btn_info").classList.remove("btn_green");

    // Enable the game control buttons
    document.getElementById("btn_blender").disabled = false;
    document.getElementById("btn_letter").disabled = false;
    document.getElementById("btn_enter").disabled = false;
    document.getElementById("btn_erase").disabled = false;

    // Pick a random word
    const nineletterWords = ["ADVENTURE", "BRILLIANT", "CHOCOLATE", "DANGEROUS", "EDUCATION","BUTTERFLY",
    "CANNISTER"];
    const pickedWord = nineletterWords[Math.floor(Math.random() * nineletterWords.length)]
    const scrambledWord = scrambleLetters(pickedWord);

    // Add the picked word to a hidden field
    document.getElementById('pickedWord').value = pickedWord;

    // Put letters in board area 
    putLettersOnBoard(scrambledWord);

    // Change the state of the game by using the GLOBAL variable gameIsOn
    gameIsOn = true;

    // Start timer and write to console (temporary solution)
    // Change score to time in seconds (5 minutes = 300 sec = 300p)
    let score = 100;
    document.getElementById('score_value').innerText = score;
    score-- ;
    let scoreCounter = setInterval(function(){
        console.log('Current score: ' + score + ' p');
        if(scoreReduction > 0){
            console.log('Reduces score with '+scoreReduction);
            score -= scoreReduction;
            scoreReduction = 0;
        }

        document.getElementById('score_value').innerText = score;
        score -= 1;
      
        if (score < 0 || gameIsOn === false) {
            if (score < 0){
                document.getElementById('score_value').innerText='0';
                endGame();
            }
            clearInterval(scoreCounter);
        }
    },1000);

     
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
 * 
*/
function getLettersFromUserInputAsString() {
    const boxes = document.getElementsByClassName('user_letter');
    let letters = '';
    for (let i = 0; i < boxes.length; i++) {
        letters += boxes[i].innerText;
    }
    console.log("getLettersFromUserInputAsString returning:"+letters)
    return letters;
}

function writeMessage(msg) {
    // Add possibility to choose color?
    document.getElementById('message_area').innerText='$ '+msg;
}

function addColorToUserInputLetters(color){
    const boxes = document.getElementsByClassName('user_letter');
    let letters = '';
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = color;
    }
    console.log("addColorToUserInputLetters: "+color);
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
function eraseWord() {
    
}

/**
 * Evalutes the score and checks if the user lost
 * 
 * 
 * @param {*} score 
 */
function endGame() {
    gameIsOn = false;
    const score = parseInt(document.getElementById('score_value').innerText);
    if (score === 0) {
        console.log("Time's up!");
        addColorToUserInputLetters('indianred');
        writeMessage('GAME OVER !!!')
        // Show the correct word    
    } else {
        console.log("CORRECT !!!")
        addColorToUserInputLetters('lightgreen');
        writeMessage('Congrats !! Your score: '+score);
    }
    prepareNewGame();
    // show high score list

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

