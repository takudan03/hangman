var remaining_letters;
var incorrect_guess_attempts;


window.onload=function(){
    document.getElementById('alphabet_button_container').addEventListener("click", onClick);
    squares = document.getElementsByClassName('square');

    remaining_letters=squares.length;
    incorrect_guess_attempts=5;
}


const onClick = (event) => {
    console.log("Attempts remaining: " + incorrect_guess_attempts);
    console.log(event.target.id);
    event.target.disabled=true;
    let char_exists=false;
    for ( let i=0; i<squares.length; i++ ){
//        console.log(squares[i].textContent.trim());
        if (squares[i].textContent.trim() == event.target.id){
            char_exists=true;
            squares[i].style.backgroundColor = "green";
            remaining_letters--;
            if (remaining_letters==0){
                gameOver();
            }
        }
    }
    if (!char_exists){
        incorrect_guess_attempts--;
        if (incorrect_guess_attempts==0){
            gameOver();
        }
    }
}

function gameOver(){
    document.getElementById('alphabet_button_container').removeEventListener("click", onClick);

    if (remaining_letters==0){
        console.log("WIN");
    } else{
        console.log("OUT OF ATTEMPTS");
    }
}