// En tu js/quiz.js
import { guardarResultado } from "./firebase.js";

const questions = [
    { 
        id: 1, 
        text: "¿Dónde nació José Gras?", 
        options: ["En Agramunt (Lérida)", "En Barbastro (Lérida)", "En Agramunt (Gerona)", "En Manresa (Lérida)", "En Balaguer (Gerona)"], 
        correct: 0 
    },
    { 
        id: 2, 
        text: "¿Cuándo nació José Gras?", 
        options: ["El 22 de marzo de 1834.", "El 23 de enero de 1834.", "El 22 de enero de 1835.", "El 22 de enero de 1834.", "El 24 de enero de 1834."], 
        correct: 3 
    },
    { 
        id: 3, 
        text: "Nombre de sus padres", 
        options: ["Juan y Rosa.", "José y Rosa.", "Juan y Rita.", "Pedro y Rosa.", "Juan y María."], 
        correct: 0 
    },
    { 
        id: 4, 
        text: "Nombre de sus hermanos", 
        options: ["Gertrudis, Antonia y Juan", "Gertrudis, Ana y Ramón", "Gertrudis, Antonia y Ramón", "Gabriela, Antonia y Ramón", "Gertrudis, Teresa y Ramón"], 
        correct: 2 
    },
    { 
        id: 5, 
        text: "Fecha en que fue bautizado", 
        options: ["22 de enero de 1834.", "23 de enero de 1834.", "24 de enero de 1834.", "23 de marzo de 1834.", "25 de enero de 1834."], 
        correct: 1 
    },
    { 
        id: 6, 
        text: "¿A qué edad recibió la confirmación?", 
        options: ["5 años.", "7 años.", "2 años.", "4 años.", "3 años."], 
        correct: 4 
    },
    { 
        id: 7, 
        text: "¿En qué año se confirmó?", 
        options: ["En 1834.", "En 1837.", "En 1836.", "En 1838.", "En 1840."], 
        correct: 1 
    },
    { 
        id: 8, 
        text: "¿Quién bautizó a José Gras?", 
        options: [
            "El padre dominico Ramón Domenech.",
            "El padre franciscano José Domenech.",
            "El padre franciscano Ramón Domenech.",
            "El padre jesuita Ramón Domenech.",
            "El obispo franciscano Ramón Domenech."
        ], 
        correct: 2 
    },
    { 
        id: 9, 
        text: "¿Qué profesión tenían sus padres?", 
        options: ["Eran artesanos.", "Eran comerciantes.", "Eran pastores.", "Eran campesinos.", "Eran tejedores."], 
        correct: 3 
    },
    { 
        id: 10, 
        text: "¿Qué secreto le contó Jesús a José Gras?", 
        options: [
            "Muchos hombres me olvidan y no quieren que yo habite en su corazón.",
            "Muchos hombres no me quieren y no permiten que yo gobierne en su mente.",
            "Muchos hombres se alejan y no quieren que mi reino llegue a su corazón.",
            "Muchos hombres no me quieren y no quieren que yo reine en su corazón.",
            "Muchos hombres me rechazan y no desean que yo reine en sus familias."
        ], 
        correct: 3 
    },
    { 
        id: 11, 
        text: "¿Por qué considera el Padre Gras como importante la Adoración a Jesús en la Eucaristía?", 
        options: [
            "Porque la Eucaristía “es la suprema y eterna demostración del amor que Dios manifiesta a las almas”",
            "Porque la Eucaristía “es la suprema e inefable prueba del amor que Dios tiene a la humanidad”",
            "Porque la Eucaristía “es la misteriosa e inefable muestra del amor que Cristo ofrece a la iglesia”",
            "Porque la Eucaristía “es la primera e inefable prueba de la entrega que Dios hace a la humanidad”",
            "Porque la Eucaristía “es la viva e inefable prueba del amor que el Padre tiene a sus hijos”"
        ], 
        correct: 1 
    },
    { 
        id: 12, 
        text: "¿De pequeño en sus tiempos libres a qué se dedicaba José?", 
        options: ["Se dedicaba al estudio.", "Se dedicaba al trabajo.", "Se dedicaba a la oración.", "Se dedicaba a la lectura.", "Se dedicaba al pastoreo."], 
        correct: 2 
    },
    { 
        id: 13, 
        text: "¿Cuándo era niño José que soñaba ser de grande?", 
        options: ["Quería ser Sacerdote.", "Quería ser Periodista.", "Quería ser Educador.", "Quería ser Misionero.", "Quería ser Monje."], 
        correct: 0 
    },
    { 
        id: 14, 
        text: "Además de asistir a la escuela ¿qué estudiaba de niño?", 
        options: [
            "Estudió filosofía con el vicario del pueblo.",
            "Estudió latín con el párroco del pueblo.",
            "Estudió latín con el maestro del pueblo.",
            "Estudió teología con el párroco del pueblo.",
            "Estudió francés con el párroco del pueblo."
        ], 
        correct: 1 
    },
    { 
        id: 15, 
        text: "¿Qué pasó cuando José tenía 12 años?", 
        options: [
            "Viajó a Madrid para ingresar al Seminario.",
            "Viajó a Tarragona para ingresar al colegio.",
            "Viajó a Barcelona para ingresar al Seminario.",
            "Viajó a Lérida para trabajar en el campo.",
            "Viajó a Granada para iniciar sus estudios."
        ], 
        correct: 2 
    },
    { 
        id: 16, 
        text: "¿En qué año empezó a estudiar retórica?", 
        options: [
            "Estudió retórica que es el arte de expresarse en Barcelona, año 1847.",
            "Estudió teología que es el arte de expresarse en Barcelona, año 1846.",
            "Estudió retórica que es el arte de expresarse en Tarragona, año 1846.",
            "Estudió retórica que es el arte de expresarse en Barcelona, año 1845.",
            "Estudió retórica que es el arte de expresarse en Barcelona, año 1846."
        ], 
        correct: 4 
    },
    { 
        id: 17, 
        text: "¿En qué año ingresa al seminario de Barcelona José Gras?", 
        options: [
            "En 1846 cuando tenía 12 años.",
            "En 1847 cuando tenía 13 años.",
            "En 1848 cuando tenía 14 años.",
            "En 1847 cuando tenía 14 años.",
            "En 1850 cuando tenía 16 años."
        ], 
        correct: 1 
    },
    { 
        id: 18, 
        text: "¿Cómo se llamaba la obra en la que colaboró Padre Gras con el Padre Francisco Palau?", 
        options: ["La Escuela de Cristo.", "La Escuela del Bien.", "La Escuela de Virtud.", "La Escuela Carismática.", "La Academia de Virtud."], 
        correct: 2 
    },
    { 
        id: 19, 
        text: "Cuando se hizo periodista ¿cuál fue el primer artículo que escribió?", 
        options: [
            "“El triunfo del bien y del mal”.",
            "“El progreso del bien y del mal”.",
            "“El progreso del bien sobre el mal”.",
            "“El camino del bien y del mal”.",
            "“El progreso de la verdad y del mal”."
        ], 
        correct: 1 
    },
    { 
        id: 20, 
        text: "Di el nombre de los periódicos en los que trabajó el Padre Gras", 
        options: [
            "“La España Cristiana” y “La Regeneración”",
            "“La España Católica” y “La Restauración”",
            "“El Paladín Católico” y “La Regeneración”",
            "“La España Católica” y “La Regeneración”",
            "“El Bien Católico” y “La Regeneración”"
        ], 
        correct: 3 
    },
    { 
        id: 21, 
        text: "¿Cuándo fue ordenado sacerdote?", 
        options: ["El 20 de marzo de 1858.", "El 25 de marzo de 1858.", "El 20 de abril de 1858.", "El 4 de abril de 1858.", "El 20 de marzo de 1856."], 
        correct: 0 
    },
    { 
        id: 22, 
        text: "En qué tiempo Litúrgico fue ordenado sacerdote el Padre Gras?", 
        options: ["En Adviento.", "En Cuaresma.", "En Tiempo Ordinario.", "En Pascua.", "En Navidad."], 
        correct: 1 
    },
    { 
        id: 23, 
        text: "¿El Padre Gras fue sacerdote, diocesano o religioso?", 
        options: ["Religioso.", "Jesuita.", "Diocesano.", "Franciscano.", "Monacal."], 
        correct: 2 
    },
    { 
        id: 24, 
        text: "¿Cuándo celebra su primera misa cantada?", 
        options: ["20 de marzo de 1858.", "4 de abril de 1856.", "5 de abril de 1858.", "4 de mayo de 1858.", "4 de abril de 1858."], 
        correct: 4 
    },
    { 
        id: 25, 
        text: "¿Por qué se inscribe en la Academia Bibliográfica Mariana?", 
        options: [
            "Con el objeto de publicar e imprimir libros y tratados referentes únicamente a la Madre de Dios.",
            "Con el objeto de escribir y propagar textos y cantos referentes especialmente a la Madre de Dios.",
            "Con el objeto de publicar y propagar libros y escritos referentes únicamente a la Madre de Dios.",
            "Con el propósito de coleccionar y propagar libros y escritos referentes únicamente a la Virgen María.",
            "Con el objeto de publicar y defender libros y dogmas referentes únicamente a la Madre de Dios."
        ], 
        correct: 2 
    },
    { 
        id: 26, 
        text: "Según el Padre Gras, ¿Qué deber tienen los católicos con respecto al derecho de Cristo a reinar?", 
        options: [
            "Tienen el deber de proclamarlo.",
            "Tienen la obligación de difundirlo.",
            "Tienen el derecho de vivirlo.",
            "Tienen el deber de defenderlo.",
            "Tienen el mandato de enseñarlo."
        ], 
        correct: 3 
    },
    { 
        id: 27, 
        text: "¿Qué hecho ocurre en 1863 que conmueve a José Gras?", 
        options: [
            "Se publica la vida de Jesús de Ernesto Renán donde se niega la divinidad de Cristo.",
            "Se publica el Paladín de Cristo de Ernesto Renán donde se ataca la divinidad de Cristo.",
            "Se publica la vida de Jesús de Ernesto Renán donde se duda de la existencia de Cristo.",
            "Se edita la historia de Jesús de Ernesto Renán donde se niega la divinidad de Dios.",
            "Se publica la vida de María de Ernesto Renán donde se niega la divinidad de Cristo."
        ], 
        correct: 0 
    },
    { 
        id: 28, 
        text: "¿Qué libro publica como respuesta al libro de Renán?", 
        options: ["Paladín de María.", "El Bien.", "Paladín de Cristo.", "Corte de Cristo.", "El triunfo de Cristo."], 
        correct: 2 
    },
    { 
        id: 29, 
        text: "¿Qué idea persigue José con la publicación del Paladín de Cristo?", 
        options: [
            "Encender en amor de María los corazones para hacerle reinar en ellos.",
            "Inculcar el amor de Cristo en los corazones para hacerle reinar en ellos.",
            "Encender en amor de Cristo las almas para hacerle reinar en ellas.",
            "Encender en amor de Cristo los corazones para hacerle reinar en ellos.",
            "Propagar el amor de Cristo en el mundo para hacerle reinar en la sociedad."
        ], 
        correct: 3 
    },
    { 
        id: 30, 
        text: "¿A qué se dedicaba la Academia y Corte de Cristo?", 
        options: [
            "Era una Asociación literario–religiosa que defendía la soberanía de Cristo y le alababa con la adoración eucarística.",
            "Era una Asociación religioso–literaria que defienda la divinidad de Cristo y le desagraviaba con la oración perpetua.",
            "Era una Congregación religioso–literaria que defienda la divinidad de Cristo y le asistía con la adoración eucarística.",
            "Era una Asociación religioso–literaria que defienda la divinidad de Cristo y le desagravie con la adoración eucarística.",
            "Era una Sociedad religioso–educativa que defendía la humanidad de Cristo y le desagravie con la adoración eucarística."
        ], 
        correct: 3 
    },
    { 
        id: 31, 
        text: "¿Por qué titula a su revista “El Bien”?", 
        options: [
            "Porque Cristo es el Bien personal, social, universal, inmenso, eterno e infinito.",
            "Porque Cristo es el Bien individual, social, universal, inmenso, eterno e infinito.",
            "Porque Cristo es el Bien individual, familiar, universal, inmenso, eterno e infinito.",
            "Porque Cristo es el Bien individual, social, eclesial, inmenso, eterno y divino.",
            "Porque Jesús es el Bien individual, social, universal, supremo, eterno e infinito."
        ], 
        correct: 1 
    },
    { 
        id: 32, 
        text: "¿Qué lema acompaña la publicación de la revista El Bien?", 
        options: ["Cristo Salvador.", "Hacer reinar a Cristo.", "Viva Cristo Rey.", "Cristo reina.", "Venga tu Reino."], 
        correct: 3 
    },
    { 
        id: 33, 
        text: "¿Cómo se llama la congregación dedicada a la enseñanza que fundó José Gras cuando era sacerdote?", 
        options: ["Hijas de María Inmaculada.", "Hijas del Sagrado Corazón.", "Hijas de Cristo Rey.", "Hijas de la Iglesia.", "Hijas de San José."], 
        correct: 2 
    },
    { 
        id: 34, 
        text: "¿En qué fecha funda el Instituto de las Hijas de Cristo Rey?", 
        options: ["El 26 de mayo de 1876.", "El 15 de diciembre de 1866.", "El 26 de mayo de 1875.", "El 16 de agosto de 1901.", "El 7 de julio de 1918."], 
        correct: 0 
    },
    { 
        id: 35, 
        text: "¿En qué medio de transporte bajaba de la Abadía al noviciado el Padre Gras?", 
        options: ["En caballo.", "En burra.", "A pie.", "En carruaje.", "En mula."], 
        correct: 1 
    },
    { 
        id: 36, 
        text: "¿Cuáles son los valores institucionales que se compromete a vivir el Colegio Cristo Rey Bogotá?", 
        options: [
            "Vida, amor, verdad, justicia y libertad.",
            "Fe, amor, verdad, justicia y paz.",
            "Vida, amor, bien, justicia y paz.",
            "Vida, caridad, verdad, justicia y paz.",
            "Vida, amor, verdad, justicia y paz."
        ], 
        correct: 4 
    },
    { 
        id: 37, 
        text: "¿Qué decreto recibe el Instituto de la Santa Sede en Roma el 15 de febrero de 1898?", 
        options: ["La Bula de Aprobación.", "El Decretum Laudis.", "El Decreto de Alabanza.", "El Breve Apostólico.", "La Bula Papal."], 
        correct: 1 
    },
    { 
        id: 38, 
        text: "¿En qué año se prueba definitivamente el Instituto de Hijas de Cristo Rey?", 
        options: ["El 26 de mayo de 1876.", "El 15 de febrero de 1898.", "El 16 de agosto de 1905.", "El 16 de agosto de 1901.", "El 7 de julio de 1918."], 
        correct: 3 
    },
    { 
        id: 39, 
        text: "¿A qué edad murió José Gras?", 
        options: ["80 años.", "85 años.", "74 años.", "84 años.", "90 años."], 
        correct: 3 
    },
    { 
        id: 40, 
        text: "En qué fecha murió José Gras?", 
        options: ["El 7 de julio de 1918.", "El 26 de mayo de 1918.", "El 16 de agosto de 1918.", "El 7 de junio de 1918.", "El 15 de febrero de 1918."], 
        correct: 0 
    },
    { 
        id: 41, 
        text: "¿En qué países de Latinoamérica se encuentran las Hijas de Cristo Rey?", 
        options: [
            "Colombia, Venezuela, Ecuador y Argentina.",
            "Colombia, Perú, Chile y Argentina.",
            "Colombia, Perú, Ecuador y Argentina.",
            "Colombia, Perú, Ecuador y Brasil.",
            "México, Perú, Ecuador y Argentina."
        ], 
        correct: 2 
    },
    { 
        id: 42, 
        text: "¿En qué año llegaron las Hijas de Cristo Rey a Colombia?", 
        options: ["En 1950.", "En 1960.", "En 1970.", "En 1965.", "En 1976."], 
        correct: 1 
    },
    { 
        id: 43, 
        text: "¿Cuál es la misión de las Hijas de Cristo Rey?", 
        options: ["“Evangelizar en las escuelas”.", "“Servir a los más necesitados”.", "“Hacer reinar a Cristo”.", "“Llevar a Cristo al mundo”.", "“Hacer reinar la paz”."], 
        correct: 2 
    },
    { 
        id: 44, 
        text: "¿Para qué se esforzó incansablemente y trabajó sin desmayos según el decreto con el que se declara venerable a José Gras?", 
        options: [
            "Para que Cristo gobernara en el corazón de todo hombre, en la familia y en la sociedad.",
            "Para que Cristo reinara en el corazón de todo hombre, en la familia y en la sociedad.",
            "Para que Cristo reinara en la mente de todo niño, en la escuela y en la sociedad.",
            "Para que el Reino de Dios estuviera en el corazón de todo hombre, en la familia y en la sociedad.",
            "Para que Cristo reinara en el corazón de los hombres, en las familias y en las naciones."
        ], 
        correct: 1 
    },
    { 
        id: 45, 
        text: "Actualmente dónde se encuentran los restos del Padre Gras? ¿En qué país, ciudad y casa?", 
        options: [
            "En España, Granada, Casa de San Gregorio (Albaycín).",
            "En España, Lérida, Casa de San Gregorio (Albaycín).",
            "En España, Granada, Casa de San José (Albaycín).",
            "En España, Granada, Abadía del Sacro Monte (Albaycín).",
            "En Italia, Roma, Casa de San Gregorio (Albaycín)."
        ], 
        correct: 0 
    },
    { 
        id: 46, 
        text: "¿Cuáles son las partes de la Eucaristía?", 
        options: [
            "A. Ritos iniciales. B. Liturgia de la Palabra. C. Consagración y Comunión. D. Ritos de despedida.",
            "A. Ritos de entrada. B. Liturgia de la Palabra. C. Liturgia de la Eucaristía. D. Ritos finales.",
            "A. Ritos iniciales. B. Liturgia de la Palabra. C. Liturgia de la Eucaristía. D. Ritos de despedida.",
            "A. Ritos iniciales. B. Proclamación de la Palabra. C. Liturgia de la Eucaristía. D. Ritos de envío.",
            "A. Ritos de apertura. B. Liturgia de la Palabra. C. Liturgia del Sacramento. D. Ritos de conclusión."
        ], 
        correct: 2 
    },
    { 
        id: 47, 
        text: "¿Cuáles son los valores según el pensamiento Educativo de José Gras?", 
        options: [
            "AMOR, VERDAD, BIEN, JUSTICIA y VIDA, así como la LIBERTAD, la FE y la PAZ",
            "AMOR, VERDAD, BIEN, FE y VIDA, así como la LIBERTAD, la JUSTICIA y la PAZ",
            "AMOR, PAZ, BIEN, FE y VIDA, así como la LIBERTAD, la JUSTICIA y la VERDAD",
            "CARIDAD, VERDAD, BIEN, FE y VIDA, así como la LIBERTAD, la JUSTICIA y la PAZ",
            "AMOR, VERDAD, REINO, FE y VIDA, así como la FRATERNIDAD, la JUSTICIA y la PAZ"
        ], 
        correct: 1 
    },
    { 
        id: 48, 
        text: "¿Qué es el PIFE?", 
        options: [
            "Proyecto internacional de formación evangélica.",
            "Proyecto institucional de formación evangélica.",
            "Plan institucional de formación evangélica.",
            "Proyecto institucional de educación evangélica.",
            "Programa institucional de formación evangélica."
        ], 
        correct: 1 
    },
    { 
        id: 49, 
        text: "“Cristo reina” es:", 
        options: [
            "Un llamado a transformar nuestra vida y el mundo.\nEs una profesión de fe, amor y dogma de salvación.\nEs una proclamación de la soberanía de Cristo sobre la humanidad y el cosmos.",
            "Un deber para transformar nuestra vida y la sociedad.\nEs una expresión de fe, amor y dogma de salvación.\nEs una proclamación de la soberanía de Cristo sobre la iglesia y el universo.",
            "Un llamado a transformar nuestra vida y la sociedad.\nEs una profesión de fe, amor y dogma de salvación.\nEs una proclamación de la soberanía de Cristo sobre la humanidad y el universo.",
            "Un llamado a cambiar nuestra vida y la sociedad.\nEs una profesión de fe, caridad y dogma de salvación.\nEs una declaración de la soberanía de Cristo sobre la humanidad y el universo.",
            "Un llamado a transformar nuestra vida y la sociedad.\nEs una profesión de fe, esperanza y camino de salvación.\nEs una proclamación del reinado de Cristo sobre la humanidad y el universo."
        ], 
        correct: 2 
    },
    { 
        id: 50, 
        text: "¿Cuáles son los apartados que comprende el Pensamiento Educativo del Venerable Padre José Gras?", 
        options: [
            "Educación, educador, estudiantes y padres de familia.",
            "Educación, escuela, educandos y padres de familia.",
            "Pedagogía, educador, educandos y padres de familia.",
            "Educación, educador, educandos y familia.",
            "Educación, educador, educandos y padres de familia."
        ], 
        correct: 4 
    }
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

    const fullName =
        document.getElementById("fullName").value;

    const userType =
        document.getElementById("userType").value;

    const job =
        document.getElementById("jobPosition").value;

    // Validación básica
    if (!fullName || !userType || !job) {
        alert("Completa todos los campos");
        return;
    }

    const currentUser = {
        name: fullName,
        userType: userType,
        job: job
    };

    // Guardar usuario
    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    document.getElementById("viewAccess")
        .classList.add("hidden");

    document.getElementById("viewQuiz")
        .classList.remove("hidden");

    shuffledQuestions = questions
        .sort(() => Math.random() - 0.5)
        .map(q => shuffleQuestionOptions(q));

    userAnswers = {};
    currentQuestionIndex = 0;
    timeElapsed = 0;

  document.getElementById("playerDisplay").textContent =
    currentUser.name;

document.getElementById("jobDisplay").textContent =
    currentUser.job;

document.getElementById("diplomaName").textContent =
    currentUser.name;

document.getElementById("diplomaMeta").textContent =
    `Rol: ${currentUser.role} | Cargo: ${currentUser.job}`;

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

    document.getElementById('diplomaMeta').textContent =
        `Rol: ${currentUser.userType} | Cargo: ${currentUser.job}`;

    document.getElementById('diplomaScore').textContent =
        `${score.percentage}% (Nota ${notaFinalFormateada})`;

   document.getElementById('diplomaTime').textContent =
    `Tiempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function navigateToView(viewId) {

    document.querySelectorAll(".view-card").forEach(view => {
        view.classList.add("hidden");
    });

    document.getElementById(viewId).classList.remove("hidden");
}

function fullApplicationReset() {
    location.reload();
}

window.initializeQuiz = initializeQuiz;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.finishQuiz = finishQuiz;

window.navigateToView = function(viewId) {

    document.querySelectorAll(".view-card")
        .forEach(view => {
            view.classList.add("hidden");
        });

    document.getElementById(viewId)
        .classList.remove("hidden");
};

window.fullApplicationReset = fullApplicationReset;
