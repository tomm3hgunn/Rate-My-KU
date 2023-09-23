// contentScript.js
export const showData = () => {
  // Function to fetch professor data
  function fetchProfessorData(professorName, element) {
    fetch(
      `https://ratemyprofessorapi.onrender.com/get_professor_data?name=${professorName}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Create a new element to display the rating
        console.log('Data fetched');
        console.log(data);
        const ratingElement = document.createElement('span');
        ratingElement.className = 'professor-rating';
        ratingElement.textContent = `Rating: ${data.data.averageRating}, Difficulty: ${data.data.averageDifficulty}`;

        // Append the rating element next to the professor name
        if (element.parentElement) {
          element.parentElement.appendChild(ratingElement);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch data', error);
      });
  }
  // Function to execute when the "Search" button is clicked
  function showProfessorData() {
    // Find all professor names by title attribute
    const professorElements = document.querySelectorAll(
      'a[title="Click here to get instructor info"]'
    );
    const firstFiveProfessors = Array.from(professorElements).slice(0, 5); // Select only the first 5 for testing
    // professorElements.forEach((element) => {
    firstFiveProfessors.forEach((element) => {
      const professorName = element.textContent;
      if (professorName) {
        console.log(`Fetching data for ${professorName}`);
        fetchProfessorData(professorName, element);
      }
    });
  }

  // Add event listener to the "Search" button
  const searchButton = document.querySelector(
    '.btn.btn-primary.classSearchButton.classes_searchBarItem'
  );
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      console.log('Search button clicked');
      // Wait for a short delay to allow the search results to load
      setTimeout(showProfessorData, 2000);
    });
  }
};
