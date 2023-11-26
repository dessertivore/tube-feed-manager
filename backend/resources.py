import psycopg
from psycopg import sql

from schemas import User, UserCreate, UserUpdate, AddReview
import datetime
from datetime import date, timedelta


# connect to db with psycopg
con = psycopg.connect(
    dbname="patient_data",
    user="myuser",
    password="password",
    host="localhost",
    port="5432",
)


def search_users_nhs(input_nhsno: int) -> [User, int, str]:
    # fetch records matching inputted NHS no
    cursor = con.cursor()
    pulled_data = cursor.execute(
        """
    WITH review_data AS (
    SELECT 
        r.nhs_no,
        array_agg(r.weight_centile) as weights,
        array_agg(r.review_date) as reviews
    FROM
        patient_data.public.review_table r
    WHERE
        r.nhs_no = %s
    GROUP BY
        r.nhs_no
    )

    SELECT
        p.firstname,
        p.lastname,
        p.dob,
        p.lower_wt_goal,
        p.upper_wt_goal,
        f.feed_name,
        f.feed_volume,
		rd.weights,
		rd.reviews
    FROM
        patient_data.public.patient_data_table p
    	LEFT JOIN review_data rd ON p.nhs_no = rd.nhs_no
        JOIN patient_data.public.feed_table f ON p.nhs_no = f.nhs_no
    WHERE
        p.nhs_no = %s
        """,
        (input_nhsno, input_nhsno),
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
            feed=pulled_data[5],
            volume=pulled_data[6],
            reviewed=[],
            currentcentile=0,
            allcentiles=[],
        )
        age = int((date.today() - (pulleduser.dob)) / timedelta(days=365.2425))
        reviewed_since_change = "No"
        if pulled_data[7] is not None:
            pulleduser.reviewed = pulled_data[8]
            pulleduser.allcentiles = pulled_data[7]
            pulleduser.currentcentile = pulleduser.allcentiles[0]
            # check if reviewed since nutr requirements changed at 1y, 4y, 7y, 11y and 15y
            review_checkpoints = [1, 4, 7, 11, 15]

            for x in review_checkpoints:
                if age >= x:
                    closest_checkpoint = x
                    continue
                elif age < x:
                    break
            # find date at which child's req changed most recently
            req_change = pulleduser.dob + datetime.timedelta(
                days=closest_checkpoint * 365
            )
            if (pulleduser.reviewed[0] - req_change).days > 0:
                reviewed_since_change = "Yes"
        return pulleduser, age, reviewed_since_change
    else:
        raise ValueError


def insert_user(new_user: UserCreate) -> UserCreate:
    try:
        search_users_nhs(new_user.nhs_no)
    except:
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

        con.commit()
        # search user in database to check it's there, and return details of saved user
        cursor.close()
        # commit changes to database with code below
        return search_users_nhs(new_user.nhs_no)
    else:
        raise ValueError("User already exists")


def add_review(input: AddReview) -> None:
    cursor = con.cursor()
    cursor.execute(
        """INSERT INTO patient_data.public.review_table (nhs_no, review_date, weight_centile) 
                   VALUES (%s, %s, %s);""",
        (input.nhs_no, input.review_date, input.weight_centile),
    )
    cursor.execute(
        """
        INSERT INTO patient_data.public.feed_table (nhs_no, feed_name, feed_volume) 
            VALUES (%s, %s, %s)
            ON CONFLICT (nhs_no) DO UPDATE SET
            feed_name = %s,
            feed_volume = %s
            WHERE
            patient_data.public.feed_table.nhs_no = %s
            """,
        (
            input.nhs_no,
            input.feed_name,
            input.feed_volume,
            input.feed_name,
            input.feed_volume,
            input.nhs_no,
        ),
    )
    cursor.close()
    # commit changes to database with code below
    con.commit()
    # search user in database to check it's there, and return details of saved user
    user: User = search_users_nhs(input.nhs_no)[0]
    if user.reviewed == None:
        user.reviewed = [input.review_date]
        user.allcentiles = [input.weight_centile]
    if user.reviewed:
        user.reviewed.append(input.review_date)
        user.allcentiles.append(input.weight_centile)
    user.currentcentile = input.weight_centile
    user.feed = input.feed_name
    user.volume = input.feed_volume


def delete_review(nhs_no: int, review_date: datetime.date) -> str:
    cursor = con.cursor()
    cursor.execute(
        """
        DELETE FROM patient_data.public.review_table
        WHERE nhs_no = %s AND review_date = %s; 
        """,
        (nhs_no, review_date),
    )
    cursor.close()
    # commit changes to database with code below
    con.commit()
    return "Review deleted"


def delete_patient(nhs_no: int) -> str:
    cursor = con.cursor()
    cursor.execute(
        """
        DELETE FROM patient_data.public.review_table
        WHERE nhs_no = %s; 
        """,
        (nhs_no,),
    )
    cursor.execute(
        """
        DELETE FROM patient_data.public.feed_table
        WHERE nhs_no = %s; 
        """,
        (nhs_no,),
    )
    cursor.execute(
        """
        DELETE FROM patient_data.public.patient_data_table
        WHERE nhs_no = %s; 
        """,
        (nhs_no,),
    )
    cursor.close()
    con.commit()
    return "Patient data deleted"


def update_user(nhs_no: int, field, value) -> User:
    try:
        search_users_nhs(nhs_no)
    except:
        ValueError("User not found")
    if field == "feed_name" or field == "feed_volume":
        query = sql.SQL(
            "UPDATE public.feed_table SET {field} = %s WHERE nhs_no = %s"
        ).format(field=sql.Identifier(field))
        cursor = con.cursor()
        cursor.execute(
            query,
            (
                value,
                nhs_no,
            ),
        )
        cursor.close()
        con.commit()
    else:
        query = sql.SQL(
            "UPDATE public.patient_data_table SET {field} = %s WHERE nhs_no = %s"
        ).format(field=sql.Identifier(field))
        cursor = con.cursor()
        cursor.execute(
            query,
            (
                value,
                nhs_no,
            ),
        )
        cursor.close()
        con.commit()
    return search_users_nhs(nhs_no)
