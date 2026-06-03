const db = require('../utilities/databaseConnection');

const getAllFaculties = () => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                employeeNumber,
                name,
                email,
                department
            FROM Faculty
        `;

        db.query(query, (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

const assignSubjectToFaculty = (mappingId, employeeNumber, subjectCode, semester, section, subjectType) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO FacultySubjectMapping (mappingId, employeeNumber, subjectCode, semester, section, subjectType)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [mappingId, employeeNumber, subjectCode, semester, section, subjectType], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

const unassignSubjectFromFaculty = (mappingId) => {

    return new Promise((resolve, reject) => {

        const query = `
            DELETE FROM FacultySubjectMapping
            WHERE mappingId = ?
        `;

        db.query(query, [mappingId], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

const createSubject = (
    subjectCode,
    subjectName,
    semester,
    department,
    subjectType
) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO Subject
            (
                subjectCode,
                subjectName,
                semester,
                department,
                subjectType
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [
                subjectCode,
                subjectName,
                semester,
                department,
                subjectType
            ],
            (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results);
            }
        );
    });
};

const removeSubject = (subjectCode, subjectType) => {

    return new Promise((resolve, reject) => {

        const query = `
            DELETE FROM Subject
            WHERE subjectCode = ?
            AND subjectType = ?
        `;

        db.query(query, [subjectCode, subjectType], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

const getAllSubjects = () => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                subjectCode,
                subjectName,
                semester,
                department,
                subjectType
            FROM Subject
        `;

        db.query(query, (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

module.exports = {
    getAllFaculties,
    assignSubjectToFaculty,
    unassignSubjectFromFaculty,
    createSubject,
    removeSubject,
    getAllSubjects
};