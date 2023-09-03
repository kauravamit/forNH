'use strict';

const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const User = db.User;

const getUser = async (userId) => {
    try {

        return User.findAll({
            where: { id: userId },
            raw: true
        }).then(Found => {
            if (Found.length > 0) {
                delete Found['password'];
                return ({
                    status: true,
                    data: Found
                })
            }
            else
                return ({
                    statusCode: 403,
                    status: false,
                    message: "User Not Found"
                })
        })
    }
    catch (err) {
        console.error(err);
        return ({
            statusCode: 400,
            status: false,
            message: err.message || 'Error Finding User'
        })
        // return false;
    }
};


module.exports = { getUser };
