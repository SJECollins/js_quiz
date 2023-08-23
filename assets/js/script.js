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
    existingNames: [],
};


function getQuestion() {
    // Get a question from our question array
    let que = questionArray[gameVars.questionNum];

    // Add the question to the page
    document.getElementById("question").innerHTML = que.que;
    // Iterate through answer array
    for (let i = 0; i < que.ansArr.length; i++) {
        // Create button element
        let ansBtn = document.createElement("button");
        // Add the answer text to button
        ansBtn.innerHTML = que.ansArr[i];
        // Check if index is "correct"
        if (i == que.correct) {
            // Add "corrrect" class to button
            ansBtn.classList.add("correct");
            // Save the correct answer text to game variables
            gameVars.correctAns = ansBtn.innerHTML;
        }
        // Add event listeners for checkAnswer function
        ansBtn.addEventListener("click", checkAnswer);
        // Append buttons to page
        document.getElementById("answers").appendChild(ansBtn);
    }
}

function checkAnswer(event) {
    // Check if user clicked button with class of "correct"
    if (event.target.classList.contains("correct")) {
        // Increment score
        gameVars.score++;
    }
    // Update innerHTML of answers div to display correct answer
    document.getElementById("answers").innerHTML = `The correct answer was: ${gameVars.correctAns}`;
    // Update score display
    document.getElementById("score").innerHTML = gameVars.score;
    // Increment question number
    gameVars.questionNum++;

    setTimeout(() => {
        document.getElementById("answers").innerHTML = "";
        if (gameVars.questionNum < 3) {
            getQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function timer() {
    // Simple timer function in increment time and update display
    let startTime = setInterval(() => {
        gameVars.time++;
        document.getElementById("time").innerHTML = gameVars.time;
        if (gameVars.gameOver) {
            clearInterval(startTime);
        }
    }, 1000);
}

function endGame() {
    // Set gameOver variable to true to stop timer
    gameVars.gameOver = true;
    document.getElementById("quiz-display").style.display = "none";
    document.getElementById("end-display").style.display = "block";
    document.getElementById("end-score").innerHTML = gameVars.score;
    document.getElementById("end-time").innerHTML = gameVars.time;
    document.getElementById("save-score").addEventListener("click", displayNameInput);
    document.getElementById("restart").addEventListener("click", restartGame);
}

function displayNameInput() {
    usernameBtn.addEventListener("click", takeName);
    document.getElementById("username-input").style.display = "block";
}

function takeName() {
    gameVars.username = document.getElementById("username").value;

    if (gameVars.username in localStorage) {
        document.getElementById("warning").innerHTML = `The username ${gameVars.username} already exists!`;
    } else {
        saveScore();
    }
}

function saveScore() {
    document.getElementById("username-input").style.display = "none";
    document.getElementById("save-score").style.display = "none";
    document.getElementById("saved").style.display = "block";
    localStorage.setItem(gameVars.username, `${gameVars.score}_${gameVars.time}`);
}

function restartGame() {
    location.reload();
}

function startGame() {
    // Show quiz display
    document.getElementById("quiz-display").style.display = "block";
    document.getElementById("welcome").style.display = "none";
    console.log("Game started");
    // Call first question
    getQuestion();
    // Start timer
    timer();
}

window.onload = () => {
    // Attach username event listener on window load
    startBtn.addEventListener("click", startGame);
};