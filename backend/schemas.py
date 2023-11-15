from pydantic import BaseModel, Field
import datetime


class User(BaseModel):
    firstname: str
    lastname: str
    dob: datetime.date
    lower_wt_goal: int
    upper_wt_goal: int
    nhs_no: int
    reviewed: list = Field(default_factory=[])
    currentcentile: int | None = Field(default_factory=None)
    feed: str
    volume: int
