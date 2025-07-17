from os import getenv
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv


from .models.base import Base
from .database import engine
from .routers import gear_router

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/healthy")
def health_check():
    return {"status": "Hellthy"}

app.include_router(gear_router.router)

load_dotenv()

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
alternative way to run the app
'''
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)