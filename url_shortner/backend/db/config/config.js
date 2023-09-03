'use strict';
require('dotenv').config()
module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        host: process.env.DEV_DB_HOSTNAME || 'localhost',
        port: process.env.DEV_DB_PORT || 1433,
        dialect: 'mssql',
    },
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.TEST_DB_HOSTNAME,
        port: process.env.TEST_DB_PORT || 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
    },
    stage: {
        username: process.env.STAGE_DB_USERNAME,
        password: process.env.STAGE_DB_PASSWORD,
        database: process.env.STAGE_DB_NAME,
        host: process.env.STAGE_DB_HOSTNAME,
        port: process.env.STAGE_DB_PORT || 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT || 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
    }
};