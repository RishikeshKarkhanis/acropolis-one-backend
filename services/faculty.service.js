const db = require('../utilities/databaseConnection');

const assignedSubjects = (employeeNumber) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                mappingId,
                subjectCode,
                semester,
                section,
                subjectType
            FROM FacultySubjectMapping
            WHERE employeeNumber = ?
        `;

        db.query(query, [employeeNumber], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

const isSubjectAssignedToFaculty = (
    employeeNumber,
    subjectCode,
    semester,
    division,
    subjectType
) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM FacultySubjectMapping
            WHERE
                employeeNumber = ?
                AND subjectCode = ?
                AND semester = ?
                AND section = ?
                AND subjectType = ?
        `;

        db.query(
            query,
            [
                employeeNumber,
                subjectCode,
                semester,
                division,
                subjectType
            ],
            (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results.length > 0);
            }
        );
    });
};

const doesSubjectExist = (
    subjectCode,
    semester,
    department,
    subjectType
) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM Subject
            WHERE
                subjectCode = ?
                AND semester = ?
                AND department = ?
                AND subjectType = ?
        `;

        db.query(
            query,
            [
                subjectCode,
                semester,
                department,
                subjectType
            ],
            (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results.length > 0);
            }
        );
    });
};

const getLectureCount = (
    subjectCode,
    semester,
    department,
    division,
    lectureType
) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT COUNT(*) AS total
            FROM LectureSession
            WHERE
                subjectCode = ?
                AND semester = ?
                AND department = ?
                AND division = ?
                AND lectureType = ?
        `;

        db.query(
            query,
            [
                subjectCode,
                semester,
                department,
                division,
                lectureType
            ],
            (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results[0].total);
            }
        );
    });
};

const createLectureSession = (
    lectureId,
    subjectCode,
    employeeNumber,
    semester,
    department,
    division,
    lectureDate,
    createdAt,
    lectureType,
    facultyLatitude,
    facultyLongitude
) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO LectureSession
            (
                lectureId,
                subjectCode,
                employeeNumber,
                semester,
                department,
                division,
                lectureDate,
                createdAt,
                lectureType,
                facultyLatitude,
                facultyLongitude
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [
                lectureId,
                subjectCode,
                employeeNumber,
                semester,
                department,
                division,
                lectureDate,
                createdAt,
                lectureType,
                facultyLatitude,
                facultyLongitude
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

const endLectureSession = (lectureId, expiredAt) => {

    return new Promise((resolve, reject) => {

        const query = `
            UPDATE LectureSession
            SET expiredAt = ?
            WHERE lectureId = ?
        `;

        db.query(query, [expiredAt, lectureId], (err, results) => {

            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

module.exports = {
    assignedSubjects,
    createLectureSession,
    endLectureSession,
    getLectureCount,
    isSubjectAssignedToFaculty,
    doesSubjectExist
};