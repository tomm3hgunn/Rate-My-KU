"""
Prologue Comments

Name of code artifact: RateMyProfessorScraper
Brief description: This code defines a Python class for scraping professor data from RateMyProfessor.
Programmer's name: Thomas Nguyen
Date the code was created: 09/22/23
Brief description of each revision & author:
    - Added doc-strings and comments. (Thomas Nguyen @ 09/26/23)
    - Scraping basic data of full page professor data (Thomas Nguyen @ 10/22/23)
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
from lxml import html
from datetime import datetime


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
        print(
            f"Requested URL: {url}"
        )  # Debugging line, consider removing in production
        page = requests.get(url)
        professor_ids = re.findall(r'"legacyId":(\d+)', page.text)
        professor_first_names = re.findall(
            r'"firstName":"([a-zA-Z\s\_\-\'\.\`\"\(\)áéíóúÁÉÍÓÚñÑüÜ]+)"', page.text
        )
        professor_last_names = re.findall(
            r'"lastName":"([a-zA-Z\s\_\-\'\.\`\"\(\)áéíóúÁÉÍÓÚñÑüÜ]+)"', page.text
        )
        professor_avg_ratings = re.findall(r'"avgRating":(\d+(?:\.\d+)?)', page.text)
        professor_num_ratings = re.findall(r'"numRatings":(\d+)', page.text)
        professor_would_take_again_percent = re.findall(
            r'"wouldTakeAgainPercent":(-1|\d+(?:\.\d+)?)', page.text
        )
        professor_avg_difficulty = re.findall(
            r'"avgDifficulty":(\d+(?:\.\d+)?)', page.text
        )
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
            # Convert "N/A" to -1
            average_rating = (
                float(first_professor["avg_rating"])
                if first_professor["avg_rating"] != "N/A"
                else -1
            )
            average_difficulty = (
                float(first_professor["avg_difficulty"])
                if first_professor["avg_difficulty"] != "N/A"
                else -1
            )
            would_take_again_percent = (
                float(first_professor["would_take_again_percent"])
                if first_professor["would_take_again_percent"] != "N/A"
                else -1
            )

            response = {
                "status": "success",
                "message": "Professor data retrieved successfully",
                "total_results": len(professor),
                "data": {
                    "id": list(professor.keys())[0],
                    "firstName": first_professor["first_name"],
                    "lastName": first_professor["last_name"],
                    "averageRating": average_rating,
                    "averageDifficulty": average_difficulty,
                    "numberOfRatings": first_professor["num_ratings"],
                    "wouldTakeAgainPercentage": would_take_again_percent,
                    "department": first_professor["department"],
                    "url": first_professor["url"],
                    "lastUpdated": datetime.now(),
                },
            }
            return response
        except IndexError:
            return {"status": "error", "message": "Professor not found", "data": None}

    def get_updated_professor_data(self, name: str):
        """
        Retrieves the first professor's data from the search results and uses the url to visit and scrape the professor specific page.
        Doing this to get the most updated data.
        """
        professor = self.search_by_professor_name(name)
        try:
            professor_id = list(professor.keys())[0]
            professor_url = professor[professor_id]["url"]
            # TODO: Scrape the professor specific page using URL HERE
            print(f"Professor URL: {professor_url}")
            page = requests.get(professor_url)
            tree = html.fromstring(page.content)

            average_rating = tree.xpath(
                '//div[@class="RatingValue__Numerator-qw8sqy-2 liyUjw"]/text()'
            )[0]
            print(f"Average Rating: {average_rating}")

            number_of_ratings = tree.xpath(
                '//div[@class="RatingValue__NumRatings-qw8sqy-0 jMkisx"]/div/a/text()'
            )[0]

            first_name = tree.xpath(
                '//div[@class="NameTitle__Name-dowf0z-0 cfjPUG"]/span[1]/text()'
            )[0]
            print(f"First Name: {first_name}")

            last_name = tree.xpath(
                '//div[@class="NameTitle__Name-dowf0z-0 cfjPUG"]/span[2]/text()'
            )[0]

            department = tree.xpath(
                '//a[@class="TeacherDepartment__StyledDepartmentLink-fl79e8-0 iMmVHb"]/b/text()'
            )[0]

            would_take_again = tree.xpath(
                '//div[@class="FeedbackItem__StyledFeedbackItem-uof32n-0 dTFbKx"]/div[@class="FeedbackItem__FeedbackNumber-uof32n-1 kkESWs"]/text()'
            )[0].replace("%", "")

            level_of_difficulty = tree.xpath(
                '//div[@class="FeedbackItem__StyledFeedbackItem-uof32n-0 dTFbKx"]/div[@class="FeedbackItem__FeedbackNumber-uof32n-1 kkESWs"]/text()'
            )[1]

            # Return the data
            # Convert "N/A" to -1
            average_rating = float(average_rating) if average_rating != "N/A" else -1
            level_of_difficulty = (
                float(level_of_difficulty) if level_of_difficulty != "N/A" else -1
            )
            would_take_again = (
                float(would_take_again) if would_take_again != "N/A" else -1
            )

            response = {
                "status": "success",
                "message": "Professor data retrieved successfully",
                "total_results": 1,
                "data": {
                    "id": professor_id,
                    "firstName": first_name,
                    "lastName": last_name,
                    "averageRating": average_rating,
                    "averageDifficulty": level_of_difficulty,
                    "numberOfRatings": number_of_ratings,
                    "wouldTakeAgainPercentage": would_take_again,
                    "department": department,
                    "url": professor_url,
                    "lastUpdated": datetime.now(),
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
