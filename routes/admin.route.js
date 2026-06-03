const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/me', adminController.getCurrentAdmin);
router.get('/faculties', adminController.getAllFaculties);
router.post('/create-faculty', adminController.createFaculty);
router.delete('/remove-faculty/:employeeNumber', adminController.removeFaculty);
router.post('/assign-subject', adminController.assignSubjectToFaculty);
router.delete('/unassign-subject/:mappingId', adminController.unassignSubjectFromFaculty);
router.post('/create-subject', adminController.createSubject);
router.delete('/remove-subject/:subjectCode/:subjectType', adminController.removeSubject);
router.get('/subjects', adminController.getAllSubjects);

module.exports = router;