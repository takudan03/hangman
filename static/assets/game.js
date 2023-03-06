var remaining_letters;
var remainingGuessAttempts = 6;

var WORD = "TESTING";


window.onload = function () {
    squares = document.getElementsByClassName('square');
    remainingGuessAttemptsText = document.getElementById('remainingGuessAttemptsText');
    alphabet = document.getElementsByClassName('alphabet-letter')
    overlay = document.getElementById('game-dialog-overlay');
    overlayPrompt = document.getElementById('game-dialog-prompt');

    initializeGame();

    if (checkIfGameStarted()) {
        //load game using current word
        overlay.style.display="none";
        WORD = getCookie("current_word");
        renderGameBoard(WORD);
        console.log(`game resumed. current word is ${WORD}`);
    } else {
        // SHow new game overlay
        overlayPrompt.innerHTML = "Let's play Hangman! Click the button below to start."
        overlay.style.display = "block"

    }

}

function renderGameBoard(word) {
    msquares = document.getElementById('squares');
    msquares.replaceChildren();

    for (var i = 0; i < WORD.length; i++) {
        var square = document.createElement('div');
        square.classList.add("square");
        square.innerHTML = WORD.substring(i, i + 1);
        msquares.appendChild(square);
    }

    remaining_letters = word.length;
    remainingGuessAttemptsText.innerHTML = remainingGuessAttempts;
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
            renderGameBoard(WORD);
            // msquares = document.getElementById('squares');
            // msquares.replaceChildren();

            // for (var i = 0; i < WORD.length; i++) {
            //     var square = document.createElement('div');
            //     square.classList.add("square");
            //     square.innerHTML = WORD.substring(i, i + 1);
            //     msquares.appendChild(square);
            // }
        });
}

function initializeGame() {

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
        context.arc(160, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(160, 40, 160, 80);
    };

    const leftArm = () => {
        drawLine(160, 50, 140, 70);
    };

    const rightArm = () => {
        drawLine(160, 50, 180, 70);
    };

    const leftLeg = () => {
        drawLine(160, 80, 150, 110);
    };

    const rightLeg = () => {
        drawLine(160, 80, 180, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom line
        drawLine(100, 130, 220, 130);
        //left line
        drawLine(100, 10, 100, 131);
        //top line
        drawLine(100, 10, 160, 10);
        //small top line
        drawLine(160, 10, 160, 20);
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

function onPlayButtonClick() {
    initializeGame()
    overlay.style.display = "none";
    getNewWord();
}