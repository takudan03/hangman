window.onload=function(){
    document.getElementById('alphabet_button_container').addEventListener("click", onClick);
}

const onClick = (event) => {
    console.log(event.target.id);
    event.target.disabled=true;
}

//window.addEventListener('click', onClick);
//TODO implement game logic - guesses and filling out spaces