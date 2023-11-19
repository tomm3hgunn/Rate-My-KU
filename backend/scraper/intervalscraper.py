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
    - `seleniu` must be installed.
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

import ratemyscraper

def open_browser():
    print("Opening browser...")

    
    driver = webdriver.Chrome()  # or webdriver.Chrome(), depending on your browser
    driver.get("https://classes.ku.edu")
    print("Browser opened.")

    try:
        ###################### TESTING #####################
        
        # Find and type 'EECS 582' into the search bar
        search_bar = driver.find_element(By.CLASS_NAME, "form-control")
        search_bar.click()
        
        # Type the class name into the search bar
        search_bar.send_keys("EECS 582")
        
        ###################### END OF TESTING #####################
        
        # Find the search button by its class
        search_button = driver.find_element(By.CLASS_NAME, "classSearchButton")
        print("Search button found.")
        
        # Wait for the button to be clickable
        search_button = driver.find_element(By.CLASS_NAME, "classSearchButton")
        search_button.click()
        print("Search button clicked.")
        
        # Handle the alert if it pops up
        try:
            alert = driver.switch_to.alert
            alert.accept()
            print("Alert handled.")
        except NoAlertPresentException:
            print("No alert to handle.")
        
    # Handle exceptions
    except TimeoutException:
        print("Error: Timeout while waiting for search button to become clickable.")
        raise
    except NoSuchElementException:
        print("Error: Search button not found on the page.")
        raise
    
     
     
    # Extract professor info here, then pass it to get_updated_professor_data()
    try:
        print("Waiting for search results to load...")
        # Dynamically wait for the search results to load
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "class_list")))
        print("Search results loaded.")

        # Find the elements that contain the professor information
        # XPath does not need to be added from an external library when you're using Selenium with Python
        professor_elements = driver.find_elements(By.XPATH, "//a[@title='Click here to get instructor info']") 
        class_number_elements = driver.find_elements(By.XPATH, "//td/strong[@title[starts-with(., 'Section number:')]]")
        
        #  Loop through the elements and print the professor name and class number
        for professor, class_number in zip(professor_elements, class_number_elements):
            professor_name = professor.text
            print(f"Professor: {professor_name}")
            class_number_text = class_number.text
            print(f"Class Number: {class_number_text}")
            print(f"Professor: {professor_name}, Class Number: {class_number_text}")
            # ratemyscraper.get_updated_professor_data(professor_name)

    except TimeoutException:
        print("Error: Timeout while waiting for search results to load.")
        raise
    except NoSuchElementException:
        print("Error: Professor information not found on the page.")
        raise



    print("Closing browser...")
    driver.quit()

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
    
# names get passed into get_updated_professor_data() function

