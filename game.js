

const question= document.getElementById('question');
const answers= Array.from(document.getElementsByClassName('choice-text'));

/*HUD*/
const progressText= document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let score = 0;
let acceptingAnswers= false;
let questionCounter = 0;
let availableQuestions = [];

/*questions*/
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
//Value of selected topic fetched from local storage
const selectedTopic = localStorage.getItem('selectedTopic');

startGame  = () => {
    questionCounter= 0;
    score= 0;

  //Request from server with URL ending on /questions so "getQuestionData" is carried out
  let fetchedData = fetch('http://localhost:63342/questions')
    .then(response => response.json())
    .then(data => {return data})
    .catch(error => console.error(error))
    fetchedData.then(value => {
      //if a topic is selected this part filters the dictionary so that only the questions with the selected topic are left in the dictionary
      const selectedTopic = localStorage.getItem('selectedTopic');
      const filteredData = selectedTopic ? Object.values(value).filter(q => q.topic === selectedTopic) : Object.values(value);
      const indexedData = filteredData.reduce((obj, question, index) => {
        const key = `question${index + 1}`;
        obj[key] = question;
        return obj;
      }, {});
      console.log(indexedData);
      //The function "getNewQuestion" is called with the filtered list as an argument
      getNewQuestion(indexedData);
    });
};

getNewQuestion = (questionsDict) => {
  if (Object.keys(questionsDict).length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    // go to the end page if finished
    return window.location.assign('/end.html');
  }
  questionCounter++;
  progressText.innerText = 'Question ' + questionCounter + '/' + MAX_QUESTIONS;
  // update progress bar
  progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + '%';

  const questionNumbers = Object.keys(questionsDict);
  //random number in ragne of number of questions
  const questionIndex = Math.floor(Math.random() * questionNumbers.length);
  const questionNumber = questionNumbers[questionIndex];
  // selects a question at index of random number so questions is random on that topic
  currentQuestion = questionsDict[questionNumber];
  question.innerText = currentQuestion.question;
  answers.forEach((answer) => {
    const number = answer.dataset['number'];
    answer.innerText = currentQuestion['answer' + number];
  });
  console.log(questionsDict);
  //remove questions that was just done so it is not done again
  delete questionsDict[questionNumber];
  acceptingAnswers = true;

  answers.forEach((answer) => {
    answer.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      console.log(selectedAnswer);
      console.log(currentQuestion.answer);
      //style is chosen based on if the answer is correct or not
      const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
      //box turns green if the answer is correct 
      //red if the answer is incorrect

      //if the answer is correct increment the score
      if (classToApply == 'correct') {
        incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        // small pause between answer result and next question
        //remove green or red color from box
        selectedChoice.parentElement.classList.remove(classToApply);
        
        getNewQuestion(questionsDict);
      }, 1000);
    });
  });
};


incrementScore = num => {
  //increment score by num
  score += num;
  scoreText.innerText = score;
};
startGame();

