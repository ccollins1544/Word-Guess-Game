/**
 * Game JS
 * 
 * @package Word Guess Game
 * @author Christopher Collins
 * @version 1.1.1
 * @license none (public domain)
 * 
 * ===============[ TABLE OF CONTENTS ]===============
 * 1.0 Backend
 *   1.1 Initalize Variables
 *   1.2 WordGuessingGame Class Declaration
 * 
 * 2.0 Frontend
 *   2.1
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
      "word": "ace",
      "image": "image_file1.png",
      "sound": "sound_file1.png",
    },
    // {
    //   "word": "two",
    //   "image": "image_file2.png",
    //   "sound": "sound_file2.png",
    // },
    // {
    //   "word": "three",
    //   "image": "image_file3.png",
    //   "sound": "sound_file3.png",
    // },
    // {
    //   "word": "four",
    //   "image": "image_file4.png",
    //   "sound": "sound_file4.png",
    // },
    // {
    //   "word": "five",
    //   "image": "image_file5.png",
    //   "sound": "sound_file5.png",
    // },
    // {
    //   "word": "six",
    //   "image": "image_file6.png",
    //   "sound": "sound_file6.png",
    // },
    // {
    //   "word": "seven",
    //   "image": "image_file7.png",
    //   "sound": "sound_file7.png",
    // },
    // {
    //   "word": "eight",
    //   "image": "image_file8.png",
    //   "sound": "sound_file8.png",
    // },
    // {
    //   "word": "nine",
    //   "image": "image_file9.png",
    //   "sound": "sound_file9.png",
    // },
    // {
    //   "word": "ten",
    //   "image": "image_file10.png",
    //   "sound": "sound_file10.png",
    // }, {
    //   "word": "jack",
    //   "image": "image_file11.png",
    //   "sound": "sound_file11.png",
    // }, {
    //   "word": "queen",
    //   "image": "image_file12.png",
    //   "sound": "sound_file12.png",
    // }, {
    //   "word": "king",
    //   "image": "image_file13.png",
    //   "sound": "sound_file13.png",
    // },
  ];

  #defaultCategory = "Trivia";
  #defaultGuesses = 9;
  validKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

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
    
    console.log("Current Word: "+ this.currentWordObject.word);
    console.log(this.currentWordLetters);
    
    this.the_word = [];
    for(var i=0; i < this.currentWordLetters.length; i++) {
      this.the_word.push("_");
    }
    
    // Set DOM Elements
    this.WORD.innerHTML = this.the_word.join(" ");
    this.WORD_LEN.innerHTML = this.currentWordObject.word.length;
    this.WORD_IMG.src = (this.imageExists(this.currentWordObject.image)) ? this.currentWordObject.image : this.WORD_IMG.src;
    this.WORD_CAT.innerHTML = this.wordCategory;

    // Round Elements
    this.GUESSES_LEFT.innerHTML = this.guessesLeft;
    this.LETTERS_GUEST.innerHTML = this.lettersGuest;
    this.LETTERS_GUEST_COUNT.innerHTML = this.lettersGuest.length;

    // Removes the current_word from the list of words so it can't be selected again.
    this.words.splice(index, 1);

    console.log("Current", this.words);
    console.log("Previous",this.previousWords);
  } // END setRandomWord()

  resetGame(){
    console.log("Reset Game Called!");
    var filteredCorrectLetters = this.the_word.filter(function(v){ return v != "_" });
    this.guessesLeft = this.lettersGuest.length + filteredCorrectLetters.length;

    this.words = words.concat(this.previousWords);    
    console.log("Guesses Left", this.guessesLeft);
    console.log("WordObject", this.words);

    this.setRandomWord();
  } // END resetGame()

  resetWord(response=false){
    console.log("resetWord Called");
    var filteredCorrectLetters = this.the_word.filter(function(v){ return v != "_" });
    this.guessesLeft = this.lettersGuest.length + filteredCorrectLetters.length;

    this.previousWords.push(this.currentWordObject);

    // Check if game is over or if we can move on to the next round.
    if(this.words.length === 0){ //} && (this.wins > 0 || this.losses > 0) ){
      return true;
    }

    this.setRandomWord();
    console.log(this.lettersGuest.length + " + " + filteredCorrectLetters.length);
    return response;
  }

  isThere(letter){
    var found = false;
    var foundAt = [];

    this.alert();
 
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
    if(message === "" && addThisClass === ""){
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
    if(response){
      return window.confirm(message);
    }else{
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

    if(this.the_word.toString() === this.currentWordLetters.toString()){
      this.wins++;

      if(this.resetWord()){ // GAME OVER
        
        var play_again = this.confirm("Game Over! Do you want to play again?");
        if(play_again){
          this.resetGame();
        }else{
          this.alert("Wins: " + this.wins + " Losses: " + this.losses + "<br />Ok Bye!", "alert-success");
        }

      }else{
        this.alert("You Win!","alert-success");
      }
      
    }else if (this.guessesLeft === 0){
      this.losses++;
      this.resetWord();
      this.alert("You Lose!","alert-danger");
    }
    
    return;
  } // END checkWinCondition
}

/*===============[ 2.0 Frontend]====================*/
/* 2.1 
/*--------------------------------------------------*/
var some_words = [{
    "word": "ace",
    "image": "image_file1.png",
    "sound": "sound_file1.png",
  },
  {
    "word": "two",
    "image": "image_file2.png",
    "sound": "sound_file2.png",
  },
  {
    "word": "three",
    "image": "image_file3.png",
    "sound": "sound_file3.png",
  },
  {
    "word": "four",
    "image": "image_file4.png",
    "sound": "sound_file4.png",
  },
  {
    "word": "five",
    "image": "image_file5.png",
    "sound": "sound_file5.png",
  },
  {
    "word": "six",
    "image": "image_file6.png",
    "sound": "sound_file6.png",
  },
  {
    "word": "seven",
    "image": "image_file7.png",
    "sound": "sound_file7.png",
  },
  {
    "word": "eight",
    "image": "image_file8.png",
    "sound": "sound_file8.png",
  },
  {
    "word": "nine",
    "image": "image_file9.png",
    "sound": "sound_file9.png",
  },
  {
    "word": "ten",
    "image": "image_file10.png",
    "sound": "sound_file10.png",
  }, {
    "word": "jack",
    "image": "image_file11.png",
    "sound": "sound_file11.png",
  }, {
    "word": "queen",
    "image": "image_file12.png",
    "sound": "sound_file12.png",
  }, {
    "word": "king",
    "image": "image_file13.png",
    "sound": "sound_file13.png",
  },
];

// const game1 = new WordGuessingGame(letters,10);

// console.log(game1.words);
// console.log(game1.guessesLeft);
console.log("===============================");
const ThisGame = new WordGuessingGame();

document.onkeyup = function (event) {
  var key_pressed = event.key.toLowerCase();
  ThisGame.isThere(key_pressed);
  return;
}

// console.log(game2.words);
// console.log(game2.guessesLeft);
// console.log(game2.randomWord());
// console.log(game2.current_word);
console.log("===============================");

/*===============[ A.0 Archived ]===================*/

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