from datetime import datetime, timezone, timedelta
from typing import Union
from fastapi import Header, HTTPException, status
from jose import JWTError, jwt
from fastapi.middleware.cors import CORSMiddleware

SECRET_KEY = "JAVAFORLIFEJAVAISGREAT88228822"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRATION_MINUTES = 30


origins = [
    "http://localhost:966",
    "http://localhost:8000",
]

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

