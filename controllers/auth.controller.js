const authService = require('../services/auth.service');
const { generateToken } = require('../utilities/jwt');

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
        const payload = {
            role: 'student',
            scholarNumber: response.data.scholarNumber,
            name: response.data.name,
            email: response.data.email,
            department: response.data.department,
            semester: response.data.semester,
            section: response.data.section
        };

        const token = generateToken(payload);

        res.cookie('uid', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });

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

        const payload = {
            role: 'admin',
            adminNumber: response.data.adminNumber,
            name: response.data.name,
            email: response.data.email,
            department: response.data.department
        };

        const token = generateToken(payload);

        res.cookie('uid', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });

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

        const payload = {
            role: 'faculty',
            employeeNumber: response.data.employeeNumber,
            name: response.data.name,
            email: response.data.email,
            department: response.data.department
        };

        const token = generateToken(payload);

        res.cookie('uid', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });

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

const logout = (req, res) => {

    res.clearCookie('uid', { httpOnly: true });

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

module.exports = {
    registerStudent,
    loginStudent,
    registerAdmin,
    loginAdmin,
    registerFaculty,
    loginFaculty,
    logout
};