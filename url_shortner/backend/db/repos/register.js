'use strict';

const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const User = db.User;

const registerUser = async (userData) => {
    try {
        //check for duplicate email
        var createdUser
        const userExists = await User.findAll({
            where: { email: userData.email }
        });
        if (userExists.length > 0)
            return ({
                statusCode: 403,
                status: false,
                message: "User Already exists"
            })

        //create user and remove password from response
        createdUser = await User.create(userData)
        createdUser = JSON.parse(JSON.stringify(createdUser))
        delete createdUser['password'];

        if (createdUser === null) {
            return ({
                statusCode: 400,
                status: false,
                message: err.message || 'Error creating User'
            })
        }
        else
            return ({
                status: true,
                data: createdUser
            })
    }
    catch (err) {
        console.error(err);
        return ({
            statusCode: 400,
            status: false,
            message: err.message || 'Error creating User'
        })
    }
};

module.exports = { registerUser };
