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

module.exports = verifyToken;