# Project Setup and Common Issues

## Directory Structure
The project is located at:
```
/Users/lucyprivat/Desktop/Git_GithubProjekt/Statistik_och_dataanalys /Mental_health_issues_among_students_in_India.
```

### Important Note About Project Path
There are two critical issues with the project path that need attention:
1. There is an extra space after "Statistik_och_dataanalys"
2. The directory name ends with a period (.)

These path peculiarities can cause problems when:
- Starting the server
- Accessing database files
- Running npm commands
- Using relative paths in code

## Server Setup

### Correct Way to Start the Server
1. Navigate to the project root:
```bash
cd "/Users/lucyprivat/Desktop/Git_GithubProjekt/Statistik_och_dataanalys /Mental_health_issues_among_students_in_India."
```

2. Start the server from the statistics-template-5 directory:
```bash
cd statistics-template-5 && node backend/app.js
```

### Verification of Successful Server Start
When the server starts correctly, you should see:
```
Connecting to database at: [project_path]/statistics-template-5/sqlite-databases/student_depression.db
Database connection successful. Row count: 27901
Server running at http://localhost:3005
Static files served from: [project_path]/statistics-template-5
```

### Common Issues and Solutions

#### Port Already in Use
If you see `EADDRINUSE: address already in use :::3005`:
1. Find the process using the port:
```bash
lsof -i :3005 | grep LISTEN
```
2. Kill the process:
```bash
kill [process_id]
```
3. Restart the server

#### Path-Related Issues
- Always use absolute paths when necessary
- Verify directory structure before running commands:
```bash
ls -la
```
- When accessing the database, ensure the path includes proper escaping for spaces

## Database Location
The SQLite database is located at:
```
statistics-template-5/sqlite-databases/student_depression.db
```

## Best Practices for Development
1. Always verify current working directory before running commands
2. Use proper path escaping when dealing with spaces in paths
3. Check server logs for database connection success
4. Verify row count (should be 27901) to ensure proper database connection 