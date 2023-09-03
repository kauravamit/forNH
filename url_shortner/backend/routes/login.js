'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logInRepo = require('./../db/repos/login').login
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET);
};

router.post('/', async function (req, res, next) {
    try {
        // Validate email is correctly formed
            const loggedIn = await logInRepo(req.body)
            //in case of error
            if (!loggedIn.status) {
                return res.status(loggedIn.statusCode).send({
                    message: loggedIn.message
                });
            }
            //Comparing password if no error
            else {
                return bcrypt.compare(req.body.password, loggedIn.hash, function (err, result) {
                    if (result) {
                        const token = generateToken(loggedIn.userId);
                        const today = new Date();
                        let expires = new Date();
                        expires.setDate(today.getDate() + 30);
                        res.cookie('jwt', token, {
                            expires: expires,
                            secure: false,
                            httpOnly: false,
                            SameSite: 'None'
                        });
                        res.send({ message: "Logged In Successfully" })
                    }
                    else
                        res.status(403).send({ message: "Password Mismatch" })
                });
            }
    
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

module.exports = router;
