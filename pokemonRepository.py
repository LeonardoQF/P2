from fastapi import HTTPException
from pymongo import MongoClient
from models import AddedPokemon, PokemonRemover, UserRegisterer, UserLogger, Pokemon

client = MongoClient("mongodb://localhost:27017")
db = client.p2

def insertPokemon(pokemon : AddedPokemon):
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
        "imageUrl" : pokemon.imageUrl,
        "username" : pokemon.username
    }
    
    if not (db.pokemon.find_one(pokemon_data)):
        db.pokemon.insert_one(pokemon_data)
        return pokemon_data
    else: raise HTTPException(status_code = 409, detail = "Pokemon já cadastrado por esse usuário")

def deletePokemon(pokemonToRemove : PokemonRemover):
    pokemon_to_delete = {"name" : pokemonToRemove.name, "username" : pokemonToRemove.username}
    if db.pokemon.find_one(pokemon_to_delete):
        db.pokemon.delete_one(pokemon_to_delete)
    else : 
        raise HTTPException(status_code=404, detail="Pokemon não encontrado")
    

def findAllPokemon():
    cursor = db.pokemon.find({}, {"_id": 0})
  # Convert the cursor to a list using to_list()
    all_pokemon = list(cursor)
    return all_pokemon

