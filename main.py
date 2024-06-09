from fastapi import Depends, FastAPI, HTTPException, Header,Query, Request
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from typing import Annotated

import uvicorn
from models import AddedPokemon, PokemonRemover, UserRegisterer, UserLogger, Token
from pokemonRepository import deletePokemon, findAllPokemon, insertPokemon
from userRepository import isThereADuplicateUser, insertUser, loginUser
from TokenHandler import create_access_token, verify_token, add_cors

app = FastAPI()

add_cors(app)

@app.get("/")
def redirectHome():
    return RedirectResponse(url="/front/index.html")

@app.get("/test")
def sayHi():
    return "Hiii"

@app.post("/registerUser")
def registrarUsuario(user: UserRegisterer):
    if isThereADuplicateUser(user.username):
        raise HTTPException(409, detail="Nome de usuário já cadastrado")
    insertUser(user)
    return user

@app.post("/login", response_model=Token)
def login(user: UserLogger):
    user_data = loginUser(user)
    if user_data is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    token = create_access_token({"username": user_data["username"]})
    return {"access_token": token, "token_type": "Bearer"}

@app.get("/front/home.html")
def moveIfAuthorized(token: str = Query(...)):
    verify_token(token)  
    return {"User authorized"}

@app.post("/addPokemon")
def addPokemon(pokemon : AddedPokemon, token : dict = Depends(verify_token)):
    if (insertPokemon(pokemon)):
        return {"Pokémon adicionado!"}
    else: 
        raise HTTPException(status_code = 422, detail = "Erro no json")
    
@app.get("/getAllPokemon")
def getAllPokemon(token : dict = Depends(verify_token)):
    return findAllPokemon()

@app.post("/removePokemon")
def removePokemon(pokemonToRemove : PokemonRemover):
    deletePokemon(pokemonToRemove)
        

@app.get("/favicon.ico", include_in_schema=False)
def return_ico():
    return FileResponse("/front/img/pokebola.ico")

app.mount("/front", StaticFiles(directory="front"), name="front")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5500)
    