const usernameInput = document.getElementById('username');


function displayUserData(userData) {
    const username = usernameInput.value;
    const tableBody = document.getElementById('user-data');
  
    // clear the table body
    tableBody.innerHTML = '';
  
    // Filter the userData by username
    const filteredData = Object.values(userData).filter(data => data.username === username);
  
    // if no data was found, display a message indicating no data found
    if (filteredData.length === 0) {
      const row = tableBody.insertRow();
      const cell = row.insertCell();
      cell.textContent = 'No data found for the specified username.';
      return;
    }
  
    // create the table rows and cells for the user data
    filteredData.forEach((rowData, index) => {
      const row = tableBody.insertRow();
      const usernameCell = row.insertCell();
      const gradeCell = row.insertCell();
      const topicCell = row.insertCell();
  
      usernameCell.textContent = rowData.username;
      gradeCell.textContent = rowData.grade;
      topicCell.textContent = rowData.topics;
    });
  };

start = () => {
let fetchedData = fetch('http://localhost:63342/history')
  .then(response => response.json())
  .then(data => {return data})
  .catch(error => console.error(error))
fetchedData.then(data =>{
    console.log(data);
    displayUserData(data);
});
};
