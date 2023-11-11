from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from resources import search_users_nhs, insert_user, add_review
from schemas import User

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
    # nhs_no = data
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
        "reviewed": founduser.reviewed,
        "feed_name": founduser.feed,
        "feed_volume": founduser.volume,
    }


@app.post("/insertuser")
async def new_user(new_user: User) -> dict:
    inserted_user = insert_user(new_user)
    return {
        "nhs_no": inserted_user.nhs_no,
        "firstname": inserted_user.firstname,
        "lastname": inserted_user.lastname,
        "dob": inserted_user.dob,
        "lowergoalcentile": inserted_user.lower_wt_goal,
        "uppergoalcentile": inserted_user.upper_wt_goal,
        "reviewed": inserted_user.reviewed,
        "currentcentile": inserted_user.currentcentile,
        "feed": inserted_user.feed,
        "volume": inserted_user.volume,
    }


@app.post("/review")
async def add_review_fast(nhs, reviewdate, weightcentile, feedname, feedvolume) -> str:
    add_review(nhs, reviewdate, weightcentile, feedname, feedvolume)
    return "review added"