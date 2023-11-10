import psycopg
from schemas import User
import datetime


# connect to db with psycopg
con = psycopg.connect(
    dbname="patient_data",
    user="myuser",
    password="password",
    host="localhost",
    port="5432",
)


def search_users_nhs(input_nhsno: int) -> User:
    # fetch records matching inputted NHS no
    cursor = con.cursor()
    pulled_data = cursor.execute(
        "SELECT * FROM patient_data.public.patient_data_table INNER JOIN CONTACT ON nhs_no=%s;",
        (input_nhsno,),
    ).fetchone()
    cursor.close()
    # assign attributes to user, based on columns of database
    if pulled_data:
        firstname: str = pulled_data[0]
        lastname: str = pulled_data[1]
        dob = pulled_data[3]
        nhs_no: int = input_nhsno
        lower_wt_goal: int = pulled_data[4]
        upper_wt_goal: int = pulled_data[5]
        pulleduser = User(
            firstname=firstname,
            lastname=lastname,
            dob=dob,
            nhs_no=nhs_no,
            lower_wt_goal=lower_wt_goal,
            upper_wt_goal=upper_wt_goal,
        )
        return pulleduser
    else:
        raise ValueError


def insert_user(new_user: User) -> User:
    cursor = con.cursor()
    cursor.execute(
        """INSERT INTO patient_data.public.patient_data_table (nhs_no, firstname, lastname, dob, lower_wt_goal, upper_wt_goal) 
                   VALUES (%s, %s, %s, %s, %s, %s);""",
        (
            new_user.nhs_no,
            new_user.firstname,
            new_user.lastname,
            new_user.dob,
            new_user.lower_wt_goal,
            new_user.upper_wt_goal,
        ),
    )
    cursor.execute(
        """INSERT INTO patient_data.public.feed_table (nhs_no, feed_name, feed_volume) 
                   VALUES (%s, %s, %s);""",
        (
            new_user.nhs_no,
            new_user.feed,
            new_user.volume,
        ),
    )
    new_user.reviewed = []
    cursor.close()
    # commit changes to database with code below
    con.commit()
    # search user in database to check it's there, and return details of saved user
    return search_users_nhs(new_user.nhs_no)


def add_review(nhs_no: int, review: datetime.date, centile: int):
    cursor = con.cursor()
    cursor.execute(
        """INSERT INTO patient_data.public.review_table (nhs_no, review_date, weight_centile) 
                   VALUES (%s, %s, %s);""",
        (nhs_no, review, centile),
    )
    cursor.close()
    # commit changes to database with code below
    con.commit()
    # search user in database to check it's there, and return details of saved user
    user = search_users_nhs(nhs_no)
    user.reviewed.append(review)
    user.currentcentile = centile


def change_feed(nhs_no: int, feed: str, volume: int):
    cursor = con.cursor()
    cursor.execute(
        """INSERT INTO patient_data.public.feed_table (nhs_no, feed_name, feed_volume) 
                VALUES (%s, %s, %s);""",
        (nhs_no, feed, volume),
    )
    cursor.close()
    # commit changes to database with code below
    con.commit()
    # search user in database to check it's there, and return details of saved user
    user = search_users_nhs(nhs_no)
    user.feed = feed
    user.volume = volume
