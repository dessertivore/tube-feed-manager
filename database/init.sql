CREATE TABLE patient_data (
   firstname TEXT, 
   lastname TEXT, 
   NHS_no INTEGER PRIMARY KEY,
   dob DATE NOT NULL,
   goal_weight_centile INTEGER
);

INSERT INTO patient_data(firstname, lastname, NHS_no, dob, goal_weight_centile)
VALUES ('dessert', 'ivore', 1111111, '2022-01-02', 33);
-- SELECT firstname FROM patient_data
