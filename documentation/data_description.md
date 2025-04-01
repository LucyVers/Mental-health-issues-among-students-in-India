# Dataset Description

## Overview
This dataset contains responses from a survey conducted among university students in India, focusing on mental health and related factors.

## Dataset Details
- Source: Survey of university students in India
- Size: 27,900 responses
- Format: CSV (to be converted to SQLite)
- Collection Period: [To be added]
- Geographic Coverage: India

## Data Structure Corrections (April 1, 2025)

### Column Specifications
1. id (INTEGER PRIMARY KEY)
2. gender (TEXT)
3. age (REAL)
4. city (TEXT)
5. profession (TEXT)
6. academicPressure (REAL)
7. workPressure (REAL)
8. cgpa (REAL)
9. studySatisfaction (REAL)
10. jobSatisfaction (REAL)
11. sleepDuration (TEXT)
12. dietaryHabits (TEXT)
13. degree (TEXT)
14. suicidalThoughts (TEXT) - Values: "Yes"/"No"
15. workStudyHours (REAL) - Combined hours for work and study
16. financialStress (REAL) - Numeric value representing stress level
17. familyHistoryMentalIllness (TEXT) - Values: "Yes"/"No"
18. depression (INTEGER) - Binary indicator (1/0)

### Data Type Decisions
- TEXT for categorical variables (gender, city, profession, etc.)
- REAL for numeric measurements (age, pressure levels, satisfaction scores)
- INTEGER for binary outcomes (depression)
- Original Yes/No format maintained for categorical binary variables

### Important Notes
- Work/Study Hours kept as single column to maintain data integrity
- Financial Stress maintained as numeric value for statistical analysis
- Yes/No responses preserved in original format
- Depression stored as INTEGER but represents binary outcome

## Data Transformations
[To be documented during import process]

## Data Quality Checks
- Verify all Yes/No fields maintain original format
- Ensure no NULL values in depression column
- Validate numeric ranges for all REAL fields
- Confirm data integrity after import

## Notes
- All transformations will be documented
- Original data formats preserved where possible
- Changes from previous version documented and justified

## Data Transformation Requirements

### Column Naming Conventions
- Use camelCase for all column names (e.g., sleepDuration instead of "Sleep Duration")
- Avoid spaces and special characters
- Keep names descriptive but concise
- Examples of transformations:
  - "Sleep Duration" → sleepDuration
  - "Study Time" → studyTime
  - "Work Load" → workLoad

### Data Type Transformations
1. Sleep Duration:
   - Current: Text-based data
   - Transformation: Convert to numeric ranges
   - Example: "Less than 5 hours" → 1, "5-7 hours" → 2, etc.

2. Work/Study Hours:
   - Original: Combined "Work/Study Hours" column
   - Decision: Split into two separate columns
   - Rationale:
     - Enables separate analysis of work and study impact
     - Allows for better understanding of time distribution
     - Facilitates correlation analysis between work hours, study hours, and depression
     - Helps identify patterns in different student groups (full-time students vs. working students)
   - Implementation:
     - studyHours (REAL): Hours spent on academic activities
     - workHours (REAL): Hours spent on employment
   - Benefits:
     - More detailed analysis possibilities
     - Better data granularity
     - Clearer insights into student workload distribution
     - Enhanced ability to study work-study balance effects

3. Other Potential Transformations:
   - [To be added after analyzing dataset]
   - [To be added after analyzing dataset]
   - [To be added after analyzing dataset]

### Import Process
1. Create SQLite database
2. Design table structure following naming conventions
3. Import CSV data using SQLiteStudio's import wizard
4. Transform data types where needed
5. Validate data integrity

## Variables
[To be completed after analyzing the dataset]

### Demographics
- [To be added]

### Mental Health Indicators
- [To be added]

### Academic Factors
- [To be added]

### Lifestyle Factors
- [To be added]

## Data Quality
- [To be added]

## Missing Values
- [To be added]

## Notes
- All data transformations will be documented here
- Original data will be preserved
- Transformations will be reversible
- Each transformation will be justified
- This document will be updated as we analyze the dataset
- All data transformations and cleaning steps will be documented here

## Data Import Status (April 1, 2025)
### Successful Import Verification
- Total records imported: 27,901
- Data integrity confirmed for all columns
- Data formats preserved as intended:
  - familyHistoryMentalIllness: Text format ("Yes"/"No")
  - financialStress: Numeric values maintained
  - depression: Integer values (no NULL values)
  - workStudyHours: Single column with combined hours

### Next Steps
1. Perform initial data analysis
2. Create necessary indexes for performance
3. Begin statistical analysis as per project requirements

## Data Quality Verification
- All columns imported with correct data types
- No unexpected NULL values
- Text fields maintain original formatting
- Numeric fields preserve original values
- Binary fields (Yes/No) maintain correct format 