import { guardarResultado } from "./firebase.js";

const questions = [
    {
        id: 1,
        text: "¿Dónde nació José Gras?",
        options: [
            "En Agramunt (Lérida)",
            "En Barbastro (Lérida)",
            "En Agramunt (Gerona)",
            "En Manresa (Lérida)",
            "En Balaguer (Gerona)"
        ],
        correct: 0
    }
    // AQUÍ PEGAS EL RESTO DE TUS 50 PREGUNTAS
];

let currentQuestionIndex = 0;
let userAnswers = {};
let timerInterval;
let timeElapsed = 0;
let shuffledQuestions = [];

function shuffleQuestionOptions(question) {
    const questionCopy = JSON.parse(JSON.stringify(question));
    const correctOptionText = questionCopy.options[questionCopy.correct];

    for (let i = questionCopy.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionCopy.options[i], questionCopy.options[j]] =
        [questionCopy.options[j], questionCopy.options[i]];
    }

    questionCopy.correct =
        questionCopy.options.indexOf(correctOptionText);

    return questionCopy;
}

function initializeQuiz() {

    const userData = {
        name: document.getElementById("fullName").value,
        userType: document.getElementById("userType").value,
        job: document.getElementById("jobPosition").value
    };

    if (!userData.name || !userData.userType || !userData.job) {
        alert("Por favor completa todos los campos.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(userData));

    document.getElementById("viewAccess").classList.add("hidden");
    document.getElementById("viewQuiz").classList.remove("hidden");

    shuffledQuestions = questions
        .sort(() => Math.random() - 0.5)
        .map(q => shuffleQuestionOptions(q));

    userAnswers = {};
    currentQuestionIndex = 0;
    timeElapsed = 0;

    document.getElementById("playerDisplay").textContent =
        userData.name;

    document.getElementById("jobDisplay").textContent =
        `${userData.userType} | ${userData.job}`;

    startTimer();
    loadQuestion();
    setupNavigationListeners();
}

function setupNavigationListeners() {

    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnFinish = document.getElementById('btnFinish');

    btnPrev.addEventListener('click', previousQuestion);
    btnNext.addEventListener('click', nextQuestion);
    btnFinish.addEventListener('click', finishQuiz);
}

function loadQuestion() {

    const question = shuffledQuestions[currentQuestionIndex];

    document.getElementById('questionNumber').textContent =
        `Pregunta ${currentQuestionIndex + 1} de ${shuffledQuestions.length}`;

    document.getElementById('questionText').textContent =
        question.text;

    const optionsContainer =
        document.getElementById('optionsContainer');

    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D', 'E'];

    question.options.forEach((option, index) => {

        const optionElement = document.createElement('div');

        optionElement.className = 'option-item';

        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }

        optionElement.innerHTML = `
            <div class="option-box-letter">${letters[index]}</div>
            <div class="option-box-text">${option}</div>
        `;

        optionElement.onclick = () => selectOption(index);

        optionsContainer.appendChild(optionElement);
    });

    const progress =
        ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

    document.getElementById('progressFill').style.width =
        progress + '%';

    document.getElementById('btnPrev').disabled =
        currentQuestionIndex === 0;

    if (currentQuestionIndex === shuffledQuestions.length - 1) {

        document.getElementById('btnNext').style.display = 'none';

        document.getElementById('btnFinish').style.display = 'flex';

    } else {

        document.getElementById('btnNext').style.display = 'flex';

        document.getElementById('btnFinish').style.display = 'none';
    }
}

function selectOption(index) {

    userAnswers[currentQuestionIndex] = index;

    const options = document.querySelectorAll('.option-item');

    options.forEach((option, i) => {

        option.classList.remove('selected');

        if (i === index) {
            option.classList.add('selected');
        }
    });
}

function nextQuestion() {

    if (currentQuestionIndex < shuffledQuestions.length - 1) {

        currentQuestionIndex++;

        loadQuestion();

        window.scrollTo(0, 0);
    }
}

function previousQuestion() {

    if (currentQuestionIndex > 0) {

        currentQuestionIndex--;

        loadQuestion();

        window.scrollTo(0, 0);
    }
}

function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        timeElapsed++;

        updateTimerDisplay();

    }, 1000);
}

function updateTimerDisplay() {

    const minutes = Math.floor(timeElapsed / 60);

    const seconds = timeElapsed % 60;

    document.getElementById('timer').textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateScore() {

    let correctAnswers = 0;

    shuffledQuestions.forEach((question, index) => {

        if (userAnswers[index] === question.correct) {
            correctAnswers++;
        }
    });

    return {
        correct: correctAnswers,
        total: shuffledQuestions.length,
        percentage: Math.round(
            (correctAnswers / shuffledQuestions.length) * 100
        )
    };
}

async function finishQuiz() {

    const totalContestadas =
        Object.keys(userAnswers).length;

    if (totalContestadas < shuffledQuestions.length) {

        alert(
            `Te faltan ${
                shuffledQuestions.length - totalContestadas
            } preguntas`
        );

        return;
    }

    clearInterval(timerInterval);

    const currentUser =
        JSON.parse(localStorage.getItem('currentUser'));

    const score = calculateScore();

    const notaCalculada =
        1.0 + ((score.correct / score.total) * 4.0);

    const notaFinalFormateada =
        notaCalculada.toFixed(1);

    try {

        const compositeRole =
            `${currentUser.userType} — ${currentUser.job}`;

        await guardarResultado(
            currentUser.name,
            score.percentage,
            compositeRole,
            notaFinalFormateada
        );

    } catch (error) {

        console.error(error);
    }

    showResults(score, timeElapsed);
}

function showResults(score, timeElapsed) {

    const minutes = Math.floor(timeElapsed / 60);

    const seconds = timeElapsed % 60;

    const currentUser =
        JSON.parse(localStorage.getItem('currentUser'));

    document.getElementById("viewQuiz")
        .classList.add("hidden");

    document.getElementById("viewDiploma")
        .classList.remove("hidden");

    const notaCalculada =
        1.0 + ((score.correct / score.total) * 4.0);

    const notaFinalFormateada =
        notaCalculada.toFixed(1);

    document.getElementById('diplomaName').textContent =
        currentUser.name;

    document.getElementById('diplomaMeta').textContent =
        `Rol: ${currentUser.userType} | Cargo: ${currentUser.job}`;

    document.getElementById('diplomaScore').textContent =
        `${score.percentage}% (Nota ${notaFinalFormateada})`;

    document.getElementById('diplomaTime').textContent =
        `Tiempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

window.initializeQuiz = initializeQuiz;
