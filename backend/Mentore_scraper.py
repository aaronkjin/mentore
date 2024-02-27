import csv
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By

# paramters
parameters = {
    'file_name': 'output.csv',
    'linkedin_username': 'dteal1973@gmail.com',
    'linkedin_password': 'hehehahadeeznuts123!'
}

# initialize headers for output file
writer = csv.writer(open(parameters['file_name'], 'w'))
writer.writerow(['Name', 'Job Title', 'Company', 'College', 'Location', 'URL'])

# initialize header and website
driver = webdriver.Chrome()
driver.get('https://www.linkedin.com')

# locate username and submit
username = driver.find_element(By.ID, 'session_key')
username.send_keys(parameters['linkedin_username'])
sleep(0.5)

# locate password and submit
password = driver.find_element(By.ID, 'session_password')
password.send_keys(parameters['linkedin_password'])
sleep(0.5)

# locate submit button by_xpath
sign_in_button = driver.find_element(By.XPATH, '//*[@type="submit"]')

# .click() to mimic button click
sign_in_button.click()