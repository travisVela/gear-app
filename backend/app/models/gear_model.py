from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey

from .base import Base


class Gear(Base):
    __tablename__ = "gear"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    brand = Column(String)
    model = Column(String)
    serial_number = Column(String)
    year = Column(Integer)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

class GearBaseModel(BaseModel):
    type: str
    brand: str
    model: str
    serial_number: str
    year: int
    description: str
