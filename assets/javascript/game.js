/**
 * Game JS
 * @package Word Guess Game
 * @subpackage WordGuessingGame Class
 * @author Christopher Collins
 * @version 2.0
 * @license none (public domain)
 * 
 *****************************************************/
class WordGuessingGame {
  // Private Variables
  #defaultWords = [{
      "word": "hondacrv",
      "image": "assets/images/cars/honda-cr-v-background.jpg",
      "sound": "assets/sounds/cars/RaceCarEngineTrouble.mp3",
    },
    {
      "word": "toyotarav4",
      "image": "assets/images/cars/2019-Toyota-RAV4-feature_o.jpg",
      "sound": "assets/sounds/cars/topfuelDragster.mp3",
    },
    {
      "word": "hondacivic",
      "image": "assets/images/cars/Honda-Civic-PNG-Pic.png",
      "sound": "assets/sounds/cars/CIVIC-passing-at-high-speed.mp3",
    },
    {
      "word": "toyotahighlander",
      "image": "assets/images/cars/2018-Toyota-Highlander-model.png",
      "sound": "assets/sounds/cars/StartCar.mp3",
    },
    {
      "word": "mazdacx5",
      "image": "assets/images/cars/2018-mazda-cx-5-Eternal-Blue-Mica.png",
      "sound": "assets/sounds/cars/CAR-Peels-Out.mp3",
    },
    {
      "word": "hondaaccord",
      "image": "assets/images/cars/2018-Honda-Accord-COLOR-Platinum-White.png",
      "sound": "assets/sounds/cars/RaceCareScreamBy.mp3",
    },
    {
      "word": "dodgeram1500",
      "image": "assets/images/cars/Dodge-Ram-1500.png",
      "sound": "assets/sounds/cars/burnoutHotRod.mp3",
    },
    {
      "word": "chevroletequinox",
      "image": "assets/images/cars/chevy_equinox2019_black.png",
      "sound": "assets/sounds/cars/Corvette-pass.mp3",
    },
    {
      "word": "kiatelluride",
      "image": "assets/images/cars/2020-kia-telluride.jpg",
      "sound": "assets/sounds/cars/Porsche2.mp3",
    },
    {
      "word": "chevrolettraverse",
      "image": "assets/images/cars/2018-Chevrolet-Traverse-Header.png",
      "sound": "assets/sounds/cars/RACECAR.mp3",
    }, {
      "word": "toyotatacoma",
      "image": "assets/images/cars/2018-toyota-tacoma-in-white.png",
      "sound": "assets/sounds/cars/car-running3.mp3",
    }, {
      "word": "jeepwrangler",
      "image": "assets/images/cars/jeep-wrangler.png",
      "sound": "assets/sounds/cars/JEEP-HORN.mp3",
    }, {
      "word": "hondapilot",
      "image": "assets/images/cars/2019-Honda-Pilot-LX-Hero.png",
      "sound": "assets/sounds/cars/BMW-DRIVEBY.mp3",
    },
  ];

  #defaultCategory = "Cars Trivia";
  #defaultGuesses = 7;
  validKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  // Game Properties
  words = []; 
  previousWords = []; // Words already played        
  lettersGuest = [];  
  currentWordLetters = []; 
  currentWordObject = {};
  the_word = []; // This represents the letters guessed and blanks "_"
  guessesLeft = 0;    
  surrenderedGuesses = 0; // When skipping words the remaining guesses are surrendered.
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
  TOTAL_ROUNDS = document.getElementById("total_rounds");
  PROGRESS_BARS = document.getElementById("game_progress");
  WINS = document.getElementById("total_wins");
  LOSSES = document.getElementById("total_losses");
  alertMessage = document.getElementById("alert_message");
  AUDIO_FILES = document.getElementById("audio_files");

  constructor(secretWords = this.#defaultWords, wordcat = this.#defaultCategory, guessCount = this.#defaultGuesses) {
    this.words = secretWords;
    this.wordCategory = wordcat;
    this.guessesLeft = guessCount;
    
    var ThatGame = this;
    document.onkeyup = function (event) { ThatGame.isThere( event.key.toLowerCase() ); return; }
    window.addEventListener('load', ThatGame.addAudio(), false);
    
    // Create Window object that can be accessed via onclick()
    if (!window['GAME']) { window['GAME'] = ThatGame; }

    this.setRandomWord(); // MUST BE CALLED LAST
  } // END constructor

  setRandomWord() {
    var min = 0;
    var max = this.words.length;
    var index = Math.floor(Math.random() * Math.floor(+max - +min)) + +min;
    
    this.currentWordObject = this.words[index];
    this.currentWordLetters = this.currentWordObject.word.split("");

    // Removes the current_word from the list of words so it can't be selected again.
    this.words.splice(index, 1);
    
    this.the_word = [];
    for(var i=0; i < this.currentWordLetters.length; i++) {
      this.the_word.push("_");
    }
    
    // Set DOM Elements for the round
    this.WORD.innerHTML = this.the_word.join(" ");
    this.WORD_LEN.innerHTML = this.currentWordObject.word.length;
    this.WORD_IMG.style.display = "none";
    this.WORD_IMG.src = (this.imageExists(this.currentWordObject.image)) ? this.currentWordObject.image : this.WORD_IMG.src;
    this.WORD_CAT.innerHTML = this.wordCategory;
    this.GUESSES_LEFT.innerHTML = this.guessesLeft;
    this.LETTERS_GUEST.innerHTML = this.lettersGuest;
    this.LETTERS_GUEST_COUNT.innerHTML = this.lettersGuest.length;
    this.TOTAL_ROUNDS.innerHTML = "Round " + (+this.wins + +this.losses) + " of " + (+this.words.length + +this.previousWords.length + +1);
    this.PROGRESS_BARS.querySelector(".bg-success").innerHTML = (((+this.wins)/(+this.words.length + +this.previousWords.length + +1))*100).toFixed(0) + "%";
    this.PROGRESS_BARS.querySelector(".bg-success").style.width = (((+this.wins)/(+this.words.length + +this.previousWords.length + +1))*100).toFixed(0) + "%";
    this.PROGRESS_BARS.querySelector(".bg-danger").innerHTML = (((+this.losses)/(+this.words.length + +this.previousWords.length + +1))*100).toFixed(0) + "%";
    this.PROGRESS_BARS.querySelector(".bg-danger").style.width = (((+this.losses)/(+this.words.length + +this.previousWords.length + +1))*100).toFixed(0) + "%";
  } // END setRandomWord()

  resetGame(){
    this.alert(); // Reset Alert
    this.guessesLeft = this.lettersGuest.length + this.guessesLeft;
    
    this.words = this.words.concat(this.previousWords);
    
    this.previousWords = []; // Words already played        
    this.lettersGuest = [];
    this.currentWordLetters = []; 
    this.currentWordObject = {};
    this.the_word = []; // This represents the letters guessed and blanks "_"  
    this.wins = 0;
    this.losses = 0;

    this.setRandomWord();
  } // END resetGame()

  resetWord(response=false){
    this.previousWords.push(this.currentWordObject);
    
    // Check if game is over or if we can move on to the next round.
    if(this.words.length === 0){
      return true;
    }
    
    this.guessesLeft = this.lettersGuest.length + this.guessesLeft + this.surrenderedGuesses;
    this.lettersGuest = [];

    this.setRandomWord();
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
    if(message === "" && addThisClass === ""){ // RESET Alert Message
      if(this.alertMessage.className !== "alert"){
        this.alertMessage.className = "";
        this.alertMessage.classList.add("alert");
        this.alertMessage.innerHTML = "";
      }
      return;
      
    }else if(message !== "" && addThisClass === ""){
      this.alertMessage.className = "";
      this.alertMessage.classList.add("alert");
      addThisClass = "alert-info";
    }
    
    this.alertMessage.classList.add(addThisClass);
    this.alertMessage.innerHTML = message;
    return;
  } // END alert

  confirm(message,response=true){
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

    // WIN or LOSE?
    if(this.the_word.toString() === this.currentWordLetters.toString() || this.guessesLeft === 0){
      var WinOrLose_message = "You Lose!";
      var winOrLose_alert = "alert-danger";
      
      // WIN Condition
      if(this.the_word.toString() === this.currentWordLetters.toString()) { 
        this.wins++;
        this.WINS.innerHTML = this.wins;
        WinOrLose_message = "You Win!";
        winOrLose_alert = "alert-success";
        
      }else if (this.guessesLeft === 0) {  // LOSE Condition
        this.losses++;
        this.LOSSES.innerHTML = this.losses;
      }

      // Show Image and play sound
      var sound = document.getElementById(this.currentWordObject.word.toString());
      this.playSound(sound);

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

  toggleHint(el="",show=false) {
    // Check Image Visibility 
    if(this.WORD_IMG.offsetParent === null || show){
      this.WORD_IMG.style.display = "block";
      if(this.isElement(el)){ el.parentElement.classList.add("active"); }
    }else{
      this.WORD_IMG.style.display = "none";
      if(this.isElement(el)){ el.parentElement.classList.remove("active"); }
    }
  } // END toggleHint

  isElement(obj) {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrome)
      return obj instanceof HTMLElement;
    }
    catch(e){
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have (works on IE7)
      return (typeof obj==="object") &&
        (obj.nodeType===1) && (typeof obj.style === "object") &&
        (typeof obj.ownerDocument ==="object");
    }
  } // END isElement

  skipWord(){
    this.confirm("By the way the word was '" + this.currentWordObject.word + "'");
    this.surrenderedGuesses = this.guessesLeft;
    this.guessesLeft = 0;
    this.checkWinCondition();
    return;
  } // END skipWord

  newGame(){
    var WinOrLose_message = "It looks like you're losing.\n";
    var play_again = false;
    var winOrLose_alert = "alert-danger";

    if(this.wins > this.losses){
      WinOrLose_message = "It looks like you're winning.\n";
      winOrLose_alert = "alert-success";
    }else if(this.wins == this.losses){
      WinOrLose_message = "It looks like a 50/50 tie between wins and losses.\n";
    }

    play_again = this.confirm(WinOrLose_message+"Are you sure that you want to start a new game?");
    if(play_again){
      this.resetGame();
    }else{
      this.alert("Wins: " + this.wins + " Losses: " + this.losses + "<br />Ok Bye!", winOrLose_alert);
    }

    return;
  } // END newGame()

  /**
   * delayAction
   * @param seconds 
   * @param callBack 
   * @param response
   * 
   * Example usage,
   * var something_magic = function() { alert("this message takes 3seconds to load"); }
   * this.delayAction(3, something_magic);
   */
  delayAction(seconds,callBack,response=false) {
    var timeoutID;

    // Runs callBack function after x seconds
    if(typeof callBack === 'function'){
      timeoutID = window.setTimeout(callBack, seconds*1000);
      if(response){ return timeoutID; }
    }else{ 
      console.log("That's not going to work: ", typeof callBack);
    }

    return;
  }; // delayAction

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async playSound(s){
    var bg = document.getElementById("Home").style.background;
    var image_url = this.currentWordObject.image;
    var secret_word = document.createElement("h1");
    
    secret_word.setAttribute("id","secret_word");
    secret_word.setAttribute("class","text-center");
    document.getElementById("main-section").insertAdjacentElement('beforebegin', secret_word);
    document.getElementById("secret_word").innerHTML = this.currentWordObject.word;
    
    document.getElementById("Home").style.background = "url('" + image_url + "') no-repeat center";
    document.getElementById("Home").style.backgroundSize = "contain";
    document.getElementById("Home").style.backgroundPosition = "top 90px left 50%";
    this.fadeOut(document.getElementById("main-section"));
    
    // Limit Sounds at 7seconds minimum and 20seconds tops.
    var duration = s.duration*1000;
    if(duration>20000){ duration=20000; }else if(duration < 7000){ duration=7000; }
    
    if(s.duration < 7){ // play sound twice
      s.play();
      duration = duration - (s.duration*1000 + 1000);
      await this.sleep(s.duration*1000 + 1000);
      s.play();

    }else{ // play once
      s.play();
    }
    
    await this.sleep(duration);
    s.pause();
    
    this.fadeIn(document.getElementById("main-section"),150);
    document.getElementById("Home").style.background = bg;
    document.getElementById("secret_word").remove();
  }

  fadeOut(element,ms=50) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op -= 0.1;
    }, ms);
  }

  fadeIn(element,ms=50) {
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, ms);
  }

  /**
   * clearDelayedAction
   * @param id 
   */
  clearDelayedAction(id){
    return window.clearTimeout(id);
  }

  addAudio(){
    var audioElement;
    var thatParent = this.AUDIO_FILES;
    this.words.forEach(function(el){
      audioElement = document.createElement("audio");
      audioElement.setAttribute("id",el.word);
      audioElement.setAttribute("src",el.sound);
      thatParent.appendChild(audioElement);
    });

    return;
  }
} // END WordGuessingGame Class