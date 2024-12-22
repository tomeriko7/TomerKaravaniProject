const question = document.getElementById('question');
const btns = document.querySelectorAll('.btn');
let selectCategory = document.getElementById('select-category')
const openInstructions = document.getElementById('openInstructions')
const instructionsButton = document.getElementById('instructionsButton')
const instructions = document.getElementById('instructions');
const gameStatus= document.getElementById('gameStatus');
instructionsButton.addEventListener("click", () => instructions.style.display = 'none')
openInstructions.addEventListener("click", () => instructions.style.display = 'block')

//פונקציה שמשתמשת בלוקל סטורג כדי שאם המשחק יתחיל שוב אז הודעת ההוראות לא תקפוץ שוב
instructionsButton.addEventListener('click', () =>{
    instructions.style.display = 'none'
    localStorage.setItem('instructionsShown', 'true')
    });
    if (localStorage.getItem('instructionsShown') === 'true') {
    instructions.style.display = 'none'; // מסתיר את ההוראות אם כבר הוצגו ((שימוש בלוקל סטורג'))
} else {
    instructions.style.display = 'block'; // מציג את ההוראות בפעם הראשונה
}


function gameOverNote(){           // הצכת הודעה אם השחקן הפסיד  
    gameStatus.style.display='block';
    gameStatus.innerHTML = 'GAME OVER' ;
    deleteAnswerButtons();
    setTimeout(() => {
        gameStatus.style.display = 'none';
        
        
    }, 5000);
}
function gameFinishedNote (){             // הצגת הודעה אם השחקן סיים את המשחק 
    gameStatus.style.display='block';
    gameStatus.innerHTML = `Well Done! , You have finished the Trivia game with ${mistakesCounter} wrong answers` ;
    setTimeout(() => {
        gameStatus.style.display = 'none';
    }, 5000);
}

selectCategory.innerHTML = "Pick a Category"
deleteAnswerButtons(); // הכפתורים של שאלות הטריוויה לא צריכים להופיע עד ללחיצה ראשונה על הקטגוריות


let isGameFinished = 0; // משתנה עזר לבדיקה אם המשחק נגמר

const capitalsBtn = document.getElementById('capitals-btn');
const animalsBtn = document.getElementById('animals-btn');
const moviesBtn = document.getElementById('movies-btn');


let mistakesCounter = 0; // מונה טעויות
let quiz = null; // משתנה עזר להחלפת מערך כל פעם שלוחצים על קטגוריה.
let currentCategory = ''; // משתנה עזר כדי שתצא הודעה של סיום קטגוריה בסוף כל קוייז

capitalsBtn.addEventListener('click', () => {
    quiz = capitalsQuiz; // החלף את החידון לחידון על ערי בירה
    currentQuestionIndex = 0; //   אפס את המונה של השאלות
    currentCategory = 'Capitals'; //משתנה עזר כדי שתצא הודעה של סיום קטגוריה בסוף כל קוייז
    capitalsBtn.style.display = 'none';
    gameStatus.style.display='none';  // להסתיר את ההודעה אחרי כל סוף קטגוריה
    animalsBtn.disabled = true;
    moviesBtn.disabled = true;
    selectCategory.innerHTML = 'Capitals Category'
    displayQuestion(currentQuestionIndex);
});

animalsBtn.addEventListener('click', () => {
    quiz = animalsQuiz; // החידון על בעלי חיים
    currentQuestionIndex = 0; // אפס את המונה
    currentCategory = 'Animals'; // משתנה עזר כדי שתצא הודעה של סיום קטגוריה בסוף כל קוייז
    animalsBtn.style.display = 'none';
    gameStatus.style.display='none';  // להסתיר את ההודעה אחרי כל סוף קטגוריה
    capitalsBtn.disabled = true;
    moviesBtn.disabled = true;
    selectCategory.innerHTML = 'Animals Category'
    displayQuestion(currentQuestionIndex);


});
moviesBtn.addEventListener('click', () => {
    quiz = MoviesQuiz; // החידון על סרטיםם
    currentQuestionIndex = 0; // אפס את המונה
    currentCategory = 'Movies'; // משתנה עזר כדי שתצא הודעה של סיום קטגוריה בסוף כל קוייז
    moviesBtn.style.display = 'none';
    gameStatus.style.display='none'; // להסתיר את ההודעה אחרי כל סוף קטגוריה
    capitalsBtn.disabled = true;
    animalsBtn.disabled = true;
    selectCategory.innerHTML = 'Movies Category'
    displayQuestion(currentQuestionIndex);


});



let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
disableButtons()

// מערך של שאלות ותשובות
const capitalsQuiz = [
    {
        question: "What is the Capital city of Israel?",
        answers: ["Haifa", "Tel Aviv", "Jerusalem", "Eilat"],
        correct: 2 // המיקום של התשובה הנכונה במערך התשובות
    },
    {
        question: "What is the Capital city of France?",
        answers: ["Paris", "Lyon", "Marseille", "Nice"],
        correct: 0
    },
    {
        question: "What is the Capital city of Japan?",
        answers: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
        correct: 1
    },
    {
        question: "What is the Capital city of Germany?",
        answers: ["Munich", "Frankfurt", "Berlin", "Hamburg"],
        correct: 2
    },
    {
        question: "What is the Capital city of Canada?",
        answers: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
        correct: 1
    },
    {
        question: "What is the Capital city of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2
    },
    {
        question: "What is the Capital city of Brazil?",
        answers: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2
    },
    {
        question: "What is the Capital city of Italy?",
        answers: ["Venice", "Rome", "Milan", "Naples"],
        correct: 1
    },
    {
        question: "What is the Capital city of South Korea?",
        answers: ["Seoul", "Busan", "Incheon", "Daegu"],
        correct: 0
    },
    {
        question: "What is the Capital city of Egypt?",
        answers: ["Cairo", "Alexandria", "Giza", "Luxor"],
        correct: 0
    }
];

const animalsQuiz = [
    {
        question: "Which animal is known as the King of the Jungle?",
        answers: ["Tiger", "Lion", "Elephant", "Cheetah"],
        correct: 1
    },
    {
        question: "Which animal is the largest mammal?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Bear"],
        correct: 1
    },
    {
        question: "Which animal can fly?",
        answers: ["Penguin", "Ostrich", "Chicken", "Flamingo"],
        correct: 3
    },
    {
        question: "Which animal is the fastest land animal?",
        answers: ["Cheetah", "Lion", "Horse", "Kangaroo"],
        correct: 0
    },
    {
        question: "Which animal has the longest lifespan?",
        answers: ["Elephant", "Blue Whale", "Tortoise", "Parrot"],
        correct: 2
    },
    {
        question: "Which bird is known for its colorful feathers and dancing courtship?",
        answers: ["Peacock", "Flamingo", "Parrot", "Swan"],
        correct: 0
    },
    {
        question: "What is the only mammal capable of true flight?",
        answers: ["Bat", "Flying Squirrel", "Gliding Possum", "Hummingbird"],
        correct: 0
    },
    {
        question: "Which reptile can change its skin color to camouflage?",
        answers: ["Gecko", "Iguana", "Chameleon", "Komodo Dragon"],
        correct: 2
    },
    {
        question: "Which sea creature has no brain or heart?",
        answers: ["Starfish", "Jellyfish", "Sea Urchin", "Octopus"],
        correct: 1
    },
    {
        question: "What is the name of the tallest land animal?",
        answers: ["Elephant", "Giraffe", "Ostrich", "Camel"],
        correct: 1
    }
];

const MoviesQuiz = [
    {
        question: "Which movie studio is famous for starting its films with a roaring lion?",
        answers: ["MGM Studios", "Disney", "Universal", "Paramount"],
        correct: 0
    },
    {
        question: "What color is Dorothy's iconic pair of shoes in The Wizard of Oz?",
        answers: ["Silver", "Blue", "Red", "Green"],
        correct: 2
    },
    {
        question: "In which animated movie does the character Simba appear?",
        answers: ["Finding Nemo", "The Lion King", "Aladdin", "Beauty and the Beast"],
        correct: 1
    },
    {
        question: "Which movie features a character saying, 'I'll be back'?",
        answers: ["The Terminator", "Die Hard", "Predator", "RoboCop"],
        correct: 0
    },
    {
        question: "What is the highest-grossing film of all time (as of 2023)?",
        answers: ["Avatar", "Titanic", "Avengers: Endgame", "The Lion King (2019)"],
        correct: 0
    },
    {
        question: "Which movie won the first Academy Award for Best Picture?",
        answers: ["Wings", "Gone with the Wind", "The Jazz Singer", "Sunrise"],
        correct: 0
    },
    {
        question: "Which director is known for the movies 'Inception', 'The Dark Knight', and 'Interstellar'?",
        answers: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino", "Martin Scorsese"],
        correct: 1
    },
    {
        question: "Which film features a young boy befriending an alien and saying, 'E.T. phone home'?",
        answers: ["Close Encounters", "E.T. the Extra-Terrestrial", "Star Wars", "The Goonies"],
        correct: 1
    },
    {
        question: "What is the name of the hobbit played by Elijah Wood in The Lord of the Rings?",
        answers: ["Bilbo Baggins", "Frodo Baggins", "Samwise Gamgee", "Pippin Took"],
        correct: 1
    },
    {
        question: "Which film series features a school called Hogwarts?",
        answers: ["Percy Jackson", "The Chronicles of Narnia", "Harry Potter", "Fantastic Beasts"],
        correct: 2
    }
];



let currentQuestionIndex = 0; // משתנה עזר שהוא מונה שעוזר לעבור בשאלות קדימה
// הצגת שאלה
function displayQuestion(index) {
    const currentQuestion = quiz[index];
    question.innerHTML = currentQuestion.question;

    // עדכון הטקסט על הכפתורים כלומר הצגת התשובוצת 
    btn1.innerHTML = currentQuestion.answers[0];
    btn2.innerHTML = currentQuestion.answers[1];
    btn3.innerHTML = currentQuestion.answers[2];
    btn4.innerHTML = currentQuestion.answers[3];

showAnswerButtons()
    enableButtons()

    // סימון מחלקות של תשובות נכונות/שגויות
    btns.forEach((button, index) => {
        button.classList.remove('true', 'false', 'correct', 'wrong'); // מוחק קלאסים מהכפתורים משאלה קודמת . גם אם זה נכון או טעות
        if (index === currentQuestion.correct) { // משווה בין המיקום של הכפתור לפרופרטי שנקרא קורקט
            button.classList.add('true'); // אם הם שווים תוסיך קלאס שנקרא TRUE
        } else {
            button.classList.add('false'); // אחרת תוסיף לכפתור קלאס שנקרא FALSE
        }
    });
}
// פונקציה לבדיקה אם התשובה נכונה על פי הוספת הקלאסים מפונקציה קודמת

function checkIfCorrectAnswer(event) {
    const clickedButton = event.target; // הכפתור שנלחץ
    if (clickedButton.classList.contains('true')) {// משפט תנאי שבודק אם לכפתור שנלחץ יש קלאס שנקרא טרו
    

        // alert('Correct Answer');
        clickedButton.classList.add('correct')
        disableButtons()
        setTimeout(goToNextQuestion, 1000)
    } else {

        // alert('Wrong Answer');
        clickedButton.classList.add('wrong')
        disableButtons();   
        mistakesCounter++;
if (mistakesCounter == 4) {
    // ___________________________________________מה קורה אם השחקן מגיע ל4 פסילות GAME OVER
        selectCategory.innerHTML = "";
        question.innerHTML="";
        capitalsBtn.style.display = 'none';
        animalsBtn.style.display = 'none';
        moviesBtn.style.display = 'none';
        startNewGame.style.display = 'block';
    gameOverNote();
    deleteAnswerButtons();
    return;
    
}
// אם התנאי של גיים אובר לא מתקיים , אז ממשיכים לשלב הבא 
    setTimeout(goToNextQuestion, 1000);
    }


    btns.forEach(button => {
        if (button.classList.contains('true')) {
            button.classList.add('correct');
        }
    });
}

// פונקציה של מעבר לשאלה הבאה 
function goToNextQuestion() {
    currentQuestionIndex++;  // מקפיץ ב1 את הערך של המונה בשורה 31
    if (currentQuestionIndex < quiz.length) {  //  אם מונה השאלות קטן מאורך המערך שנקרא קוויז אז תבצע את ,
        displayQuestion(currentQuestionIndex); // מציג את השאלה הבאה
    } else {                                   // אחרת כלומר אם המונה הגיע לאורך המערך אז תציג 
        gameStatus.style.display='block';
        gameStatus.innerHTML = `${currentCategory} Category is Completed!`;

        selectCategory.innerHTML = "Pick Your Next Category"
        question.innerHTML ="";
            deleteAnswerButtons();
        currentQuestionIndex = 0; // מאפס את המונה של הרצת השאלות לקראת הקטגוריה הבאה (אם יש כזו)
        capitalsBtn.disabled = false;
        animalsBtn.disabled = false;
        moviesBtn.disabled = false;
        isGameFinished++;
        if (isGameFinished == 3) {
            alert('Youv Finished the Game!')
            selectCategory.innerHTML = ""
            gameFinishedNote();
            

            
        }
    }
}

// הוספת מאזין לכל כפתור
btns.forEach(button => {
    button.addEventListener('click', checkIfCorrectAnswer);
});


function disableButtons() {
    btns.forEach(button => {
        button.disabled = true;
    })
}

function enableButtons() {
    btns.forEach(button => {
        button.disabled = false;
    })
}

function deleteAnswerButtons(){
    btns.forEach(button=>{
        button.style.display='none';
    })
}
function showAnswerButtons(){
    btns.forEach(button=>{
        button.style.display='block';
    })
}

const startNewGame = document.getElementById('start-new-game')
startNewGame.addEventListener('click',()=>{
    location.reload();
})
