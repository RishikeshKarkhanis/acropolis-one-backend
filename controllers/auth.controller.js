const authService = require('../services/auth.service');

const registerStudent = async (req, res) => {
    try {
        const response = await authService.registerStudent(req.body);
        return res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const loginStudent = async (req, res) => {

    try {
        const { scholarNumber, password } = req.body;
        const response = await authService.loginStudent(
            scholarNumber,
            password
        );

        // CREATE SESSION
        req.session.user = {
            role: 'student',
            scholarNumber: response.data.scholarNumber,
            name: response.data.name,
            email: response.data.email,
            department: response.data.department,
            semester: response.data.semester,
            section: response.data.section
        };

        return res.status(200).json(response);

    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const registerAdmin = async (req, res) => {

    try {
        const response = await authService.registerAdmin(req.body);
        return res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const loginAdmin = async (req, res) => {

    try {
        const { adminNumber, password } = req.body;
        const response = await authService.loginAdmin(
            adminNumber,
            password
        );

        req.session.user = {
            role: 'admin',
            adminNumber: response.data.adminNumber,
            name: response.data.name,
            email: response.data.email,
            department: response.data.department
        };

        return res.status(200).json(response);

    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const registerFaculty = async (req, res) => {

    try {
        const response = await authService.registerFaculty(req.body);
        return res.status(201).json(response);

    }
    catch (error) {

        console.log(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const loginFaculty = async (req, res) => {

    try {
        const { employeeNumber, password } = req.body;
        const response = await authService.loginFaculty(
            employeeNumber,
            password
        );

        req.session.user = {
            role: 'faculty',
            employeeNumber: response.data.employeeNumber,
            name: response.data.name,
            email: response.data.email,
            department: response.data.department
        };

        return res.status(200).json(response);

    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    registerAdmin,
    loginAdmin,
    registerFaculty,
    loginFaculty
};