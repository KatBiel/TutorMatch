from db.mongodb import get_users_collection
from flask import Flask, redirect, url_for, request, jsonify
from bson import ObjectId

users_collection = get_users_collection()

#create functions in here to add users / update users / delete users etc

def update_bio(userId, bioContent):
    users_collection = get_users_collection()
    

    try:
        filter_criteria = {"_id": ObjectId(userId)}  
        update_data = {"$set": {"bio": bioContent}} 
        result = users_collection.update_one(filter_criteria, update_data)
        
        if result.matched_count == 0:
            return {"error": "User not found with the specified ID"}

        return {"message": "Update bio successful"}


    except Exception as e:
        return e



def signup():
    print("modules triggered")
    data = request.json
    name = data.get("name")
    email = data.get("email")
    status = data.get("status")

    if not all([name, email, status]):
        return jsonify({"error": "Missing fields"}), 400
    

    new_user = {
        "name": name,
        "email": email,
        "status": status
    }
    users_collection.insert_one(new_user)

    return jsonify({"message": "Account created successfully"}), 201