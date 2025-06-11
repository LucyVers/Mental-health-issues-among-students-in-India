// Debug script for database schema
const path = require('path');
const Database = require('better-sqlite3');

// Connect to the database
const dbPath = path.join(__dirname, '..', 'sqlite-databases', 'student_depression.db');
console.log('Attempting to connect to database at:', dbPath);

try {
    const db = new Database(dbPath);
    console.log('Connected to database successfully');
    
    // Check table schema
    console.log('Checking studentDepression table schema:');
    const pragma = db.prepare("PRAGMA table_info(studentDepression)").all();
    console.log(pragma);
    
    // Check first row as example
    console.log('Sample row from studentDepression:');
    const sampleRow = db.prepare("SELECT * FROM studentDepression LIMIT 1").get();
    console.log(sampleRow);
    
    // Check unique sleep values
    console.log('Sleep duration values:');
    let sleepColumns = ['sleepDuration', 'sleepQuality', 'sleep_quality', 'sleep_duration'];
    for (let col of sleepColumns) {
        try {
            const values = db.prepare(`SELECT DISTINCT ${col} FROM studentDepression`).all();
            console.log(`Column ${col} exists with values:`, values);
        } catch (err) {
            console.log(`Column ${col} does not exist`);
        }
    }
    
    // Check unique diet values
    console.log('Dietary habits values:');
    let dietColumns = ['dietaryHabits', 'dietQuality', 'diet_quality', 'dietary_habits'];
    for (let col of dietColumns) {
        try {
            const values = db.prepare(`SELECT DISTINCT ${col} FROM studentDepression`).all();
            console.log(`Column ${col} exists with values:`, values);
        } catch (err) {
            console.log(`Column ${col} does not exist`);
        }
    }
    
    // Check unique financial stress values
    console.log('Financial stress values:');
    let financeColumns = ['financialStress', 'financial_stress'];
    for (let col of financeColumns) {
        try {
            const values = db.prepare(`SELECT DISTINCT ${col} FROM studentDepression`).all();
            console.log(`Column ${col} exists with values:`, values);
        } catch (err) {
            console.log(`Column ${col} does not exist`);
        }
    }
    
    console.log('Database schema check completed');
} catch (err) {
    console.error('Database connection error:', err);
} 