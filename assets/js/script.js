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

function getUsername() {
    // Display username
    gameVars.username = document.getElementById("username").value;
    document.getElementById("username-input").style.display = "none";
    document.getElementById("greeting").innerHTML = gameVars.username;
    document.getElementById("welcome").style.display = "block";
    // Add event listener to start game
    startBtn.addEventListener("click", startGame);
}

function endGame() {
    // Set gameOver variable to true to stop timer
    gameVars.gameOver = true;
    // Set localStorage key-value pair with user's game details
    localStorage.setItem(gameVars.username, `${gameVars.score}_${gameVars.time}`);
    document.getElementById("quiz-display").style.display = "none";
    document.getElementById("end-display").style.display = "block";
    document.getElementById("end-score").innerHTML = gameVars.score;
    document.getElementById("end-time").innerHTML = gameVars.time;
    document.getElementById("restart").addEventListener("click", restartGame);
}

function saveScore() {


    localStorage.setItem(gameVars.username, `${gameVars.score}_${gameVars.time}`);

}

function restartGame() {
    document.getElementById("end-display").style.display = "none";
    gameVars.time = 0;
    gameVars.score = 0;
    gameVars.questionNum = 0;
    gameVars.gameOver = false;
    startGame();
}

function startGame() {
    // Hide welcome and show quiz display
    document.getElementById("welcome").style.display = "none";
    document.getElementById("quiz-display").style.display = "block";

    // Call first question
    getQuestion();
    // Start timer
    timer();
}

window.onload = () => {
    // Attach username event listener on window load
    usernameBtn.addEventListener("click", getUsername);
};