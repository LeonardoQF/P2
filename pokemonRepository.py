from fastapi import HTTPException
from pymongo import MongoClient
from models import UserRegisterer, UserLogger, Pokemon

client = MongoClient("mongodb://localhost:27017")
db = client.p2

def insertPokemon(pokemon : Pokemon):
    pokemon_data = {
        "name" : pokemon.name,
        "baseStats" : {
            "hp" : pokemon.baseStats.hp,
            "attack" : pokemon.baseStats.attack,
            "defense" : pokemon.baseStats.defense,
            "special_attack" : pokemon.baseStats.special_attack,
            "special_defense" : pokemon.baseStats.special_defense,
            "speed" : pokemon.baseStats.speed
        },
        "weight" : pokemon.weight,
        "height" : pokemon.height,
        "imageUrl" : pokemon.imageUrl
    }
    db.pokemon._insert_one(pokemon_data)

def findAllPokemon():
    db.pokemon.find()

