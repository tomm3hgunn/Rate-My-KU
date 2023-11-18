from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import ischedule
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

def open_browser():
    print("Opening browser...")
    driver = webdriver.Chrome()  # or webdriver.Chrome(), depending on your browser
    driver.get("https://classes.ku.edu")
    print("Browser opened.")

    search_box = driver.find_element_by_name("search")  # replace with the actual name of the search box
    search_box.send_keys(Keys.RETURN)

    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "some-element-class")))

    # Extract professor info here, then pass it to get_updated_professor_data()
    # ...

    driver.quit()

def main():
    open_browser()
    

# if this file is run directly, run main() once and then schedule it to run every 1 hour
if __name__ == "__main__":
    seconds = 60
    minutes = 60
    print(f"Running every {minutes} minutes...")
    main()
    ischedule.schedule(main, interval=minutes * seconds)  # 60s * 60min = 1 HR
    ischedule.run_loop()
    
# names get passed into get_updated_professor_data() function

