'use strict';

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const getUserIdFromCookie = async (cookie) => {
    try {
        let userId = null;
        if (cookie != '') {
            const decrypt = await jwt.verify(cookie, process.env.JWT_TOKEN_SECRET);
            userId = decrypt.id;
        }
        return userId;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const newCookie = async (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET);
        const today = new Date();
        let expires = new Date();
        expires.setDate(today.getDate() + 390); // 30 days * 13 months
        return {
            name: "jwt",
            value: token,
            options: {
                expires: expires,
                secure: false,
                httpOnly: false,
                SameSite: 'None'
            }
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const newUserId = () => {
    try {
        return uuidv4();
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { getUserIdFromCookie, newCookie, newUserId };
