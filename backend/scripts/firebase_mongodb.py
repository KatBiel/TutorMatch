from firebase_admin import auth
import pymongo


# Initialize PyMongo client for MongoDB Atlas
client = pymongo.MongoClient("MONGO URL")
db = client["mydatabase"]
collection = db["users"]

# GET Users From Firebase
users = auth.list_users()

# Loop through users and insert their data into MongoDB
for user in users:
    user_data = {
        "uid": user.uid,
        "email": user.email,
        "display_name": user.display_name,
        "name": user.name,
        "status": user.status,
        "availability": user.availability,
        "bio": user.bio,
        "profileImage": user.profileImage
    }
    collection.insert_one(user_data)
