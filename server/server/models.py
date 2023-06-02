from pymongo import InsertOne
from utils import db
from mongoengine.fields import Document
from mongoengine.fields import ListField, StringField, DateTimeField, IntField

class Property(Document):
    name = StringField()
    url = StringField()
    price = IntField()
    no_of_rooms = IntField()
    apart_type = StringField()
    agency = StringField()
    publisher_website = StringField()
    img_src = StringField()
    last_modified = DateTimeField()
    area = IntField()

    def save(self):
        doc = {
            '_id': self.name,
            'url': [self.url],
            'img_src': [self.img_src],
            'price_min': self.price,
            'price_max': self.price,
            'area_min': self.area,
            'area_max': self.area,
            'no_of_rooms_min': self.no_of_rooms,
            'no_of_rooms_max': self.no_of_rooms,
            'apart_type': [self.apart_type],
            'agencies': [self.agency],
            'publisher_websites': [self.publisher_website],
            'last_modified': self.last_modified
        }
        db.properties.insert_one(doc)
        print(f"{self.name} was successfully saved.")

    def update(self):
        filter = {'_id': self.name, 'url': {'$ne': self.url}}
        update = {'$push': {'url': self.url, 'img_src': self.img_src, 'apart_type': self.apart_type, 'agencies': self.agency, 'publisher_websites': self.publisher_website }, 
                  '$min': {'price_min': self.price, 'no_of_rooms_min': self.no_of_rooms, 'area_min': self.area},
                  '$max': {'price_max': self.price, 'no_of_rooms_max ': self.no_of_rooms, 'area_max': self.area},
                  '$set': {'last_modified': self.last_modified} }
        
        result = db.properties.update_one(filter=filter, update=update)

        if result.matched_count != 0:
            print(f"{self.name} was successfully updated.")
