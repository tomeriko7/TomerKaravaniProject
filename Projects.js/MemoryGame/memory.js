let cards = document.querySelectorAll('.card');
const gameFinishedMsg = document.getElementById('game-finished');
const instructions = document.getElementById('instructions')
const instructionsButton = document.getElementById('instructionsButton')
const arrColors = ["pink", "burlywood", "cadetblue", "darkseagreen", "darksalmon", "blueviolet", "darkslateblue", "snow"];
const doubledColors = [...arrColors, ...arrColors];
const startGame = document.getElementById('start-game');
const openInstructions = document.getElementById('openInstructions')
const closeInstructions = document.getElementById('closeInstructions'); // כפתור ✖

const button = document.querySelector('button');
startGame.addEventListener("click", assignColorsToPairs);

instructionsButton.addEventListener("click", () => instructions.style.display = 'none')
openInstructions.addEventListener("click", () => instructions.style.display = 'block')
closeInstructions.addEventListener("click" , ()=> instructions.style.display = 'none' )

let colorMatch = false;
let pairsMatched = 0;


// פונקציית ערבוב צבעים 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function backFlip(card) {
    if (!card.classList.contains('matched')) {
        card.style.backgroundColor = "#2a2a2a";
        card.classList.remove('flipped');
    }
}

// פונקציה לאיפוס וצביעת קלפים
function assignColorsToPairs() {
    pairsMatched = 0;
    instructions.style.display = 'none'
    gameFinishedMsg.style.display = 'none';
    const shuffledColors = shuffleArray(doubledColors);

    cards.forEach((card, index) => {
        card.dataset.color = shuffledColors[index];
        card.style.backgroundColor = "#2a2a2a";
        card.classList.remove('flipped', 'matched');
    });
}

// הגדרת אירוע קליק לכל קלף
cards.forEach((card) => {
    card.addEventListener('click', () => {


        card.style.backgroundColor = card.dataset.color;
        card.classList.add('flipped');

        setTimeout(() => backFlip(card), 5000); // סגירה אוטומטית אחרי 5 שניות אם אין התאמה
        checkIfTwoFlipped();

    });
});

function checkIfTwoFlipped() {
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        cards.forEach(card => {
            card.classList.add('disabled')

        });


        if (card1.dataset.color === card2.dataset.color) {
            console.log("COLOR MATCH");


            // שמירה על הקלפים גלויים
            card1.classList.add('matched');
            card2.classList.add('matched');

            // הסרת מחלקת "flipped" כדי למנוע קריאה ל-backFlip
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');

            pairsMatched++;
            cards.forEach(card => {
                card.classList.remove('disabled')
            })
            setTimeout(checkIfGameFinished, 1000);


        } else {
            // אם אין התאמה, לסגור את הקלפים
            setTimeout(() => {
                backFlip(card1);
                backFlip(card2);
                cards.forEach(card => {
                    card.classList.remove('disabled')
                })
            }, 1000);

        }
    }

}

function checkIfGameFinished() {
    if (pairsMatched === 8) {
        gameFinishedMsg.style.display = 'block';
    }
}