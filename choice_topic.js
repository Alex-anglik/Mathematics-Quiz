
const sqlite3 = require('sqlite3').verbose();


function getDistinctTopics() {
  const db = new sqlite3.Database('quiz.db');
  return new Promise((resolve, reject) => {
    db.all("SELECT DISTINCT topic FROM questions", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const topics = rows.map((row) => row.topic);
        const topicDict = {};
        for (let i = 0; i < topics.length; i++) {
          const key = `topic${i+1}`;
          topicDict[key] = topics[i];
        }
        resolve(topicDict);
      }
    });
  });
}
getDistinctTopics().then(value =>{
  console.log(value);
});
//getDistinctTopics();

module.exports = getDistinctTopics;
