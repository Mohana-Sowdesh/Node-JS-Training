const auth = require('../../middleware/auth');


const login = (content, username, password) => {
    let token=undefined, i=0; 
    for(i=0; i< content.length; i++) {
        if(content[i].username == username) {
            if(content[i].password == password) {
                token = auth.createToken(username);
            }
        }
    }

    if(token!=undefined) {
        return token;
    }
    else {
        throw new Error("Invalid Login credentials");
    }
}

module.exports = {login};