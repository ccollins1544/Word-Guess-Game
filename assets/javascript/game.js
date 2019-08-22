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

  #defaultGuesses = 9;

  constructor(secretWords = this.#defaultWords, guessCount = this.#defaultGuesses) {
    this.words = secretWords;
    this.guessesLeft = guessCount;
  }

}

/*===============[ 2.0 Frontend]====================*/
/* 2.1 
/*--------------------------------------------------*/
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const game1 = new WordGuessingGame(letters,10);
const game2 = new WordGuessingGame();

console.log(game1.words);
console.log(game1.guessesLeft);
console.log("===============================");
console.log(game2.words);
console.log(game2.guessesLeft);