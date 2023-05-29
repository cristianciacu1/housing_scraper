from utils import db

try:
    collection = "properties"
    db.properties.delete_many({})
    print(f"Collection {collection} was successfully cleared.")
except:
    print(f"Collection {collection} could not be cleared.")
