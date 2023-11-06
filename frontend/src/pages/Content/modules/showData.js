/**
 * Prologue Comments
 *
 * Name of code artifact: Content Script for RateMyKU Extension
 * Brief description: This script fetches and displays professor ratings on the KU classes website.
 * Programmer's name: Thomas Nguyen - Wyatt Parsons
 * Date the code was created: 09/22/23
 * Brief description of each revision & author:
 *    - Added doc-strings and comments. (Thomas Nguyen @ 09/26/23)
 *    - Added UI for popup. (Wyatt Parsons @ 10/08/2023)
 *    - Added logic for showing and hiding ratings. (Wyatt Parsons @ 10/22/2023)
 * Pre-conditions:
 *    - The script must be injected into the KU classes website.
 * Post-conditions:
 *    - Professor ratings are displayed next to professor names.
 *    - When hovering over a rating, a tooltip is displayed with additional information.
 * Error and exception condition values:
 *    - Console errors if the fetch request fails.
 * Side effects:
 *    - Modifies the DOM to include professor ratings.
 * Invariants: None
 * Any known faults: None
 */
// Export the main function to show professor data

// Listen for messages from the popup
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );

    if (key === 'isPopupOn') {
      if (storageChange.newValue) {
        enableExtensionFeatures();
      } else {
        disableExtensionFeatures();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['isPopupOn'], (result) => {
    console.log('State fetched: ', result.isPopupOn);
    if (result.isPopupOn) {
      enableExtensionFeatures();
    } else {
      disableExtensionFeatures();
    }
  });
});

let isExtensionEnabled = false;

/**
 * Fetches professor data from the API and appends it to the DOM.
 * @param {string} professorName - The name of the professor.
 * @param {Element} element - The DOM element to append the rating to.
 */
function fetchProfessorData(professorName, element) {
  // Fetch data from the API
  fetch(
    `https://ratemyprofessorapi.onrender.com/get_updated_professor_data?name=${professorName}`
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
        // Display the rating and difficulty
        ratingElement.innerHTML = `<a href="${data.data.url}" target="_blank">Rating: ${data.data.averageRating}, Difficulty: ${data.data.averageDifficulty}</a>`;

        const logoSrc = chrome.runtime.getURL('a9065098481a44dfc2ec.png');
        console.log(logoSrc);

        // Display the tooltip

        tooltipElement.className = 'tooltip-content';
        tooltipElement.innerHTML = `
          <img src="${logoSrc}" alt="RateMyKU Logo">
          <div class="tooltip-detail tooltip-name"><strong>${
            data.data.firstName
          } ${data.data.lastName}</strong></div>
          <div class="tooltip-detail"><strong>Difficulty:</strong> <span>${
            data.data.averageDifficulty
          } / 5</span></div>
          <div class="tooltip-detail"><strong>Rating:</strong> <span>${
            data.data.averageRating
          } / 5</span></div>
          <div class="tooltip-detail"><strong>Department:</strong> <span>${
            data.data.department
          }</span></div>
          <div class="tooltip-detail"><strong>Would Take Again:</strong> <span>${parseFloat(
            data.data.wouldTakeAgainPercentage
          ).toFixed(2)}%</span></div>
          <div class="tooltip-detail"><strong>Total Ratings:</strong> <span>${
            data.data.numberOfRatings
          }</span></div>
        `;
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

export const showData = () => {
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

// Enable the extension
function enableExtensionFeatures() {
  isExtensionEnabled = true;
  console.log('Extension enabled');

  // Clear existing data before re-fetching
  hideData();

  // Re-fetch and display the data
  showProfessorData();
}

// Disable the extension
function disableExtensionFeatures() {
  isExtensionEnabled = false;
  console.log('Extension disabled');
  // Add actual logic to hide or remove the ratings from the webpage
  // This can be done by removing elements, hiding them, or clearing their content
  hideData(); // Assuming hideData is responsible for hiding/removing the ratings
}

// Hide the ratings
function hideData() {
  console.log('Hiding data');
  const ratingElements = document.querySelectorAll('.professor-rating');
  ratingElements.forEach((element) => {
    element.remove();
    console.log('Data hidden');
  });
}
