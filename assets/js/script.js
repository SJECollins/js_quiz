const usernameBtn = document.getElementById("username-button");
const startBtn = document.getElementById("start-quiz");

let gameVars = {
    username: "Anonymous",
    time: 0,
    questionNum: 0,
    score: 0,
    currentQue: "",
    correctAns: "",
    ansArray: [],
    gameOver: false,
};

function getQuestion() {
    let que = questionArray[gameVars.questionNum];

    document.getElementById("question").innerHTML = que.que;
    for (let i = 0; i < que.ansArr.length; i++) {
        let ansBtn = document.createElement("button");
        ansBtn.innerHTML = que.ansArr[i];
        if (i == que.correct) {
            ansBtn.classList.add("correct");
            gameVars.correctAns = ansBtn.innerHTML;
        }
        ansBtn.addEventListener("click", checkAnswer);
        document.getElementById("answers").appendChild(ansBtn);
    }
}

function checkAnswer(event) {
    if (event.target.classList.contains("correct")) {
        gameVars.score++;
    }
    document.getElementById("answers").innerHTML = `The correct answer was: ${gameVars.correctAns}`;
    document.getElementById("score").innerHTML = gameVars.score;
    gameVars.questionNum++;
    if (gameVars.questionNum < 3) {
        setTimeout(() => {
            document.getElementById("answers").innerHTML = "";
            getQuestion();
        }, 500);
    } else {
        endGame();
    }
}

function timer() {
    let startTime = setInterval(() => {
        gameVars.time++;
        document.getElementById("time").innerHTML = gameVars.time;
        if (gameVars.gameOver) {
            clearInterval(startTime);
        }
    }, 1000);
}

function getUsername() {
    gameVars.username = document.getElementById("username").value;
    document.getElementById("username-input").style.display = "none";
    document.getElementById("greeting").innerHTML = gameVars.username;
    document.getElementById("welcome").style.display = "block";
    startBtn.addEventListener("click", startGame);
}

function endGame() {
    gameVars.gameOver = true;
    localStorage.setItem(gameVars.username, `${gameVars.score}_${gameVars.time}`);
}

function restartGame() {
    gameVars.time = 0;
    gameVars.score = 0;
    gameVars.questionNum = 0;
    startGame();
}

function startGame() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("quiz-display").style.display = "block";

    getQuestion();
    timer();
}

window.onload = () => {
    usernameBtn.addEventListener("click", getUsername);
};