//comparing each character in the test text with each character in the player text
//if the characters match, add a point to the score and turn the color of the text green
//if the characters do not match, turn the color of the text red and update the mistakes score
//need to make sure the same character is in the right position in both the test and player text



const typingText = document.querySelector(".typing-text p"),
userInput = document.querySelector(".wrapper .user-input"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let inputIndex = 0;
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = 0,
mistakes = 0,
typing = false,
typedWord = 0;

const gameStatus ={

}

function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    let paragraph = paragraphs[randomIndex];
    paragraph.split("").forEach(span => {
        let spanElement = `<span>${span}</span>`;
        typingText.innerHTML += spanElement;
    });
    //console.log(paragraph.split(" "));
    //calculateWpm(paragraph)

}


// when the timer is done game over and display the score 

function startTimer() {
    let timer = setInterval(function() {
        timeTag.innerText = maxTime;
        maxTime--;
        if(maxTime <= 0) { //when the timer is done, game over
            gameReset();
            clearInterval(timer);
        }
    }, 1000);

    return timer;
}
//when the timer runout the game should reset and start again
function gameReset() {
    randomParagraph();
    // initTypingGame();
    console.log("Game Reset");
}

// the timer should start when the user start typing
function initTypingGame() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = userInput.value.split("")[inputIndex];
    // console.log(typedChar);
    // console.log(userInput.value.split(""));
    if(typedChar == null) { 
        // if the character is not null, then check if it matches the expected character
        // if it does not match, then remove the character from the input box and move the cursor to the left
        inputIndex--;
        if(characters[inputIndex].classList.contains("incorrect")) {
            mistakes--;
        }
        characters[inputIndex].classList.remove("correct", "incorrect");
    } else { 
        if(characters[inputIndex].innerText === typedChar) {
            //add correct or incorrect class to the character
            // if the character matches, then add a point to the score and turn the color of the text green
            characters[inputIndex].classList.add("correct");
        } else {
            mistakes++;
            characters[inputIndex].classList.add("incorrect");   
        }
        inputIndex++;
    }

    //console.log(`Expected: ${character[inputIndex].innerText} | Actual: ${typedChar}`);
    
    characters.forEach(span => span.classList.remove("active"));
    characters[inputIndex].classList.add("active");

    mistakeTag.innerText = mistakes; // updated any mistakes to the page
    
    if(!typing){ // the timer should start when the user start typing
        startTimer()
   
        typing = true;
    }

    userInput.addEventListener("keydown", (event) => {
        if(event.code === "Space") {
            typedWord++;
        }
  
      });

}

// function calculateWpm(str) {
//     let wordsTotal = str.split(" ").length;
//     let cpm = 0;
//     // console.log(cpm);
//     userInput.addEventListener("keydown", (event) => {
//         // console.log(event);
//         if(event.code === "Space") {
//             typedWord++;
//         }
//         cpm = wordsTotal / typedWord;
      
//       });
   
     
   

// }


// to calculate the wpm, we need to split the text into words and count the words
// the we need to multiply yhe words per min by the average number of characters per word
function calculateCpm(){}



randomParagraph();
// calculateWpm();

tryAgainBtn.addEventListener("click", gameReset);

userInput.addEventListener("input", initTypingGame);
