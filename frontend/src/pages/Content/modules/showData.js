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
 *    - Added logic for showing settings (Wyatt Parsons @ 11/05/2023)
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
chrome.storage.onChanged.addListener((changes, namespace) => { // 
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
      'Old value was "%s", new value is "%s".',
      key, namespace,
      JSON.stringify(storageChange.oldValue), JSON.stringify(storageChange.newValue));

    if (key === 'isPopupOn') { // if isPopupOn is true then enable the extension
      if (storageChange.newValue) {
        enableExtensionFeatures();
      } else {
        disableExtensionFeatures();
      }
    }

    // if showRating is true then set the value of showRating to true
    if (key === 'showRating') {
      if (storageChange.newValue) { // if showRating is true then set the value of showRating to true
        chrome.storage.local.set({ showRating: true }, () => {
          console.log('showRating is set to true'); // log that showRating is set to true
        });
      }
    }

    // if showRating is false then set the value of showRating to false
    if (key === 'showRating') {
      if (!storageChange.newValue) { // if showRating is false then set the value of showRating to false
        chrome.storage.local.set({ showRating: false }, () => { // log that showRating is set to false
          console.log('showRating is set to false'); // log that showRating is set to false
        });
      }
    }



  }
});

document.addEventListener('DOMContentLoaded', () => { // when the DOM is loaded
  chrome.storage.local.get(['isPopupOn'], (result) => { // get the value of isPopupOn
    console.log('State fetched: ', result.isPopupOn);
    if (result.isPopupOn) { //  if isPopupOn is true then enable the extension
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
function fetchProfessorData(professorName, element) { // fetches professor data from the API and appends it to the DOM.
  // Fetch the settings from storage
  chrome.storage.local.get('settings', (result) => { // get the value of settings
    // Check if the settings are fetched successfully
    if (result.settings) { // if the settings are fetched successfully
      console.log('Settings fetched: ', result.settings); // log that the settings are fetched successfully

      // Now fetch data from the API
      fetch(`https://ratemyprofessorapi.onrender.com/get_updated_professor_data?name=${professorName}`)
        .then((res) => res.json()) // Parse the JSON response
        .then((data) => { // Handle the response data
          // Handle the rest of your logic here...
          const ratingElement = document.createElement('span'); // create a span element
          ratingElement.className = 'professor-rating'; // set the class name of the span element to professor-rating
          const tooltipElement = document.createElement('span'); // create a span element
          tooltipElement.className = 'tooltip-content'; // set the class name of the span element to tooltip-content

          // Check if the API returned an error
          if (data.status === 'error') { // if the API returned an error
            ratingElement.textContent = 'Rating: N/A, Difficulty: N/A';
            tooltipElement.textContent = 'No additional data available';
          } else {
            // Display the rating and difficulty
            ratingElement.innerHTML = `<a href="${data.data.url}" target="_blank">Rating: ${data.data.averageRating}, Difficulty: ${data.data.averageDifficulty}</a>`;
            const logoSrc = chrome.runtime.getURL('a9065098481a44dfc2ec.png'); // get the URL of the RateMyKU logo
            console.log(logoSrc); // log the URL of the RateMyKU logo 
            let tooltipHTML = `<img src="${logoSrc}" alt="RateMyKU Logo" style="width: 180px; display: block; margin: 10px auto 0 auto;"><br/>  
          <strong style="color: #ffffff !important;">${data.data.lastName}, ${data.data.firstName}</strong><br/>`;

            // Correct usage of settings from result object
            console.log("Show Difficulty: ", result.settings.showDifficulty);
            console.log("Show Rating: ", result.settings.showRating);
            console.log("Show Department: ", result.settings.showDepartment);
            console.log("Show Would Take Again: ", result.settings.showWouldTakeAgain);
            console.log("Show Total Ratings: ", result.settings.showTotalRatings);

            // Add lines based on settings from result object
            if (result.settings.showDifficulty === true) {
              tooltipHTML += `<strong style="color: #ffffff !important;">Difficulty:</strong> <span style="color: #ffffff !important;">${data.data.averageDifficulty} / 5</span><br/>`;
            }
            if (result.settings.showRating === true) {
              tooltipHTML += `<strong style="color: #ffffff !important;">Rating:</strong> <span style="color: #ffffff !important;">${data.data.averageRating} / 5</span><br/>`;
            }
            if (result.settings.showDepartment === true) {
              tooltipHTML += `<strong style="color: #ffffff !important;">Department:</strong> <span style="color: #ffffff !important;">${data.data.department}</span><br/>`;
            }
            if (result.settings.showWouldTakeAgain === true) {
              tooltipHTML += `<strong style="color: #ffffff !important;">Would Take Again:</strong> <span style="color: #ffffff !important;">${parseFloat(data.data.wouldTakeAgainPercentage).toFixed(2)}%</span><br/>`;
            }
            if (result.settings.showTotalRatings === true) {
              tooltipHTML += `<strong style="color: #ffffff !important;">Total Ratings:</strong> <span style="color: #ffffff !important;">${data.data.numberOfRatings}</span>`;
            }
            // Set the tooltip HTML
            tooltipElement.innerHTML = tooltipHTML;
          }

          // Append the tooltip to the rating element
          ratingElement.appendChild(tooltipElement);

          // Append the rating next to the professor name
          if (element.parentElement) {
            element.parentElement.appendChild(ratingElement);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch data', error);
        });
    }
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
  hideData();  // Assuming hideData is responsible for hiding/removing the ratings
}

// Hide the ratings
function hideData() {
  console.log('Hiding data');
  const ratingElements = document.querySelectorAll('.professor-rating');
  ratingElements.forEach(element => {
    element.remove();
    console.log('Data hidden');
  });
}






