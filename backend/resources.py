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
        """
    SELECT
        p.firstname,
        p.lastname,
        p.dob,
        p.lower_wt_goal,
        p.upper_wt_goal,
        f.feed_name,
        f.feed_volume,
        r.review_date,
        r.weight_centile
    FROM
        patient_data.public.patient_data_table p
        LEFT JOIN review_table r ON p.nhs_no = r.nhs_no
        JOIN feed_table f ON p.nhs_no = f.nhs_no
    WHERE
        p.nhs_no = %s;
        """,
        (input_nhsno,),
    ).fetchone()
    #  fetch list of review dates
    cursor.close()
    # assign attributes to user, based on columns of database
    if pulled_data:
        pulleduser = User(
            firstname=pulled_data[0],
            lastname=pulled_data[1],
            dob=pulled_data[2],
            nhs_no=input_nhsno,
            lower_wt_goal=pulled_data[3],
            upper_wt_goal=pulled_data[4],
            reviewed=pulled_data[7],
            currentcentile=pulled_data[8],
            feed=pulled_data[5],
            volume=pulled_data[6],
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

    con.commit()
    # search user in database to check it's there, and return details of saved user
    cursor.close()
    # commit changes to database with code below
    return search_users_nhs(new_user.nhs_no)


def add_review(
    nhs_no: int, review: datetime.date, centile: int, feed: str, volume: int
):
    cursor = con.cursor()
    cursor.execute(
        """INSERT INTO patient_data.public.review_table (nhs_no, review_date, weight_centile) 
                   VALUES (%s, %s, %s);""",
        (nhs_no, review, centile),
    )
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
    user.reviewed.append(review)
    user.currentcentile = centile
    user.feed = feed
    user.volume = volume
