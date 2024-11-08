let lives = 3;
let stage = 1;
const totalStages = 5;

// Array de perguntas, respostas e explicações
const questions = [
    {
        question: "Qual é a média de 10, 20, e 30?",
        answer: "20",
        explanation: "Para calcular a média, somamos os valores e dividimos pelo número de valores: (10 + 20 + 30) / 3 = 60 / 3 = 20."
    },
    {
        question: "Qual é a variância de 5, 10, e 15?",
        answer: "25",
        explanation: "Para calcular a variância, primeiro calculamos a média: (5 + 10 + 15) / 3 = 10. Depois, somamos os quadrados das diferenças de cada valor para a média e dividimos pelo número de valores: ((5-10)^2 + (10-10)^2 + (15-10)^2) / 3 = 25."
    },
    {
        question: "Se X e Y são positivamente correlacionados, o que isso significa?",
        answer: "crescem juntos",
        explanation: "Correlação positiva significa que, conforme X aumenta, Y também tende a aumentar, indicando uma relação direta entre eles."
    },
    {
        question: "Qual a equação de uma regressão linear simples?",
        answer: "y = a + bx",
        explanation: "Em uma regressão linear simples, y = a + bx, onde 'a' é o intercepto e 'b' é o coeficiente angular (a inclinação da linha). Isso indica que y depende linearmente de x."
    },
    {
        question: "Como calcular a média em R?",
        answer: "mean()",
        explanation: "Em R, a função mean() calcula a média de um vetor de valores. Exemplo: mean(c(10, 20, 30)) retorna 20."
    }
];
// Exibe a pergunta da fase atual
function displayQuestion() {
    if (stage > totalStages) {
        document.getElementById('result').innerHTML = "<p class='success'>Parabéns, você completou o jogo!</p>";
        return;
    }
    document.getElementById('question-text').innerText = questions[stage - 1].question;
}

// Atualiza a barra de vida do gatinho
function updateHP() {
    const hpBar = document.getElementById("hp-bar");
    hpBar.style.width = `${(lives / 3) * 100}%`;
}

// Exibe mensagem temporária em cima do gatinho
function showCatMessage(message, isSuccess) {
    const messageText = document.getElementById("message-text");
    messageText.textContent = message;
    messageText.style.color = isSuccess ? "#5cb85c" : "#d9534f";
    
    // Remove a mensagem após 1.5 segundos
    setTimeout(() => { messageText.textContent = ""; }, 1500);
}

// Verifica a resposta do jogador
function submitAnswer() {
    const answer = document.getElementById('answer').value.trim();
    const currentQuestion = questions[stage - 1];
    
    if (answer === currentQuestion.answer) {
        // Resposta correta: avança para a próxima fase
        showCatMessage("Boa! Você acertou!", true);
        stage++;
        document.getElementById('stage').innerText = stage;
        document.getElementById('result').innerHTML = "<p class='success'>Resposta correta! Vamos para a próxima fase.</p>";
        displayQuestion();
    } else {
        // Resposta incorreta: exibe a explicação, perde uma vida
        lives--;
        updateHP();
        showCatMessage("Ops! Resposta incorreta.", false);
        document.getElementById('lives').innerText = lives;
        document.getElementById('result').innerHTML = `
            <p class='error'>Resposta incorreta.</p>
            <p>Resposta correta: ${currentQuestion.answer}</p>
            <p>Explicação: ${currentQuestion.explanation}</p>
        `;
        
        if (lives === 0) {
            // Game Over: reinicia o jogo
            document.getElementById('result').innerHTML += "<p class='error'>Game Over! Tente novamente desde o início.</p>";
            stage = 1;
            lives = 3;
            updateHP(); // Restaura a barra de vida
            document.getElementById('stage').innerText = stage;
            document.getElementById('lives').innerText = lives;
            displayQuestion();
        }
    }
    document.getElementById('answer').value = '';  // Limpa o campo de resposta
}

// Inicializa o jogo
displayQuestion();
