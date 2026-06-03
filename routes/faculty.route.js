const express = require('express');
const { getCurrentFaculty,  assignedSubjects, createLectureSession, endLectureSession} = require('../controllers/faculty.controller');

const router = express.Router();

router.get('/me', getCurrentFaculty);
router.get('/assigned-subjects', assignedSubjects);
router.post('/create-lecture-session', createLectureSession);
router.post('/end-lecture-session', endLectureSession);


module.exports = router;