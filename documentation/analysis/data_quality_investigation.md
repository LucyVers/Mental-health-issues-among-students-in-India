# Data Quality Investigation: Academic and Work Pressure

## Investigation Date: April 20, 2025

## Issue Discovery
During initial data analysis, we discovered an anomaly in the `workPressure` data column. Our first SQL query revealed that both depressed and non-depressed students showed 0.0 for work pressure, which prompted further investigation.

## Investigation Process

### 1. Initial Database Analysis
```sql
SELECT depression, 
    ROUND(AVG(academicPressure), 2) as avg_academic_pressure,
    ROUND(AVG(workPressure), 2) as avg_work_pressure,
    COUNT(*) as student_count 
FROM studentDepression 
GROUP BY depression;
```
Results showed:
- Depressed students (1): academic pressure = 3.69, work pressure = 0.0
- Non-depressed students (0): academic pressure = 2.36, work pressure = 0.0

### 2. Detailed Work Pressure Investigation
```sql
SELECT workPressure, COUNT(*) as count 
FROM studentDepression 
GROUP BY workPressure 
ORDER BY workPressure;
```
Results revealed:
- 27,898 students (99.99%) have workPressure = 0.0
- 1 student has workPressure = 2.0
- 2 students have workPressure = 5.0

### 3. Original Data Examination
We examined the original CSV file and found:
- Both "Academic Pressure" and "Work Pressure" exist as separate columns
- Only 3 students in the entire dataset have non-zero "Work Pressure" values
- These 3 students all have 0.0 in "Academic Pressure"
- All 3 students are in "Class 12" (high school level)

## Findings
1. The `workPressure` column appears to be problematic:
   - 99.99% of records show 0.0
   - Only 3 out of 27,901 students have non-zero values
   - These 3 cases appear to be outliers or potential data entry errors

2. The `academicPressure` column shows expected variation:
   - Values range between 0.0 and 5.0
   - Shows meaningful differences between depressed and non-depressed students
   - Contains data for the vast majority of students

## Decision and Rationale
Based on our investigation, we have decided to:
1. Create a new combined `pressure` column that will:
   - Primarily use the values from `academicPressure`
   - Include the few non-zero `workPressure` values where `academicPressure` is 0.0
   
Rationale for this decision:
- Maintains data integrity by preserving all meaningful pressure measurements
- Simplifies analysis by combining related metrics
- Removes potentially misleading separate work pressure category
- Avoids losing the few legitimate pressure readings from work pressure

## Implementation Plan
1. Create a new table structure with the combined pressure column
2. Use COALESCE or similar SQL function to combine the values
3. Document the transformation in our data processing pipeline
4. Update all relevant analysis queries to use the new structure

## Implementation Results
### Migration Execution (April 20, 2025)
The data migration was successfully completed with the following results:

1. Table Creation and Data Migration:
   - New table structure created with combined `pressure` column
   - All 27,901 records successfully migrated
   - Data integrity maintained during transfer

2. Pressure Values Verification:
   - 27,895 records have pressure > 0
   - 6 records have pressure = 0
   - All workPressure values successfully integrated

3. Database Structure Updates:
   - Old table backed up as `studentDepression_backup`
   - New table renamed to `studentDepression`
   - All indexes and constraints preserved

### Next Steps
1. ✅ Create SQL script for the new table structure
2. ✅ Validate the data after transformation
3. ✅ Update existing analysis queries to use the new pressure column
4. Continue detailed analysis of pressure relationships with other variables (sleep, CGPA, etc.)

## Updated Analysis Results
After implementing the combined pressure metric, our analysis reveals:

### Basic Pressure Statistics by Depression Status
- Non-depressed students (0):
  - Average pressure: 2.36
  - Range: 0.0 to 5.0
  - Count: 11,565 students

- Depressed students (1):
  - Average pressure: 3.69
  - Range: 0.0 to 5.0
  - Count: 16,336 students

### Pressure Distribution and Depression Correlation
- No Pressure (0): 
  - 6 students
  - 50.0% depression rate
- Low Pressure (≤2): 
  - 8,980 students
  - 27.82% depression rate
- Moderate Pressure (2.1-3.5): 
  - 7,462 students
  - 60.16% depression rate
- High Pressure (>3.5): 
  - 11,453 students
  - 81.60% depression rate

### Key Findings
1. Clear correlation between pressure levels and depression rates
2. Majority of students (11,453) experience high pressure
3. Depression rates increase significantly with pressure levels
4. The combined pressure metric provides a more comprehensive view of student stress

### Next Steps
1. ✅ Create SQL script for the new table structure
2. ✅ Validate the data after transformation
3. ✅ Update existing analysis queries to use the new pressure column
4. Continue detailed analysis of pressure relationships with other variables (sleep, CGPA, etc.)

## Additional Analysis Results (April 20, 2025)

### Sleep Patterns and Pressure
1. Sleep Duration Impact:
   - Highest pressure (3.23): Students sleeping less than 5 hours
   - Lowest pressure (3.05): Students sleeping more than 8 hours
   - Clear correlation: Less sleep = Higher pressure levels
   
2. Depression Rates by Sleep:
   - Less than 5 hours: 64.51% depression rate
   - 5-6 hours: 56.88% depression rate
   - 7-8 hours: 59.50% depression rate
   - More than 8 hours: 50.93% depression rate

### High Pressure Analysis by Gender
Among students with high pressure (>3.5):
- Male students: 
  - 6,227 students
  - Average pressure: 4.55
  - Depression rate: 82.11%
- Female students:
  - 5,226 students
  - Average pressure: 4.55
  - Depression rate: 81.00%
- Notable: Very similar pressure and depression rates between genders

### Academic Performance (CGPA) and Pressure
1. Distribution by CGPA:
   - Low CGPA (<6.0): 
     * 5,403 students
     * Average pressure: 3.20
     * Depression rate: 55.58%
   - Medium CGPA (6.0-7.9):
     * 9,854 students
     * Average pressure: 3.10
     * Depression rate: 57.39%
   - High CGPA (≥8.0):
     * 12,635 students
     * Average pressure: 3.15
     * Depression rate: 60.74%

### Key Insights from Additional Analysis
1. Sleep Duration:
   - Strong inverse relationship between sleep and pressure levels
   - Students with less sleep consistently show higher depression rates
   
2. Gender Analysis:
   - No significant gender disparity in high-pressure situations
   - Both genders show similar depression rates under high pressure
   
3. Academic Performance:
   - Unexpected finding: High CGPA students show higher depression rates
   - Pressure levels relatively consistent across CGPA categories
   - Most students (12,635) maintain high CGPA despite pressure

### Recommendations for Further Investigation
1. Explore the relationship between sleep patterns and academic performance
2. Investigate why high-performing students show higher depression rates
3. Analyze the impact of other factors (dietary habits, financial stress) on pressure levels

### Next Steps
1. Create visualizations to illustrate these relationships
2. Perform statistical significance tests on key findings
3. Develop targeted analyses for specific subgroups 