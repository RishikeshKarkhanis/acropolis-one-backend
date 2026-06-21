const { verifyToken } = require('../utilities/jwt');

const authenticate = (req, res, next) => {

    const token = req.cookies.uid;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {

        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authenticate;