'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;
const registerUser = require('./../db/repos/register')

router.post('/', async function (req, res, next) {
    try {
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const token = Date.now()
        var userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password,
        }

        if (!userData.email.includes('@')) {
            return res.status(403).send({
                message: "Invalid Email"
            });
        }

            const registered = await registerUser.registerUser(userData)

            if (!registered.status) {
                return res.status(registered.statusCode).send({
                    message: registered.message
                });
            }
            else {
                    res.send(createdUser)
            }
     
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});



module.exports = router;
