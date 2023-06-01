import json
from django.http import HttpResponse, HttpResponseBadRequest
import requests
from bs4 import BeautifulSoup
from server.models import Property
from datetime import datetime
import pymongo.errors
from utils import db
import pytz
from pymongo.errors import PyMongoError
from server.views_helper import serializeRooms, serializePrice


def index(request):
    return HttpResponse("Hello, world")


def responseEntityGood(ans):
    res = HttpResponse()
    # Set the CORS headers
    res["Access-Control-Allow-Origin"] = "http://localhost:3000"
    res["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    res["Access-Control-Allow-Headers"] = "Content-Type"
    res["Content-Type"] = 'application/json'

    res.content = json.dumps(ans)

    return res


def responseEntityBad():
    res = HttpResponse()
    # Set the CORS headers
    res["Access-Control-Allow-Origin"] = "http://localhost:3000"
    res["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    res["Access-Control-Allow-Headers"] = "Content-Type"
    res["Content-Type"] = 'application/json'

    res.status_code = HttpResponseBadRequest

    return res


def scrape_websites(request):
    try:
        # scrape_plaza(request)
        scrape_huurwoningen(request)
        return HttpResponse(status=200)
    except PyMongoError as e:
        print("An error occurred while working with MongoDB Atlas:", e)


# def scrape_plaza(request):
#     BASE_URL = 'https://plaza.newnewnew.space/'
#     # url = "https://plaza.newnewnew.space/te-huur#?passendheid=compleet&land=524&gesorteerd-op=prijs%2B&locatie=Delft-Nederland%2B-%2BZuid-Holland"
#     url = "https://plaza.newnewnew.space/te-huur#?passendheid=compleet&land=524&gesorteerd-op=prijs%2B&locatie=Rotterdam-Nederland%2B-%2BZuid-Holland"

#     response = requests.get(url)

#     # Create a BeautifulSoup object to parse the HTML content
#     soup = BeautifulSoup(response.content, 'html.parser')

#     print(soup)

#     # Find the HTML elements containing the real estate listings
#     listings = soup.find_all('section', class_='list-item ng-scope')
    
#     # print(listings)

#     for listing in listings:
#         # Extract Property Name
#         listing_name = listing.find('span', class_='ng-binding notranslate').text.strip()
#         listing_url = listing.find('a')['href']
#         price = listing.find('span', class_='kosten-regel2 ng-binding').text.strip()
#         img_src = listing.find('img')['src']
#         number_of_rooms = listing.find('span', class_='woningtype ng-binding ng-scope').text.strip()
#         surface_area = listing.find('span', class_='object-label-value ng-binding').text.strip()

#         modified = get_current_time()

#         property = Property(name=listing_name, url=listing_url, price=price, img_src=img_src, area=surface_area, no_of_rooms=number_of_rooms, apart_type="Apartment", agency="Not available", publisher_website="" ,last_modified=modified)

#         try:
#             property.save()
#             print(f"{listing_name} was successfully saved.")
#         except pymongo.errors.DuplicateKeyError:
#             property.update()
#             print(f"{listing_name} was successfully updated.")

#     return HttpResponse(status=200)


def get_all_listings(request):
    response = list(db.properties.find().sort("last_modified", -1))
    return responseEntityGood(response)

def get_current_time():
    amsterdam = pytz.timezone('Europe/Amsterdam')
    current_time = datetime.now(amsterdam)
    return current_time.isoformat()

def scrape_huurwoningen(request):
    BASE_URL = 'https://www.huurwoningen.nl'
    url = 'https://www.huurwoningen.nl/in/delft/?page='

    for i in range(1, 10):
        current_url = url + str(i) 
        # Send a GET request to the website
        response = requests.get(current_url)

        # If the scraper was redirected to some other URL
        if response.history:
            break;

        # Create a BeautifulSoup object to parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        error_message = soup.find_all('h1', class_='page__error-title')

        if len(error_message) != 0:
            break

        # Find the HTML elements containing the real estate listings
        listings = soup.find_all('li', class_='search-list__item search-list__item--listing')

        # Iterate over each listing and extract the desired information
        for listing in listings:
            # Extract the property name
            base = listing.find('h2', class_='listing-search-item__title')
            listing_name = base.a.text.strip()
            listing_url = BASE_URL + base.a.get('href')

            price = listing.find('div', class_='listing-search-item__price').text.strip()
            price = serializePrice(price)

            img_src = listing.find('img')['src']

            number_of_rooms = listing.find('li', class_='illustrated-features__item illustrated-features__item--number-of-rooms')
            if number_of_rooms is None:
                number_of_rooms = 0
            else:
                number_of_rooms = serializeRooms(number_of_rooms.text.strip())

            surface_area = listing.find('li', class_='illustrated-features__item illustrated-features__item--surface-area')
            if surface_area is None:
                surface_area = '?'
            else:
                surface_area = surface_area.text.strip().replace(" m²", "")

            modified = get_current_time()

            property = Property(name=listing_name, url=listing_url, price=price, img_src=img_src, area=surface_area, no_of_rooms=number_of_rooms, apart_type="Apartment", agency="Not available", publisher_website=BASE_URL, last_modified=modified)

            try:
                property.save()
                print(f"{listing_name} was successfully saved.")
            except pymongo.errors.DuplicateKeyError:
                property.update()
                print(f"{listing_name} was successfully updated.")

    return HttpResponse(status=200);

