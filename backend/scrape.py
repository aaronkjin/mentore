import requests
from bs4 import BeautifulSoup
import gspread
from oauth2client.service_account import ServiceAccountCredentials
# URL of the webpage you want to scrape
url = 'https://www.buzzrx.com/amoxicillin/coupon'  # Replace with the actual URL

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name('key.json', scope)
gc = gspread.authorize(credentials)

# Open the spreadsheet by its title
spreadsheet = gc.open('vpharm')

# Select a worksheet by title
worksheet = spreadsheet.worksheet('Sheet1')


# Send an HTTP GET request to the URL
response = requests.get(url)

data = []
# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all the div elements with the specified class
    drug_price_original = soup.find_all('span', class_='drug-listItem_drug-price__rlWzl')
    drug_price_disc = soup.find_all('div', class_='drug-listItem_drug-discount-price__PwITi')

    # Extract and print the values of the divs
    print("Original Prices:")
    orig = []
    for div in drug_price_original:
        orig.append(div.text)
    data.append(orig)
    print("Discounted Prices:")
    disc = []
    for div in drug_price_disc:
        disc.append(div.text)
    data.append(disc)
    
    pharmacy_divs = soup.find_all('div', class_='drug-listItem_drug-pharma-name__Un5gE')

    # Extract and print the 'alt' attribute from img tags within these divs
    names = []
    for div in pharmacy_divs:
        img_tag = div.find('img')  # Find the first (or only) img tag within the div
        if img_tag and img_tag.has_attr('alt'):
            names.append(img_tag['alt'])  # Print the value of the 'alt' attribute
    data.append(names)
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")

worksheet.insert_rows(data, 2)

