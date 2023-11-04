import psycopg
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime


class UserRequest(BaseModel):
    NHS_no: int


class User(BaseModel):
    firstname: str
    lastname: str
    dob: datetime.date
    weight_goal: int


app = FastAPI()

# connect to db with psycopg
con = psycopg.connect(
    dbname="patient_data",
    user="myuser",
    password="password",
    host="localhost",
    port="5432",
)

# accept requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# cursor = con.cursor()
# user: tuple = cursor.execute("SELECT * FROM patient_data;").fetchone()
# cursor.close()
# con.close()

# print(user)
# userclass = User(user)
# print(userclass)


def search_users_nhs(input_nhsno):
    # fetch records matching inputted NHS no
    cursor = con.cursor()
    pulled_data = cursor.execute(
        "SELECT * FROM patient_data WHERE nhs_no=%s;",
        (input_nhsno,),
    ).fetchone()
    cursor.close()
    # assign attributes to user, based on columns of database
    firstname: str = pulled_data[0]
    lastname: str = pulled_data[1]
    dob = pulled_data[3]
    nhs_no: int = input_nhsno
    weight_goal: int = pulled_data[4]
    pulleduser = User(
        firstname=firstname,
        lastname=lastname,
        dob=dob,
        nhs_no=nhs_no,
        weight_goal=weight_goal,
    )
    return pulleduser


# set variables to input and output from api - in this case find a user if you input nhs


@app.get("/user/{nhs_no}")
async def user(nhs_no: int):
    # nhs_no = data
    # find pt
    founduser = search_users_nhs(nhs_no)
    return {
        "firstname": founduser.firstname,
        "lastname": founduser.lastname,
        "dob": founduser.dob,
        "goalcentile": founduser.weight_goal,
    }
