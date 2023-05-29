from pymongo import InsertOne
from utils import db
from mongoengine.fields import Document
from mongoengine.fields import ListField, StringField, DateTimeField, IntField

class Property(Document):
    name = StringField()
    url = StringField()
    price = StringField()
    img_src = StringField()
    surface_area = StringField()
    number_of_rooms = StringField()
    furniture_status = StringField()
    publish_website_url = StringField()
    publish_website_name = StringField()
    last_modified = DateTimeField()

    def save(self):
        doc = {
            '_id': self.name,
            'url': [self.url],    
            'price': [self.price],
            'img_src': [self.img_src],
            'surface_area': [self.surface_area],
            'number_of_rooms': [self.number_of_rooms],
            'furniture_status': [self.furniture_status],
            'publish_website_url': [self.publish_website_url],
            'publish_website_name': [self.publish_website_name],
            'last_modified': [self.last_modified]
        }
        db.properties.insert_one(doc)

    def update(self):
        filter = {'_id': self.name, 'url': {'$ne': self.url}}
        update = {'$push': {'url': self.url, 'price': self.price, 'img_src': self.img_src, 'surface_area': self.surface_area, 'number_of_rooms': self.number_of_rooms, 'furniture_status': self.furniture_status, 'publish_website_url': self.publish_website_url, 'publish_website_name': self.publish_website_name, 'last_modified': self.last_modified}}
        db.properties.update_one(filter=filter, update=update)