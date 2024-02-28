import pytest
from pymongo import MongoClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv


iso_date_start = datetime(2022, 3, 1, 12, 0, 0, tzinfo=timezone.utc)
iso_date_end = datetime(2022, 3, 1, 13, 0, 0, tzinfo=timezone.utc)

student_data = {
    "name": "dan gullis",
    "email": "dan@test.com",
    "status": "student"
}

availability_data = {
    "start_time": iso_date_start,
    "end_time": iso_date_end,
    "available": True,
}

tutor_data1 = {
    "name": "kat",
    "email": "katt@test.com",
    "status": "tutor",
    "availability": availability_data
}

tutor_data2 = {
    "name": "muhtadi",
    "email": "muhtadi@test.com",
    "status": "tutor",
    "availability": availability_data
}

subject_data = {
    "name": "mathematics",
    "gcse": [],
    "alevel" : []
}


load_dotenv()
test_db_name=os.getenv('TEST_DB_NAME')

@pytest.fixture()
def mongo_db_connection():

    client = MongoClient('localhost', 27017)

    db = client[test_db_name]

    db.users.insert_one(student_data)
    db.users.insert_one(tutor_data1)
    db.users.insert_one(tutor_data2)
    db.subjects.insert_one(subject_data)

    #allows the test to run and once finished executes clean up code to clear database
    yield db
    client.drop_database("tutormatch_test")

