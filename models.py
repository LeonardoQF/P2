from pydantic import BaseModel

class Token (BaseModel):
    access_token : str
    token_type : str
    
    
class Pokemon(BaseModel):
    name : str
    height : float
    weight : float
    sprite : str
    
class UserRegisterer(BaseModel):
    username : str
    password : str
    
class UserLogger(BaseModel):
    username : str
    password : str