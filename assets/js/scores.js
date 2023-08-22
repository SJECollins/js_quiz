// Get our scores from localStorage
window.onload = () => {
    // Use Object.entries to iterate through and create array from key-value pairs
    let scoreArray = Object.entries(localStorage);
    sortScores(scoreArray);
    // Also attach the eventlistener for the clear scores button
    document.getElementById("clear-scores").addEventListener("click", clearScores);
};

// Sort the scores
function sortScores(scoreArray) {
    // Empty high score array
    let highScores = [];
    for (const entry of scoreArray) {
        // Create newEntry for highScores array from entry in scoreArray
        let username = entry[0];
        let [score, time] = entry[1].split("_");
        let newEntry = [username, score, time];
        if (highScores.length >= 1) {
            let addEnd = true;
            // Check newEntry against existing entries in highScores to find place
            for (let existing of highScores) {
                if (score > existing[1]) {
                    highScores.splice(highScores.indexOf(existing), 0, newEntry);
                    addEnd = false;
                    break;
                } else if (score == existing[1] && time < existing[2]) {
                    highScores.splice(highScores.indexOf(existing), 0, newEntry);
                    addEnd = false;
                    break;
                }
            }
            if (addEnd) {
                highScores.push(newEntry);
            }
        } else {
            highScores.push(newEntry);
        }
    }
    printScores(highScores);
}

// Append our sorted highScores to our page
function printScores(highScores) {
    // If length of highScore is greater than 10, slice it
    if (highScores.length >= 10) {
        highScores = highScores.slice(0, 10);
    }
    // Iterate through length of highScores and append to page
    for (let i = 0; i < highScores.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerHTML = `User: ${highScores[i][0]} | Score: ${highScores[i][1]} | Time: ${highScores[i][2]}s`;
        document.getElementById("score-list").appendChild(listItem);
    }
}

// Clear our high scores
function clearScores() {
    // Clear local storage
    localStorage.clear();
    // Reload the page
    location.reload();
}