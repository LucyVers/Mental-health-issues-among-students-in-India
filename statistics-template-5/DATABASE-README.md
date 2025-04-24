# Database Documentation for Student Depression Project

## Database Information
- **Database file:** `student_depression.db`
- **Location:** `/sqlite-databases/`
- **Last updated:** April 20, 2025

## Table Structure
The database contains a table `studentDepression` with the following schema:

```sql
CREATE TABLE IF NOT EXISTS "studentDepression" (
    id INTEGER PRIMARY KEY,
    gender TEXT,
    age REAL,
    city TEXT,
    profession TEXT,
    pressure REAL,  -- Combined pressure metric
    cgpa REAL,
    studySatisfaction REAL,
    jobSatisfaction REAL,
    sleepDuration TEXT,  -- NOTE: Values contain single quotes
    dietaryHabits TEXT,
    degree TEXT,
    suicidalThoughts TEXT,
    workStudyHours REAL,
    financialStress REAL,
    familyHistoryMentalIllness TEXT,
    depression INTEGER  -- 0 or 1
);
```

## Important Data Formats and Issues

### sleepDuration
- Values are stored with single quotes: `'5-6 hours'` but SQL queries should use only one set of quotes
- Correct CASE expression for sorting:
  ```sql
  CASE 
    WHEN sleepDuration = 'Less than 5 hours' THEN 1
    WHEN sleepDuration = '5-6 hours' THEN 2
    WHEN sleepDuration = '7-8 hours' THEN 3
    WHEN sleepDuration = 'More than 8 hours' THEN 4
    ELSE 5
  END
  ```
- When displaying values in JavaScript, remove the quotes:
  ```javascript
  const displayValue = row.sleepDuration.replace(/^'|'$/g, '');
  ```

### depression
- Binary value: 0 (not depressed) or 1 (depressed)
- For percentage calculations:
  ```sql
  ROUND(AVG(CAST(depression as FLOAT)) * 100, 2) as depression_percentage
  ```

## Helper Functions for Sleep Data

To ensure consistent handling of sleep duration values across the application, use the helper functions in `js/libs/handleSleepData.js`:

```javascript
import { 
  cleanSleepDuration, 
  convertSleepToHours,
  getSQLSleepDuration,
  getSleepDurationCaseStatement,
  getValidSleepDurations,
  interpretSleepDuration
} from './libs/handleSleepData.js';

// Remove quotes from sleep duration value
const cleanDuration = cleanSleepDuration(row.sleepDuration); // 'Less than 5 hours'

// Convert to approximate hours
const hours = convertSleepToHours(row.sleepDuration); // 4.5

// Get SQL-ready value with quotes
const sqlDuration = getSQLSleepDuration('Less than 5 hours'); // "'Less than 5 hours'"

// Get ready-to-use CASE statement for SQL queries
const caseStatement = getSleepDurationCaseStatement();

// Get all valid sleep durations (with or without quotes)
const validDurations = getValidSleepDurations();
const sqlDurations = getValidSleepDurations(true);

// Interpret the sleep duration
const interpretation = interpretSleepDuration(row.sleepDuration);
```

## Example Code

### Successful SQL Query for sleepDuration
```sql
SELECT sleepDuration, depression, COUNT(*) as count
FROM studentDepression
WHERE sleepDuration IS NOT NULL
GROUP BY sleepDuration, depression
ORDER BY 
  CASE 
    WHEN sleepDuration = 'Less than 5 hours' THEN 1
    WHEN sleepDuration = '5-6 hours' THEN 2
    WHEN sleepDuration = '7-8 hours' THEN 3
    WHEN sleepDuration = 'More than 8 hours' THEN 4
    ELSE 5
  END
```

### Successful SQL Query for pressure
```sql
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
```

### JavaScript Code for Processing sleepDuration
```javascript
// Process sleepDuration values from database
function processSleepData(row) {
  // Remove single quotes for display
  const displayValue = row.sleepDuration.replace(/^'|'$/g, '');
  
  // For database queries, keep the original format
  const dbValue = row.sleepDuration;
  
  return {
    displayValue: displayValue,
    dbValue: dbValue,
    count: row.count
  };
}
```

## Common Problems and Solutions

### Problem: "column sleepQuality does not exist"
Use the correct column name `sleepDuration` instead of `sleepQuality`.

### Problem: Filtering sleepDuration Values
Remember that SQL queries should use only one set of quotes:
```sql
WHERE sleepDuration = 'Less than 5 hours'  -- Correct
```

### Problem: "no such column: 'Less than 5 hours'"
Do NOT use extra quotes in SQL queries:
```sql
-- WRONG: This will fail
WHERE sleepDuration = "'Less than 5 hours'"

-- CORRECT: This will work
WHERE sleepDuration = 'Less than 5 hours'
```

## Best Practices

1. Use the provided helper functions in `js/libs/handleSleepData.js` for consistent handling of sleep data
2. Always verify column names against the database schema
3. Handle quotes and special formats consistently in all queries
4. Test SQL queries directly against the database before integrating them into code
5. Document all changes in this README file 