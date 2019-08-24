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

class something_cool {
  
  constructor(){
    this.parameters = arguments.length;
    this.stuff = arguments;

    var pre_tiers = [];    // Sets
    var parent_array = []; // array per set
    
    for(var i=0; i < arguments.length; i++){

      if(Array.isArray(arguments[i])){
        console.log("ARRAY DETECTED");

        if(this.is_multi_array(arguments[i]) ){
          console.log("MULTI ARRAY DETECTED");

          arguments[i].forEach(function(el){
            console.log(el);
          });      

        }else if(Object.prototype.toString.call(arguments[i])){
          console.log("OBJECT DETECTED");

          for(const [key, value] of Object.entries(arguments[i])){
            console.log(key, value);
          }
        
        }else{
          parent_array = parent_array.concat(arguments[i]);
          console.log("yo",parent_array);
        } 

      }else if(! isNaN(arguments[i]) ){
        console.log("NUMBER DETECTED", arguments[i]);
        parent_array['number'] = arguments[i];
        console.log("foo",parent_array);
      }

      if(i%2 == 0 ){ // NEW TIER SET...EVERY 2s
        pre_tiers.concat(parent_array);
        console.log("PRE THIS",pre_tiers);
        parent_array = []; // RESET ARRAY
      }
    } // END for Loop on Arguments

    console.log("PRE TIERS");
    console.log(pre_tiers);
    pre_tiers.forEach(function(ti) {
      console.log(ti);
    });

  } // END constructor

  is_multi_array(some_array=[],mode="every_key"){
    var result = false;

    if(Array.isArray(some_array)){
      if(mode=="first_key_only"){

      }else if(mode=="every_key"){
        result = true;

        var BreakException = {};
        try{
          some_array.forEach(function(element){
            console.log("TYPE:", typeof element);
            
            if(!Array.isArray(element)){
              
              result = false;
              throw BreakException;

            } // IF NOT ARRAY
            
          });
        }catch(e){
          if( e !== BreakException ) throw e;
        }

      }else if(mode=="at_least_one_key"){
        
      } 
    } // END isArray

    return result;
  } // END is_multi_array

}

/*===============[ 2.0 Frontend]====================*/
/* 2.1 
/*--------------------------------------------------*/
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// const game1 = new WordGuessingGame(letters,10);
// const game2 = new WordGuessingGame();

// console.log(game1.words);
// console.log(game1.guessesLeft);
// console.log("===============================");
// console.log(game2.words);
// console.log(game2.guessesLeft);

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

// var cool = new something_cool(some_words, 11, letters, 99); 
var cool = new something_cool(some_words, 99); 
// console.log("parameters", cool.parameters);
// console.log("stuff",cool.stuff);


/////////////////
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