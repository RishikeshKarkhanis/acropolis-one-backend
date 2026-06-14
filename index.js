const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./utilities/databaseConnection');

// Importing Routes
const authRoutes = require('./routes/auth.route');
const studentRoutes = require('./routes/student.route');
const facultyRoutes = require('./routes/faculty.route');
const adminRoutes = require('./routes/admin.route');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:8081", // frontend URL
    credentials: true,
}));

app.use(cookieParser());

app.use(
    session({
        secret: 'attendance_secret_key',

        resave: false,

        saveUninitialized: false,

        cookie: {
            secure: false, // true only in HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

// Use Routes
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/admin', adminRoutes);

//Start the server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});