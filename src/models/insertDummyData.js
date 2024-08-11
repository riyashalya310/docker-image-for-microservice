const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const insertDummyData = () => {
    db.serialize(() => {
        // Insert dummy users
        db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
            ['Student One', 'student1@example.com', 'hashedpassword1', 'student'], (err) => {
                if (err) console.error('Error inserting user1:', err.message);
            });
        db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
            ['Teacher One', 'teacher1@example.com', 'hashedpassword2', 'teacher'], (err) => {
                if (err) console.error('Error inserting user2:', err.message);
            });

        // Insert dummy assignments
        db.run(`INSERT INTO assignments (title, description, due_date, createdBy) VALUES (?, ?, ?, ?)`, 
            ['Math Homework', 'Complete exercises 1-10 from chapter 3', '2024-08-20', 2], (err) => {
                if (err) console.error('Error inserting assignment1:', err.message);
            });
        db.run(`INSERT INTO assignments (title, description, due_date, createdBy) VALUES (?, ?, ?, ?)`, 
            ['Science Project', 'Prepare a model of the solar system', '2024-08-25', 2], (err) => {
                if (err) console.error('Error inserting assignment2:', err.message);
            });
        db.run(`INSERT INTO assignments (title, description, due_date, createdBy) VALUES (?, ?, ?, ?)`, 
            ['History Essay', 'Write an essay on the causes of World War II', '2024-09-01', 2], (err) => {
                if (err) console.error('Error inserting assignment3:', err.message);
            });
    }, (err) => {
        if (err) console.error('Error:', err.message);
    });

    db.close((err) => {
        if (err) console.error('Error closing database:', err.message);
        else console.log('Database connection closed.');
    });
};

insertDummyData();
