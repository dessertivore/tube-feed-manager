from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from resources import (
    search_users_nhs,
    insert_user,
    insert_review,
    delete_review,
    delete_patient,
    update_user,
)
from schemas import User, UserCreate, UserUpdate, AddReview
import datetime

app = FastAPI()


# accept requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/user/{nhs_no}")
async def user(nhs_no: int) -> dict:
    """
    Read user information from database.
    """
    try:
        output = search_users_nhs(nhs_no)
    # raise error if no patient found
    except ValueError:
        raise HTTPException(status_code=404, detail="User not found")
    founduser = output[0]
    age = output[1]
    review_since_change = output[2]
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
        "age": age,
        "review_since_change": review_since_change,
    }


@app.post("/user")
async def create_user_fast(new_user: UserCreate) -> dict:
    """
    Create new user using information from React form.
    """
    try:
        inserted_user: User = insert_user(new_user)[0]
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
    """
    Update user information.
    """
    field = list(input.keys())[0]
    value = input[field]
    update_user(nhs_no, field, value)
    return search_users_nhs(nhs_no)


@app.post("/review")
async def create_review_fast(input: AddReview):
    """
    Create review for insertion into database using information in React form.
    """
    try:
        insert_review(input)
    except:
        raise ValueError("Could not insert")
    return "review added"


@app.delete("/review")
async def delete_review_fast(nhs: int, reviewdate: datetime.date) -> None:
    """
    Delete information from a specific review.
    """
    delete_review(nhs, reviewdate)


@app.delete("/user")
async def delete_patient_fast(nhs: int) -> None:
    """
    Delete patient information for specific patient.
    """
    delete_patient(nhs)
