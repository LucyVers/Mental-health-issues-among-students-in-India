-- Financial Stress Analysis Queries
-- Created: April 22, 2025
-- Purpose: Analyze the relationship between financial stress and mental health

-- 1. Basic distribution of financial stress levels and depression rates
SELECT 
    CASE 
        WHEN financialStress = 0 THEN 'No Financial Stress'
        WHEN financialStress <= 2 THEN 'Low Financial Stress'
        WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
        ELSE 'High Financial Stress'
    END as stress_category,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY stress_category
ORDER BY 
    CASE stress_category
        WHEN 'No Financial Stress' THEN 1
        WHEN 'Low Financial Stress' THEN 2
        WHEN 'Moderate Financial Stress' THEN 3
        WHEN 'High Financial Stress' THEN 4
    END;

-- 2. Financial stress correlation with academic performance (CGPA)
SELECT 
    CASE 
        WHEN financialStress = 0 THEN 'No Financial Stress'
        WHEN financialStress <= 2 THEN 'Low Financial Stress'
        WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
        ELSE 'High Financial Stress'
    END as stress_category,
    ROUND(AVG(cgpa), 2) as avg_cgpa,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage,
    COUNT(*) as student_count
FROM studentDepression
GROUP BY stress_category
ORDER BY 
    CASE stress_category
        WHEN 'No Financial Stress' THEN 1
        WHEN 'Low Financial Stress' THEN 2
        WHEN 'Moderate Financial Stress' THEN 3
        WHEN 'High Financial Stress' THEN 4
    END;

-- 3. Financial stress and study hours relationship
SELECT 
    CASE 
        WHEN financialStress = 0 THEN 'No Financial Stress'
        WHEN financialStress <= 2 THEN 'Low Financial Stress'
        WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
        ELSE 'High Financial Stress'
    END as stress_category,
    ROUND(AVG(workStudyHours), 1) as avg_study_hours,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY stress_category
ORDER BY 
    CASE stress_category
        WHEN 'No Financial Stress' THEN 1
        WHEN 'Low Financial Stress' THEN 2
        WHEN 'Moderate Financial Stress' THEN 3
        WHEN 'High Financial Stress' THEN 4
    END;

-- 4. Combined impact of financial stress and sleep
SELECT 
    CASE 
        WHEN financialStress = 0 THEN 'No Financial Stress'
        WHEN financialStress <= 2 THEN 'Low Financial Stress'
        WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
        ELSE 'High Financial Stress'
    END as stress_category,
    sleepDuration,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
WHERE sleepDuration != 'Others'
GROUP BY stress_category, sleepDuration
ORDER BY 
    CASE stress_category
        WHEN 'No Financial Stress' THEN 1
        WHEN 'Low Financial Stress' THEN 2
        WHEN 'Moderate Financial Stress' THEN 3
        WHEN 'High Financial Stress' THEN 4
    END,
    CASE sleepDuration
        WHEN 'Less than 5 hours' THEN 1
        WHEN '5-7 hours' THEN 2
        WHEN '7-9 hours' THEN 3
        WHEN 'More than 9 hours' THEN 4
    END;

-- 5. Financial stress impact by gender
SELECT 
    gender,
    CASE 
        WHEN financialStress = 0 THEN 'No Financial Stress'
        WHEN financialStress <= 2 THEN 'Low Financial Stress'
        WHEN financialStress <= 3.5 THEN 'Moderate Financial Stress'
        ELSE 'High Financial Stress'
    END as stress_category,
    COUNT(*) as student_count,
    ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
FROM studentDepression
GROUP BY gender, stress_category
ORDER BY 
    gender,
    CASE stress_category
        WHEN 'No Financial Stress' THEN 1
        WHEN 'Low Financial Stress' THEN 2
        WHEN 'Moderate Financial Stress' THEN 3
        WHEN 'High Financial Stress' THEN 4
    END; 