'use strict';

const express = require('express');
const router = express.Router();
const userRepo = require('../db/repos/user')


router.get('/', async function (req, res, next) {
    try {
        //check for duplicate email
            const user = await userRepo.getUser(req.user.userId)

            if (!user.status) {
                return res.status(user.statusCode).send({
                    message: user.message
                });
            }
            else {
                res.send(user.data)
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
