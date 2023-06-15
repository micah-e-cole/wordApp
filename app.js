/*
 * Name: MB
 * Class: Originall completed as part of CSD 122
 * Revised: 06/07/2023
 * Original Date: 12/2/2021
 * Assingment: Course Final Project
 * File: ./app.js
 */

// get CSV file contents
function readFileContents(fp) {
    const fileContent = fs.readFileSync(fp, 'utf-8');
    const rows = fileContent.split('\n');
    const csvData = rows.map(row => row.split(','));
    return csvData;
  }

// file location of CSV where words are stored
const csvFP = './random.csv';
// assign variable the value of the newly-created array with contents from CSV
let random_words = readFileContents(csvFP);

// outer variables 
let answer = '';             // holds the value of the random word to be served to the .html 
let maxWrong = 10;           // default game is set to easy  
let diff_setting = 'Easy';   // default ""
let mistakes = 0;            // mistakes are initialized to 0
let guessed = [];            // guessed letters are stored in an array initialized empty
let wordStatus = null;       // used to dislay current state of word to user (guessedWord())


/**
 * function is called by generateButtons and 
 * handles keyboard button press events
 * on each press
 */
function handleGuess(chosenLetter) {
    // if guessed/pressed letter is false, push wrong guess to array
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    // disable the button display
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    // if answer was correct, reveal the letter in the display and check if game won
    if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    // incorrect guess increment wrong guess count, update mistakes on display check if game over
    } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    }
}

/**
 * function determines if game has been won by
 * checking if values in wordStatus are equal to
 *  the letters in answer, game is won
 * If game won, displays a message to the user
 */
function checkIfGameWon() {
    if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Good job!';
    }
}

/**
 * function determines if game has been lost by
 * checking the number of mistakes agains the
 * allowed max for the user difficulty setting
 * if lost, displays message to the user
 */
function checkIfGameLost() {
    if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Better luck next time!';
    }
}

/**
 * function updates the "_" display of the word
 * to map the guessed letters and reveal the answer
 * letters if correctly guessed
 */
function guessedWord() {
    // creates array to store all individual letters
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join(''); 
    // maps letters against answer and reveals the answer when correct letters passed in
    // returns the element to display to the html id wordSpotlight
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

/**
 * function assigns value of mistake to html element mistake
 * (number of wrong guesses)
 */
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

/**
 * function generates the keyboard buttons
 */
function generateButtons() {
    /*
        alphabet str is split into individual letters with split()
        each letter is mapped with a function .map(letter => ...)
            buttonsHTML write all letters as <button> elements within
            the .html file and creates an onClick event listener that 
            callse handleGuess() function
    */

    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz-'.split('').map(letter =>
        `
            <button
            class="keys"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
            >
            ` + letter + `
            </button>
        `).join('');

    // assigns the value of html id keyboard to buttonsHTML 
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

/**
 * function is the process assigned to the button of the same
 * name. It resets the game (new random word) and resets the
 * number of guesses
 */
function restart() {
    let defaultSelection = 'Easy';      // default value passed to setDifficulty
    mistakes = 0;                       // resets value of mistakes
    guessed = [];                       // resets guessed array
    guessedWord();                      // get the word display ("_")
    updateMistakes();                   // put the value of wrong guesses, starts at 0
    generateButtons();                  // create buttons (no longer disabled)
    setDifficulty(defaultSelection);    // get the difficulty setting from drop-down menu
}

/**
 * function makes calls (similar to restart())
 * that updates the length of words that are
 * displayed to user (easy, medium, hard)
 * 
 * this function is called whenever the user
 * changes the value in the drop-down and
 * that value is passed in (difficulty)
 * @param {*} difficulty = str val, user setting  
 */
function setDifficulty(difficulty) {
    diff_setting = difficulty;      // default 'Easy'
    mistakes = 0;                   // same as in restart() f(x)
    guessed = [];                   //same as in restart() f(x)
    randomWord(diff_setting);       // calls the randomWord() f(x) with the default diff setting
    guessedWord();                  // same as in restart() f(x)
    updateMistakes();               // same as in restart() f(x)
    generateButtons();              // same as in restart() f(x)
    guessDifficulty(diff_setting);  // gets and returns the drop-down difficulty setting
}

// These are the initial launch functions
randomWord(diff_setting);            // gets random word w default difficulty 
generateButtons();                   // ""
guessedWord();                       // ""
guessDifficulty(diff_setting);       // ""


/**
 * function assigns maxWrong value based
 * on user input in drop-down menu
 * @param {*} difficulty = str, user selection
 */
function guessDifficulty(difficulty){
    if(difficulty == 'Easy'){               // if easy, return 10 guesses
        maxWrong = 10;
    }else if(difficulty == 'Medium'){       // if medium, 7 guesses
        maxWrong = 7;
    }else if(difficulty == 'Hard'){
        maxWrong = 5;                       // if hard, 5 guesses
    }else{
        maxWrong = 10;                      // else, default                 
    }
    // set value to HTML element
    document.getElementById('maxWrong').innerHTML = maxWrong;
}

/**
 * function returns word length according to user
 * difficulty settings
 * @param {*} difficulty = drop-down menu selection
 * @returns array of lengths corresponding to user selection
 */
function getSelection(difficulty){
    // filter for all words with a length less than 6
    let easy_game = random_words.filter((easy_words) => {
    if(easy_words.length < 6){
        return easy_words;}});  // return as val easy_words: easy_game = easy_words (array)
    // filter for all words with a length of 6-10
    let medium_game = random_words.filter((med_words) => {
    if(med_words.length >= 6 && med_words.length <= 9){
        return med_words;}});   // return as val med_words: medium_game = med_words (array)
    // filter for all words with a length greater than 9
    let hard_game = random_words.filter((hard_words) => {
    if(hard_words.length > 9){
        return hard_words;}});  // return as val hard_words: hard_game = hard_words (array)

    if(difficulty == 'Easy'){           
    return easy_game;                       // if the difficulty was set to easy, return easy array
    } else if (difficulty == 'Medium'){
    return medium_game;                     // if the difficulty was set to medium, return medium array
    } else if (difficulty == 'Hard') {
        return hard_game;                   // if the difficulty was set to hard, return hard array
    } else {
        return easy_game;                   // else return default easy
    }
}

/**
 * function takes in an array and selects a word
 * with a randomizing sequence
 * @param {*} diff = difficulty setting passed in from drop-down
 */
function randomWord(diff) {
    var arr = getSelection(diff);                           // get array according to difficulty
    answer = arr[Math.floor(Math.random() * arr.length)];   // assigns random value from calc index to answer
}

