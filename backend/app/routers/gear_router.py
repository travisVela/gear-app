import this

from fastapi import APIRouter, Depends, HTTPException
from passlib.handlers.django import django_pbkdf2_sha1
# from typing import Annotated
from sqlalchemy.orm import Session
from starlette import status
from starlette.requests import Request
from typing_extensions import Annotated

from .user_router import get_current_user
from ..database import localsession
from ..models import Users
from ..models.gear_model import Gear, GearBaseModel

router = APIRouter(
    prefix="/gear",
    tags=["gear"]
)

def get_db():
    db = localsession()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.get("/", status_code=status.HTTP_200_OK)
async def get_gear(user: user_dependency, db: db_dependency, req: Request):
    # token = req.headers.get("authorization")
    # user = await get_current_user(token)


    print(f"get gear user: ${user}")
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized to get gear")
    return db.query(Gear).filter(Gear.owner_id == user.get("id")).all()

@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_gear(user: user_dependency, db: db_dependency, item: GearBaseModel):
    # print(f"add gear user: ${user}")
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized to save gear")
    new_item = Gear(**item.model_dump(), owner_id=user.get("id"))
    db.add(new_item)
    db.commit()

@router.put("/edit_item/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def edit_item(user: user_dependency, db: db_dependency, item: GearBaseModel, id: int):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized to edit gear")
    this_item = db.query(Gear).filter(Gear.id == id).first()

    if not this_item:
        raise HTTPException(status_code=404, detail="Item to edit not found")

    this_item.type = item.type
    this_item.brand = item.brand
    this_item.model = item.model
    this_item.year = item.year
    this_item.serial_number = item.serial_number
    this_item.description = item.description

    db.add(this_item)
    db.commit()

@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(user: user_dependency, db: db_dependency, id: int):
    print(f"id: ${id}")
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized to delete item")
    this_item = db.query(Gear).filter(Gear.id == id).first()

    if not this_item:
        raise HTTPException(status_code=404, detail="Item to delete not found")

    db.delete(this_item)
    db.commit()




