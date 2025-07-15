from os import getenv
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Guitar(BaseModel):
    brand: str
    model: str



class Guitars(BaseModel):
    guitars: List[Guitar]

app = FastAPI()

origins = [
    getenv("BASE_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

memory_db = {"guitars": []}

@app.get("/guitars", response_model=Guitars)
def get_guitars():
    return Guitars(guitars=memory_db["guitars"])

@app.post("/guitars")
def add_guitar(guitar: Guitar):
    memory_db["guitars"].append(guitar)
    return guitar

'''
alternative way to run the app
'''
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)