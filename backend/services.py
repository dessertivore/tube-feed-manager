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
    Reads all user information linked to specified NHS number.

    Args:
        nhs_no (int): NHS number for patient.

    Raises:
        HTTPException: If no patient with that NHS number in database, raises this
        error.

    Returns:
        dict: Full patient details from database. I plan to change this to a Basemodel
        schema.
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

    Args:
        UserCreate: Basemodel schema specifying information needed for user creation.

    Raises:
        ValueError: If unable to insert user, raises this error "Could not create
        user.".

    Returns:
        dict: with patient information which end-user just typed in. I plan to change
        this to a Basemodel schema.
    """
    try:
        inserted_user: User = insert_user(new_user)[0]
    except:
        raise ValueError("Could not create user.")
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

    Args:
        nhs_no: NHS number of patient to update.
        input: dictionary with information to update patient details with.

    Raises:
        ValueError: if unable to update user, "Could not update user."

    Returns:
       User: updated user information in format of Basemodel User.
    """
    field = list(input.keys())[0]
    value = input[field]
    try:
        update_user(nhs_no, field, value)
    except:
        raise ValueError("Could not update user.")
    return search_users_nhs(nhs_no)


@app.post("/review")
async def create_review_fast(input: AddReview) -> None:
    """
    Create review for a patient in database using information in React form.

    Args:
        AddReview: Basemodel schema specifying information needed for review creation.

    Raises:
        ValueError: if unable to create review, "Could not create review."

    Returns:
        None: nothing is returned if successful.
    """
    try:
        insert_review(input)
    except:
        raise ValueError("Could not create review.")


@app.delete("/review")
async def delete_review_fast(nhs: int, reviewdate: datetime.date) -> None:
    """
    Delete information from a specific review.

    Args:
        nhs: NHS number of patient.
        reviewdate: date of review to be deleted.

    Raises:
        ValueError: if unable to delete review, "Could not delete review."

    Returns:
        None: nothing is returned if sucessful.
    """
    try:
        delete_review(nhs, reviewdate)
    except:
        raise ValueError("Could not delete review.")


@app.delete("/user")
async def delete_patient_fast(nhs: int) -> None:
    """
    Delete patient information for specific patient.

    Args:
        nhs: NHS number of patient.

    Raises:
        ValueError: if unable to delete patient, "Could not delete patient.".

    Returns:
        None: if successful, nothing returned.
    """
    try:
        delete_patient(nhs)
    except:
        raise ValueError("Could not delete patient.")
