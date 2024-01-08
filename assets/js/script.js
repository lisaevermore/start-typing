

const input = document.querySelector("input");
const log = document.getElementById("user-input");
const sentence = document.getElementById("test-sentence");


input.addEventListener("keydown", handleKeydown);
const player_texts = []

function startGame() {

}
function startTimer() {} // when the timer is done game over and display the score 

function handleKeydown(e) {
    // if (e.code === "Space") {
    //     e.preventDefault();
    // }
    if(e.type === "keydown") { //when the user start typing the game should start.
        startGame();
        startTimer();
    }
    player_texts.push(e.key)

   
   
}
// the timer should start when the user start typing




//comparing each character in the test text with each character in the player text
//if the characters match, add a point to the score and turn the color of the text green
//if the characters do not match, turn the color of the text red and update the mistakes score
//need to make sure the same character is in the right position in both the test and player text

function comparingText(test, player) {
    let words = test.textContent.split(" ") // split the text into an array of words
    let playerletter = [] //"T"
    let wordIndex = 0;
    let letterIndex = 0;
    let correctLetter = 0;
    playerletter.push(player) 


    // const isWordCompleted = letterIndex > textTest[wordIndex].length -1;

    
  for (word in words) {
    // console.log(words[word])
    for (letter in words[word]) { //"T"
       
        
    }
  }
    

}

comparingText(sentence, player_texts);