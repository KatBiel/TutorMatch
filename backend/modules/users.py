from db.mongodb import get_users_collection
from flask import Flask, redirect, url_for, request, jsonify

users_collection = get_users_collection()

def signup():
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

