from typing import List

from pydantic import BaseModel


class Gear(BaseModel):
    brand: str
    model: str
    serial_number: str
    year: int
    description: str


class GearList(BaseModel):
    gearlist: List[Gear]