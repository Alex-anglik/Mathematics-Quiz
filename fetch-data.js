const resultDiv = document.getElementById('result');
const loginDiv = document.getElementById('log');
const submitBtn = document.getElementById("submit-btn");

let fetchedData;
/*fetch('http://localhost:63342/data')
    .then(response => response.json())
    .then(data => {resultDiv.textContent = JSON.stringify(data); fetchedData = data;})
    .catch(error => console.error(error));*/
 fetch('http://localhost:63342/questions')
    .then(response => response.json())
    .then(questions => {resultDiv.textContent = JSON.stringify(questions); fetchedData = questions; console.log(fetchedData);})
    .catch(error => console.error(error));
console.log(fetchedData);
submitBtn.addEventListener("click", () => {
   /* fetch("http://localhost:63342/login", {
        method: "POST",
        body: JSON.stringify(fetchedData)}
    )
        .then(response => response.text())
        .then(text => loginDiv.textContent = text)
        .catch(error => console.error(error));*/
        fetch('http://localhost:63342/questions')
            .then(response => response.json())
            .then(questions => {resultDiv.textContent = JSON.stringify(questions); fetchedData = questions;})
            .catch(error => console.error(error));  
});
