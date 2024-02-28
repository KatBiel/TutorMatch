from pymongo import MongoClient
import os
from dotenv import load_dotenv
import pymongo
import json

#load_dotenv()
client = MongoClient("MONGO_URL")
db = client["tutormatch"]
users_collection = db["users"]
subjects_collection = db["subjects"]
#collection = db["bookings"]

#Dummy Data To Test
user = {"name": "ESCOVEG", "email": "katie@katie.com", "password": "katie" }
subject = {"name": "Math", "description": "Introduction to Calculus" }

#Inserting the Data into DB
insert_result = users_collection.insert_one(user)
subject_result = subjects_collection.insert_one(subject)

#Print To Terminal
print("Inserted ID:", insert_result.inserted_id)
#print(users_collection.find_one(insert_result.inserted_id))

print("Inserted ID:", subject_result.inserted_id)
#print(subjects_collection.find_one(subject_result.inserted_id))

client.close()






