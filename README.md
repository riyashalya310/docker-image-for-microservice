**API Documentation**
**Overview**
This project provides a backend API with authentication routes, assignment management routes, and a database setup using SQLite. The API is built using Node.js and Express, with JWT for authentication and SQLite for data persistence.

**Authentication Routes (src/routes/auth.js)**
**1. Login**
Endpoint: /auth/login

Method: POST

Description: Authenticates a user and issues a JWT token.

Request Body:
{
  "username": "your_username",
  "password": "your_password"
}


**2. Register**
Endpoint: /auth/register

Method: POST

Description: Registers a new user.

Request Body:
{
  "username": "new_user",
  "password": "new_password"
}


**Assignments Routes (src/routes/assignments.js)**
**1. Get All Assignments**
Endpoint: /assignments

Method: GET

Description: Retrieves all assignments.

**2. Get Assignment by ID**
Endpoint: /assignments/:id

Method: GET

Description: Retrieves a specific assignment by ID.

URL Parameters:

id: The ID of the assignment.

**3. Create Assignment**
Endpoint: /assignments

Method: POST

Description: Creates a new assignment.

Request Body:
{
  "title": "New Assignment",
  "description": "Description of the new assignment",
  "due_date": "2024-08-15"
}

**4. Update Assignment**
Endpoint: /assignments/:id

Method: PUT

Description: Updates an existing assignment.

URL Parameters:

id: The ID of the assignment.
Request Body:
{
  "title": "Updated Assignment",
  "description": "Updated description",
  "due_date": "2024-08-20"
}

**5. Delete Assignment**
Endpoint: /assignments/:id

Method: DELETE

Description: Deletes an assignment by ID.

URL Parameters:

id: The ID of the assignment.


--------------------------------------------------

**Running the API**
Start the Server:

bash
Copy code
npm start
Access the API:

Authentication: http://localhost:3000/auth/login
Assignments: http://localhost:3000/assignments
Database: SQLite database file (database.sqlite) will be created in the src/models directory.
