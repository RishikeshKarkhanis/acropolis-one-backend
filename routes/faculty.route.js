const express = require('express');
const { getCurrentFaculty,  assignedSubjects, createLectureSession, endLectureSession} = require('../controllers/faculty.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authenticate, getCurrentFaculty);
router.get('/assigned-subjects', authenticate, assignedSubjects);
router.post('/create-lecture-session', authenticate, createLectureSession);
router.post('/end-lecture-session', authenticate, endLectureSession);


module.exports = router;