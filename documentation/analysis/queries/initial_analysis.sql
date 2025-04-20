-- Initial Analysis Queries
-- Created: April 20, 2025
-- Purpose: Basic exploration of the student depression dataset

-- 1. Basic statistics about depression
SELECT 
    COUNT(*) as total_students,
    SUM(depression) as depressed_count,
    ROUND(CAST(SUM(depression) AS FLOAT) / COUNT(*) * 100, 2) as depression_percentage
FROM studentDepression;

-- 2. Depression rates by gender
SELECT 
    gender,
    COUNT(*) as total,
    SUM(depression) as depressed_count,
    ROUND(CAST(SUM(depression) AS FLOAT) / COUNT(*) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY gender
ORDER BY depression_percentage DESC;

-- 3. Average academic and work pressure for depressed vs non-depressed students
SELECT 
    depression,
    ROUND(AVG(academicPressure), 2) as avg_academic_pressure,
    ROUND(AVG(workPressure), 2) as avg_work_pressure,
    COUNT(*) as student_count
FROM studentDepression
GROUP BY depression;

-- 4. Sleep patterns and depression
SELECT 
    sleepDuration,
    COUNT(*) as total_students,
    SUM(depression) as depressed_count,
    ROUND(CAST(SUM(depression) AS FLOAT) / COUNT(*) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY sleepDuration
ORDER BY depression_percentage DESC;

-- Note: These are initial exploratory queries. 
-- Results will help guide more detailed analysis. 