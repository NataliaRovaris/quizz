// Declaração variáveis
const question = document.querySelector("#question");
const answerBox = document.querySelector("#answer-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

// Substituição do quizz para a primeira pergunta
function init() {
    console.log("iniciou");
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
    // Limpar a questão anterior
    const oldButtons = answerBox.querySelectorAll("button");
    
    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Alterar texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

        //Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir a alternativa na tela
        answerBox.appendChild(answerTemplate);

        // Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    // Incrementar o numero da questão
    actualQuestion++;
}

// Verificando resposta do usuário
function checkAnswer(btn) {

    // Seleciona todos os botões
    const buttons = answerBox.querySelectorAll("button");

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            // checa se o usuário acertou a pergunta
            if(btn === button) {
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        }
    });

    // Exibir próxima pergunta
    nextQuestion();
}

// Exibe a próxima pergunta
function nextQuestion() {
    // timer para usuário ver as respostas
    setTimeout(function() {
        // verifica se ainda tem perguntas
        if(actualQuestion >= questions.length) {
            // apresenta a mensagem de sucesso
            showSucessMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 700);
}

// Exibe a tela final
function showSucessMessage() {

    // Mostra ou esconde o quizz
    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answer");
    correctAnswers.textContent = points;

    // alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// Mostra ou esconde o quizz
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar quizz
const restarBtn = document.querySelector("#restart");

restarBtn.addEventListener("click", function() {
    // zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
});

// Inicialização do quizz
init();