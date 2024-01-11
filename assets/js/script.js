const input = document.querySelector("input");
const log = document.getElementById("user-input");
const sentence = document.getElementById("test-sentence");
const typingText = document.querySelector(".typing-text p"),
inputText = document.querySelector(".input-text .wrapper p");

let inputIndex = 0;


function randomParagraph() {
    // console.log(paragraphs[1]);
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    paragraphs[randomIndex].split("").forEach(span => {
        let spanElement = `<span>${span}</span>`;
        typingText.innerHTML += spanElement;
    });

}


//const userInput = []

function startGame() {

}
function startTimer() {} // when the timer is done game over and display the score 

function handleKeydown(e) {
  
    const userInput = []
    const character = typingText.querySelectorAll(`span`);
    // userInput.push(e.key); 
    let letter = e.key.split("").pop();
    userInput.push(letter);
   
    if(character[inputIndex].innerText === userInput[0]) {
        character[inputIndex].classList.add("correct");
    } else {
        character[inputIndex].classList.add("incorrect");
    }
    


    if(e.key === "Backspace"){
        inputIndex--;
    } else{
        inputIndex++;
    }
    console.log(userInput);
    console.log(inputIndex);

console.log(`Expected: ${character[inputIndex].innerText} | Actual: ${userInput}`);

    // if (e.code === "Space") {
    //     e.preventDefault();
    // }
    if(e.type === "keydown") { //when the user start typing the game should start.
        startGame();
        startTimer();
    }


   
   
}

// the timer should start when the user start typing




//comparing each character in the test text with each character in the player text
//if the characters match, add a point to the score and turn the color of the text green
//if the characters do not match, turn the color of the text red and update the mistakes score
//need to make sure the same character is in the right position in both the test and player text

function comparingText(test, player) {
    
    

}
input.addEventListener("keydown", () => input.focus());
log.addEventListener("click", () => input.focus());
input.addEventListener("keydown", handleKeydown);
randomParagraph();
handleKeydown(log);

comparingText(sentence, userInput);