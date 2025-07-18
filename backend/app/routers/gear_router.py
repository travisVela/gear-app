

from fastapi import APIRouter, Depends, HTTPException
# from typing import Annotated
from sqlalchemy.orm import Session
from starlette import status
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
def get_gear(user: user_dependency, db: db_dependency):

    print(f"get gear user: ${user}")
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized to get gear")
    return db.query(Gear).filter(Gear.owner_id == user.get("id")).all()

@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_gear(user: user_dependency, db: db_dependency, item: GearBaseModel):
    print(f"add gear user: ${user}")
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized to save gear")
    new_item = Gear(**item.model_dump(), owner_id=user.get("id"))
    db.add(new_item)
    db.commit()

