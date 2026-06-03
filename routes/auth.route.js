const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Authentication routes for students, admins, and faculty members
router.post('/register/student', authController.registerStudent); // Route for student registration
router.post('/login/student', authController.loginStudent); // Route for student login

router.post('/register/admin', authController.registerAdmin); // Route for admin registration
router.post('/login/admin', authController.loginAdmin); // Route for admin login

router.post('/register/faculty', authController.registerFaculty); // Route for faculty registration
router.post('/login/faculty', authController.loginFaculty); // Route for faculty login

module.exports = router;