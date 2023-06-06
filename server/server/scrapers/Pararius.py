import pymongo
import requests
from bs4 import BeautifulSoup
from django.http import HttpResponse

from server.models import Property
from utils import get_current_time
from server.views_helper import serializePrice, serializeRooms

base_url = 'https://www.pararius.nl'


def pararius(request):
    url = 'https://www.pararius.nl/huurwoningen/delft/page-'
    initial_url = 'https://www.pararius.nl/huurwoningen/delft/'

    scrape_pararius(initial_url)

    for i in range(2, 10):
        current_url = url + str(i)
        scrape_pararius(current_url)

    return HttpResponse(status=200)


def scrape_pararius(url):
    # Send a GET request to the website
    response = requests.get(url)

    # If the scraper was redirected to some other URL
    if response.history:
        return

    # Create a BeautifulSoup object to parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    error_message = soup.find_all('h1', class_='page__error-title')

    if len(error_message) != 0:
        return

    # Find the HTML elements containing the real estate listings
    listings = soup.find_all('li', class_='search-list__item search-list__item--listing')

    # Iterate over each listing and extract the desired information
    for listing in listings:
        # Extract the property name
        base = listing.find('h2', class_='listing-search-item__title')
        listing_name = base.a.text.strip()
        listing_name = listing_name.replace("Appartement ", "")
        listing_url = base_url + base.a.get('href')

        price = listing.find('div', class_='listing-search-item__price').text.strip()
        price = serializePrice(price)

        img_src = listing.find('img')['src']

        number_of_rooms = listing.find('li',
                                       class_='illustrated-features__item illustrated-features__item--number-of-rooms')
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

        agency = listing.find('div', class_='listing-search-item__info').find('a', class_='listing-search-item__link').text.strip()

        property = Property(name=listing_name, url=listing_url, price=price, img_src=img_src, area=surface_area,
                            no_of_rooms=number_of_rooms, apart_type="Apartment", agency=agency,
                            publisher_website=base_url, last_modified=modified)

        try:
            property.save()
        except pymongo.errors.DuplicateKeyError:
            property.update()

    return HttpResponse(status=200);



