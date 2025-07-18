from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from .base import Base


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    bio = Column(String)
    created_at = Column(DateTime, default=datetime.now)


class UserBaseModel(BaseModel):
    username: str
    email: str
    password: str
    firstname: str
    lastname: str
    bio: str
