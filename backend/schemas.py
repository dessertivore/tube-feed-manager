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
    currentcentile: int = Field(default_factory=0)
    allcentiles: list[int] = Field(default_factory=[])


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    firstname: str | None = None
    lastname: str | None = None
    dob: datetime.date | None = None
    lower_wt_goal: int | None = None
    upper_wt_goal: int | None = None
    nhs_no: int | None = None
    feed: str | None = None
    volume: int | None = None
