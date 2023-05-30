from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from mongo_secrets.mongodb_credentials import username, password

uri = f"mongodb+srv://{username}:{password}@cluster0.tmjorat.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = None

# Send a ping to confirm a successful connection
try:
    db = client['WTH_db']
except Exception as e:
    print(e)