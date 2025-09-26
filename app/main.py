from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.routers import users
from app.database import get_db
from app import models
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

app = FastAPI()
app.include_router(users.router)

# Allow frontend (file:// or localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# --- Schema for login ---
class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@app.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Get user from database
    user = db.query(models.User).filter(models.User.email == request.email).first()
    
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # For simplicity, returning a dummy token
    return {"access_token": "dummy_token_123", "token_type": "bearer"}

from app.routers import posts
app.include_router(posts.router)



# Load .env file
load_dotenv()

# Access the key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("Gemini key loaded:", GEMINI_API_KEY)  # just for testing
