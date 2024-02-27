import csv
from bs4 import BeautifulSoup
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name('backend/key.json', scope)
gc = gspread.authorize(credentials)

# Open the spreadsheet by its title
spreadsheet = gc.open('vpharm')

# Select a worksheet by title
worksheet = spreadsheet.worksheet('Sheet1')

data = [["Name", "Title", "Bio"]]
def find_next_page(page_source):
    soup = BeautifulSoup(page_source, 'html.parser')


def scrape_link_bios(link):
    # initialize headers for output file
    # writer = csv.writer(open(parameters['file_name'], 'w'))
    # writer.writerow(['Name', 'Job Title', 'Company', 'College', 'Location', 'URL'])

    # initialize header and website
    driver = webdriver.Chrome()
    driver.get(link)
    sleep(20)

    page_source = driver.page_source
    driver.quit()
    
    # locate username and submit
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find all the 'span' tags with the class 'line-clamp'
    line_clamp_spans = soup.find_all('span', class_='line-clamp')
    h4_elements = soup.find_all('h4')
    h5_elements = soup.find_all('h5')

    print(len(line_clamp_spans))
    print(len(h4_elements))
    print(len(h5_elements))

    # Iterate over each h4 element and extract the text
    for i in range(len(h4_elements)):
        cur = []
        cur.append((str)(h4_elements[i].get_text(strip=True)))
        cur.append((str)(h5_elements[i].get_text(strip=True)))
        cur.append((str)(line_clamp_spans[i].get_text(strip=True)))
        data.append(cur)

    next_page_button = soup.find('a', class_='btn btn-small btn-next-page')

    if next_page_button and next_page_button.has_attr('href'):
        return "https://profiles.stanford.edu" + next_page_button['href']
    else:
        return None

if __name__ == "__main__":
    departments = [
        "graduate-school-of-business",
        "graduate-school-of-education",
        "school-of-engineering",
        "school-of-humanities-and-sciences",
        "school-of-medicine",
        "stanford-doerr-school-of-sustainability"
    ]

    for department in departments:
        link = f"https://profiles.stanford.edu/browse/{department}?p=1&affiliations=capFaculty&ps=100"
        while link is not None:
            link = scrape_link_bios(link)
    
    filename = 'output.csv'

    # Open the file in write mode ('w') and create a csv.writer object
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        
        # Write the data to the CSV file
        for row in data:
            writer.writerow(row)