from flask import Flask, redirect, url_for, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
from bson import BSON
import json
from dotenv import load_dotenv
import os
from modules.users import create_user


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()
db_name= os.getenv('DB_NAME')

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database(db_name)
users_collection = db.get_collection('users')

    

@app.route("/signup", methods=["POST"])
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

    return jsonify({"message": "Account created successfully"}), 200
    

if __name__ == '__main__':
    app.run(debug=True)