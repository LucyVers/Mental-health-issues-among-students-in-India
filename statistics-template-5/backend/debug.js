// Debug script for database connections
const path = require('path');
const Database = require('better-sqlite3');

// Connect to the database
const dbPath = path.join(__dirname, '..', 'sqlite-databases', 'student_depression.db');
console.log('Attempting to connect to database at:', dbPath);

try {
    const db = new Database(dbPath);
    console.log('Connected to database successfully');
    
    // Check if the studentDepression table exists
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='studentDepression'").all();
    if (tables.length === 0) {
        console.error('Error: studentDepression table does not exist');
        process.exit(1);
    }
    console.log('Found studentDepression table');
    
    // Check the sleep duration values
    const sleepValues = db.prepare("SELECT DISTINCT sleepDuration FROM studentDepression").all();
    console.log('Sleep duration values in database:', sleepValues);
    
    // Check the dietary habits values
    const dietValues = db.prepare("SELECT DISTINCT dietaryHabits FROM studentDepression").all();
    console.log('Dietary habits values in database:', dietValues);
    
    // Try a simple query with the exact format of the sleep duration values
    console.log('Testing sleep duration query...');
    const sleepQuery = `
        SELECT sleepDuration, depression, COUNT(*) as count
        FROM studentDepression
        WHERE sleepDuration IS NOT NULL 
        GROUP BY sleepDuration, depression
        ORDER BY sleepDuration, depression
    `;
    
    const sleepResults = db.prepare(sleepQuery).all();
    console.log('Sleep query results:', sleepResults.slice(0, 3), '...');
    
    console.log('Database tests completed successfully');
} catch (err) {
    console.error('Database connection error:', err);
} 