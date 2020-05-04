const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-questions2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");

let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

const questions = [{
    q: 'How do you call a function name"myFunction"?',
    options:['myFunction().', 'call myFunction().', 'call function myFunction().', 'none of the Above.'],
    answer:0},{
    q: 'How to write an IF statement in JavaScript?',
    options:['if i == 5.', 'if (i == 5){}.', 'if i = 5.', 'if i == 5 {then}.'],
    answer:1},{
    q: 'How does a for loop start?',
    options:['for i = 1 to 5.', 'for (i = 0, i <= 5).', 'for (i <= 5, 1++).', 'for (i = 0, i < 5, i++).'],
    answer:3},{
    q: 'Which operator is used to assign a value to a variable?',
    options:['+', '-', '=', '*'],
    answer:2},{
        q: 'How do you declare a JavaScript variable?',
        options:['variable carName.', 'var carName.', 'v carName.', 'none of these.'],
        answer:1}
];

totalQuestionSpan.innerHTML = questions.length;

load = () => {
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    option1.innerHTML = questions[questionIndex].options[0];
    option2.innerHTML = questions[questionIndex].options[1];
    option3.innerHTML = questions[questionIndex].options[2];
    option4.innerHTML = questions[questionIndex].options[3];
    index++;
}

//check if the answer is correct or wrong
check = (element) => {
    if (element.id == questions[questionIndex].answer) {
        element.classList.add('correct');
         updateAnswerTracker('correct');
        score++;
        //console.log("score:" +score)
    }else{
        element.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOption();
}

disableOption = () => {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
        if (options[i].id == questions[questionIndex].answer) {
            options[i].classList.add("correct");
        }
    }
}

enableOption = () => {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled","correct","wrong");
    }
}

answerTracker = () => {
    for (let i = 0; i < questions.length; i++) {
        const div = document.createElement("div");
        answerTrackerContainer.appendChild(div);
    }
}

updateAnswerTracker = (classNam) => {
    answerTrackerContainer.children[index - 1].classList.add(classNam);
}

validate = () => {
    if (!options[0].classList.contains("disabled")) {
        alert('please select an option');
    }else{
        enableOption();
        randomQuestion();
    }
}

next = () => {
    validate();
}

// make the question random
randomQuestion = () => {
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDuplicate = 0;
    if (index == questions.length) {
        quizOver();
        //  console.log("quiz-over");
    }else{
        if (myArray.length > 0) {
            for (let i = 0; i < myArray.length; i++) {
                if(myArray[i] == randomNumber){
                    hitDuplicate = 1;
                    break;
                }        
            }if (hitDuplicate == 1) {
                randomQuestion();
            }else{
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }
        }if (myArray.length == 0) {
            questionIndex = randomNumber;
            load(); 
            myArr.push(questionIndex);
            
        }
        //  console.log("myarr:"+myArr);
        myArray.push(randomNumber);
        // console.log("myArray:"+myArray);
        
    }
}

quizOver = () => {
   let x = document.querySelector(".quiz-over");
    x.style.display = "flex";
    // .classList.add("show");
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score/questions.length)*100 +"%";
}

tryAgain = () => {
    window.location.reload();
}

window.onload = () => {
    randomQuestion();
    answerTracker();
}