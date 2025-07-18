from datetime import datetime, timezone, timedelta
from os import getenv

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
# from typing import Annotated
from sqlalchemy.orm import Session
from typing_extensions import Annotated
from passlib.context import CryptContext

# from starlette import status

from ..database import localsession
from ..models.gear_model import Gear, GearBaseModel
from ..models.user_model import Users, UserBaseModel
from ..models.token_model import Token

load_dotenv()
router = APIRouter(
    prefix="/user",
    tags=["user"]
)

def get_db():
    db = localsession()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
brcypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="user/token")

'''
UITL FUNCTIONS
'''
def authenticate_user(username: str, password: str, db: db_dependency):
    user = db.query(Users).filter(Users.username == username ).first()

    if not user:
        return False
    if not brcypt_context.verify(password, user.password):
        return False
    return user

def create_token(username: str, id: int,  expires_delta: timedelta):
    expires = datetime.now(timezone.utc) + expires_delta
    encode = {"sub": username,  "id": id, "exp": expires}

    return jwt.encode(encode, getenv("SECRET_KEY"), getenv("ALGORITHM"))

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):

    try:
        payload = jwt.decode(token, getenv("SECRET_KEY"), algorithms=[getenv("ALGORITHM")])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if not username or not user_id:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials!!")

'''
API ENDPOINTS
'''
@router.post("/token", response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
   user = authenticate_user(form_data.username, form_data.password, db)
   if not user:
       raise HTTPException(status_code=401, detail="Could not validate credentials")

   token = create_token(user.username, user.id, timedelta(minutes=20))
   return {"access_token": token, "token_type": "bearer"}

@router.get("/" )
def get_user(db: db_dependency):
    return db.query(Users).all()

@router.post("/")
def create_user(db: db_dependency, user: UserBaseModel):
    new_user = Users(
        username=user.username,
        email=user.email,
        password=brcypt_context.hash(user.password),
        firstname=user.firstname,
        lastname=user.lastname,
        bio=user.bio
    )
    db.add(new_user)
    db.commit()

