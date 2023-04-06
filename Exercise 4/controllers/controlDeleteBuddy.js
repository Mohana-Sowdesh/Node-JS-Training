const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
const messages = require('../modules/constant');
var fileAccessResponse = "";
let buddies;

let deleteBuddy = (req,res) => {
    var flag = false;
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        return res.status(400).send(messages.fileReadError + " " + e);
    }

    //Storing employee finder in a variable empId
    empId = req.params.empFinder;

    //Splicing the data of the buddy requested by array splicing
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            buddies.splice(i,1);
            flag = true;
        }
    }

    if(flag==true) {
        try {
            //Writing data to the file after deletion 
            fileAccess.writeToFile(filePath,buddies);
            return res.send(messages.buddyDeletionSuccess); 
        }
        catch(e) {
            return res.status(400).send(messages.fileWriteError + "\n" + e);
        }
    }
    else {
        return res.status(500).send(messages.buddyDeletionError);
    }
};

module.exports = {deleteBuddy};