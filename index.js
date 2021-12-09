import bridge from '@vkontakte/vk-bridge';

// Отправляет событие нативному клиенту на инициализацию приложения
bridge.send("VKWebAppInit", {});

// Подписывается на события, отправленные нативным клиентом
bridge.subscribe((e) => console.log(e));
// Отправляет событие нативному клиенту на инициализацию приложения
bridge.send("VKWebAppInit", {});
console.log(bridge.send("VKWebAppInit", {}))
bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 209170333, "key": "dBuBKe1kFcdemzB"});
const quizData = [
    {
        question: "Год рождения Куплинова?",
        a: "1988 г.",
        b: "1999 г.",
        c: "1979 г.",
        correct: "a",
    },
    {
        question: "Сколько подписчиков у Куплинова?",
        a: "1,8 млн",
        b: "3 млн",
        c: "9,9 млн",
        correct: "c",
    },
    {
        question: "Сколько детей у Куплинова?",
        a: "1",
        b: "0",
        c: "3",
        correct: "b",
    },
    {
        question: "Где родился Куплинов?",
        a: "г. Москва",
        b: "г. Оренбург",
        c: "г. Владивосток",
        correct: "b",
    },
    {
        question: "В какой стране радился Куплинов?",
        a: "Россия",
        b: "СССР",
        c: "Белоруссия",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz(){
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

function deselectAnswers(){
    answerElements.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
    let answer;

    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submit.addEventListener('click', () => {
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length){
            loadQuiz();
        }
        else{
            score = score/quizData.length*100;
            quiz.innerHTML = `<h2 align="center" style="color:#A9A9A9;font-size: 21px;">вы были правы на:</h2>
            <p>${score}%</p>
            <h2 align="center" style="color:#A9A9A9;font-size: 21px;">Купон на скидку:</h2>
            <p align="center" style="color:#00CED1;width:300px;margin-left: auto;margin-right: auto;padding-top: 6px;padding-bottom: 6px;">Kuplinovv</p>
            <h2 align="center" style="color:#A9A9A9;font-size: 21px;">Забери свой подарок на сайте</h2>
            <p align="center" style="color:#00CED1; border: 4px solid #00CED1;border-radius: 15px;width:300px;margin-left: auto;margin-right: auto;padding-top: 6px;padding-bottom: 6px;"><a href="http://randcase.ru/3dH">ПЕРЕЙТИ НА САЙТ</a></p>
            <br>

            `;
        }
    }
});

