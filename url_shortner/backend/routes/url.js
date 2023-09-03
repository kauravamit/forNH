'use strict';

const express = require('express');
const { route } = require('.');
const router = express.Router();
const urlRepo = require('./../db/repos/url')



router.get('/', async function (req, res, next) {
    try {
        console.log("check") 
        res.send({ message: "Logged In Successfully" })
        // const urls = await urlRepo.getUrl(req.user.userId)

        //     if (!urls.status) {
        //         return res.status(urls.statusCode).send({
        //             message: urls.message
        //         });
        //     }
        //     else {
        //         return res.send(urls.data)
        //     }
       
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

router.post('/', async function (req, res, next) {
    console.log("check")
    try {
        console.log("check")
        
            const updated = await urlRepo.createUrl(req.user.userId, req.body.adress)

            if (!updated.status) {
                return res.status(updated.statusCode).send({
                    message: updated.message
                });
            }
            else {
               return res.send({ data: updated.data })
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