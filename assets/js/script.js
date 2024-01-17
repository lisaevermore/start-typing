//comparing each character in the test text with each character in the player text
//if the characters match, add a point to the score and turn the color of the text green
//if the characters do not match, turn the color of the text red and update the mistakes score
//need to make sure the same character is in the right position in both the test and player text
// to calculate the wpm, we need to split the text into words and count the words
// the we need to multiply the words per min by the average number of characters per word

const typingText = document.querySelector(".typing-text p"),
userInput = document.querySelector(".wrapper .user-input"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
accuracyTag = document.querySelector(".accuracy span"),
easyBtn = document.querySelector(".easy-btn"),
mediumBtn = document.querySelector(".medium-btn"),
hardBtn = document.querySelector(".hard-btn"),
expertBtn = document.querySelector(".expert-btn");

let timer,
maxTime = 60,
inputIndex = 0,
timeLeft = maxTime,
charIndex = 0,
mistakes = 0,
typing = false,
typedWord = 0;


const correctTypedCha = [];
let correctTypedWord = correctTypedCha.join(" ");
let responseKey ;

function btnHandler() { 
    let classAtt = this.getAttribute('class').split(' ');
 
    if (classAtt[2] === "easy-btn") {
    responseKey = ('?minLength=80&maxLength=100')
   } else if(classAtt[2] === "medium-btn") {
    responseKey = ('?minLength=100&maxLength=150')
   } else if(classAtt[2] === "hard-btn") {
    responseKey = ('?minLength=200&maxLength=250')
   }

   

     // Only call the randomQuote() function if it's not an "expert-btn"
    if(classAtt[2] !== "expert-btn") {
        randomQuote();
    }
    if(classAtt[2] === "expert-btn") {
        expertParagraph();
    }
  
 
}

//getting random Paragraph/quote from API
async function randomQuote() {
    const apiKey = 'https://api.quotable.io/random'
        // Attempt to call the API function (e.g., randomQuote())
        try {
            if(responseKey === undefined) {
                alert("Please select a difficulty level");
            }
        } catch (error) {
            // Handle the case where the API is not working by calling the backup function
            alert("API is not working");
            randomParagraph();
        }

    const apiResponse = (`${apiKey}${responseKey}`)
    const response = await fetch(`${apiResponse}`);
    
    const quote = await response.json()
  
    typingText.innerHTML = "";
    quote.content.split("").forEach(span => {
        let spanElement = `<span>${span}</span>`;
        typingText.innerHTML += spanElement;
    });

}
easyBtn.addEventListener("click", btnHandler);
mediumBtn.addEventListener("click", btnHandler);
hardBtn.addEventListener("click", btnHandler);
expertBtn.addEventListener("click", btnHandler);


function expertParagraph() {
    let randomIndex = Math.floor(Math.random() * expertParagraphs.length);
    typingText.innerHTML = "";
    let paragraph = expertParagraphs[randomIndex];
    paragraph.split("").forEach(span => {
        let spanElement = `<span>${span}</span>`;
        typingText.innerHTML += spanElement;
    });

}
function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    let paragraph = paragraphs[randomIndex];
    paragraph.split("").forEach(span => {
        let spanElement = `<span>${span}</span>`;
        typingText.innerHTML += spanElement;
    });

}



// when the timer is done game over and display the score 

function startTimer() {
     timer = setInterval(function() {
        timeTag.innerText = maxTime;
        maxTime--;
        if(maxTime < 0) { //when the timer is done, game over
            clearInterval(timer);
            mistakeTag.innerText = mistakes; // updated any mistakes to the page
            wpmTag.innerText = wpm;
            accuracyTag.innerHTML = accuracy.toFixed(2);
            
            
            gameReset();
        }
    }, 1000);

return maxTime;
}


// the timer should start when the user start typing
function initTypingGame() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = userInput.value.split("")[inputIndex];
  
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
            correctTypedCha.push(typedChar);
        } else {
            mistakes++;
            characters[inputIndex].classList.add("incorrect");   
        }
        inputIndex++;
    }
   if(characters[inputIndex] === undefined){ // when the user input is done, the game should end
        userInput.value = ""; //clear user input field
        clearInterval(timer);
        calculateAcc();
   }

    //console.log(`Expected: ${character[inputIndex].innerText} | Actual: ${typedChar}`);
    
    characters.forEach(span => span.classList.remove("active"));
    characters[inputIndex].classList.add("active");

    let sumWpm = Math.round((((inputIndex - mistakes) / 5) / (maxTime - timeLeft )) * 60);

    let wpm = (Math.abs(sumWpm) * 2);
    mistakeTag.innerText = mistakes; // updated any mistakes to the page
    wpmTag.innerText = wpm;
 
    if(!typing){ // the timer should start when the user start typing
        startTimer()
        typing = true;
    }
}

//when the timer runout the game should reset and start again
function gameReset() {
    randomParagraph();
    //randomQuote();
    maxTime = 60;
    userInput.value = "";
    mistakeTag.innerText = 0; // updated any mistakes to the page
    wpmTag.innerText = 0;
    timeTag.innerText = 60;
    accuracyTag.innerHTML = 0;
    console.log("Game Reset");
    userInput.addEventListener("input", initTypingGame);
}


function calculateAcc() {
    let word = correctTypedCha.join(" ");
    let accuracy = (Math.round(word.length - mistakes) / word.length) * 100;
    accuracyTag.innerHTML = accuracy.toFixed(2);
}

// easyBtn.addEventListener("click", btnHandler);
// mediumBtn.addEventListener("click", btnHandler);
// hardBtn.addEventListener("click", btnHandler);
// expertBtn.addEventListener("click", btnHandler);

randomParagraph();
randomQuote()

tryAgainBtn.addEventListener("click", gameReset);

userInput.addEventListener("input", initTypingGame);
