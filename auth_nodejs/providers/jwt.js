require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    sign(payload) {
        const createdAt = new Date();
        const token = jwt.sign(
            { ...payload, expiresIn: 24 * 60 * 60, createdAt },
            process.env.JWT_SECRET,
            // {
            //   expiresIn: 86400, // expires in 24 hours
            // },
        );
        return {
            token,
            expiresIn: 24 * 60 * 60,
            role: payload.role,
            createdAt,
        };
    },

    verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    },
};