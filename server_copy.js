const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const getQuestionData = require('./fetch_questions.js');
const getDistinctTopics = require('./choice_topic.js');
const fetchUserData = require('./fetch_user_data.js');
//const data = getQuestionData();



const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', '*');

    if (req.method === 'GET' && req.url === '/data') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    else if (req.method === 'GET' && req.url === '/questions') {
        getQuestionData().then(questionData => {
            console.log(questionData);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(questionData));
        }).catch(err => {
            console.error(err);
        });
       
    }
    else if (req.method === 'GET' && req.url === '/topics'){
        getDistinctTopics().then(topics => {
            console.log(topics);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(topics));
        }).catch(err => {
            console.error(err);
        });
    }

    else if (req.method === 'GET' && req.url === '/history') {
        fetchUserData().then(UserData => {
                console.log(UserData);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(UserData));
            }).catch(err => {
                console.error(err);
            });
    }

    else {
        res.statusCode = 404;
        res.end();
    }

});


server.listen(63342, () => {
    console.log('Server running on port 63342');
});
