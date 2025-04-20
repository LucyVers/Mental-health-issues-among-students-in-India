-- Updated Analysis Queries
-- Date: April 20, 2025
-- Purpose: Updated queries to use the new combined pressure column
-- Note: These queries replace the ones in initial_analysis.sql

-- 1. Basic statistics about depression and pressure
-- Changed from: separate academicPressure and workPressure
-- To: combined pressure metric
SELECT 
    depression,
    COUNT(*) as student_count,
    ROUND(AVG(pressure), 2) as avg_pressure,
    ROUND(MIN(pressure), 2) as min_pressure,
    ROUND(MAX(pressure), 2) as max_pressure,
    ROUND(AVG(CASE WHEN pressure > 0 THEN pressure END), 2) as avg_pressure_excluding_zeros
FROM studentDepression
GROUP BY depression
ORDER BY depression;

-- 2. Pressure distribution analysis
-- New query to understand pressure levels across the dataset
SELECT 
    CASE 
        WHEN pressure = 0 THEN 'No Pressure'
        WHEN pressure <= 2 THEN 'Low Pressure'
        WHEN pressure <= 3.5 THEN 'Moderate Pressure'
        ELSE 'High Pressure'
    END as pressure_category,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY pressure_category
ORDER BY 
    CASE pressure_category
        WHEN 'No Pressure' THEN 1
        WHEN 'Low Pressure' THEN 2
        WHEN 'Moderate Pressure' THEN 3
        WHEN 'High Pressure' THEN 4
    END;

-- 3. Correlation between pressure and other factors
-- New comprehensive analysis
SELECT 
    ROUND(AVG(pressure), 2) as avg_pressure,
    sleepDuration,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY sleepDuration
ORDER BY avg_pressure DESC;

-- 4. High pressure impact analysis
-- New query focusing on high-pressure cases
SELECT 
    gender,
    COUNT(*) as total_students,
    ROUND(AVG(pressure), 2) as avg_pressure,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
WHERE pressure > 3.5  -- High pressure threshold
GROUP BY gender
ORDER BY avg_pressure DESC;

-- 5. Pressure and academic performance correlation
-- New analysis combining pressure with CGPA
SELECT 
    CASE 
        WHEN cgpa >= 8.0 THEN 'High CGPA (≥8.0)'
        WHEN cgpa >= 6.0 THEN 'Medium CGPA (6.0-7.9)'
        ELSE 'Low CGPA (<6.0)'
    END as cgpa_category,
    COUNT(*) as student_count,
    ROUND(AVG(pressure), 2) as avg_pressure,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
WHERE cgpa > 0  -- Excluding invalid CGPA
GROUP BY cgpa_category
ORDER BY avg_pressure DESC;

-- Note: These updated queries now use the combined 'pressure' column
-- instead of the previous separate academicPressure and workPressure columns.
-- The new queries provide a more comprehensive analysis of how pressure
-- relates to depression and other factors in the dataset. 