CREATE TABLE patient_data_table (
   firstname TEXT, 
   lastname TEXT, 
   NHS_no INTEGER PRIMARY KEY,
   dob DATE NOT NULL,
   lower_wt_goal INTEGER,
   upper_wt_goal INTEGER
);

CREATE TABLE review_table (
   NHS_no INTEGER PRIMARY KEY,
   review_date DATE,
   weight_centile INTEGER
);

CREATE TABLE feed_table (
   NHS_no INTEGER PRIMARY KEY,
   feed_name TEXT,
   feed_volume INTEGER
);

-- INSERT INTO patient_data_table(firstname, lastname, NHS_no, dob, lower_wt_goal, upper_wt_goal)

--  insert test case - dessert ivore
-- VALUES ('dessert', 'ivore', 1111111, '2022-01-02', 25, 50);

