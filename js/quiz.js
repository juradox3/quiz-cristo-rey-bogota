// js/quiz.js
import { guardarResultado } from "./firebase.js";

const questions = [
    { id: 1, text: "¿Dónde nació José Gras?", options: ["Agramunt (Lérida)", "Barcelona", "Madrid", "Valencia", "Granada"], correct: 0 },
    { id: 2, text: "¿Cuándo nació José Gras?", options: ["22 de enero de 1834", "15 de marzo de 1835", "3 de mayo de 1836", "18 de julio de 1832", "25 de diciembre de 1833"], correct: 0 },
    { id: 3, text: "¿Qué profesión tenían sus padres?", options: ["Eran campesinos", "Eran comerciantes", "Eran pastores", "Eran artesanos", "Eran educadores de pueblo"], correct: 0 },
    { id: 4, text: "¿Cuándo fue ordenado sacerdote José Gras?", options: ["20 de marzo de 1858", "15 de abril de 1860", "5 de marzo de 1856", "1 de enero de 1860", "12 de octubre de 1857"], correct: 0 },
    { id: 5, text: "¿El P. Gras fue sacerdote diocesano o religioso?", options: ["Diocesano", "Religioso", "Jesuita", "Franciscano", "Carmelita"], correct: 0 },
    { id: 6, text: "¿Cómo se llamaba la congregación fundada por José Gras?", options: ["Hijas de Cristo Rey", "Hijas de María", "Hijas del Sagrado Corazón", "Hijas de la Cruz", "Hijas de San José"], correct: 0 },
    { id: 7, text: "¿En qué fecha funda el Instituto de las Hijas de Cristo Rey?", options: ["26 de mayo de 1876", "15 de marzo de 1875", "1 de junio de 1877", "10 de enero de 1878", "24 de diciembre de 1875"], correct: 0 },
    { id: 8, text: "¿Cuál es la misión de las Hijas de Cristo Rey?", options: ["Hacer reinar a Cristo", "Formar profesionales", "Atender enfermos", "Evangelizar en las plazas", "Custodiar templos antiguos"], correct: 0 },
    { id: 9, text: "¿En qué año llegaron las Hijas de Cristo Rey a Colombia?", options: ["1960", "1950", "1970", "1980", "1965"], correct: 0 },
    { id: 10, text: "¿A qué edad murió José Gras?", options: ["A los 84 años", "A los 75 años", "A los 90 años", "A los 80 años", "A los 72 años"], correct: 0 },
    { id: 11, text: "¿Qué secreto le contó Jesús a José Gras?", options: ["Muchos hombres no me quieren y no quieren que yo reine en su corazón", "El reino de Dios ya está cerca", "Amaos los unos a los otros", "Busca siempre la verdad", "Predica el evangelio a los reyes de la tierra"], correct: 0 },
    { id: 12, text: "¿Qué idea perseguía José Gras con la publicación del Paladín de Cristo?", options: ["Encender en amor de Cristo los corazones para hacerle reinar en ellos", "Aumentar las vocaciones sacerdotales", "Buscar apoyo para la congregación", "Denunciar los abusos de la época", "Recaudar fondos para las misiones de ultramar"], correct: 0 },
    { id: 13, text: "¿Con qué objeto se inscribió José Gras en la Academia Bibliográfica Mariana?", options: ["Publicar y propagar libros y escritos referentes únicamente a la Madre de Dios", "Organizar eventos marianos", "Formar nuevos sacerdotes", "Viajar por Europa", "Catalogar archivos históricos vaticanos"], correct: 0 },
    { id: 14, text: "¿Qué hecho ocurrido en 1863 conmovió profundamente a José Gras?", options: ["La publicación de La vida de Jesús de Ernesto Renán, donde se niega la divinidad de Cristo", "La llegada de una epidemia a España", "El cierre de una iglesia", "La muerte de su padre", "El exilio forzado de las órdenes religiosas"], correct: 0 },
    { id: 15, text: "¿A qué se dedicaba la Academia y Corte de Cristo?", options: ["Era una asociación religioso-literaria que defendía la divinidad de Cristo y le desagraviaba con la adoración eucarística", "Organizaba eventos deportivos", "Formaba maestros", "Atendía a los pobres", "Promovía el canto gregoriano en Europa"], correct: 0 },
    { id: 16, text: "¿Por qué el P. Gras tituló su revista 'El Bien'?", options: ["Reflejar que Cristo es el Bien individual, social, universal, inmenso, eterno e infinito", "Porque quería promover el bienestar social", "Porque era una revista para buenos hábitos", "Porque trataba sobre salud", "Porque buscaba erradicar la pobreza material"], correct: 0 },
    { id: 17, text: "¿Qué decreto recibió el Instituto de la Santa Sede el 15 de febrero de 1898?", options: ["El Decretum Laudis", "La Bula Papal", "El Decreto de Aprobación", "La Carta Magna", "El Breve Apostólico"], correct: 0 },
    { id: 18, text: "¿Para qué trabajó incansablemente José Gras según el decreto con el que fue declarado venerable?", options: ["Para que Cristo reinara en el corazón de todo hombre, en la familia y en la sociedad", "Para expandir la congregación por el mundo", "Para lograr la beatificación", "Para escribir más libros", "Para reformar las leyes educativas del país"], correct: 0 },
    { id: 19, text: "¿Qué significa la educación como 'segunda creación'?", options: ["Continuar la acción creadora de Dios y Cristo, moldeando las mentes y dando oportunidades", "Enseñar ciencias naturales", "Promover la creatividad artística", "Repetir lo que ya existe", "Reestructurar los modelos pedagógicos del gobierno"], correct: 0 },
    { id: 20, text: "¿Qué significa 'Cristo reina' según el pensamiento institucional?", options: ["Un llamado a transformar la vida y la sociedad; profesión de fe, amor y dogma de salvación; proclamación de la soberanía de Cristo sobre la humanidad y el universo", "Una frase de la Biblia", "Un lema escolar para eventos deportivos", "Una tradición local", "El encabezado oficial de las cartas parroquiales"], correct: 0 }
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
        [questionCopy.options[i], questionCopy.options[j]] = [questionCopy.options[j], questionCopy.options[i]];
    }
    questionCopy.correct = questionCopy.options.indexOf(correctOptionText);
    return questionCopy;
}

function initializeQuiz() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    shuffledQuestions = questions
        .sort(() => Math.random() - 0.5)
        .map(q => shuffleQuestionOptions(q));
    
    const userNameElem = document.getElementById('userName');
    if(userNameElem) {
        // Muestra Nombre y el nuevo Cargo en la barra superior
        userNameElem.textContent = `${currentUser.name} (${currentUser.job || 'General'})`;
    }
    
    userAnswers = {};
    currentQuestionIndex = 0;
    timeElapsed = 0;

    startTimer();
    loadQuestion();
}

function loadQuestion() {
    if(!shuffledQuestions.length) return;
    const question = shuffledQuestions[currentQuestionIndex];
    
    const qNumElem = document.getElementById('questionNumber');
    const qTextElem = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    
    if(qNumElem) qNumElem.textContent = `Pregunta ${currentQuestionIndex + 1} de ${shuffledQuestions.length}`;
    if(qTextElem) qTextElem.textContent = question.text;
    if(!optionsContainer) return;

    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E']; 

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-letter">${letters[index]}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });

    const progressFill = document.getElementById('progressFill');
    if(progressFill) {
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
        progressFill.style.width = progress + '%';
    }

    const btnPrev = document.getElementById('btnPrev');
    if(btnPrev) btnPrev.disabled = currentQuestionIndex === 0;
    
    const btnFinish = document.getElementById('btnFinish');
    const btnNext = document.getElementById('btnNext');
    
    if(btnNext && btnFinish) {
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            btnNext.style.display = 'none';
            btnFinish.style.display = 'block';
        } else {
            btnNext.style.display = 'block';
            btnFinish.style.display = 'none';
        }
    }
}

function selectOption(index) {
    userAnswers[currentQuestionIndex] = index;
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
}

function ensureAnswerSelected() {
    if (typeof userAnswers[currentQuestionIndex] !== 'number') {
        alert('Debes responder esta pregunta antes de continuar.');
        return false;
    }
    return true;
}

function nextQuestion() {
    if (!ensureAnswerSelected()) return;
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
    const timerElem = document.getElementById('timer');
    if(!timerElem) return;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timerElem.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateScore() {
    let correctAnswers = 0;
    shuffledQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) correctAnswers++;
    });
    return {
        correct: correctAnswers,
        total: shuffledQuestions.length,
        percentage: Math.round((correctAnswers / shuffledQuestions.length) * 100)
    };
}

async function finishQuiz() {
    if (!ensureAnswerSelected()) return;
    clearInterval(timerInterval);

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: "Anónimo", userType: "Docente", job: "General" };
    const score = calculateScore();

    try {
        // COMBINACIÓN INTELIGENTE: Se envía el Rol y el Cargo concatenados para no alterar la estructura original de Firebase.
        const compositeRole = `${currentUser.userType} — ${currentUser.job || 'General'}`;
        await guardarResultado(currentUser.name, score.percentage, compositeRole);
    } catch (error) {
        console.error("No se pudo guardar en Firebase:", error);
    }

    showResults(score, timeElapsed);
}

function showResults(score, timeElapsed) {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Participante', userType: 'Docente', job: 'General' };

    // Ocultar caja del juego de preguntas y activar el contenedor nativo del Diploma
    const quizMainBox = document.getElementById('quizMainBox');
    const viewDiplomaBox = document.getElementById('viewDiplomaBox');
    
    if (quizMainBox && viewDiplomaBox) {
        quizMainBox.classList.add('hidden-view');
        viewDiplomaBox.classList.remove('hidden-view');
        
        // Inyectar de forma limpia los datos calculados en el Diploma Estructurado
        document.getElementById('diplomaName').textContent = currentUser.name;
        document.getElementById('diplomaMeta').textContent = `Rol: ${currentUser.userType} | Cargo/Dependencia: ${currentUser.job || 'General'}`;
        document.getElementById('diplomaScore').textContent = `${score.percentage}%`;
        document.getElementById('diplomaTime').textContent = `Tiempo empleado: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min`;
    }
}

window.initializeQuiz = initializeQuiz;
window.previousQuestion = previousQuestion;
window.nextQuestion = nextQuestion;
window.finishQuiz = finishQuiz;