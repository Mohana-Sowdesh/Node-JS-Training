const {errLogger} = require('../utils/logger');

/**
 * Method to create a HTTP Success response object
 * @param {*} data 
 * @returns 
 */
const httpSuccessObj = (data) => {
    return {
        status: "SUCCESS",
        code: 200,
        data: data
    }
}

/**
 * Method to create a HTTP Error response object
 * @param {*} req 
 * @param {*} err 
 * @returns 
 */
const httpErrorObj = (req, err, code) => {
    errLogger.error(`${code} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return {
        status: "ERROR",
        code: code,
        data: err
    }
}

module.exports = { httpSuccessObj, httpErrorObj }