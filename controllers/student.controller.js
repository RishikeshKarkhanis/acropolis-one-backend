const studentService = require('../services/student.service');

const getCurrentStudent = (req, res) => {

    if (!req.session.user) {

        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    if (req.session.user.role !== 'student') {

        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    return res.status(200).json({
        success: true,
        student: req.session.user
    });
};

const markAttendance = async (req, res) => {

    try {

        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.session.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const scholarNumber =
            req.session.user.scholarNumber;

        const { lectureId, studentLatitude, studentLongitude } = req.body;

        const result =
            await studentService.markAttendance(
                scholarNumber,
                lectureId,
                studentLatitude,
                studentLongitude
            );

        return res.status(200).json(result);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error : ' + error.message
        });
    }
};

const viewTotalAttendance = async (req, res) => {

    try {

        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.session.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const scholarNumber =
            req.session.user.scholarNumber;

        const result =
            await studentService.viewTotalAttendance(
                scholarNumber,
                req.session.user.department,
                req.session.user.semester,
                req.session.user.section
            );

        return res.status(200).json(result);

    } catch (error) {

        console.log(error);

        return res.status(error.status || 500).json(
            {
                success: false,
                message: error.message || 'Internal Server Error'
            }
        );
    }
};

module.exports = {
    getCurrentStudent,
    markAttendance,
    viewTotalAttendance
};