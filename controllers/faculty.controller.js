const facultyService = require('../services/faculty.service');

const getCurrentFaculty = (req, res) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    if (req.user.role !== 'faculty') {

        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    return res.status(200).json({
        success: true,
        faculty: req.user
    });
};

const takeAttendance = (req, res) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    if (req.user.role !== 'faculty') {

        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    // Logic to take attendance goes here

    return res.status(200).json({
        success: true,
        message: 'Attendance taken successfully'
    });
};

const assignedSubjects = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'faculty') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const subjects = await facultyService.assignedSubjects(
            req.user.employeeNumber
        );

        return res.status(200).json({
            success: true,
            subjects
        });

    } catch (err) {

        console.error('Error fetching assigned subjects:', err);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const createLectureSession = async (req, res) => {

    try {

        // Authentication Check

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Role Check

        if (req.user.role !== 'faculty') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const employeeNumber = req.user.employeeNumber;

        const { subjectCode, semester, department, division, lectureType } = req.body;

        const subjectExists =
            await facultyService.doesSubjectExist(
                subjectCode,
                semester,
                department,
                lectureType
            );

        if (!subjectExists) {

            return res.status(404).json({
                success: false,
                message: 'Subject does not exist'
            });
        }

        const isAssigned =
            await facultyService.isSubjectAssignedToFaculty(
                employeeNumber,
                subjectCode,
                semester,
                division,
                lectureType
            );

        if (!isAssigned) {

            return res.status(403).json({
                success: false,
                message: 'You are not assigned to this subject'
            });
        }

        // Example:
        // AL404

        // Extract 404

        const numericSubjectCode =
            subjectCode.replace(/[A-Za-z]/g, '');

        // Semester -> Year
        // 4 -> 2nd year

        const year =
            Math.ceil(semester / 2);

        // Find Previous Lecture Count

        const totalLectures =
            await facultyService.getLectureCount(
                subjectCode,
                semester,
                department,
                division,
                lectureType
            );

        // Next Lecture Number

        const lectureNumber =
            totalLectures + 1;

        // 1 -> 001

        const formattedLectureNumber =
            String(lectureNumber).padStart(3, '0');

        // Final Lecture ID

        const lectureId =
            `${department}${lectureType}${year}${division}${semester}${numericSubjectCode}${formattedLectureNumber}`;

        // Random Attendance Code

        const lectureDate =
            new Date();

        const createdAt =
            new Date();

        // Insert Session

        await facultyService.createLectureSession(
            lectureId,
            subjectCode,
            employeeNumber,
            semester,
            department,
            division,
            lectureDate,
            createdAt,
            lectureType,
            req.body.facultyLatitude,
            req.body.facultyLongitude
        );

        return res.status(200).json({
            success: true,
            message: 'Lecture session created successfully',
            lectureSession: {
                lectureId,
                subjectCode
            }
        });

    } catch (err) {

        console.error(
            'Error creating lecture session:',
            err
        );

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const endLectureSession = (req, res) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    if (req.user.role !== 'faculty') {

        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    facultyService.endLectureSession(
        req.body.lectureId,
        new Date()
    )
        .then(() => {

            return res.status(200).json({
                success: true,
                message: 'Lecture session ended successfully'
            });
        })
        .catch(err => {

            console.error('Error ending lecture session:', err);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        });
};

module.exports = {
    getCurrentFaculty,
    takeAttendance,
    assignedSubjects,
    createLectureSession,
    endLectureSession
}; 