/**
 * How to arrange scores?
 * number right x time? Lower is best?
 * Or arrange by score, then time?
 */

window.onload = () => {
    const items = { ...localStorage };
    console.log(items);
    console.log(items.length);
    let scoreArray = Object.entries(items);
    console.log(scoreArray);
    console.log(scoreArray.length);
    sortScores(scoreArray);
};

function sortScores(scoreArray) {
    let highScores = [];
    for (const entry of scoreArray) {
        let username = entry[0];
        let [score, time] = entry[1].split("_");
        let newEntry = [username, score, time]
        console.log(username, score, time);
        if (highScores.length >= 1) {
            for (let existing of highScores) {
                if (parseInt(score) > parseInt(existing[1])) {
                    console.log(score, existing[1])
                    highScores.splice(highScores.indexOf(existing), 0, newEntry)
                } else if (parseInt(score) == parseInt(existing[1]) && parseInt(time) > parseInt(existing[2])) {
                    console.log(time, existing[2])
                    highScores.splice(highScores.indexOf(existing), 0, newEntry)
                } else {
                    highScores.push(newEntry)
                }
            }            
        } else {
            highScores.push(newEntry)
        }
    }
    printScores(highScores)
}

function printScores(highScores) {
    
}