from datetime import datetime, timezone, timedelta
from os import getenv

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response
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
from ..models.login_model import Login

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
UTIL FUNCTIONS
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


# @router.get("/" )
# def get_user(db: db_dependency):
#     return db.query(Users).all()

@router.post("/signup")
async def create_user(db: db_dependency, user: UserBaseModel):
    if db.query(Users).filter(Users.email == user.email).first():
        raise HTTPException(status_code=409, detail="Email account already exists")

    if db.query(Users).filter(Users.username == user.username).first():
        raise HTTPException(status_code=409, detail="Username already exists")

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
    this_user = db.query(Users).filter(Users.username == user.username).first()
    token = create_token(user.username, this_user.id, timedelta(days=7))

    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
async def login(login: Login, db: db_dependency):

   user = authenticate_user(login.username, login.password, db)

   if not user:
       raise HTTPException(status_code=401, detail="Could not validate credentials")

   token = create_token(user.username, user.id, timedelta(days=7))

   return {"access_token": token, "token_type": "bearer"}

@router.post("/logout")
async def logout(res: Response):
    res.delete_cookie(key="access_token", httponly=True)
    print(f"res: ${res}")
    return {"message": "Logged out from server"}


@router.get("/checkAuth")
async def checkAuth(req: Request):

    header = req.headers.get("Authorization")
    token = header.split(" ")[1]
    payload = jwt.decode(token, getenv("SECRET_KEY"), algorithms=[getenv("ALGORITHM")])
    username: str = payload.get("sub")
    user_id: int = payload.get("id")
    if not username or not user_id:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return {"username": username, "id": user_id}




