
let num1 = document.getElementById('num1')
let num2 = document.getElementById('num2')
let sum = document.getElementById('sum')
let check = document.getElementById('check')
let next = document.getElementById('next')
let nextPlus = document.getElementById('nextPlus');
let nextMinus = document.getElementById('nextMinus')
let nextMult = document.getElementById('nextMult')
let nextDivis = document.getElementById('nextDivis')
let message = document.getElementById('message')


const instructions = document.getElementById('instructions')
const instructionsButton = document.getElementById('instructionsButton')
instructionsButton.addEventListener("click", () => {
    instructions.style.display = 'none';
    sum.focus();
    
})


check.addEventListener('click', calculate)
next.addEventListener('click', random);
next.addEventListener('click', () => { document.getElementById('sum').focus() });
nextPlus.addEventListener('click', randomPlus);
nextMinus.addEventListener('click', randomMinus);
nextMult.addEventListener('click', randomMult);
nextDivis.addEventListener('click', randomDivis);



let getRandomNumber = () => {
    return Math.floor((Math.random() * 10) + 1);
}
let getRandomNumber100 = () => {
    return Math.floor((Math.random() * 100) + 1);
}


function isSumEmpty(){
    if (sum.value === "") {
        message.textContent = "נא לבחור מספר";
        sum.focus();
        return true; // מציין שהתיבה ריקה
    } 
    return false; // מציין שהתיבה אינה ריקה
}


randomPlus();


function random() {
    sum.value = "";
    message.textContent = "";
    if (op.innerHTML == "+") {
        randomPlus();
    }
    else if (op.innerHTML == "-") {
        randomMinus();
    }
    else if (op.innerHTML == "X") {
        randomMult();
    }
    else if (op.innerHTML == "/") {
        randomDivis();
    }

}

function randomPlus() {
    sum.value = "";
    document.getElementById('op').textContent = "+";  // שינוי לאופרטור חיבור
    let randNum1 = getRandomNumber100();
    let randNum2 = getRandomNumber100();
    message.textContent = "";

    while (randNum1 + randNum2 > 100) {
        randNum1 = getRandomNumber100();  // Generate a new random number for randNum1
        randNum2 = getRandomNumber100();  // Generate a new random number for randNum2
        console.log("inside While :", randNum1, randNum2);
    }

    num1.textContent = randNum1
    num2.textContent = randNum2
    message.textContent = "";
}

function randomMinus() {
    sum.value = "";
    document.getElementById('op').innerHTML = "-";
    let randNum1 = getRandomNumber100();
    let randNum2 = getRandomNumber100();
    message.textContent = "";

    while (randNum1 - randNum2 < 0) {
        randNum1 = getRandomNumber100();  // Generate a new random number for randNum1
        randNum2 = getRandomNumber100();  // Generate a new random number for randNum2
        console.log("inside While :", randNum1, randNum2);
    }

    num1.textContent = randNum1
    num2.textContent = randNum2
    message.textContent = "";
}

function randomMult() {
    sum.value = "";
    document.getElementById('op').innerHTML = "X";
    let randNum1 = getRandomNumber100();
    let randNum2 = getRandomNumber100();
    message.textContent = "";

    while (randNum1 * randNum2 > 100) {
        randNum1 = getRandomNumber100();  // Generate a new random number for randNum1
        randNum2 = getRandomNumber100();  // Generate a new random number for randNum2
        console.log("inside While :", randNum1, randNum2);
    }

    num1.textContent = randNum1
    num2.textContent = randNum2
    message.textContent = "";

}
function randomDivis() {
    sum.value = "";
    document.getElementById('op').innerHTML = "/";

    // Generate two random numbers
    let randNum1 = getRandomNumber100();
    let randNum2 = getRandomNumber100();

    // Keep generating new random numbers until randNum1 is divisible by randNum2


    while (randNum1 % randNum2 !== 0) {
        randNum1 = getRandomNumber100();  // Generate a new random number for randNum1
        randNum2 = getRandomNumber100();  // Generate a new random number for randNum2

    }


    num1.textContent = randNum1
    num2.textContent = randNum2
    message.textContent = "";

}


// משתנים למעקב אחרי תשובות נכונות ושגויות
let correctCount = 0;
let wrongCount = 0;

// עדכון ספירה ב-HTML
const correctCountDisplay = document.getElementById('correctCount');
const wrongCountDisplay = document.getElementById('wrongCount');

// פונקציה להצגת הודעה על פי נכונות התשובה
function showMessage(isRightAnswer) {
    if (isRightAnswer) {
        message.textContent = "כל הכבוד תשובה נכונה!"; // הודעה חיובית
        correctCount++; // עדכון מונה תשובות נכונות
        correctCountDisplay.textContent = correctCount; // הצגת עדכון בדף
        sum.focus();
    } else {
        message.textContent = "תשובה שגויה"; // הודעה שלילית
        wrongCount++; // עדכון מונה תשובות שגויות
        wrongCountDisplay.textContent = wrongCount; // הצגת עדכון בדף
        sum.focus();
    }
}



// פונקציית בדיקה לחישוב התשובה בהתאם לפעולה ולמספרים
function calculate() {
     if (isSumEmpty()) {
        return; // מפסיק את הביצוע אם התיבה ריקה
    }

    // קבלת המספר הראשון מתיבת התצוגה והמרתו למספר שלם
    let number1 = parseInt(num1.textContent);

    // קבלת המספר השני מתיבת התצוגה והמרתו למספר שלם
    let number2 = parseInt(num2.textContent);

    // קבלת האופרטור הנוכחי (+ או -) מתוך האלמנט עם מזהה 'op'
    let op = document.getElementById('op').innerHTML;

    
    // בדיקת סוג הפעולה: אם האופרטור הוא "+"
    if (op == "+") {
        let isRightAnswer = sum.value == number1 + number2; // הגדרת המשתנה כתשובה נכונה
        showMessage(isRightAnswer); // קריאה לפונקציה להצגת הודעה בהתאם לתוצאה
        setTimeout(random,1000);
    }
    // אם הפעולה היא "-"
    else if (op == "-") {
        // בדיקה האם התוצאה שהוזנה שווה להפרש בין number1 ו-number2
        showMessage(sum.value == number1 - number2);
        setTimeout(random,1000);
    }
    // אם הפעולה היא "*"
    else if (op == "X") {
        // בדיקה האם התוצאה שהוזנה שווה למכפלה number1 ו-number2
        showMessage(sum.value == number1 * number2);
        setTimeout(random,1000);
    }
    // אם הפעולה היא "/"
    else if (op == "/") {
        // בדיקה האם התוצאה שהוזנה שווה לחילוק number1 ו-number2
        showMessage(sum.value == number1 / number2);
        setTimeout(random,1000);
    }
    
}


