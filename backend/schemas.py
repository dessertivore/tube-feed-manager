from pydantic import BaseModel, Field
import datetime

"""
Basemodel schemas used to define classes used in this software.
"""


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


class AddReview(BaseModel):
    nhs_no: int
    review_date: datetime.date
    weight_centile: int
    feed_name: str
    feed_volume: int


class UserFind(User):
    age: int
    reviewed_since_change: bool
