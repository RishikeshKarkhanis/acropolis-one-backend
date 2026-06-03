const bcrypt = require('bcrypt');
const db = require('../utilities/databaseConnection');

const registerStudent = async (studentData) => {

    const { scholarNumber, enrollmentNumber, name, email, password, semester, department, section } = studentData;

    return new Promise(async (resolve, reject) => {

        try {
            // Check Existing Student
            const checkQuery = `
                SELECT * FROM Student
                WHERE email = ?
                OR scholarNumber = ?
                OR enrollmentNumber = ?
            `;

            db.query(
                checkQuery,
                [email, scholarNumber, enrollmentNumber],
                async (err, results) => {

                    if (err) { return reject(err); }

                    if (results.length > 0) {
                        return reject({
                            status: 400,
                            message: 'Student already exists'
                        });
                    }

                    // Hash Password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Insert Student
                    const insertQuery = `
                        INSERT INTO Student
                        (
                            scholarNumber,
                            enrollmentNumber,
                            name,
                            email,
                            password,
                            semester,
                            department,
                            section
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `;

                    db.query(
                        insertQuery,
                        [
                            scholarNumber,
                            enrollmentNumber,
                            name,
                            email,
                            hashedPassword,
                            semester,
                            department,
                            section
                        ],
                        (err, result) => {

                            if (err) {
                                return reject(err);
                            }

                            resolve({
                                success: true,
                                message: 'Student registered successfully'
                            });
                        }
                    );
                }
            );

        } catch (error) {
            reject(error);
        }
    });
};

const loginStudent = async (scholarNumber, password) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT * FROM Student
            WHERE scholarNumber = ?
        `;

        db.query(query, [scholarNumber], async (err, results) => {

            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return reject({
                    status: 404,
                    message: 'Student not found'
                });
            }

            const student = results[0];

            // Compare Password
            const isPasswordCorrect = await bcrypt.compare(
                password,
                student.password
            );

            if (!isPasswordCorrect) {
                return reject({
                    status: 401,
                    message: 'Invalid credentials'
                });
            }

            resolve({
                success: true,
                message: 'Login successful',
                data: {
                    scholarNumber: student.scholarNumber,
                    name: student.name,
                    email: student.email,
                    department: student.department,
                    semester: student.semester,
                    section: student.section
                }
            });
        });
    });
};

const registerAdmin = async (adminData) => {

    const {
        adminNumber,
        name,
        email,
        password,
        department,
    } = adminData;

    return new Promise(async (resolve, reject) => {

        try {

            // Check Existing Admin
            const checkQuery = `
                SELECT * FROM Admin
                WHERE email = ?
                OR adminNumber = ?
            `;

            db.query(
                checkQuery,
                [email, adminNumber],
                async (err, results) => {

                    if (err) {
                        return reject(err);
                    }

                    if (results.length > 0) {
                        return reject({
                            status: 400,
                            message: 'Admin already exists'
                        });
                    }

                    // Hash Password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Insert Admin
                    const insertQuery = `
                        INSERT INTO Admin
                        (
                            adminNumber,
                            name,
                            email,
                            password,
                            department
                        )
                        VALUES (?, ?, ?, ?, ?)
                    `;

                    db.query(
                        insertQuery,
                        [
                            adminNumber,
                            name,
                            email,
                            hashedPassword,
                            department
                        ],
                        (err, result) => {

                            if (err) {
                                return reject(err);
                            }

                            resolve({
                                success: true,
                                message: 'Admin registered successfully'
                            });
                        }
                    );
                }
            );

        } catch (error) {
            reject(error);
        }
    });
};


const loginAdmin = async (adminNumber, password) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT * FROM Admin
            WHERE adminNumber = ?
        `;

        db.query(query, [adminNumber], async (err, results) => {

            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return reject({
                    status: 404,
                    message: 'Admin not found'
                });
            }

            const admin = results[0];

            // Compare Password
            const isPasswordCorrect = await bcrypt.compare(
                password,
                admin.password
            );

            if (!isPasswordCorrect) {
                return reject({
                    status: 401,
                    message: 'Invalid credentials'
                });
            }

            resolve({
                success: true,
                message: 'Login successful',
                data: {
                    adminNumber: admin.adminNumber,
                    name: admin.name,
                    email: admin.email,
                    department: admin.department
                }
            });
        });
    });
};

const registerFaculty = async (facultyData) => {

    const {
        employeeNumber,
        name,
        email,
        password,
        department
    } = facultyData;

    return new Promise(async (resolve, reject) => {

        try {

            // Check Existing Faculty
            const checkQuery = `
                SELECT * FROM Faculty
                WHERE email = ?
                OR employeeNumber = ?
            `;

            db.query(
                checkQuery,
                [email, employeeNumber],
                async (err, results) => {

                    if (err) {
                        return reject(err);
                    }

                    if (results.length > 0) {
                        return reject({
                            status: 400,
                            message: 'Faculty already exists'
                        });
                    }

                    // Hash Password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Insert Faculty
                    const insertQuery = `
                        INSERT INTO Faculty
                        (
                            employeeNumber,
                            name,
                            email,
                            password,
                            department
                        )
                        VALUES (?, ?, ?, ?, ?)
                    `;

                    db.query(
                        insertQuery,
                        [
                            employeeNumber,
                            name,
                            email,
                            hashedPassword,
                            department
                        ],
                        (err, result) => {

                            if (err) {
                                return reject(err);
                            }

                            resolve({
                                success: true,
                                message: 'Faculty registered successfully'
                            });
                        }
                    );
                }
            );

        } catch (error) {
            reject(error);
        }
    });
};

const loginFaculty = async (employeeNumber, password) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT * FROM Faculty
            WHERE employeeNumber = ?
        `;

        db.query(query, [employeeNumber], async (err, results) => {

            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return reject({
                    status: 404,
                    message: 'Faculty not found'
                });
            }

            const faculty = results[0];

            // Compare Password
            const isPasswordCorrect = await bcrypt.compare(
                password,
                faculty.password
            );

            if (!isPasswordCorrect) {
                return reject({
                    status: 401,
                    message: 'Invalid credentials'
                });
            }

            resolve({
                success: true,
                message: 'Login successful',
                data: {
                    employeeNumber: faculty.employeeNumber,
                    name: faculty.name,
                    email: faculty.email,
                    department: faculty.department
                }
            });
        });
    });
};

const removeFaculty = async (employeeNumber) => {

    return new Promise((resolve, reject) => {

        const query = `
            DELETE FROM Faculty
            WHERE employeeNumber = ?
        `;

        db.query(query, [employeeNumber], (err, result) => {

            if (err) {
                return reject(err);
            }

            if (result.affectedRows === 0) {
                return reject({
                    status: 404,
                    message: 'Faculty not found'
                });
            }

            resolve({
                success: true,
                message: 'Faculty removed successfully'
            });
        });
    });
};


module.exports = {
    registerStudent,
    loginStudent,
    registerAdmin,
    loginAdmin,
    registerFaculty,
    loginFaculty,
    removeFaculty
};