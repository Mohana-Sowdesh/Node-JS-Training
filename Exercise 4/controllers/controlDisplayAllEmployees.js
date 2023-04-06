const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
const messages = require('../modules/constant');
var fileAccessResponse = "";
let buddies;

let displayAllEmployees = ((req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        //Storing data in variable buddies
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        return res.status(400).send(messages.fileReadError + "\n" + e);
    }

    if(fileAccessResponse.length > 2) {
        //Sending buddies data to browser
        return res.send(JSON.stringify(buddies));
    }
    else {
        return res.status(500).send(messages.noBuddyError);
    }
});

module.exports = {displayAllEmployees};