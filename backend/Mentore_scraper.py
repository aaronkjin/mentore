import csv
from time import sleep
# imports
from selenium import webdriver

# defining new variable passing two parameters
parameters = {
    'file_name': 'output.csv',
    'linkedin_username': 'dteal1973@gmail.com',
    'linkedin_password': 'hehehahadeeznuts123!'
}

writer = csv.writer(open(parameters['file_name'], 'w'))

# writerow() method to the write to the file object
writer.writerow(['Name', 'Job Title', 'Company', 'College', 'Location', 'URL'])

# specifies the path to the chromedriver.exe
driver = webdriver.Chrome()

# driver.get method() will navigate to a page given by the URL address
driver.get('https://www.linkedin.com')

# locate email form by_class_name
username = driver.find_element('login-email')

# send_keys() to simulate key strokes
username.send_keys(parameters.linkedin_username)

# sleep for 0.5 seconds
sleep(0.5)

# locate password form by_class_name
password = driver.find_element('login-password')

# send_keys() to simulate key strokes
password.send_keys(parameters.linkedin_password)
sleep(0.5)

# locate submit button by_xpath
sign_in_button = driver.find_element('//*[@type="submit"]')

# .click() to mimic button click
sign_in_button.click()