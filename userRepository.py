from fastapi import HTTPException
from pymongo import MongoClient
from models import UserRegisterer, UserLogger

client = MongoClient("mongodb://localhost:27017")
db = client.p2

def insertUser(user : UserRegisterer):
    newUser = {
        "username" : user.username,
        "password" : user.password
    }
    db.users.insert_one(newUser) 
    return user 


def loginUser(user : UserLogger):
    result = db.users.find_one({"username" : user.username, "password" : user.password})
    return result


def isThereADuplicateUser(username : str):
    result = db.users.find_one({"username" : username})
    return result is not None