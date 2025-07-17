from os import getenv
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models.guitar_model import Guitars, Guitar
from models.gear_model import Gear, GearList

load_dotenv()


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

'''
ORIGINAL GUITAR APP ENDPOINTS
'''
# memory_db = {"guitars": []}
# @app.get("/guitars", response_model=Guitars)
# def get_guitars():
#     return Guitars(guitars=memory_db["guitars"])
#
# @app.post("/guitars")
# def add_guitar(guitar: Guitar):
#     memory_db["guitars"].append(guitar)
#     return guitar

'''
END
'''

gear_db = {"gearlist_db": []}

@app.get("/gearlist", response_model=GearList)
def get_guitars():
    return GearList(gearlist=gear_db["gearlist_db"])

@app.post("/gearlist")
def add_guitar(gear: Gear):
    gear_db["gearlist_db"].append(gear)
    return gear

'''
alternative way to run the app
'''
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)