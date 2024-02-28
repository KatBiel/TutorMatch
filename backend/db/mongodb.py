from pymongo import MongoClient
import os
from dotenv import load_dotenv
import pymongo
import json

load_dotenv()
client = MongoClient("MONGO_URL")
db = client["tutormatch"]
users_collection = db["users"]
#collection = db["subjects"]
#collection = db["bookings"]

#Dummy Data To Test
user = {"name": "Adam Peaty", "email": "adam@adam.com", "password": "adam" }
#subject = {"name": "Math", "Grade": "GCSE" }
insert_result = users_collection.insert_one(user)
print("Inserted ID:", insert_result.inserted_id)
print(users_collection.find_one(insert_result.inserted_id))
#cursor = users_collection.find()
#for document in cursor:
    #print(document)
client.close()