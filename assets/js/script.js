const usernameBtn = document.getElementById("username-button");
const startBtn = document.getElementById("start-quiz");

let gameVars = {
    username: "Anonymous",
    time: 0,
    questionNum: 0,
    currentQue: "",
    correctAns: "",
    ansArray: []
};

function getQuestion() {
    let que = questionArray[gameVars.questionNum];
    console.log(que);
    console.log(que.ansArr);
    console.log(que.ansArr.length);

    document.getElementById("question").innerHTML = que.que;
    for (let i = 0; i < que.ansArr.length; i++) {
        let ansBtn = document.createElement("button");
        ansBtn.innerHTML = que.ansArr[i];
        if (i == que.correct) {
            ansBtn.classList.add("correct");
        }
        document.getElementById("answers").appendChild(ansBtn);
    }
}

function getUsername() {
    gameVars.username = document.getElementById("username").value;
    console.log(gameVars.username);
    document.getElementById("username-input").style.display = "none";
    document.getElementById("greeting").innerHTML = gameVars.username;
    document.getElementById("welcome").style.display = "block";
    startBtn.addEventListener("click", startGame);
}

function startGame() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("quiz-display").style.display = "block";

    getQuestion();

}

window.onload = () => {
    usernameBtn.addEventListener("click", getUsername);
};