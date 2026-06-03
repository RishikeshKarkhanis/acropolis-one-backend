const express = require('express');
const { getCurrentStudent, markAttendance, viewTotalAttendance } = require('../controllers/student.controller');

const router = express.Router();

router.get('/me', getCurrentStudent);
router.post('/mark-attendance', markAttendance);
router.get('/attendance', viewTotalAttendance);

module.exports = router;