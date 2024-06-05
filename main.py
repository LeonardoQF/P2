from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from models import UserRegisterer, UserLogger, Token
from userRepository import isThereADuplicateUser, insertUser, loginUser
from TokenHandler import create_access_token, verify_token_from_header

app = FastAPI()

@app.get("/")
def redirectHome():
    return RedirectResponse(url="/front/index.html")

@app.get("/test")
def sayHi():
    return "Hiii"

@app.post("/registerUser")
def registrarUsuario(user: UserRegisterer):
    if isThereADuplicateUser(user.username):
        raise HTTPException(400, detail="Nome de usuário já cadastrado")
    insertUser(user)
    return user

@app.post("/login", response_model=Token)
def login(user: UserLogger):
    user_data = loginUser(user)
    if user_data is None:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")
    
    token = create_access_token({"username": user_data["username"]})
    return {"access_token": token, "token_type": "Bearer"}

@app.get("/front/home.html")
def moveIfAuthorized(current_user: str = Depends(verify_token_from_header)):
    return {"User authorized": current_user}

app.mount("/front", StaticFiles(directory="front"), name="front")