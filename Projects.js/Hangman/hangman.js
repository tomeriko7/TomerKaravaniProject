let fruits = ["BANANA", "MANGO", "APPLE", "ORANGE", "PINEAPPLE", "WATERMELON", "PEACH", "GRAPE", "STRAWBERRY", "CHERRY"];
let countries = ["CANADA", "NEW ZEALAND", "AUSTRALIA", "INDIA", "FRANCE", "GERMANY", "BRAZIL", "JAPAN", "ITALY", "MEXICO"];
let animals = ["COW", "GOAT", "LION", "TIGER", "ELEPHANT", "DOG", "CAT", "HORSE", "MONKEY", "BEAR"];


let wordDisplay = document.getElementById('wordDisplay');
let attempts = document.getElementById('attempts');
const gameOver = document.getElementById('gameOver')

const fruitsBtn = document.getElementById('fruits-btn');
const countriesBtn = document.getElementById('countries-btn');
const animalsBtn = document.getElementById('animals-btn');
const startAgain = document.getElementById('start-again');

const mistakeImageElement = document.getElementById('mistakeImage');

const instructions = document.getElementById('instructions');
const closeInstructions = document.getElementById('closeInstructions');
const openInstructions = document.getElementById('openInstructions');

fruitsBtn.addEventListener('click', getRandomFruit);
countriesBtn.addEventListener('click', getRandomCountry);
animalsBtn.addEventListener('click', getRandomAnimal);
startAgain.addEventListener('click', () => location.reload());

closeInstructions.addEventListener('click', () => {
    instructions.style.display = 'none'
    localStorage.setItem('instructionsShown', 'true')
});
if (localStorage.getItem('instructionsShown') === 'true') {
    instructions.style.display = 'none'; // מסתיר את ההוראות אם כבר הוצגו ((שימוש בלוקל סטורג'))
} else {
    instructions.style.display = 'block'; // מציג את ההוראות בפעם הראשונה
}

openInstructions.addEventListener('click', () => instructions.style.display = 'block');

let randomWord = " ";
const buttons = document.querySelectorAll('#divKeyboard button');
function blockButtons() {
    buttons.forEach((button) => {
        button.disabled = true;
    })
}
blockButtons();
attempts.innerHTML = "Please select a category "



function ifUserWonTheGame() {
    if (countries.length === 0 && fruits.length === 0 && animals.length === 0) {
        wordDisplay.textContent = "Congratz ! You'v Finished The Game ";

        gameOver.textContent = "";

        attempts.textContent = "";
        blockButtons();


    }
}

//____________ לעקוב אחר מספר השגיאות שלי _____________


let mistakes = 0;
let mistakeImagesArr = ["strike1.png", "strike2.png", "strike3.png", "strike4.png", "strike5.png", "strike6.png", "strike7.png", "strike8.png", "strike9.png", "strike10.png"]



function myMistakes() {
    console.log("myMistakes: ", mistakes);

    if (mistakes < mistakeImagesArr.length - 1) {

        mistakeImageElement.src = `images/${mistakeImagesArr[mistakes]}`;

        mistakes++;
    } else {
        gameOver.style.display = "block";
        gameOver.textContent = "Game Over";
        attempts.textContent = "";
        mistakeImageElement.src = "images/strike10.png"
        setTimeout(resetFunction, 3000);

        animalsBtn.style.display = "none";
        fruitsBtn.style.display = "none";
        countriesBtn.style.display = "none";
        startAgain.style.display = "block";

        setTimeout(blockButtons, 3010)
    }
}



// _____________פונקציה לאיפוסכפתורים__________
function resetFunction() {

    //איפוס צבע הכפתור חזרה
    buttons.forEach((button) => {
        button.style.backgroundColor = 'rgb(31, 27, 30)';
        button.disabled = false;
        wordDisplay.textContent = "";


    });
    mistakeImageElement.src = "images/strike0.png";
    mistakes = 0;
}

// _________פוננקציה להמרת המילה לקו תחתון___________________________

function convertToUnderscore(word) {
    let underscores = "";
    for (let i = 0; i < word.length; i++) {
        underscores = underscores + "_ ";
    }

    return underscores;
}

// ____________________שלוש פוננקציות נפרדות לקבלת פריט רנדומלי__________________________

function getRandomFruit() {


    fruitsBtn.classList.add('on');
    animalsBtn.classList.remove('on');
    countriesBtn.classList.remove('on');
    countriesBtn.style.backgroundColor = '#333';
    animalsBtn.style.backgroundColor = '#333';
    attempts.textContent = "Fruits Category";
    resetFunction()

    animalsBtn.disabled = true;
    fruitsBtn.style.display = "none";
    countriesBtn.disabled = true;

    //לעבור בין קטגוריות ????????????????????????????_

    // if (wordDisplay === 'Category Completed') {
    //     wordDisplay = "";
    // }

    // ??????????????????????????????????????????????????????????
    //____________________fruitsתנאי אם נגמרו כל המילים באותה הקטגוריה ___________
    if (fruits.length === 0) {
        wordDisplay.textContent = "Fruits Category Completed";
        attempts.innerHTML = "Please select a category "

        ifUserWonTheGame();
        blockButtons();
        animalsBtn.disabled = false;
        countriesBtn.disabled = false;
        return;

    }



    randomWord = fruits[Math.floor(Math.random() * fruits.length)];

    wordDisplay.innerHTML = convertToUnderscore(randomWord);
    fruits = fruits.filter(function (val) { return val !== randomWord })


    gameOver.textContent = "";



};


function getRandomCountry() {

    animalsBtn.classList.remove('on');
    countriesBtn.classList.add('on');
    fruitsBtn.classList.remove('on');
    countriesBtn.style.display = 'none';
    fruitsBtn.style.backgroundColor = '#333';
    animalsBtn.style.backgroundColor = '#333';
    attempts.textContent = "Countries Category";

    resetFunction()

    animalsBtn.disabled = true;
    fruitsBtn.disabled = true;
    //____________________countriesתנאי אם נגמרו כל המילים באותה הקטגוריה ___________
    if (countries.length === 0) {
        wordDisplay.textContent = "Countries Category Completed";
        attempts.innerHTML = "Please select a category "

        ifUserWonTheGame();
        blockButtons();
        animalsBtn.disabled = false;
        fruitsBtn.disabled = false;
        return;
    }



    randomWord = countries[Math.floor(Math.random() * countries.length)];
    wordDisplay.innerHTML = convertToUnderscore(randomWord);
    countries = countries.filter(function (val) { return val !== randomWord })


    gameOver.textContent = "";


}


function getRandomAnimal() {


    animalsBtn.classList.add('on');
    countriesBtn.classList.remove('on');
    fruitsBtn.classList.remove('on');
    animalsBtn.style.display = 'none';
    fruitsBtn.style.backgroundColor = '#333';
    countriesBtn.style.backgroundColor = '#333';
    attempts.textContent = "Animals Category";
    resetFunction()



    fruitsBtn.disabled = true;
    countriesBtn.disabled = true;
    //____________________animalsתנאי אם נגמרו כל המילים באותה הקטגוריה ___________
    if (animals.length === 0) {
        wordDisplay.textContent = "Animals Category Completed";
        animalsBtn.style.display = 'none';
        attempts.innerHTML = "Please select a category "
        ifUserWonTheGame();
        blockButtons();
        fruitsBtn.disabled = false;
        countriesBtn.disabled = false;
        return;
    }



    randomWord = animals[Math.floor(Math.random() * animals.length)];
    wordDisplay.innerHTML = convertToUnderscore(randomWord)
    animals = animals.filter(function (val) { return val !== randomWord })


    gameOver.textContent = "";



}


// _________________פוקנציה להוספת אותיות מהמקלדת__________



buttons.forEach((button) => {

    button.addEventListener('click', () => {
        const letter = button.textContent;
        const randomWordArray = randomWord.split("");
        const displayArray = wordDisplay.textContent.split(" ");

        // __________בדיקה אם האות נמצאת במילה________

        let matchFound = false;

        for (let i = 0; i < randomWordArray.length; i++) {
            if (randomWordArray[i] === letter) {
                displayArray[i] = letter; // חושפים את האות
                matchFound = true;
                button.style.backgroundColor = '#dcff35';
            }
        }
        if (!matchFound) {
            button.style.backgroundColor = 'rgb(186, 186, 186)';
            button.disabled = true;


            myMistakes();


        }




        // ____________ עדכון התצוגה של מילת הניחוש__________________
        wordDisplay.textContent = displayArray.join(" ");

        let answer = displayArray.join('');


        if (answer === randomWord) {
            attempts.textContent = "Good Job!";
            ifUserWonTheGame()

            blockButtons()

            // _______________כל פעם שהתשובה נכונה תבצע בדיקה באיזה קטגוריה נמצאים ותפעיל את הפוקנציה של אותה הקטגוריה שוב כדי לעבור לשאלה הבאה
            function moveToNextQuestion() {

                if (fruitsBtn.classList.contains('on')) {
                    getRandomFruit();
                } else if (countriesBtn.classList.contains('on')) {
                    getRandomCountry();
                } else if (animalsBtn.classList.contains('on')) {
                    getRandomAnimal();
                }
            }
            setTimeout(moveToNextQuestion, 2500)
        }


    })
}
);

