const express = require('express');
const adminController = require('../controllers/admin.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authenticate, adminController.getCurrentAdmin);
router.get('/faculties', authenticate, adminController.getAllFaculties);
router.post('/create-faculty', authenticate, adminController.createFaculty);
router.delete('/remove-faculty/:employeeNumber', authenticate, adminController.removeFaculty);
router.post('/assign-subject', authenticate, adminController.assignSubjectToFaculty);
router.delete('/unassign-subject/:mappingId', authenticate, adminController.unassignSubjectFromFaculty);
router.post('/create-subject', authenticate, adminController.createSubject);
router.delete('/remove-subject/:subjectCode/:subjectType', authenticate, adminController.removeSubject);
router.get('/subjects', authenticate, adminController.getAllSubjects);

module.exports = router;