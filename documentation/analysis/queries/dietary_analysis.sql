-- Dietary Habits Analysis
-- Date: April 20, 2025
-- Purpose: Analyze the relationship between dietary habits, pressure, and depression

-- 1. Basic distribution of dietary habits
SELECT 
    dietaryHabits,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage,
    ROUND(AVG(pressure), 2) as avg_pressure
FROM studentDepression
GROUP BY dietaryHabits
ORDER BY student_count DESC;

-- 2. Dietary habits impact on high-pressure students
SELECT 
    dietaryHabits,
    COUNT(*) as student_count,
    ROUND(AVG(pressure), 2) as avg_pressure,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
WHERE pressure > 3.5  -- High pressure threshold
GROUP BY dietaryHabits
ORDER BY depression_percentage DESC;

-- 3. Combined analysis of dietary habits and sleep patterns
SELECT 
    dietaryHabits,
    sleepDuration,
    COUNT(*) as student_count,
    ROUND(AVG(pressure), 2) as avg_pressure,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
WHERE sleepDuration != 'Others'
GROUP BY dietaryHabits, sleepDuration
ORDER BY dietaryHabits, 
    CASE sleepDuration
        WHEN 'Less than 5 hours' THEN 1
        WHEN '5-6 hours' THEN 2
        WHEN '7-8 hours' THEN 3
        WHEN 'More than 8 hours' THEN 4
    END;

-- 4. Dietary habits correlation with academic performance
SELECT 
    dietaryHabits,
    CASE 
        WHEN cgpa >= 8.0 THEN 'High CGPA (≥8.0)'
        WHEN cgpa >= 6.0 THEN 'Medium CGPA (6.0-7.9)'
        ELSE 'Low CGPA (<6.0)'
    END as cgpa_category,
    COUNT(*) as student_count,
    ROUND(AVG(pressure), 2) as avg_pressure,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
WHERE cgpa > 0
GROUP BY dietaryHabits, cgpa_category
ORDER BY dietaryHabits, 
    CASE cgpa_category
        WHEN 'Low CGPA (<6.0)' THEN 1
        WHEN 'Medium CGPA (6.0-7.9)' THEN 2
        WHEN 'High CGPA (≥8.0)' THEN 3
    END; 