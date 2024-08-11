const express = require('express');
const router = express.Router();
const db = require('../models/database');
const authenticateToken = require('../middleware/authenticateToken');
const transporter = require('../config/email');
const redis = require('redis');
const client = redis.createClient();

const cacheAssignments = (req, res, next) => {
    const { userId } = req.user;

    client.get(`assignments:${userId}`, (err, cachedAssignments) => {
        if (err) throw err;

        if (cachedAssignments) {
            return res.json(JSON.parse(cachedAssignments));
        } else {
            next();
        }
    });
};

router.post('/', authenticateToken, async (req, res) => {
    const { title, description, due_date } = req.body;
    const userId = req.user.id;

    try {
        await db.createAssignment(title, description, due_date, userId);
        res.status(201).json({ message: 'Assignment created' });

        const students = await db.getStudents();

        students.forEach(student => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: student.email,
                subject: 'New Assignment Created',
                text: `A new assignment titled "${title}" has been created. Description: "${description}". Due Date: ${due_date}.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });

    } catch (error) {
        console.error('Error creating assignment or sending emails:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', authenticateToken, cacheAssignments, async (req, res) => {
    const { sortBy, filterBy } = req.query;
    const { userId } = req.user;

    try {
        const assignments = await db.getFilteredAndSortedAssignments(userId, filterBy, sortBy);
        client.setex(`assignments:${userId}`, 3600, JSON.stringify(assignments));
        res.json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    const assignmentId = req.params.id;

    try {
        const assignment = await db.getAssignmentById(assignmentId);
        res.json(assignment);
    } catch (error) {
        console.error('Error fetching assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const assignmentId = req.params.id;
    const { title, description, due_date } = req.body;
    const { id: userId } = req.user;

    try {
        const assignment = await db.getAssignmentById(assignmentId);
        if (assignment.createdBy !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await db.updateAssignment(assignmentId, title, description, due_date);
        res.json({ message: 'Assignment updated' });
    } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const assignmentId = req.params.id;
    const { id: userId } = req.user;

    try {
        const assignment = await db.getAssignmentById(assignmentId);
        if (assignment.createdBy !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await db.deleteAssignment(assignmentId);
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        console.error('Error deleting assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/:id/submit', authenticateToken, async (req, res) => {
    const assignmentId = req.params.id;
    const { submissionContent } = req.body;
    const studentId = req.user.id;

    try {
        await db.submitAssignment(assignmentId, studentId, submissionContent);
        res.json({ message: 'Assignment submitted' });
    } catch (error) {
        console.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/:id/grade', authenticateToken, async (req, res) => {
    const assignmentId = req.params.id;
    const { studentId, grade } = req.body;

    try {
        await db.gradeAssignment(assignmentId, studentId, grade);
        res.json({ message: 'Assignment graded' });
    } catch (error) {
        console.error('Error grading assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
