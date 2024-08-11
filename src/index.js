const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const assignmentsRouter = require('./routes/assignments');
const authRouter = require('./routes/auth');
const authenticateToken = require('./middleware/authenticateToken');

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/assignments', authenticateToken, assignmentsRouter);
app.use('/auth', authRouter); // Authentication routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
