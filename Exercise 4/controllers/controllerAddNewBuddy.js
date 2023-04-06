const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
const messages = require('../modules/constant');
var fileAccessResponse = "";
let buddies = "";

let addNewBuddy = (req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        return res.status(400).send(messages.fileReadError + " " + e);
    }

    buddies.push(req.body);
    
    try {
        //Writing data after adding new buddy
        fileAccess.writeToFile(filePath,buddies);
        return res.send(messages.addNewBuddySuccess);
    }
    catch(e) {
        return res.status(400).send(messages.fileWriteError + "\n" + e);
    }
};

module.exports = {addNewBuddy};