const usernameInput = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;

usernameInput.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !usernameInput.value;
});

saveHighScore = e => {
    e.preventDefault();
    const username = usernameInput.value;

    // Calculate the percentage of questions correctly answered
    const percentCorrect = Math.round((mostRecentScore / availableQuestions.length) * 100);

    // Calculate the grade based on the percentage of questions correctly answered
    let grade;
    if (percentCorrect < 50) {
        grade = 'D';
    } else if (percentCorrect < 60) {
        grade = 'C';
    } else if (percentCorrect < 70) {
        grade = 'B';
    } else if (percentCorrect < 80) {
        grade = 'A';
    } else {
        grade = 'A*';
    }

    // Add the user data to the database
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('quiz.db');

    db.run('INSERT INTO users (username, grade, topic) VALUES (?, ?, ?)',
        [username, grade, selectedTopic],
        function(err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Row inserted with rowid ${this.lastID}`);
            }
        });

    db.close();

    // Redirect to the try.html page
    window.location.assign('/try.html');
};

