from typing import List

from pydantic import BaseModel


class Guitar(BaseModel):
    brand: str
    model: str
    serial_number: str



class Guitars(BaseModel):
    guitars: List[Guitar]