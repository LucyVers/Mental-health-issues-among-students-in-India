-- Create new table with combined pressure column
-- Date: April 20, 2025

-- First, create the new table structure
CREATE TABLE IF NOT EXISTS studentDepressionNew (
    id INTEGER PRIMARY KEY,
    gender TEXT,
    age REAL,
    city TEXT,
    profession TEXT,
    pressure REAL,  -- Combined pressure metric
    cgpa REAL,
    studySatisfaction REAL,
    jobSatisfaction REAL,
    sleepDuration TEXT,
    dietaryHabits TEXT,
    degree TEXT,
    suicidalThoughts TEXT,
    workStudyHours REAL,
    financialStress REAL,
    familyHistoryMentalIllness TEXT,
    depression INTEGER
);

-- Insert data with combined pressure values
INSERT INTO studentDepressionNew 
SELECT 
    id,
    gender,
    age,
    city,
    profession,
    CASE 
        WHEN workPressure > 0 THEN workPressure  -- Use workPressure if it exists
        ELSE academicPressure                    -- Otherwise use academicPressure
    END as pressure,
    cgpa,
    studySatisfaction,
    jobSatisfaction,
    sleepDuration,
    dietaryHabits,
    degree,
    suicidalThoughts,
    workStudyHours,
    financialStress,
    familyHistoryMentalIllness,
    depression
FROM studentDepression;

-- Verify the data migration
SELECT 
    'Total records in old table: ' || COUNT(*) as count_check
FROM studentDepression
UNION ALL
SELECT 
    'Total records in new table: ' || COUNT(*) as count_check
FROM studentDepressionNew;

-- Verify pressure values migration
SELECT 
    'Records with pressure = 0: ' || COUNT(*) as pressure_check
FROM studentDepressionNew 
WHERE pressure = 0
UNION ALL
SELECT 
    'Records with pressure > 0: ' || COUNT(*) as pressure_check
FROM studentDepressionNew 
WHERE pressure > 0;

-- If everything looks good, you can rename the tables
-- DROP TABLE IF EXISTS studentDepression_backup;
-- ALTER TABLE studentDepression RENAME TO studentDepression_backup;
-- ALTER TABLE studentDepressionNew RENAME TO studentDepression; 