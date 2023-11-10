from pydantic import BaseModel
import datetime


class User(BaseModel):
    firstname: str
    lastname: str
    dob: datetime.date
    lower_wt_goal: int
    upper_wt_goal: int
    nhs_no: int
    reviewed: list
    currentcentile: int
    feed: str
    volume: int
