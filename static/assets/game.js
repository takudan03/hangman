var remaining_letters;
var remainingGuessAttempts;

var WORD = "TESTING";


window.onload = function () {
    squares = document.getElementsByClassName('square');
    remainingGuessAttemptsText = document.getElementById('remainingGuessAttemptsText');
    alphabet = document.getElementsByClassName('alphabet-letter')
    overlay = document.getElementById('eog-overlay');
    overlayPrompt = document.getElementById('eog-prompt');
    
    initializeGame();
}

function renderGameBoard(word) {

}

async function getNewWord() {
    await fetch('/new-word')
        .then((response) => response.json())
        .then((data) => {
            WORD = data["new-word"].toUpperCase();
            console.log(WORD);
            remaining_letters = WORD.length;
            document.cookie = `current_word=${WORD}`
        })
        .then(() => {
            // Render spaces for letters on the screen

            msquares = document.getElementById('squares');
            msquares.replaceChildren();

            for (var i = 0; i < WORD.length; i++) {
                var square = document.createElement('div');
                square.classList.add("square");
                square.innerHTML = WORD.substring(i, i + 1);
                msquares.appendChild(square);
            }
        });
}

function initializeGame() {

    getNewWord();

    overlay.style.display = "none";

    remaining_letters = squares.length;
    remainingGuessAttempts = 6;
    remainingGuessAttemptsText.innerHTML = remainingGuessAttempts;

    for (let i = 0; i < alphabet.length; i++) {
        alphabet[i].disabled = false;
        alphabet[i].addEventListener('click', onClick);
    };

    const canvas = document.getElementById("canvas");
    // Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    // initialDrawing would draw the frame
    initialDrawing();
}

const onClick = (event) => {
    console.log("Attempts remaining: " + remainingGuessAttempts);
    console.log(event.target.id);
    event.target.disabled = true;
    let char_exists = false;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML.trim() == event.target.id) {
            char_exists = true;
            //            squares[i].style.backgroundColor = "green";
            squares[i].style.color = "black";
            remaining_letters--;
            if (remaining_letters == 0) {
                gameOver();
            }
        }
    }

    // If the chosen letter is not in the word
    if (!char_exists) {
        drawMan(remainingGuessAttempts)
        remainingGuessAttempts--;
        remainingGuessAttemptsText.innerHTML = remainingGuessAttempts;
        if (remainingGuessAttempts == 0) {
            gameOver();
        }
    }
}

function gameOver() {
    document.getElementById('alphabet_button_container').removeEventListener("click", onClick);
    if (remaining_letters == 0) {
        console.log("WIN");
        overlayPrompt.innerHTML = "Congratulations! You have correctly guessed the word with " + remainingGuessAttempts + " guesses left!";
    } else {
        overlayPrompt.innerHTML = "Oh No! You have run out of guesses. Feel free to try again";
        console.log("OUT OF ATTEMPTS");
    }
    overlay.style.display = "block";
    document.cookie = "current_word=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom line
        drawLine(10, 130, 130, 130);
        //left line
        drawLine(10, 10, 10, 131);
        //top line
        drawLine(10, 10, 70, 10);
        //small top line
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 6:
            head();
            break;
        case 5:
            body();
            break;
        case 4:
            leftArm();
            break;
        case 3:
            rightArm();
            break;
        case 2:
            leftLeg();
            break;
        case 1:
            rightLeg();
            break;
        default:
            break;
    }
};

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkIfGameStarted() {
    let current_word = getCookie("current_word");
    if (current_word == "") {
        return false;
    }
    return true;
}