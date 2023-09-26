"""
Prologue Comments

Name of code artifact: RateMyProfessorScraper
Brief description: This code defines a Python class for scraping professor data from RateMyProfessor.
Programmer's name: Thomas Nguyen
Date the code was created: 09/22/23
Brief description of each revision & author:
    - Added doc-strings and comments. (Thomas Nguyen @ 09/26/23)
Pre-conditions: 
    - `requests` and `re` modules must be installed.
Post-conditions:
    - Returns a dictionary containing professor data.
Error and exception condition values: 
    - IndexError if the professor is not found.
Side effects: None
Invariants: None
Any known faults: None
"""

# Import required modules
import requests
import re


class RateMyProfessorScraper:
    def __init__(self, id) -> None:
        """
        Initializes the scraper with a university ID.
        """
        self.university_id = id

    def search_by_professor_name(self, name: str) -> dict:
        """
        Scrapes RateMyProfessor for a professor's data
        """
        url = f"https://www.ratemyprofessors.com/search/professors/{self.university_id}?q={name}"
        print(f"Requested URL: {url}")  # Debugging line, consider removing in production
        page = requests.get(url)

        # Using Regex to find all the data
        professor_ids = re.findall(r'"legacyId":(\d+)', page.text)
        professor_first_names = re.findall(r'"firstName":"(\w+)"', page.text)
        professor_last_names = re.findall(r'"lastName":"(\w+)"', page.text)
        professor_avg_ratings = re.findall(r'"avgRating":(\d+(?:\.\d+)?)', page.text)
        professor_num_ratings = re.findall(r'"numRatings":(\d+)', page.text)
        professor_would_take_again_percent = re.findall(r'"wouldTakeAgainPercent":(-1|\d+(?:\.\d+)?)', page.text)
        professor_avg_difficulty = re.findall(r'"avgDifficulty":(\d+(?:\.\d+)?)', page.text)
        professor_department = re.findall(r'"department":"([^"]+)"', page.text)

        # zip all the data together in a dict
        professor_data = {}
        for i, professor_id in enumerate(professor_ids):
            professor_data[professor_ids[i]] = {
                "first_name": professor_first_names[i],
                "last_name": professor_last_names[i],
                "avg_rating": professor_avg_ratings[i],
                "num_ratings": professor_num_ratings[i],
                "would_take_again_percent": professor_would_take_again_percent[i],
                "avg_difficulty": professor_avg_difficulty[i],
                "department": professor_department[i],
                "url": f"https://www.ratemyprofessors.com/professor/{professor_id}",
            }

        return professor_data

    def get_professor_data(self, name: str):
        """
        Retrieves the first professor's data from the search results.
        """
        professor = self.search_by_professor_name(name)
        try:
            first_professor = list(professor.values())[0]
            response = {
                "status": "success",
                "message": "Professor data retrieved successfully",
                "total_results": len(professor),
                "data": {
                    "id": list(professor.keys())[0],
                    "firstName": first_professor["first_name"],
                    "lastName": first_professor["last_name"],
                    "averageRating": first_professor["avg_rating"],
                    "averageDifficulty": first_professor["avg_difficulty"],
                    "numberOfRatings": first_professor["num_ratings"],
                    "wouldTakeAgainPercentage": first_professor["would_take_again_percent"],
                    "department": first_professor["department"],
                    "url": first_professor["url"],
                },
            }
            return response
        except IndexError:
            return {"status": "error", "message": "Professor not found", "data": None}


# Main execution for testing
if __name__ == "__main__":
    name = "Gibbons, John"
    scraper = RateMyProfessorScraper(id=1117)
    print(scraper.get_professor_data(name=name))
