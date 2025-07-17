from fastapi import APIRouter, Depends
# from typing import Annotated
from sqlalchemy.orm import Session
from typing_extensions import Annotated

# from starlette import status

from ..database import localsession
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


@router.get("/" )
def get_gear(db: db_dependency):
    return db.query(Gear).all()

@router.post("/gear")
def add_gear(db: db_dependency, item: GearBaseModel):
    new_item = Gear(**item.model_dump())
    db.add(new_item)
    db.commit()

