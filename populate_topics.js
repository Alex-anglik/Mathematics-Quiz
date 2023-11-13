
let fetchedData = fetch('http://localhost:63342/topics')
  .then(response => response.json())
  .then(data => {return data})
  .catch(error => console.error(error))
fetchedData.then(value=> {console.log(value); populateDropdown(value);});


function populateDropdown(topicsDict) {
    const dropdown = document.getElementById('topic-dropdown');
    const selectedTopic = localStorage.getItem('selectedTopic');
  
    for (let key in topicsDict) {
      const topic = topicsDict[key];
      const option = document.createElement('option');
      option.textContent = topic;
      option.value = topic;
  
      // Set the selected option if it matches the stored value
      if (topic === selectedTopic) {
        option.selected = true;
      }
  
      dropdown.appendChild(option);
    }
  
    // Save the selected topic when the dropdown changes
    dropdown.addEventListener('change', (event) => {
      const topic = event.target.value;
      localStorage.setItem('selectedTopic', topic);
      console.log(topic);
    });
  }
  
  