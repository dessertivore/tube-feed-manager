CREATE TABLE patient_data_table (
   firstname TEXT, 
   lastname TEXT, 
   NHS_no INTEGER PRIMARY KEY,
   dob DATE NOT NULL,
   lower_wt_goal INTEGER,
   upper_wt_goal INTEGER
);

CREATE TABLE review_table (
   NHS_no INTEGER REFERENCES patient_data_table(NHS_no),
   review_date DATE,
   weight_centile INTEGER
);

CREATE TABLE feed_table (
   NHS_no INTEGER UNIQUE REFERENCES patient_data_table(NHS_no),
   feed_name TEXT,
   feed_volume INTEGER
);


--  insert test case with no reviews
INSERT INTO patient_data_table(firstname, lastname, NHS_no, dob, lower_wt_goal, upper_wt_goal)
VALUES ('dessert', 'ivore', 111, '2022-01-02', 25, 50);

INSERT INTO feed_table(NHS_no, feed_name, feed_volume)
VALUES ('111', 'paediasure plus', '400');

-- insert test case with 1 review
INSERT INTO patient_data_table(firstname, lastname, NHS_no, dob, lower_wt_goal, upper_wt_goal)
VALUES ('kathryn', 'janeway', 222, '2020-07-03', 2, 9);

INSERT INTO feed_table(NHS_no, feed_name, feed_volume)
VALUES ('222', 'similac high energy', '600');

INSERT INTO review_table(NHS_no, review_date, weight_centile)
VALUES ('222', '2021-01-01', 25);

-- insert test case with multiple reviews
INSERT INTO patient_data_table(firstname, lastname, NHS_no, dob, lower_wt_goal, upper_wt_goal)
VALUES ('jim', 'kirk', 333, '2019-04-10', 50, 75);

INSERT INTO feed_table(NHS_no, feed_name, feed_volume)
VALUES ('333', 'ensure plus', '750');

INSERT INTO review_table(NHS_no, review_date, weight_centile)
VALUES ('333', '2020-12-12', 55), ('333', '2021-02-02', 60);