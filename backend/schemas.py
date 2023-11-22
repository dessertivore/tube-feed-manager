from pydantic import BaseModel, Field
import datetime


class UserBase(BaseModel):
    firstname: str
    lastname: str
    dob: datetime.date
    lower_wt_goal: int
    upper_wt_goal: int
    nhs_no: int
    feed: str
    volume: int


class User(UserBase):
    reviewed: list = Field(default_factory=[])
    currentcentile: int | None = Field(default_factory=None)
    allcentiles: list = Field(default_factory=[])


class UserCreate(UserBase):
    pass
