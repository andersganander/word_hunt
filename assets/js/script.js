

// GLOBAL VARIABLES, USE WITH CAUTION
// Global variable that contains value for score reduction 
let scoreReduction = 0;
// Global variable that holds the state of the game 
let gameIsOn = false;
// Global variable holding the high score list
let leaderBoard = [];

// Handle event DOMContentLoaded
document.addEventListener('DOMContentLoaded', init());

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
    document.getElementById('btn_info').addEventListener('click', showInfo);
    document.getElementById('btn_highscore').addEventListener('click', showHighscore);
    

    /* Event listeners for buttons in controls area*/
    document.getElementById('btn_blender').addEventListener('click', handleBtnBlender);
    document.getElementById('btn_erase').addEventListener('click', handleBtnErase);
    document.getElementById('btn_enter').addEventListener('click', handleBtnEnter);
    document.getElementById('btn_letter').addEventListener('click', handleBtnLetter);

    // Create initial leaderboard
     // Test code
     createLeaderBoard();
     const leaderBoardHTML = getLeaderBoardAsHTML('');
     document.getElementById('highscore_area').innerHTML = leaderBoardHTML;
     // -------

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
    // make clicked square green
    this.style.backgroundColor = "lightgreen";

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
        addColorToUserInputLetters('#de0f0f');
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
    // maybe not needed
    console.log('preparing new game...');
}

/**
 * Function to be called when start game button is clicked
 * 
 */
function startGame(){
    // Erase all letters in letter input area
    eraseAllInputLetters();

    // Make game grid visible
    document.getElementById('board_area').style.display="grid";
    document.getElementById('info_area').style.display="none";
    document.getElementById('highscore_area').style.display="none";   
    
    // Disable buttons that won't be used during the game
    enableGeneralControlButtons(false);

    // Make start and info buttons grey
    makeStartInfoBtnsGreen();

    // Enable the game control buttons
    enableGameControlButtons(true);

    // Resetboard
    resetBoard();

    // Pick a random word
    const nineletterWords = [
        "Apartment", "Brilliant", "Chocolate", "Delicious", "Education", "Framework", "Gratitude", "Harmonize",
        "Investors", "Juxtapose", "Knowledge", "Landscape", "Mountains", "Nutrition", "Orchestra", "Prototype",
        "Questions", "Relevance", "Spherical", "Tailoring", "Umbilical", "Vacancies", "Workforce", "Xenophobe",
        "Yesterday", "Zealously", "Attention", "Beverages", "Celebrate", "Dangerous", "Envelopes", "Favorable",
        "Geography", "Hesitance", "Integrate", "Journeyed", "Kickstart", "Lionheart", "Multitude", "Neophytes",
        "Operative", "Paintings", "Quicklime", "Recharged", "Satellite", "Telephone", "Unearthed", "Venerated",
        "Wrestling", "Youthful", "Amplifier", "Biometric", "Checklist", "Decentral", "Eclipsing", "Fluoresce",
        "Guardians", "Hydraulic", "Impulsive", "Jalapenos", "Kilometer", "Lavenders", "Magnetism", "Neglected",
        "Obscuring", "Paternity", "Quadrants", "Revolving", "Scavenger", "Threshold", "Undulated", "Vocalists",
        "Windstorm", "Xenonlamp", "Yearbooks", "Zinfandel", "Aerodrome", "Blackouts", "Clambered", "Deadening",
        "Emphasize", "Frostbite", "Gondolier", "Heiresses", "Inverting", "Jerusalem", "Knockouts", "Lifetimes",
        "Mortified", "Nightmare", "Overjoyed", "Playhouse", "Quickstep", "Recycling", "Sleekness", "Trainable",
        "Unplugged", "Vaporizes", "Wolfberry", "Exercised", "Yachtsman", "Zookeeper"
    ]
    
    const pickedWord = nineletterWords[Math.floor(Math.random() * nineletterWords.length)].toUpperCase();
    const scrambledWord = scrambleLetters(pickedWord);

    // Add the picked word to a hidden field
    document.getElementById('pickedWord').value = pickedWord;

    // Put letters in board area 
    putLettersOnBoard(scrambledWord);

    // Change the state of the game by using the GLOBAL variable gameIsOn
    gameIsOn = true;

    // Start timer and write to console (temporary solution)
    // Change score to time in seconds (5 minutes = 300 sec = 300p)
    let score = 300;
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
 * Make info_area visible and hide any other area that is visible
 * If it's already visible it becomes invisible, then the start screen is shown
 */
function showInfo(){
    const display = document.getElementById('info_area').style.display; 
    if( display === 'none'){
        document.getElementById('info_area').style.display="block";
        document.getElementById('board_area').style.display="none";
        document.getElementById('highscore_area').style.display="none";   
    } else {
        document.getElementById('board_area').style.display="grid";        
        document.getElementById('info_area').style.display="none";
        document.getElementById('highscore_area').style.display="none";   
    }
    
}

function showHighscore(){
    const display = document.getElementById('highscore_area').style.display; 

    if( display === 'none'){
        document.getElementById('highscore_area').style.display="block";
        document.getElementById('info_area').style.display="none";
        document.getElementById('board_area').style.display="none";
    } else {
        document.getElementById('board_area').style.display="grid";    
        document.getElementById('highscore_area').style.display="none";    
        document.getElementById('info_area').style.display="none";
    }
    
}

/**
 * Adds/remove class btn_green to start and info buttons
 * true -> 
 * false -> 
 * @param {boolean} active 
 */
function makeStartInfoBtnsGreen(active) {
    if(active){
        document.getElementById("btn_start").classList.add("btn_green");
        document.getElementById("btn_info").classList.add("btn_green");
    } else {
        document.getElementById("btn_start").classList.remove("btn_green");
        document.getElementById("btn_info").classList.remove("btn_green");
    }
    
}

/**
 * Enables/disables the general control buttons
 * true -> enables buttons
 * false -> disables buttons
 * 
 * @param {boolean} enable 
 */
function enableGeneralControlButtons(enable) {
    document.getElementById("btn_start").disabled = !enable;
    document.getElementById("btn_info").disabled = !enable;
    document.getElementById("btn_dark").disabled = !enable;
    document.getElementById("btn_highscore").disabled = !enable;
}

/**
 * Enables/disables the game control buttons
 * true -> enables buttons
 * false -> disables buttons
 * 
 * @param {boolean} enable 
 */
function enableGameControlButtons(enable) {
    document.getElementById("btn_blender").disabled = !enable;
    document.getElementById("btn_letter").disabled = !enable;
    document.getElementById("btn_enter").disabled = !enable;
    document.getElementById("btn_erase").disabled = !enable;
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
 * Erase all input letters by setting innerText='_' for each letter box.
 * Background color is the set to white
 */
function eraseAllInputLetters(){
     const boxes = document.getElementsByClassName('user_letter');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText='_';
    }
    addColorToUserInputLetters('white');
    console.log("Erased all input letters");
}

/**
 * Resets the board to it's start screen appearance
 */
function resetBoard() {
    const word = 'WORD HUNT';
    const squares = document.getElementsByClassName('letter_square');
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.textContent = word[i];
        if(word[i]===' '){
            square.style.backgroundColor = "black";
        } else {
            square.style.backgroundColor = "white";
        }
    }
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
        addColorToUserInputLetters('white');
        writeMessage('GAME OVER !!! Correct word:');
        // Show the correct word   
        showPickedWord();


    } else {
        console.log("CORRECT !!!")
        addColorToUserInputLetters('lightgreen');
        writeMessage('Congrats !! Your score: '+score);
    }
   
    // disable game control buttons
    enableGameControlButtons(false);
    // enable control buttons at the top
    enableGeneralControlButtons(true);
    // Make start button and info button green
    makeStartInfoBtnsGreen(true);
     // update and show high score list
    updateLeaderBoard('Player One',score);
   
    showHighscore();

    // NOT USED YET (maybe not needed ?)
    prepareNewGame();

   

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

/**
 * 
 */
function showPickedWord(){
    const word = document.getElementById('pickedWord').value;
    const boxes = document.getElementsByClassName('user_letter');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = word[i];
    }
}

/**
 * Creates an array of gamer objects and assign it to th global variable leaderBoard.
 * The leaderboard is sorted by score in descending order.
 * Each gamer object consists of a name and score.
 */
function createLeaderBoard(){
    const gamerNames = ["WordSmith", "Anagram Ace", "LexiMaster", "CrosswordKid",
        "Letter Lover","Dark Knight", "Steve Wiebe", "Billy Mitchell", "Kilroy", "Ziggy"
    ];

    // Iterate gamer names and create object for each
    for(let i = 0; i < gamerNames.length; i++){
        let s = Math.floor(Math.random() * 270);
        let g = {name:gamerNames[i], score:s};    
        leaderBoard[i] = g;
    }
    // sort leaderboard
    leaderBoard.sort(compareByScore);
}

/**
 * 
 * @param {string} user 
 * @param {string} score 
 */
function updateLeaderBoard(user,userScore){
    console.log("user: "+user+" score: "+userScore);
    leaderBoard.push({name:user, score:userScore});
    leaderBoard.sort(compareByScore);
    leaderBoard.splice(-1,1);
    console.log(getLeaderBoardAsHTML(user));
    document.getElementById('highscore_area').innerHTML = getLeaderBoardAsHTML(user);
}

/**
 * Compares the score for two gamer objects
 * Is used to sort a list of gamer objects in descending order
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function compareByScore(a, b) {
    return b.score - a.score;
  }

  /**
   * 
   * @returns 
   */
function getLeaderBoardAsHTML(user){
    console.log ('getLeaderboardAsHTML...');
   
    let html = `<p class="hs_heading">LEADERBOARD</p>`;
    for (let i = 0;i<leaderBoard.length;i++) {
        let g = leaderBoard[i];
        if (g.name === user){
            html += `<span class="hs_user">${i+1}. ${g.name} ${g.score}p</span><br>`;
        } else {
            html += `${i+1}. ${g.name} ${g.score}p<br>`;
        }
    }
    console.log(html);

    return html;
}

