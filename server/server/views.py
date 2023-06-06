import json
from django.http import HttpResponse, HttpResponseBadRequest
import requests
from bs4 import BeautifulSoup
from server.models import Property
import pymongo.errors

from server.scrapers.Pararius import pararius
from utils import db, get_current_time
from pymongo.errors import PyMongoError
from server.views_helper import serializeRooms, serializePrice
from server.scrapers.Pararius import pararius


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
        scrape_huurwoningen(request)
        pararius(request)
        return HttpResponse(status=200)
    except PyMongoError as e:
        print("An error occurred while working with MongoDB Atlas:", e)


def scrape_pararius(request):
    pararius(request)


def get_all_listings(request):
    response = list(db.properties.find().sort("last_modified", -1))
    return responseEntityGood(response)

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
            except pymongo.errors.DuplicateKeyError:
                property.update()

    return HttpResponse(status=200);

