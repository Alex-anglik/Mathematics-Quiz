function fetchUserData() {
    return new Promise((resolve, reject) => {
      // Connect to the database
      const sqlite3 = require('sqlite3').verbose();
      const db = new sqlite3.Database('quiz.db');
  
      // Execute the query to fetch the user data
      const sql = `SELECT * FROM users`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const userData = {};
  
          // Create a dictionary of dictionaries with keys "user1", "user2", etc.
          rows.forEach((rowData, index) => {
            const userKey = `user${index + 1}`;
            userData[userKey] = rowData;
          });
  
          resolve(userData);
        }
  
        db.close();
      });
    });
  }

fetchUserData().then(userData=> {
    console.log(userData);
}).catch(error => console.error(error));  

module.exports = fetchUserData;