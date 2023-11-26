from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from resources import (
    search_users_nhs,
    insert_user,
    add_review,
    delete_review,
    delete_patient,
    update_user,
)
from schemas import User, UserCreate, UserUpdate
import datetime

app = FastAPI()


# accept requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# set variables to input and output from api - in this case find a user if you input nhs
@app.get("/user/{nhs_no}")
async def user(nhs_no: int) -> dict:
    # find pt
    try:
        founduser = search_users_nhs(nhs_no)
    # raise error if no patient found
    except ValueError:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "firstname": founduser.firstname,
        "lastname": founduser.lastname,
        "dob": founduser.dob,
        "lowergoalcentile": founduser.lower_wt_goal,
        "uppergoalcentile": founduser.upper_wt_goal,
        "weightcentile": founduser.currentcentile,
        "allcentiles": founduser.allcentiles,
        "reviewed": founduser.reviewed,
        "feed_name": founduser.feed,
        "feed_volume": founduser.volume,
    }


@app.post("/user")
async def new_user(new_user: UserCreate) -> dict:
    try:
        inserted_user: User = insert_user(new_user)
    except:
        raise ValueError("Could not insert")
    return {
        "nhs_no": inserted_user.nhs_no,
        "firstname": inserted_user.firstname,
        "lastname": inserted_user.lastname,
        "dob": inserted_user.dob,
        "lowergoalcentile": inserted_user.lower_wt_goal,
        "uppergoalcentile": inserted_user.upper_wt_goal,
        "feed": inserted_user.feed,
        "volume": inserted_user.volume,
    }


@app.put("/user/{nhs_no}")
async def update_user_fast(nhs_no: int, input: dict) -> User:
    field = list(input.keys())[0]
    value = input[field]
    update_user(nhs_no, field, value)
    return search_users_nhs(nhs_no)


@app.post("/review")
async def add_review_fast(
    nhs: int,
    reviewdate: datetime.date,
    weightcentile: int,
    feedname: str,
    feedvolume: int,
) -> str:
    add_review(nhs, reviewdate, weightcentile, feedname, feedvolume)
    return "review added"


@app.delete("/review")
async def delete_review_fast(nhs: int, reviewdate: datetime.date) -> None:
    delete_review(nhs, reviewdate)


@app.delete("/user")
async def delete_patient_fast(nhs: int) -> None:
    delete_patient(nhs)
