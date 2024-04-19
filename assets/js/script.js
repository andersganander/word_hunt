// GLOBAL VARIABLES, USE WITH CAUTION

// Global variable that contains value for score reduction 
let scoreReduction = 0;

// Global variable that holds the state of the game 
let gameIsOn = false;

// Global variable holding the high score list
const leaderBoard = [];

// Global variable containing user data
let gameUserData = {
    userName: "guest",
    score: 0
};

// Handle event DOMContentLoaded
document.addEventListener('DOMContentLoaded', init());

/**
 * Initializes event listeners for all the buttons and the clickable squares in the grid
 */
function init() {
    /* Event listeners for the letters */
    const letters = document.getElementsByClassName('letter_square');
    for (const letter of letters) {
        letter.addEventListener('click', handleSquareClicked);
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

    /* Event listener for the save button */
    document.getElementById('btn_save').addEventListener('click', handleBtnSave);

    // Read userdata from local storage
    // Contains code from codetheweb.blog
    const userStringFromLocalStorage = localStorage.getItem('user');
    const userFromLocalStorage = JSON.parse(userStringFromLocalStorage);
    if (userFromLocalStorage != null) {
        gameUserData = userFromLocalStorage;
    }

    // Create initial leaderboard
    createLeaderBoard();
    updateLeaderBoard(gameUserData.userName, gameUserData.score);
    const leaderBoardHTML = getLeaderBoardAsHTML(gameUserData.userName);
    document.getElementById('highscore_area').innerHTML = leaderBoardHTML;
}

/**
 * Event handler for click events on elements with class="letter_square"
 * Adds the letter in the clicked square and to the next free letter box in the answer_area
 *
 * @param {event} event 
 */
function handleSquareClicked(event) {
    const element = event.target;
    if (gameIsOn) {
        // make clicked square grey
        this.style.backgroundColor = "lightgrey";

        const letterBoxes = document.getElementsByClassName('user_letter');
        for (const letter of letterBoxes) {
            if (letter.innerText === '_') {
                letter.innerText = element.innerText;
                break;
            }
        }
    }
}

/**
 * Event handler for the blender button.
 * Shuffles the letter and changes background color accordingly.
 * 
 * @param {event} event 
 */
function handleBtnBlender(event) {
    // Reduce score and send message to user
    scoreReduction = 25;
    writeMessage('Scramble letters: -' + scoreReduction + ' p');
    // fetch the letters and shuffle them
    const boardLetters = getLettersFromBoardAsString();
    putLettersOnBoard(scrambleLetters(boardLetters));
    // fix background colors
    resetColorsInBoard();
    const userLetters = getLettersFromUserInputAsString();

    // add grey background for letters in user letter area
    let usedSquares = [];
    for (let j = 0; j < userLetters.length; j++) {
        const userletter = userLetters[j];
        const squares = document.getElementsByClassName('letter_square');
        for (let k = 0; k < squares.length; k++) {
            let sq = squares[k];
            const squareLetter = sq.innerText;
            if (userletter === squareLetter && !usedSquares.includes(k)) {
                sq.style.backgroundColor = "lightgrey";
                usedSquares.push(k);
                break;
            }
        }
    }
}

/**
 * Erases all letters in the row where the user enters the letters.
 * Also restores the background colors on the grid.
 */
function handleBtnErase() {
    const letterBoxes = document.getElementsByClassName('user_letter');
    for (let i = 0; i < letterBoxes.length; i++) {
        if (i === letterBoxes.length - 1) {
            eraseAllInputLetters();
            resetColorsInBoard();
            scoreReduction = 10;
            writeMessage('Erase letter: -' + scoreReduction + ' p');
        } else if (letterBoxes[i].innerText === '_') {
            if (i > 0) {
                letterBoxes[i - 1].innerText = '_';
                scoreReduction = 10;
                writeMessage('Erase letter: -' + scoreReduction + ' p');
            }
        }
    }
    addColorToUserInputLetters('white');
}

/**
 * Checks if the user entered the correct word.
 */
function handleBtnEnter() {
    const pickedWord = document.getElementById('pickedWord').value;
    const userWord = getLettersFromUserInputAsString();
    if (pickedWord === userWord) {
        endGame();
    } else {
        addColorToUserInputLetters('#de0f0f');
    }
}

/**
 * Event handler for the Next Letter button.
 * Shows the next letter in the picked word and puts it in the row and 
 * changes the bg color for the letter in the grid.
 */
function handleBtnLetter() {
    const pickedWord = document.getElementById('pickedWord').value;
    const userLetters = document.getElementsByClassName('user_letter');

    /* Reduce score and write message to user */
    scoreReduction = 50;
    writeMessage('Next letter: -' + scoreReduction + ' p');

    let nextLetter = '';
    for (let i = 0; i < userLetters.length; i++) {
        if (userLetters[i].innerText === '_') {
            userLetters[i].innerText = pickedWord[i];
            nextLetter = pickedWord[i];
            break;
        }
    }
    changeColorForLetterInGrid(nextLetter);
}

/**
 * Event handler for the save button in the save dialg whiich is shown 
 * the first time the user gets a score that is higher to 0.
 * The value in the input field is validated before it's stored.
 * After the value has been stored, the leaderboard is updated, 
 * then the button is disabled to prevent user from saving again.
 */
function handleBtnSave() {
    const name = document.getElementById('input_userName').value.trim();
    const score = parseInt(document.getElementById('score_value').innerText);
    if (name.length > 0) {
        gameUserData.userName = name;
        storeUserData(name, score);
        updateLeaderBoard(name, score);
        document.getElementById('btn_save').disabled = "true";
    }
}

/**
 * Function to be called when start game button is clicked
 * 
 */
function startGame() {
    // Erase all letters in letter input area
    eraseAllInputLetters();

    // Make game grid visible
    document.getElementById('board_area').style.display = "grid";
    document.getElementById('info_area').style.display = "none";
    document.getElementById('highscore_area').style.display = "none";

    // Disable buttons that won't be used during the game
    enableGeneralControlButtons(false);

    // Make start and info buttons green
    makeStartInfoBtnsGreen();

    // Enable the game control buttons
    showSaveDialog(false);
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
    ];

    const pickedWord = nineletterWords[Math.floor(Math.random() * nineletterWords.length)].toUpperCase();
    const scrambledWord = scrambleLetters(pickedWord);

    // Add the picked word to a hidden field
    document.getElementById('pickedWord').value = pickedWord;

    // Put letters in board area 
    putLettersOnBoard(scrambledWord);

    // Change the state of the game by using the GLOBAL variable gameIsOn
    gameIsOn = true;

    writeMessage('Click the letters');

    // Start timer, change score to time in seconds (5 minutes = 300 sec = 300p)
    let score = 300;
    document.getElementById('score_value').innerText = score;

    let scoreCounter = setInterval(function () {
        // check GLOBAL variable scoreReduction if score should be decreased
        if (scoreReduction > 0) {
            score -= scoreReduction;
            scoreReduction = 0;
        }

        document.getElementById('score_value').innerText = score;
        score -= 1;

        // check if game will be ended
        if (score < 0 || gameIsOn === false) {
            if (score < 0) {
                document.getElementById('score_value').innerText = '0';
                endGame();
            }
            clearInterval(scoreCounter);
        }
    }, 1000);
}

/**
 * Make info_area visible and hide any other area that is visible
 * If it's already visible it becomes invisible, then the start screen is shown
 */
function showInfo() {
    const display = document.getElementById('info_area').style.display;
    if (display === 'none') {
        document.getElementById('info_area').style.display = "flex";
        document.getElementById('board_area').style.display = "none";
        document.getElementById('highscore_area').style.display = "none";
    } else {
        document.getElementById('board_area').style.display = "grid";
        document.getElementById('info_area').style.display = "none";
        document.getElementById('highscore_area').style.display = "none";
    }
}

/**
 *  Make highscore_area visible and hide any other area that is visible
 *  If it's already visible it becomes invisible, then the start screen is shown
 */
function showHighscore() {
    const display = document.getElementById('highscore_area').style.display;
    if (display === 'none') {
        document.getElementById('highscore_area').style.display = "flex";
        document.getElementById('info_area').style.display = "none";
        document.getElementById('board_area').style.display = "none";
    } else {
        document.getElementById('board_area').style.display = "grid";
        document.getElementById('highscore_area').style.display = "none";
        document.getElementById('info_area').style.display = "none";
    }
}

/**
 * Adds/remove class btn_green to start and info buttons
 * true -> adds the btn_green class
 * false -> remover the btn_green class
 * @param {boolean} active 
 */
function makeStartInfoBtnsGreen(active) {
    if (active) {
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
 * Iterates the string and put each letter in a square on the board
 * 
 * @param {string} scrambledWord 
 */
function putLettersOnBoard(scrambledWord) {
    const squares = document.getElementsByClassName('letter_square');
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.textContent = scrambledWord[i];
    }
}

/**
 * Returns the letters on the board as a string
 * starting in the upper left corner
 * 
 * @returns string
 */
function getLettersFromBoardAsString() {
    const squares = document.getElementsByClassName('letter_square');
    let letters = '';
    for (let i = 0; i < squares.length; i++) {
        letters += squares[i].innerText;
    }
    return letters;
}

/**
 * Retrieves the letter from the letter row as a string 
 * starting from the left
 * 
 * @returns string
 */
function getLettersFromUserInputAsString() {
    const boxes = document.getElementsByClassName('user_letter');
    let letters = '';
    for (let i = 0; i < boxes.length; i++) {
        letters += boxes[i].innerText;
    }
    return letters;
}

/**
 * Changes the text in the message box
 * 
 * @param {string} msg 
 */
function writeMessage(msg) {
    document.getElementById('message_area').innerText = '$ ' + msg;
}

/**
 * Changes the bg color on the boxes in the letter row
 * 
 * @param {*} color 
 */
function addColorToUserInputLetters(color) {
    const boxes = document.getElementsByClassName('user_letter');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = color;
    }
}

/**
 * Erase all input letters by setting innerText='_' for each letter box.
 * Background color is the set to white
 */
function eraseAllInputLetters() {
    const boxes = document.getElementsByClassName('user_letter');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '_';
    }
    addColorToUserInputLetters('white');
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
        if (word[i] === ' ') {
            square.style.backgroundColor = "black";
        } else {
            square.style.backgroundColor = "white";
        }
    }
}


/**
 * Evalutes the score and checks if the user has more than 0p or not
 * 
 */
function endGame() {
    gameIsOn = false;

    // Adjust the score
    let score = parseInt(document.getElementById('score_value').innerText);
    if (score < 0) {
        score = 0;
    } else if (score > 0) {
        score -= 1;
    }

    // user lost
    if (score === 0) {
        addColorToUserInputLetters('white');
        writeMessage('GAME OVER !!! Correct word:');
        // Show the correct word   
        showPickedWord();

        // Users guess was correct
    } else {
        addColorToUserInputLetters('lightgreen');
        writeMessage('Congrats !! Your score: ' + score);
    }

    // disable game control buttons
    enableGameControlButtons(false);
    // enable control buttons at the top
    enableGeneralControlButtons(true);
    // Make start button and info button green
    makeStartInfoBtnsGreen(true);

    // Show save dialog if users score is a new personal record
    if (score > parseInt(gameUserData.score)) {
        if (gameUserData.userName == 'guest') {
            showSaveDialog(true);
        } else {
            gameUserData.score = score;
            storeUserData(gameUserData.userName, score);

            // update leaderboard()
            updateLeaderBoard(gameUserData.userName, score);
        }
    } else {
        updateLeaderBoard(gameUserData.userName, score);
    }
    showHighscore();
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
    let newWord = '';
    for (let i = 0; i < origLen; i++) {
        let x = Math.floor(Math.random() * newLen);
        newWord += word.charAt(x);
        word = word.substring(0, x) + word.substring(x + 1, newLen + 1);
        newLen = word.length;
    }
    return newWord;
}

/**
 * Reveals the secret (picked) word and displays it in the row.
 */
function showPickedWord() {
    const word = document.getElementById('pickedWord').value;
    const boxes = document.getElementsByClassName('user_letter');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = word[i];
    }
}

/**
 * Creates an array of gamer objects and assign it to the global variable leaderBoard.
 * The leaderboard is sorted by score in descending order.
 * Each gamer object consists of a name and score.
 */
function createLeaderBoard() {
    const gamerNames = ["WordSmith", "Anagram Ace", "LexiMaster", "CrosswordKid",
        "Letter Lover", "Dark Knight", "Steve Wiebe", "Billy Mitchell", "Kilroy", "Ziggy"
    ];

    // Iterate over gamer names and create object for each
    for (let i = 0; i < gamerNames.length; i++) {
        let s = Math.floor(Math.random() * 270);
        let g = {
            name: gamerNames[i],
            score: s
        };
        leaderBoard[i] = g;
    }
    // sort leaderboard
    leaderBoard.sort(compareByScore);
}

/**
 * Add the user and score to the leaderbord (global variable) and sorts it
 * 
 * @param {string} user 
 * @param {string} score 
 */
function updateLeaderBoard(user, userScore) {
    leaderBoard.push({
        name: user,
        score: userScore
    });
    leaderBoard.sort(compareByScore);
    leaderBoard.splice(-1, 1);
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
 * Creates html which represents the leaderboard
 * The users name and score is marked in a color that's defind by a syyle rule
 * 
 * @param {string} user 
 * @returns 
 */
function getLeaderBoardAsHTML(user) {
    let html = `<p class="hs_heading">LEADERBOARD</p>`;
    for (let i = 0; i < leaderBoard.length; i++) {
        let g = leaderBoard[i];
        if (g.name === user) {
            html += `<span class="hs_user">${i+1}. ${g.name} ${g.score}p</span>`;
        } else {
            html += `${i+1}. ${g.name} ${g.score}p<br>`;
        }
    }
    return html;
}

/**
 * Stores the users name and score in the users browser (local.storage)
 * 
 * @param {string} uname 
 * @param {string} uscore 
 */
function storeUserData(uname, uscore) {

    const user = {
        userName: uname,
        score: uscore
    };

    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
}

/**
 * Shows / hides the save dialog 
 * 
 * @param {boolean} show 
 */
function showSaveDialog(show) {
    if (show) {
        document.getElementById('controls_area').style.display = "none";
        document.getElementById('userInput_area').style.display = "block";
    } else {
        document.getElementById('controls_area').style.display = "flex";
        document.getElementById('userInput_area').style.display = "none";
    }
}

/**
 * make all letter squares white
 * change bgcolor on squares with a corresponding user letter
 * 
 */
function resetColorsInBoard() {

    const squares = document.getElementsByClassName('letter_square');

    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        // Set bgcolor on middle square to black
        if (i === 4) {
            square.style.backgroundColor = "black";
        } else {
            square.style.backgroundColor = "white";
        }
    }
}

/**
 * Changes the bg color for the letter
 * 
 * @param {*} letter 
 */
function changeColorForLetterInGrid(letter) {
    const squares = document.getElementsByClassName('letter_square');
    for (let k = 0; k < squares.length; k++) {
        let sq = squares[k];
        const squareLetter = sq.innerText;
        if (letter === squareLetter) {
            if (sq.style.backgroundColor !== "lightgrey") {
                sq.style.backgroundColor = "lightgrey";
                break;
            }
        }
    }
}