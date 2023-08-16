/**
 * How to arrange scores?
 * number right x time? Lower is best?
 * Or arrange by score, then time?
 */

window.onload = () => {
    const items = { ...localStorage };
    console.log(items);
    let scoreArray = Object.entries(items);
    sortScores(scoreArray);
};

function sortScores(scoreArray) {
    let highScores = [];
    for (const entry of scoreArray) {
        let username = entry[0];
        let [score, time] = entry[1].split("_");
        let newEntry = [username, score, time];
        console.log("Entry: ", entry);
        if (highScores.length >= 1) {
            let addEnd = true;
            for (let existing of highScores) {
                console.log("Existing: ", existing);
                if (score > existing[1]) {
                    console.log("Compare score: ", score, existing[1]);
                    console.log("Index: ", highScores.indexOf(existing));
                    highScores.splice(highScores.indexOf(existing), 0, newEntry);
                    addEnd = false;
                    console.log("Add above: ", newEntry);
                    break;
                } else if (score == existing[1] && time < existing[2]) {
                    console.log("Compare time: ", time, existing[2]);
                    highScores.splice(highScores.indexOf(existing), 0, newEntry);
                    addEnd = false;
                    console.log("Add above: ", newEntry);
                    break;
                }
            }
            if (addEnd) {
                console.log("Add end: ", newEntry);
                highScores.push(newEntry);
            }
        } else {
            highScores.push(newEntry);
            console.log("Add first: ", newEntry);
        }
    }
    console.log(highScores);
    printScores(highScores);
}

function printScores(highScores) {
    for (let i = 0; i < 10; i++) {
        let listItem = document.createElement("li");
        listItem.innerHTML = `User: ${highScores[i][0]} | Score: ${highScores[i][1]} | Time: ${highScores[i][2]}s`;
        document.getElementById("score-list").appendChild(listItem);
    }
}