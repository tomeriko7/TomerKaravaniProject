
const frames = document.querySelectorAll(".frame");  // בוחר את כל הדיבים עם המחלקה frame
let currentPlayer = "X";  // מתחיל עם X כברירת מחדל
const newGame = document.querySelector('#newGame')
newGame.addEventListener('click', resetGame);
let gameOver = false;

let message = document.querySelector('#message')
let messageGO = document.querySelector('#messageGO')

const instructions = document.getElementById('instructions');
const instructionsButton = document.getElementById('instructionsButton');
instructionsButton.addEventListener('click', () => instructions.style.display = 'none');
const openInstructions = document.getElementById('openInstructions')
openInstructions.addEventListener("click", () => instructions.style.display = 'block')

function blinkMsg() {
    // פונקציה להבהוב הודעה
    if (messageGO.style.display === "none") {
        messageGO.style.display = "block";
    } else {
        messageGO.style.display = "none";
    }
}



frames.forEach(function (frame) {
    frame.addEventListener("click", function () {
        if (!gameOver) { // בודק אם המשחק לא נגמר
            if (frame.textContent === "") {
                frame.textContent = currentPlayer;
                checkIfWon();
                if (!gameOver) { // רק אם המשחק לא נגמר
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    message.textContent = currentPlayer + " turn";
                }
            }
        }
    });
});


function checkIfWon() {


    if (frames[0].textContent === "X" && frames[1].textContent === "X" && frames[2].textContent === "X" ||
        frames[3].textContent === "X" && frames[4].textContent === "X" && frames[5].textContent === "X" ||
        frames[6].textContent === "X" && frames[7].textContent === "X" && frames[8].textContent === "X" ||
        frames[0].textContent === "X" && frames[3].textContent === "X" && frames[6].textContent === "X" ||
        frames[1].textContent === "X" && frames[4].textContent === "X" && frames[7].textContent === "X" ||
        frames[2].textContent === "X" && frames[5].textContent === "X" && frames[8].textContent === "X" ||
        frames[0].textContent === "X" && frames[4].textContent === "X" && frames[8].textContent === "X" ||
        frames[2].textContent === "X" && frames[4].textContent === "X" && frames[6].textContent === "X"

    ) {
        message.textContent = "X Wins the Game "
        messageGO.textContent = "GAME OVER"
        messageGO.style.background = "linear-gradient(to right, #ff3c00, #ff9a00)";
        //  -setInterval כדי לגרום להבהוב
        const intervalBlink = setInterval(blinkMsg, 1000)
        function stopIntervalBlink() {
            clearInterval(intervalBlink);
        }
        setTimeout(stopIntervalBlink, 6000);

        gameOver = true;

    }

    else if (frames[0].textContent === "O" && frames[1].textContent === "O" && frames[2].textContent === "O" ||
        frames[3].textContent === "O" && frames[4].textContent === "O" && frames[5].textContent === "O" ||
        frames[6].textContent === "O" && frames[7].textContent === "O" && frames[8].textContent === "O" ||
        frames[0].textContent === "O" && frames[3].textContent === "O" && frames[6].textContent === "O" ||
        frames[1].textContent === "O" && frames[4].textContent === "O" && frames[7].textContent === "O" ||
        frames[2].textContent === "O" && frames[5].textContent === "O" && frames[8].textContent === "O" ||
        frames[0].textContent === "O" && frames[4].textContent === "O" && frames[8].textContent === "O" ||
        frames[2].textContent === "O" && frames[4].textContent === "O" && frames[6].textContent === "O"

    ) {
        message.textContent = "O Wins the Game ";
        messageGO.textContent = "GAME OVER";
        messageGO.style.background = "linear-gradient(to right, #ff3c00, #ff9a00)";
        //  -setInterval כדי לגרום להבהוב
        setInterval(blinkMsg, 1000);
        gameOver = true;

    } else {
        let allFramesFilled = true;  // נניח שכל התאים מלאים
        frames.forEach(function (frame) {
            if (frame.textContent === "") {
                allFramesFilled = false;
            }
        });


        if (allFramesFilled) {
            message.textContent = "Draw!";
            messageGO.textContent = "TRY AGAIN";
            messageGO.style.background = "linear-gradient(to right, #ff3c00, #ff9a00)";
            gameOver = true;
        }
    }
}



function resetGame() {
    frames.forEach(function (frame) {
        frame.textContent = "";

    })
    gameOver = false;
    message.textContent = "";
    messageGO.textContent = ""
    currentPlayer = "X";


}
