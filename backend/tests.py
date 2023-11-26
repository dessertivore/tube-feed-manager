from resources import (
    search_users_nhs,
    insert_user,
    add_review,
    delete_review,
    update_user,
)
from schemas import User, UserCreate, AddReview
import datetime

# test search
assert search_users_nhs(111).firstname == "dessert", "Should return user 'dessert'"

# test search and find reviews
assert search_users_nhs(222).reviewed == [datetime.date(2021, 1, 1)]
assert search_users_nhs(333).reviewed == [
    datetime.date(2020, 12, 12),
    datetime.date(2021, 2, 2),
]

testUser = UserCreate(
    firstname="charles",
    lastname="darwin",
    nhs_no=444,
    lower_wt_goal=2,
    upper_wt_goal=9,
    feed="ensure plus fibre",
    volume=800,
    dob=datetime.date(2010, 9, 25),
)

# test insert, then test inserting same user again
assert insert_user(testUser).firstname == "charles"
assert insert_user(testUser) == "User already exists"

testreview = AddReview(
    444, datetime.date(2015, 11, 4), 35, "paediasure plus fibre", 700
)
add_review(testreview)
assert delete_review(444, (datetime.date(2015, 11, 4))) == "Review deleted"

assert update_user(111, "firstname", "pudding").firstname == "pudding"
