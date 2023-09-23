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
        const ratingElement = document.createElement('span');
        ratingElement.className = 'professor-rating';

        // Check status; if "error," then set text to N/A
        if (data.status === 'error') {
          ratingElement.textContent = 'Rating: N/A, Difficulty: N/A';
        } else {
          ratingElement.textContent = `Rating: ${data.data.averageRating}, Difficulty: ${data.data.averageDifficulty}`;
        }

        // Append the rating element next to the professor name
        if (element.parentElement) {
          element.parentElement.appendChild(ratingElement);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch data', error);
      });
  }

  function showProfessorData() {
    // Find all professor names by title attribute
    const professorElements = document.querySelectorAll(
      'a[title="Click here to get instructor info"]'
    );
    // const firstFiveProfessors = Array.from(professorElements).slice(0, 5); // Select only the first 5

    professorElements.forEach((element, index) => {
      // Check if the parent <tr> contains "LEC"
      const parentRow = element.closest('tr');
      if (parentRow) {
        const sectionTypeCell = parentRow.querySelector('td:first-child');
        if (sectionTypeCell && sectionTypeCell.textContent.includes('LEC')) {
          // Add delay to avoid rate limiting
          setTimeout(() => {
            const professorName = element.textContent;
            if (professorName) {
              console.log(`Fetching data for ${professorName}`);
              fetchProfessorData(professorName, element);
            }
          }, index * 1000); // ! Remove index for instant results
        }
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
