/**
 * Game JS
 * 
 * @package Word Guess Game
 * @author Christopher Collins
 * @version 1.3
 * @license none (public domain)
 * 
 * ===============[ TABLE OF CONTENTS ]===============
 * 1.0 Backend
 *   1.1 Initalize Variables
 *   1.2 WordGuessingGame Class Declaration
 * 
 * 2.0 Frontend
 *   2.1 Create Game Object
 *   2.2 Listen For KeyUp Events
 * 
 * A.0 Archived
 * 
 *****************************************************/
/*===============[ 1.0 Backend ]====================*/
/* 1.1 Initialize Variables
/*--------------------------------------------------*/

/**
 * 1.2 WordGuessingGame Class Declaration
 */
class WordGuessingGame {
  // Private Variables
  #defaultWords = [{
      "word": "hondacrv",
      "image": "assets/images/cars/honda-cr-v-background.jpg",
      "sound": "sound_file1.png",
    },
    {
      "word": "toyotarav4",
      "image": "assets/images/cars/2019-Toyota-RAV4-feature_o.jpg",
      "sound": "sound_file2.png",
    },
    {
      "word": "hondacivic",
      "image": "assets/images/cars/Honda-Civic-PNG-Pic.png",
      "sound": "sound_file3.png",
    },
    {
      "word": "toyotahighlander",
      "image": "assets/images/cars/2018-Toyota-Highlander-model.png",
      "sound": "sound_file4.png",
    },
    {
      "word": "mazdacx5",
      "image": "assets/images/cars/2018-mazda-cx-5-Eternal-Blue-Mica.png",
      "sound": "sound_file5.png",
    },
    {
      "word": "hondaaccord",
      "image": "assets/images/cars/2018-Honda-Accord-COLOR-Platinum-White.png",
      "sound": "sound_file6.png",
    },
    {
      "word": "dodgeram1500",
      "image": "assets/images/cars/Dodge-Ram-1500.png",
      "sound": "sound_file7.png",
    },
    {
      "word": "chevroletequinox",
      "image": "assets/images/cars/chevy_equinox2019_black.png",
      "sound": "sound_file8.png",
    },
    {
      "word": "kiatelluride",
      "image": "assets/images/cars/2020-kia-telluride.jpg",
      "sound": "sound_file9.png",
    },
    {
      "word": "chevrolettraverse",
      "image": "assets/images/cars/2018-Chevrolet-Traverse-Header.png",
      "sound": "sound_file10.png",
    }, {
      "word": "toyotatacoma",
      "image": "assets/images/cars/2018-toyota-tacoma-in-white.png",
      "sound": "sound_file11.png",
    }, {
      "word": "jeepwrangler",
      "image": "assets/images/cars/jeep-wrangler.png",
      "sound": "sound_file12.png",
    }, {
      "word": "hondapilot",
      "image": "assets/images/cars/2019-Honda-Pilot-LX-Hero.png",
      "sound": "sound_file13.png",
    },
  ];

  #defaultCategory = "Cars Trivia";
  #defaultGuesses = 9;
  validKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  // Game Properties
  words = []; 
  previousWords = []; // Words already played        
  lettersGuest = [];  
  currentWordLetters = []; 
  currentWordObject = {};
  the_word = []; // This represents the letters guessed and blanks "_"
  guessesLeft = 0;    
  wins = 0;
  losses = 0;

  // DOM ELEMENT Properties
  WORD = document.getElementById("current_word");
  WORD_LEN = document.getElementById("current_word_length");
  WORD_IMG = document.getElementById("current_word_image");
  WORD_CAT = document.getElementById("word_catetory");
  GUESSES_LEFT = document.getElementById("guesses_remaining");
  LETTERS_GUEST = document.getElementById("letters_guest");
  LETTERS_GUEST_COUNT = document.getElementById("letters_guest_counter");
  alertMessage = document.getElementById("alert_message");

  constructor(secretWords = this.#defaultWords, wordcat = this.#defaultCategory, guessCount = this.#defaultGuesses) {
    this.words = secretWords;
    this.wordCategory = wordcat;
    this.guessesLeft = guessCount;
    this.setRandomWord();
  } // END constructor

  setRandomWord() {
    console.log("Called Set Random Word!");
    var min = 0;
    var max = this.words.length;
    var index = Math.floor(Math.random() * Math.floor(+max - +min)) + +min;
    
    this.currentWordObject = this.words[index];
    this.currentWordLetters = this.currentWordObject.word.split("");

    // Removes the current_word from the list of words so it can't be selected again.
    this.words.splice(index, 1);
    
    console.log("Current Word: "+ this.currentWordObject.word);
    console.log(this.currentWordLetters);
    
    this.the_word = [];
    for(var i=0; i < this.currentWordLetters.length; i++) {
      this.the_word.push("_");
    }
    
    // Set DOM Elements for the round
    this.WORD.innerHTML = this.the_word.join(" ");
    this.WORD_LEN.innerHTML = this.currentWordObject.word.length;
    this.WORD_IMG.src = (this.imageExists(this.currentWordObject.image)) ? this.currentWordObject.image : this.WORD_IMG.src;
    this.WORD_CAT.innerHTML = this.wordCategory;
    this.GUESSES_LEFT.innerHTML = this.guessesLeft;
    this.LETTERS_GUEST.innerHTML = this.lettersGuest;
    this.LETTERS_GUEST_COUNT.innerHTML = this.lettersGuest.length;

    console.log("Current", this.words);
    console.log("Previous",this.previousWords);
  } // END setRandomWord()

  resetGame(){
    console.log("Reset Game Called!");
    this.alert(); // Reset Alert

    // var filteredCorrectLetters = this.the_word.filter(function(v){ return v != "_" });
    // console.log("Guesses LEFT",);
    // console.log(this.lettersGuest.length + " + " + filteredCorrectLetters.length);

    this.guessesLeft = this.lettersGuest.length + this.guessesLeft;
    
    this.words = this.words.concat(this.previousWords);    
    console.log("Guesses Left", this.guessesLeft);
    console.log("WordObject", this.words);
    
    this.previousWords = []; // Words already played        
    this.lettersGuest = []
    this.currentWordLetters = []; 
    this.currentWordObject = {};
    this.the_word = []; // This represents the letters guessed and blanks "_"  
    this.wins = 0;
    this.losses = 0;

    this.setRandomWord();
  } // END resetGame()

  resetWord(response=false){
    console.log("resetWord Called");
    this.previousWords.push(this.currentWordObject);
    
    // Check if game is over or if we can move on to the next round.
    if(this.words.length === 0){ //} && (this.wins > 0 || this.losses > 0) ){
      return true;
    }
    
    // var filteredCorrectLetters = this.the_word.filter(function(v){ return v != "_" });
    this.guessesLeft = this.lettersGuest.length + this.guessesLeft;
    this.lettersGuest = [];

    this.setRandomWord();
    // console.log(this.lettersGuest.length + " + " + filteredCorrectLetters.length);
    return response;
  }

  isThere(letter){
    var found = false;
    var foundAt = [];

    this.alert(); // Reset Alert
 
    if(this.validKeys.indexOf(letter) === -1){
      var message = "'" + letter + "' is not a valid letter.";
      this.alert(message,"alert-danger");
      return;
      
    }else if(this.the_word.indexOf(letter) !== -1 || this.lettersGuest.indexOf(letter) !== -1){
      var message = "You already guest '" + letter + "' try a different one.";
      this.alert(message,"alert-primary");
      return
    }

    this.currentWordLetters.forEach(function(x,index){
      if( x === letter.toLowerCase() ){
        found = true; 
        foundAt.push(index);
      }
    });

    if(found){
      var thatWord = this.the_word;
      foundAt.forEach(function(i){
        thatWord[i] = letter;
      });

      // this.the_word[foundAt] = letter;
      this.the_word = thatWord;
      this.WORD.innerHTML = this.the_word.join(" ");

      var message = "Yes there is a '" + letter + "'. Good job!";
      this.alert(message,"alert-success");
    }else{
      this.guessesLeft--;
      this.lettersGuest.push(letter);

      this.GUESSES_LEFT.innerHTML = this.guessesLeft;
      this.LETTERS_GUEST.innerHTML = this.lettersGuest;
      this.LETTERS_GUEST_COUNT.innerHTML = this.lettersGuest.length;

      var message = "Sorry there is no '" + letter + "'. Try again.";
      this.alert(message,"alert-danger");
    }

    this.checkWinCondition();
  } // END isThere

  alert(message="", addThisClass=""){
    console.log("alert",message);

    if(message === "" && addThisClass === ""){ // RESET Alert Message
      if(this.alertMessage.className !== "alert"){
        this.alertMessage.className = "";
        this.alertMessage.classList.add("alert");
        this.alertMessage.innerHTML = "";
      }

      console.log("alert1");
      return;
      
    }else if(message !== "" && addThisClass === ""){
      this.alertMessage.className = "";
      this.alertMessage.classList.add("alert");
      addThisClass = "alert-info";
      console.log("alert2");
    }
    
    this.alertMessage.classList.add(addThisClass);
    this.alertMessage.innerHTML = message;
    return;
  } // END alert

  confirm(message,response=true){
    console.log("confirm",message);

    if(response){ // Return Boolean of the users response
      return window.confirm(message);

    }else{ // Don't care for a response so alert the message. 
      this.alert(message);
    }

    return;
  } // END confirm
  
  imageExists(image_url){
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
  } // END imageExists

  checkWinCondition(){
    console.log("win condition called");
    console.log(this.the_word.toString());
    console.log(this.currentWordLetters.toString());
    console.log("___Wins: " + this.wins + " Losses: " + this.losses);

    // WIN or LOSE?
    if(this.the_word.toString() === this.currentWordLetters.toString() || this.guessesLeft === 0){
      var WinOrLose_message = "You Lose!";
      var winOrLose_alert = "alert-danger";

      // WIN Condition
      if(this.the_word.toString() === this.currentWordLetters.toString()) { 
        this.wins++;
        WinOrLose_message = "You Win!";
        winOrLose_alert = "alert-success";

      }else if (this.guessesLeft === 0) {  // LOSE Condition
        this.losses++;
      }

      // GAME OVER or not ?
      if(this.resetWord()){
        // GAME OVER!
        
        var play_again = this.confirm(WinOrLose_message + " Game Over! Do you want to play again?");
        if(play_again){
          this.resetGame();
        }else{
          this.alert("Wins: " + this.wins + " Losses: " + this.losses + "<br />Ok Bye!", "alert-success");
        }

      }else{ // GAME is not over so coninue to the next round...which already happened from if(this.resetWord())
        this.alert(WinOrLose_message, winOrLose_alert);

      } // END GAME OVER or not Condtion
    } // END WIN or LOSE Conditions
    
    return;
  } // END checkWinCondition
}

/*===============[ 2.0 Frontend]====================*/
/* 2.1 Create Game Object
/*--------------------------------------------------*/
const ThisGame = new WordGuessingGame();

/* 2.2 Listen For KeyUp Events
/*--------------------------------------------------*/
document.onkeyup = function (event) {
  var key_pressed = event.key.toLowerCase();
  ThisGame.isThere(key_pressed);
  return;
}

console.log("===============================");
// console.log(ThisGame.words);
// console.log(ThisGame.guessesLeft);
// console.log(ThisGame.randomWord());
// console.log(ThisGame.current_word);
console.log("===============================");

/*===============[ A.0 Archived ]===================*/
// const game1 = new WordGuessingGame(letters,10);
// console.log(game1.words);
// console.log(game1.guessesLeft);

// var BreakException = {};
// try{
//   some_words.forEach(function(element){
//     // console.log(Array.isArray(element));

//     if(!Array.isArray(element)){
//       console.log("NOT THIS TIME");
//       throw BreakException;
//     }

//   });
// }catch(e){
//   if( e !== BreakException ) throw e;
// }

// class something_cool {

//   constructor(){
//     this.parameters = arguments.length;
//     this.stuff = arguments;

//     var pre_tiers = [];    // Sets
//     var parent_array = []; // array per set

//     for(var i=0; i < arguments.length; i++){

//       if(Array.isArray(arguments[i])){
//         console.log("ARRAY DETECTED");

//         if(this.is_multi_array(arguments[i]) ){
//           console.log("MULTI ARRAY DETECTED");

//           arguments[i].forEach(function(el){
//             console.log(el);
//           });      

//         }else if(Object.prototype.toString.call(arguments[i])){
//           console.log("OBJECT DETECTED");

//           for(const [key, value] of Object.entries(arguments[i])){
//             console.log(key, value);
//           }

//         }else{
//           parent_array = parent_array.concat(arguments[i]);
//           console.log("yo",parent_array);
//         } 

//       }else if(! isNaN(arguments[i]) ){
//         console.log("NUMBER DETECTED", arguments[i]);
//         parent_array['number'] = arguments[i];
//         console.log("foo",parent_array);
//       }

//       if(i%2 == 0 ){ // NEW TIER SET...EVERY 2s
//         pre_tiers.concat(parent_array);
//         console.log("PRE THIS",pre_tiers);
//         parent_array = []; // RESET ARRAY
//       }
//     } // END for Loop on Arguments
//     console.log("PRE TIERS");
//     console.log(pre_tiers);
//     pre_tiers.forEach(function(ti) {
//       console.log(ti);
//     });

//   } // END constructor

//   is_multi_array(some_array=[],mode="every_key"){
//     var result = false;

//     if(Array.isArray(some_array)){
//       if(mode=="first_key_only"){

//       }else if(mode=="every_key"){
//         result = true;

//         var BreakException = {};
//         try{
//           some_array.forEach(function(element){
//             console.log("TYPE:", typeof element);

//             if(!Array.isArray(element)){

//               result = false;
//               throw BreakException;

//             } // IF NOT ARRAY

//           });
//         }catch(e){
//           if( e !== BreakException ) throw e;
//         }

//       }else if(mode=="at_least_one_key"){

//       } 
//     } // END isArray

//     return result;
//   } // END is_multi_array

// }

// var cool = new something_cool(some_words, 11, letters, 99); 
// var cool = new something_cool(some_words, 99); 
// console.log("parameters", cool.parameters);
// console.log("stuff",cool.stuff);

// var pre_tiers = [];
// pre_tiers['number'] = '5';
// console.log("before pre",pre_tiers);


// var parent_array = []; // array per set
// parent_array['number'] = 55;
// console.log("parent",parent_array);

// // pre_tiers.concat(parent_array);
// pre_tiers.push(parent_array['number']);

// // for (var i=0, l=array.length; i<l; i++){
// //   if (array[i] instanceof Array){
// //       array[i] = array[i].join("`");
// //   }
// // }

// console.log("after pre",pre_tiers);