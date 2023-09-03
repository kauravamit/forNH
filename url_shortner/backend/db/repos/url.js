'use strict';

const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const Url = db.Url;
var shortlink = require('shortlink');
const base_url = 'http://localhost:3000/api/'


function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

const createUrl = async (userId, adress) => {
    try {
        // let short = await 
      
        // console.log("valid url",validateUrl(adress))

        const validated  = isValidUrl(adress);
        const adressId = shortlink.generate(7)
        let urlData = {
            adress,
            "shortend" :base_url + shortlink.generate(7),
            adressId,
            "createdDate": Date.now(),
            "updatedDate": Date.now()

        }
        let createdUrl = await Url.create(urlData)
        createdUrl = JSON.parse(JSON.stringify(createdUrl))

        console.log("created",createUrl)

        if (createdUrl === null) {
            return ({
                statusCode: 400,
                status: false,
                message: err.message || 'Error creating Url'
            })
        }
        else
            return ({
                status: true,
                data: createdUrl
            })  
    }
    catch (err) {
        console.error(err);
        return ({
            statusCode: 400,
            status: false,
            message: err.message || 'Error creating Url'
        })
        // return false;
    }
};

const getUrl = async (userId) => {
    try {
console.log("check")
        return Url.findAll({
            where: { id: userId },
            raw: true
        }).then(Found => {
            if (Found.length > 0) {
                return ({
                    status: true,
                    message:'Urls',
                    data: Found
                })
            }
            else
                return ({
                    status: true,
                    message: "No Urls registered"
                })
        })
    }
    catch (err) {
        console.error(err);
        return ({
            statusCode: 400,
            status: false,
            message: err.message || 'Error Finding URLs'
        })
        // return false;
    }
};







module.exports = { getUrl, createUrl};
