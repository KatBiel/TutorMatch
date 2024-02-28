from flask import Flask, redirect, url_for, request, jsonify
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
import os
from db.mongodb import get_users_collection
from modules.users import signup


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

users_collection = get_users_collection()

@app.route("/signup", methods=["POST"])
def signup_route():
    return signup()
    

if __name__ == '__main__':
    app.run(debug=True)