const jwt = require('jsonwebtoken');
require('dotenv').config();
const responseObj = require('../utils/responseObj');
const CONSTANTS = require('../helpers/constants');
const resp = require('../helpers/response');
const { errLogger } = require('../utils/logger');
const APP_CONSTANTS = require('../helpers/appConstants');

const verifyToken = (req, res, next) => {
    let token;
    let decoded;
    try {
        token = (req.headers.authorization).split(' ')[1];
        if(token) {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.username = decoded.username;
        }
        return next();
    } catch(err) {
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.USER_UNAUTHORIZED,  CONSTANTS.STATUS_CODES.UNAUTHORIZED);
        return resp.sendResponse(res, response);
    }
}

/**
 * Method to create JWT token for user on successful login
 * @param {*} payload 
 * @returns 
 */
const createToken = (payload) => {
    const token = jwt.sign({ "username": payload },process.env.JWT_SECRET_KEY, { expiresIn: APP_CONSTANTS.TOKEN_EXPIRATION });
    return token;
}

module.exports = {verifyToken, createToken};