const express = require('express');
const { getCurrentStudent, markAttendance, viewTotalAttendance } = require('../controllers/student.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authenticate, getCurrentStudent);
router.post('/mark-attendance', authenticate, markAttendance);
router.get('/attendance', authenticate, viewTotalAttendance);

module.exports = router;