const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token;
    let decoded;
    try {
        console.log(req.headers.authorization);
        token = (req.headers.authorization).split(' ')[1];
        if(token) decoded = jwt.verify(token, process.env.JWTSECRETKEY);

        console.log(decoded);
        res.status(200).send(decoded);
        return next();
    } catch(err) {
        res.status(403).send("Invalid Token");
    }
    return next();
}

/**
 * Method to create JWT token for user on successful login
 * @param {*} payload 
 * @returns 
 */
const createToken = (payload) => {
    const token = jwt.sign({ "username": payload },process.env.JWT_SECRET_KEY, { expiresIn: "30m"});
    return token;
}

module.exports = {verifyToken, createToken};