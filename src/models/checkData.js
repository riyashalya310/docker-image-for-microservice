// src/models/checkData.js
const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database instance
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to fetch and log data
const checkData = () => {
    // Query for users
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Users:');
        rows.forEach((row) => {
            console.log(row);
        });
    });

    // Query for assignments
    db.all('SELECT * FROM assignments', [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Assignments:');
        rows.forEach((row) => {
            console.log(row);
        });
    });

    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error('Error closing database', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
};

// Run the function to check data
checkData();
