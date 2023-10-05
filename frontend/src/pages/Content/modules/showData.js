/**
 * Prologue Comments
 *
 * Name of code artifact: Content Script for RateMyKU Extension
 * Brief description: This script fetches and displays professor ratings on the KU classes website.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 09/22/23
 * Brief description of each revision & author:
 *    - Added doc-strings and comments. (Thomas Nguyen @ 09/26/23)
 * Pre-conditions:
 *    - The script must be injected into the KU classes website.
 * Post-conditions:
 *    - Professor ratings are displayed next to professor names.
 * Error and exception condition values:
 *    - Console errors if the fetch request fails.
 * Side effects:
 *    - Modifies the DOM to include professor ratings.
 * Invariants: None
 * Any known faults: None
 */

// Export the main function to show professor data
export const showData = () => {
  /**
   * Fetches professor data from the API and appends it to the DOM.
   * @param {string} professorName - The name of the professor.
   * @param {Element} element - The DOM element to append the rating to.
   */
  function fetchProfessorData(professorName, element) {
    // Fetch data from the API
    fetch(
      `https://ratemyprofessorapi.onrender.com/get_professor_data?name=${professorName}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Create a new span element to display the rating
        const ratingElement = document.createElement('span');
        ratingElement.className = 'professor-rating';

        // Create tooltip element
        const tooltipElement = document.createElement('span');
        tooltipElement.className = 'tooltip-content';

        // Check if the API returned an error
        if (data.status === 'error') {
          ratingElement.textContent = 'Rating: N/A, Difficulty: N/A';
          tooltipElement.textContent = 'No additional data available';
        } else {
          ratingElement.innerHTML = `<a href="${data.data.url}" target="_blank">Rating: ${data.data.averageRating}, Difficulty: ${data.data.averageDifficulty}</a>`;
          // const logoSrc = chrome.runtime.getURL('src/assets/img/RateMyKU_Logo.png');
          tooltipElement.innerHTML = `       
          <strong style="color: #ffffff !important;">${data.data.lastName}, ${data.data.firstName}</strong><br/>
          <strong style="color: #ffffff !important;">Difficulty:</strong> <span style="color: #ffffff !important;">${data.data.averageDifficulty} / 5</span><br/>
          <strong style="color: #ffffff !important;">Rating:</strong> <span style="color: #ffffff !important;">${data.data.averageRating} / 5</span><br/>
          <strong style="color: #ffffff !important;">Department:</strong> <span style="color: #ffffff !important;">${data.data.department}</span><br/>
          <strong style="color: #ffffff !important;">Would Take Again:</strong> <span style="color: #ffffff !important;">${parseFloat(data.data.wouldTakeAgainPercentage).toFixed(2)}%</span><br/>
          <strong style="color: #ffffff !important;">Total Ratings:</strong> <span style="color: #ffffff !important;">${data.data.numberOfRatings}</span>`;
        }

        // Append the tooltip to the rating element
        ratingElement.appendChild(tooltipElement);

        // Append the rating next to the professor name
        if (element.parentElement) {
          element.parentElement.appendChild(ratingElement);
        }
      })
      .catch((error) => {
        // Log any errors
        console.error('Failed to fetch data', error);
      });
  }

  /**
   * Finds all professor names on the page and fetches their data.
   */
  function showProfessorData() {
    // Query all elements that contain professor names
    const professorElements = document.querySelectorAll(
      'a[title="Click here to get instructor info"]'
    );

    // Loop through each professor name element
    professorElements.forEach((element, index) => {
      // Check if the parent <tr> contains "LEC"
      const parentRow = element.closest('tr');
      if (parentRow) {
        const sectionTypeCell = parentRow.querySelector('td:first-child');
        if (sectionTypeCell && sectionTypeCell.textContent.includes('LEC')) {
          // Add a delay to avoid rate limiting
          setTimeout(() => {
            const professorName = element.textContent;
            if (professorName) {
              console.log(`Fetching data for ${professorName}`);
              fetchProfessorData(professorName, element);
            }
          }, 1000); // Delay of 1 second
        }
      }
    });
  }

  // Attach an event listener to the "Search" button
  const searchButton = document.querySelector(
    '.btn.btn-primary.classSearchButton.classes_searchBarItem'
  );
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      console.log('Search button clicked');
      // Add a delay to allow search results to load
      setTimeout(showProfessorData, 2000);
    });
  }

  // Attach an event listener to the search input field
  const searchInput = document.getElementById('classesSearchText');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (event) {
      console.log('Search input keydown');
      if (event.key === 'Enter') {
        // Add a delay to allow search results to load
        setTimeout(showProfessorData, 2000);
      }
    });
  }
};
