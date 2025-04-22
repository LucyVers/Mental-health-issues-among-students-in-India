import express from 'express';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port to start the web server on
const port = 3005

// Create a web server 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Start the web server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Static files served from:', path.join(__dirname, '..'));
});

// Routes for live reload
app.get('/api/is-real-backend', (_req, res) => res.send(true));
app.get('/api/reload-if-closes', (_req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-control': 'no-cache'
  });
  setInterval(() => res.write('data: ping\n\n '), 20000);
});

// Database connection
const dbPath = path.join(__dirname, '../sqlite-databases/student_depression.db');
console.log('Connecting to database at:', dbPath);
const db = new Database(dbPath);

// Test database connection
try {
    const test = db.prepare('SELECT COUNT(*) as count FROM studentDepression').get();
    console.log('Database connection successful. Row count:', test.count);
} catch (error) {
    console.error('Database connection error:', error);
}

// route for database query (SELECT:s only)
app.get('/api/dbquery/:select', (req, res) => {
  let select = req.params.select.trim();
  if (!db) {
    res.json([{ error: 'No database connected!' }]);
    return;
  }
  if ((select + '').toLowerCase().indexOf('select ') !== 0) {
    res.json([{ error: 'Only SELECT queries can be run!' }]);
    return;
  }
  let result;
  try {
    result = db.prepare(select).all()
  }
  catch (e) {
    result = [{ error: e + '' }]
  }
  res.json(result);
});

// app get script to start with
// check for scripts in this order
// js/_menu.js, js/main.js, main.js
app.get('/api/getMainScript', (_req, res) => {
  let mainFolder = path.join(import.meta.dirname, '..');
  let whichScriptsExists = [
    { name: '/js/_menu.js', exists: fs.existsSync(path.join(mainFolder, 'js', '_menu.js')) },
    { name: '/js/main.js', exists: fs.existsSync(path.join(mainFolder, 'js', 'main.js')) },
    { name: '/main.js', exists: fs.existsSync(path.join(mainFolder, 'main.js')) }
  ];
  res.set({ 'Content-Type': 'application/javascript' });
  res.send(
    `let whichScriptsExists = ${JSON.stringify(whichScriptsExists, '', '  ')};\n\n` +
    `let scriptToLoad = whichScriptsExists.find(x => x.exists);\n` +
    `scriptToLoad.name.includes('menu') && document.body.classList.add('with-menu');\n` +
    `scriptToLoad && import(scriptToLoad.name);`
  );
});

app.get('/api/chartSettings', (_req, res) => {
  res.sendFile()
});

// API endpoint for database queries
app.post('/api/query', (req, res) => {
  console.log('Received query request:', req.body.query);
  const { query } = req.body;
  
  try {
    const stmt = db.prepare(query);
    const rows = stmt.all();
    console.log('Query successful, returning rows:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pressure-analysis.html'));
});

// Load SQL queries
const queriesPath = path.join(__dirname, '../../documentation/analysis/queries/financial_stress_analysis.sql');
const sqlQueries = fs.readFileSync(queriesPath, 'utf8').split(';');

// API endpoints for financial stress analysis
app.get('/api/financial-stress/stressDistribution', (req, res) => {
    const query = sqlQueries[0]; // First query from our SQL file
    try {
        const results = db.prepare(query).all();
        res.json(results);
    } catch (error) {
        console.error('Error executing stress distribution query:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/financial-stress/academicPerformance', (req, res) => {
    const query = sqlQueries[1]; // Second query
    try {
        const results = db.prepare(query).all();
        res.json(results);
    } catch (error) {
        console.error('Error executing academic performance query:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/financial-stress/workStudy', (req, res) => {
    const query = sqlQueries[2]; // Third query
    try {
        const results = db.prepare(query).all();
        res.json(results);
    } catch (error) {
        console.error('Error executing work/study query:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/financial-stress/sleepStress', (req, res) => {
    const query = sqlQueries[3]; // Fourth query
    try {
        const results = db.prepare(query).all();
        res.json(results);
    } catch (error) {
        console.error('Error executing sleep/stress query:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/financial-stress/genderStress', (req, res) => {
    const query = sqlQueries[4]; // Fifth query
    try {
        const results = db.prepare(query).all();
        res.json(results);
    } catch (error) {
        console.error('Error executing gender/stress query:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// API endpoint for financial stress data
app.get('/api/financial-stress-data', async (req, res) => {
    try {
        const db = await open(path.join(__dirname, '../sqlite-databases/student_depression.db'));
        const data = await db.all(`
            SELECT financial_stress, depression_score 
            FROM studentDepression 
            WHERE financial_stress IS NOT NULL 
            AND depression_score IS NOT NULL
        `);
        res.json(data);
    } catch (error) {
        console.error('Error fetching financial stress data:', error);
        res.status(500).json({ error: 'Failed to fetch financial stress data' });
    }
});

// API endpoint for sleep data
app.get('/api/sleep-data', async (req, res) => {
    try {
        const db = await open(path.join(__dirname, '../sqlite-databases/student_depression.db'));
        const data = await db.all(`
            SELECT sleep_quality, depression_score 
            FROM studentDepression 
            WHERE sleep_quality IS NOT NULL 
            AND depression_score IS NOT NULL
        `);
        res.json(data);
    } catch (error) {
        console.error('Error fetching sleep data:', error);
        res.status(500).json({ error: 'Failed to fetch sleep data' });
    }
});

// API endpoint for dietary data
app.get('/api/dietary-data', async (req, res) => {
    try {
        const db = await open(path.join(__dirname, '../sqlite-databases/student_depression.db'));
        const data = await db.all(`
            SELECT diet_quality, depression_score 
            FROM studentDepression 
            WHERE diet_quality IS NOT NULL 
            AND depression_score IS NOT NULL
        `);
        res.json(data);
    } catch (error) {
        console.error('Error fetching dietary data:', error);
        res.status(500).json({ error: 'Failed to fetch dietary data' });
    }
});