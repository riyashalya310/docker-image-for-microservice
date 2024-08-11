const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const createAssignment = (title, description, due_date, createdBy) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO assignments (title, description, due_date, createdBy) VALUES (?, ?, ?, ?)`, 
        [title, description, due_date, createdBy], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getFilteredAndSortedAssignments = (userId, filterBy, sortBy) => {
    let query = `SELECT * FROM assignments WHERE createdBy = ?`;
    const params = [userId];

    if (filterBy) {
        query += ` AND ${filterBy}`;
    }

    if (sortBy) {
        query += ` ORDER BY ${sortBy}`;
    }

    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getAssignmentById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM assignments WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const updateAssignment = (id, title, description, due_date) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE assignments SET title = ?, description = ?, due_date = ? WHERE id = ?`,
        [title, description, due_date, id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const deleteAssignment = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM assignments WHERE id = ?`, [id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const submitAssignment = (assignmentId, studentId, submissionContent) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO submissions (assignmentId, studentId, submissionContent) VALUES (?, ?, ?)`,
        [assignmentId, studentId, submissionContent], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const gradeAssignment = (assignmentId, studentId, grade) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE submissions SET grade = ? WHERE assignmentId = ? AND studentId = ?`,
        [grade, assignmentId, studentId], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getStudents = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users WHERE role = 'student'`, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const createUser = (name, email, password, role) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, 
        [name, email, password, role], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

module.exports = {
    createAssignment,
    getFilteredAndSortedAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    submitAssignment,
    gradeAssignment,
    getStudents,
    createUser,
    getUserByEmail
};
