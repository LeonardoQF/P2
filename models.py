from pydantic import BaseModel

class Token (BaseModel):
    access_token : str
    token_type : str
    
class UserRegisterer(BaseModel):
    username : str
    password : str
    
class UserLogger(BaseModel):
    username : str
    password : str
    

class BaseStats(BaseModel):
    hp: int
    attack: int
    defense: int
    special_attack: int
    special_defense: int
    speed: int

class Pokemon(BaseModel):
    name: str
    baseStats: BaseStats
    height: float
    weight: float
    imageUrl: str
    
class AddedPokemon(BaseModel):
    pokemon : Pokemon
    addedBy : str