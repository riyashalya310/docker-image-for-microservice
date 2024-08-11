API Documentation
Overview
This project provides a backend API with authentication routes, assignment management routes, and a database setup using SQLite. The API is built using Node.js and Express, with JWT for authentication and SQLite for data persistence.

Authentication Routes (src/routes/auth.js)
1. Login
Endpoint: /auth/login

Method: POST

Description: Authenticates a user and issues a JWT token.

Request Body:

json
Copy code
{
  "username": "your_username",
  "password": "your_password"
}
Responses:

200 OK: Returns a JWT token if authentication is successful.
json
Copy code
{
  "token": "your_jwt_token"
}
401 Unauthorized: Invalid credentials.
Example:

bash
Copy code
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "password123"}'
2. Register
Endpoint: /auth/register

Method: POST

Description: Registers a new user.

Request Body:

json
Copy code
{
  "username": "new_user",
  "password": "new_password"
}
Responses:

201 Created: User successfully registered.
400 Bad Request: Missing or invalid data.
Example:

bash
Copy code
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"username": "new_user", "password": "new_password"}'
Assignments Routes (src/routes/assignments.js)
1. Get All Assignments
Endpoint: /assignments

Method: GET

Description: Retrieves all assignments.

Responses:

200 OK: Returns a list of assignments.
json
Copy code
[
  {
    "id": 1,
    "title": "Assignment 1",
    "description": "Description of Assignment 1",
    "due_date": "2024-08-10"
  },
  ...
]
Example:

bash
Copy code
curl -X GET http://localhost:3000/assignments
2. Get Assignment by ID
Endpoint: /assignments/:id

Method: GET

Description: Retrieves a specific assignment by ID.

URL Parameters:

id: The ID of the assignment.
Responses:

200 OK: Returns the assignment data.
json
Copy code
{
  "id": 1,
  "title": "Assignment 1",
  "description": "Description of Assignment 1",
  "due_date": "2024-08-10"
}
404 Not Found: Assignment with the specified ID does not exist.
Example:

bash
Copy code
curl -X GET http://localhost:3000/assignments/1
3. Create Assignment
Endpoint: /assignments

Method: POST

Description: Creates a new assignment.

Request Body:

json
Copy code
{
  "title": "New Assignment",
  "description": "Description of the new assignment",
  "due_date": "2024-08-15"
}
Responses:

201 Created: Assignment successfully created.
400 Bad Request: Missing or invalid data.
Example:

bash
Copy code
curl -X POST http://localhost:3000/assignments -H "Content-Type: application/json" -d '{"title": "New Assignment", "description": "Description of the new assignment", "due_date": "2024-08-15"}'
4. Update Assignment
Endpoint: /assignments/:id

Method: PUT

Description: Updates an existing assignment.

URL Parameters:

id: The ID of the assignment.
Request Body:

json
Copy code
{
  "title": "Updated Assignment",
  "description": "Updated description",
  "due_date": "2024-08-20"
}
Responses:

200 OK: Assignment successfully updated.
404 Not Found: Assignment with the specified ID does not exist.
Example:

bash
Copy code
curl -X PUT http://localhost:3000/assignments/1 -H "Content-Type: application/json" -d '{"title": "Updated Assignment", "description": "Updated description", "due_date": "2024-08-20"}'
5. Delete Assignment
Endpoint: /assignments/:id

Method: DELETE

Description: Deletes an assignment by ID.

URL Parameters:

id: The ID of the assignment.
Responses:

200 OK: Assignment successfully deleted.
404 Not Found: Assignment with the specified ID does not exist.
Example:

bash
Copy code
curl -X DELETE http://localhost:3000/assignments/1
Database Setup (src/models/database.js)
1. Database Initialization
File: src/models/database.js
Description: This file manages the SQLite database connection and schema setup. It is automatically executed when the server starts to ensure the database is correctly configured.
2. Database Connection
Method: connectDatabase()
Description: Establishes a connection to the SQLite database. This method is called within src/index.js to initialize the database connection when the server starts.
3. Schema Setup
Method: setupSchema()
Description: Ensures that all necessary tables and schemas are created in the SQLite database. This includes tables for storing user information, assignments, and any other necessary data.
Example Code
Here is an example of how the database setup is handled:

javascript
Copy code
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function connectDatabase() {
    const dbPath = path.resolve(__dirname, 'database.sqlite');
    return new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Could not connect to database:', err);
        } else {
            console.log('Connected to SQLite database');
        }
    });
}

function setupSchema(db) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            due_date TEXT
        )`);
    });
}

module.exports = { connectDatabase, setupSchema };
Running the API
Start the Server:

bash
Copy code
npm start
Access the API:

Authentication: http://localhost:3000/auth/login
Assignments: http://localhost:3000/assignments
Database: SQLite database file (database.sqlite) will be created in the src/models directory.
