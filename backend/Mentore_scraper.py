import csv
from bs4 import BeautifulSoup
from time import sleep
from selenium import webdriver

data = [["Name", "Title", "Bio"]]
def find_next_page(page_source):
    soup = BeautifulSoup(page_source, 'html.parser')

def scrape_link_bios(link):
    # initialize driver and nagivate to link
    driver = webdriver.Chrome()
    driver.get(link)
    sleep(20)

    page_source = driver.page_source
    driver.quit()
    
    # initialize scraper
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find all relevant elements (name, title, bio)
    h4_elements = soup.find_all('h4')
    h5_elements = soup.find_all('h5')
    line_clamp_spans = soup.find_all('span', class_='line-clamp')

    # Iterate over all elements and extract text
    for i in range(len(h4_elements)):
        cur = []
        cur.append((str)(h4_elements[i].get_text(strip=True)))
        cur.append((str)(h5_elements[i].get_text(strip=True)))
        cur.append((str)(line_clamp_spans[i].get_text(strip=True)))
        data.append(cur)

    # find and check next page button
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

    # write all data into a CSV file
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        for row in data:
            writer.writerow(row)