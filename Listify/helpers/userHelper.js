/**
 * Function to check if a username with which a new user who tries to register 
 * is already present or not
 * @param {*} users 
 * @param {*} username 
 * @returns 
 */
const userExists = (users, username) => {
    users = JSON.parse(users);
    for(let i=0; i < users.length; i++) {
        if(users[i].username === username)  {
            return i;
        }
    }
    return -1;
}

module.exports = { userExists }