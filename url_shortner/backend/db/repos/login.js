'use strict';

const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const User = db.User;


const login = async (loginData) => {
    try {
        const userExists = await User.findOne({
            where: { email: loginData.email },
            raw: true
        });
        if (!userExists) {
            return ({
                statusCode: 403,
                status: false,
                message: "User Not Found"
            })
        }
            return ({
                status: true,
                hash: userExists.password,
                message: "User Found"
            })
    }
    catch (err) {
        console.error(err);
        return ({
            statusCode: 400,
            status: false,
            message: err.message || 'Error Finding User'
        })
    }
};

module.exports = { login };
