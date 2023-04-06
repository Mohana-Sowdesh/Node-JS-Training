const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
const messages = require('../modules/constant');
var fileAccessResponse = "";
let targetBuddy;

const displayByProperty = (req, res) => {
    let flag = false;
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(e){
        return res.status(400).send(messages.fileReadError + " " + e);
    }
    
    let empId;
    let buddies;

    //Fetching employee ID received from query string 
    empId = req.params.id;
    buddies = JSON.parse(fileAccessResponse);
    let i=0;

    //Traversing the array to find the required buddy
    for(i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId){
            targetBuddy = buddies[i];
            flag = true;
        }
    } 

    if(flag==true) {
        return res.json(targetBuddy);
    }
    else {
        return res.status(500).send(messages.displayByPropertyError);
    }
};

module.exports = {displayByProperty};