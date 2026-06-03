const db = require('../utilities/databaseConnection');
const { v4: uuidv4 } = require('uuid');

const markAttendance = (
    scholarNumber,
    lectureId
) => {

    return new Promise((resolve, reject) => {

        const lectureQuery = `
            SELECT *
            FROM LectureSession
            WHERE lectureId = ?
        `;

        db.query(
            lectureQuery,
            [lectureId],
            (err, lectureResults) => {

                if (err) {
                    return reject(err);
                }

                if (lectureResults.length === 0) {

                    return reject({
                        status: 404,
                        message: 'Invalid lecture ID'
                    });
                }

                if (
                    lectureResults[0].expiredAt !== null
                ) {

                    return reject({
                        status: 400,
                        message:
                            'Lecture is over! Cannot mark attendance.'
                    });
                }

                const duplicateQuery = `
                    SELECT *
                    FROM AttendanceRecord
                    WHERE
                        lectureId = ?
                        AND studentId = ?
                `;

                db.query(
                    duplicateQuery,
                    [
                        lectureId,
                        scholarNumber
                    ],
                    (err, attendanceResults) => {

                        if (err) {
                            return reject(err);
                        }

                        if (
                            attendanceResults.length > 0
                        ) {

                            return reject({
                                status: 409,
                                message:
                                    'Attendance already marked'
                            });
                        }

                        const attendanceId =
                            uuidv4()
                                .replace(/-/g, '')
                                .substring(0, 12);

                        const markedAt =
                            new Date();

                        const insertQuery = `
                            INSERT INTO AttendanceRecord
                            (
                                attendanceId,
                                lectureId,
                                studentId,
                                markedAt
                            )
                            VALUES (?, ?, ?, ?)
                        `;

                        db.query(
                            insertQuery,
                            [
                                attendanceId,
                                lectureId,
                                scholarNumber,
                                markedAt
                            ],
                            (err) => {

                                if (err) {
                                    return reject(err);
                                }

                                resolve({
                                    success: true,
                                    attendanceId,
                                    message:
                                        'Attendance marked successfully'
                                });
                            }
                        );
                    }
                );
            }
        );
    });
};

const viewTotalAttendance = (
    scholarNumber,
    department,
    semester,
    section
) => {

    console.log({
        scholarNumber,
        department,
        semester,
        section
    });

    return new Promise((resolve, reject) => {

        const totalLecturesQuery = `
            SELECT COUNT(*) AS totalLectures
            FROM LectureSession
            WHERE
                department = ?
                AND semester = ?
                AND division = ?
                AND expiredAt IS NOT NULL
        `;

        db.query(
            totalLecturesQuery,
            [
                department,
                semester,
                section
            ],
            (err, totalResults) => {

                if (err) {
                    return reject(err);
                }

                const totalLectures =
                    totalResults[0].totalLectures;

                const attendedLecturesQuery = `
                    SELECT COUNT(*) AS attendedLectures
                    FROM AttendanceRecord ar
                    INNER JOIN LectureSession ls
                    ON ar.lectureId = ls.lectureId
                    WHERE
                        ar.studentId = ?
                        AND ls.department = ?
                        AND ls.semester = ?
                        AND ls.division = ?
                        AND ls.expiredAt IS NOT NULL
                `;

                console.log(totalResults);

                db.query(
                    attendedLecturesQuery,
                    [
                        scholarNumber,
                        department,
                        semester,
                        section
                    ],
                    (err, attendedResults) => {

                        if (err) {
                            return reject(err);
                        }

                        const attendedLectures =
                            attendedResults[0]
                                .attendedLectures;

                        const attendancePercentage =
                            totalLectures === 0
                                ? 0
                                : (
                                    attendedLectures /
                                    totalLectures
                                ) * 100;

                        resolve({
                            success: true,
                            totalLectures,
                            attendedLectures,
                            attendancePercentage:
                                attendancePercentage
                                    .toFixed(2)
                        });
                        console.log(attendedResults);
                    }

                    
                );
            }

            

        );
    });
};


module.exports = {
    markAttendance,
    viewTotalAttendance
};