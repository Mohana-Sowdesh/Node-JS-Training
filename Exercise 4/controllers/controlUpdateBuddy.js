const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
const messages = require('../modules/constant');
let empId;
let buddies;
let targetBuddy;

const updateBuddy = (req,res) => {
    var flag = false;
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        return res.status(400).send(messages.fileReadError + " " + e);
    }

    //Fetching employee ID of the buddy to be updated received from query string
    empId = req.params.empFinder;

    //Updating details
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            flag = true;
            targetBuddy = buddies[i];
        }
    }

    if(flag==true) {
        (req.query.nickname) ? targetBuddy.nickName = JSON.parse(req.query.nickname) : "";
        (req.query.hobbies) ? targetBuddy.hobbies = JSON.parse(req.query.hobbies) : "";
    }
    else {
        return res.status(500).send(messages.updateBuddyError);
    }

    try {
        //Writing the updated data to file
        fileAccess.writeToFile(filePath,buddies);
        return res.send(messages.updateBuddySuccess);
    }
    catch(e) {
        return res.status(400).send(messages.fileWriteError + "\n" + e);
    }
};

module.exports = {updateBuddy};