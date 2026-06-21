const authService = require('../services/auth.service');
const adminService = require('../services/admin.service');

const { v4: uuidv4 } = require('uuid');

const getCurrentAdmin = (req, res) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    if (req.user.role !== 'admin') {

        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    return res.status(200).json({
        success: true,
        admin: req.user
    });
};

const getAllFaculties = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const faculties = await adminService.getAllFaculties();

        return res.status(200).json({
            success: true,
            faculties
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const createFaculty = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const faculty =
            await authService.registerFaculty(
                req.body
            );

        return res.status(201).json({
            success: true,
            message: 'Faculty created successfully',
            faculty
        });

    } catch (error) {

        console.log(error);

        return res.status(
            error.status || 500
        ).json({
            success: false,
            message:
                error.message ||
                'Internal Server Error'
        });
    }
};

const removeFaculty = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const employeeNumber = req.params.employeeNumber;

        await authService.removeFaculty(employeeNumber);

        return res.status(200).json({
            success: true,
            message: 'Faculty removed successfully'
        });

    } catch (error) {

        console.log(error);

        return res.status(
            error.status || 500
        ).json({
            success: false,
            message:
                error.message ||
                'Internal Server Error'
        });
    }
};

const assignSubjectToFaculty = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const {
            employeeNumber,
            subjectCode,
            semester,
            section,
            subjectType
        } = req.body;

        // Generate UUID
        const mappingId = uuidv4();

        await adminService.assignSubjectToFaculty(
            mappingId,
            employeeNumber,
            subjectCode,
            semester,
            section,
            subjectType
        );

        return res.status(200).json({
            success: true,
            message:
                'Subject assigned to faculty successfully'
        });

    } catch (error) {

        console.log(error);

        return res.status(
            error.status || 500
        ).json({
            success: false,
            message:
                error.message ||
                'Internal Server Error'
        });
    }
};

const unassignSubjectFromFaculty = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const mappingId = req.params.mappingId;

        await adminService.unassignSubjectFromFaculty(mappingId);

        return res.status(200).json({
            success: true,
            message:
                'Subject unassigned from faculty successfully'
        });

    } catch (error) {

        console.log(error);

        return res.status(
            error.status || 500
        ).json({
            success: false,
            message:
                error.message ||
                'Internal Server Error'
        });
    }
};

const createSubject = async (req, res) => {

    try {

        // Authentication Check

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Admin Role Check

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const {
            subjectCode,
            subjectName,
            semester,
            department,
            subjectType
        } = req.body;

        await adminService.createSubject(
            subjectCode,
            subjectName,
            semester,
            department,
            subjectType
        );

        return res.status(200).json({
            success: true,
            message: 'Subject created successfully'
        });

    } catch (err) {

        console.error(
            'Error creating subject:',
            err
        );

        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

const removeSubject = async (req, res) => {

    try {

        // Authentication Check

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Admin Role Check

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const subjectCode = req.params.subjectCode;
        const subjectType = req.params.subjectType;

        await adminService.removeSubject(subjectCode, subjectType);

        return res.status(200).json({
            success: true,
            message: 'Subject removed successfully'
        });

    } catch (err) {

        console.error(
            'Error removing subject:',
            err
        );

        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

const getAllSubjects = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (req.user.role !== 'admin') {

            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const subjects = await adminService.getAllSubjects();

        return res.status(200).json({
            success: true,
            subjects
        });

    } catch (error) {

        console.log(error);

        return res.status(
            error.status || 500
        ).json({
            success: false,
            message:
                error.message ||
                'Internal Server Error'
        });
    }
};

module.exports = {
    getCurrentAdmin,
    getAllFaculties,
    createFaculty,
    removeFaculty,
    assignSubjectToFaculty,
    unassignSubjectFromFaculty,
    createSubject,
    removeSubject,
    getAllSubjects
};