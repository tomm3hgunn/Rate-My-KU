"""
Prologue Comments

Name of code artifact: intervalscraper
Brief description: This code defines a Python class for scraping professor data from RateMyProfessor.
Programmer's name: Wyatt Parsons & Thomas Nguyen
Date the code was created: 11/18/23
Brief description of each revision & author:
    - Added framework (Wyatt Parsons @ 11/18/23)
    - Scraping Professor name and Class number (Wyatt Parsons @ 11/19/23)
Pre-conditions: 
    - `selenium` must be installed.
Post-conditions:
    - Returns a dictionary containing professor data.
Error and exception condition values: 
    - IndexError if the professor is not found.
Side effects: None
Invariants: None
Any known faults: None
"""

import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import ischedule
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoAlertPresentException

from ratemyscraper import RateMyProfessorScraper

import sys
import os
from flask import Flask

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database.database import db, init_database, update_professor

app = Flask(__name__)
init_database(app)


def open_browser():
    print("Opening browser...")
    options = Options()
    # options.add_argument("--headless")  # Run the browser in headless mode
    driver = webdriver.Chrome(
        options=options
    )  # or webdriver.Chrome(), depending on your browser
    driver.get("https://classes.ku.edu")
    print("Browser opened.")

    try:
        perform_search(driver)
        handle_alert(driver)
        extract_professor_info(driver)
    except TimeoutException:
        print("Error: Timeout while waiting for search results to load.")
        raise
    except NoSuchElementException:
        print("Error: Professor information not found on the page.")
        raise

    print("Closing browser...")
    driver.quit()


def perform_search(driver):
    print("Performing search...")
    search_bar = driver.find_element(By.CLASS_NAME, "form-control")
    search_bar.click()
    search_bar.send_keys("") # edit this to change the search query

    search_button = driver.find_element(By.CLASS_NAME, "classSearchButton")
    print("Search button found.")

    search_button.click()
    print("Search button clicked.")


def handle_alert(driver):
    try:
        alert = driver.switch_to.alert
        alert.accept()
        print("Alert handled.")
    except NoAlertPresentException:
        print("No alert to handle.")


# Create a hashmap to store professor names
professor_names = {}


def extract_professor_info(driver):
    print("Waiting for search results to load...")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "class_list"))
    )
    print("Search results loaded.")

    professor_elements = driver.find_elements(
        By.XPATH, "//a[@title='Click here to get instructor info']"
    )
    class_number_elements = driver.find_elements(
        By.XPATH, "//td/strong[@title[starts-with(., 'Section number:')]]"
    )

    # Create an instance of RateMyProfessorScraper
    university_id = 1117
    scraper = RateMyProfessorScraper(university_id)

    with app.app_context():
        for professor, class_number in zip(professor_elements, class_number_elements):
            professor_name = professor.text
            class_number_text = class_number.text

            # Check if professor name already exists in the hashmap
            if professor_name not in professor_names:
                professor_names[professor_name] = True
                print(f"New professor found: {professor_name}")
                # Call the get_updated_professor_data function with the professor name
                prof_response = scraper.get_updated_professor_data(professor_name)
                print(prof_response)
                # Insert into database no matter if it exists or not
                # meaning if it does exist, it will update the data
                if prof_response["status"] == "success":
                    update_professor(prof_response["data"])


def main():
    open_browser()


# if this file is run directly, run main() once and then schedule it to run every 1 hour
if __name__ == "__main__":
    seconds = 60
    minutes = 60
    print(f"Running every {minutes} minutes...")
    main()

    ###################################### vv Uncomment after testing is done vv ######################################

    # Uncomment after testing is done to run loop every 1 hour
    # ischedule.schedule(main, interval=minutes * seconds)  # 60s * 60min = 1 HR
    # ischedule.run_loop()

    ###################################### ^ Uncomment after testing is done ^ ######################################
