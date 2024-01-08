const auth = require('../../middleware/auth');
const bcrypt = require("bcrypt");

/**
 * Service to login a user
 * @param {*} content - users file data
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
const login = async (content, username, password) => {
    let token = undefined, i = 0; 
    for(i=0; i < content.length; i++) {
        if(content[i].username == username) {
            if(await bcrypt.compare(password, content[i].password)) {
                token = auth.createToken(username);
            }
        }
    }

    if(token != undefined) {
        return token;
    }
    else {
        return '';
    }
}

module.exports = {login};