const sqlite3 = require('sqlite3').verbose();

function getQuestionData() {
  const db = new sqlite3.Database('./quiz.db');

  return new Promise((resolve, reject) => {
    const query = `SELECT question, answer1, answer2, answer3, answer4, difficulty, topic, tags, source, image_path, ID, ANSWER FROM questions`;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        let questionData = {};
        for (let [index, row] of rows.entries()) {
          questionData[`question_${index}`] = {
            question: row.question,
            answer1: row.answer1,
            answer2: row.answer2,
            answer3: row.answer3,
            answer4: row.answer4,
            difficulty: row.difficulty,
            topic: row.topic,
            tags: row.tags,
            source: row.source,
            image_path: row.image_path,
            ID: row.ID,
            answer: row.answer
          };
}
        resolve(questionData);
      }
    });

    db.close();
  });
}


let data;

getQuestionData().then(questionData => {
  data = questionData;
  console.log(data);
}).catch(err => {
  console.error(err);
});

// You can now use `data` variable outside the function
console.log(data);

module.exports = getQuestionData;
