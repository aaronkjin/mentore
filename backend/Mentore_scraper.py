import csv
from bs4 import BeautifulSoup
from time import sleep
from selenium import webdriver

data = [["Name", "Title", "Bio"]]

def scrape_link_bios(link):
    # initialize driver and nagivate to link
    driver = webdriver.Chrome()
    driver.get(link)
    sleep(20)

    page_source = driver.page_source
    driver.quit()
    
    # initialize scraper
    soup = BeautifulSoup(page_source, 'html.parser')

    person_elements = soup.find_all('div', class_='mini-profile')

    for person in person_elements:
        name_element = person.find('h4')
        title_element = person.find('h5')
        bio_element = person.find('span', class_='line-clamp')
        contact_info_element = person.find('div', class_='detail detail-section')

        cur = []
        cur.append((str)(name_element.get_text(strip=True)))
        cur.append((str)(title_element.get_text(strip=True)))
        cur.append((str)(bio_element.get_text(strip=True)))

        if contact_info_element:
            email_element = contact_info_element.find('a', href=lambda href: href and href.startswith('mailto:'))
            if email_element:
                cur.append((str) (email_element['href'].replace('mailto:', '')))
            else:
                cur.append("email is unavailable")
        else:
            cur.append("email is unavailable")
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
    
    filename = 'backend/new_mentore_data.csv'

    # write all data into a CSV file
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        for row in data:
            writer.writerow(row)