const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let flag = false;
let targetBuddy;

const displayByProperty = (req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(e){
        console.log(e);
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
        console.log(targetBuddy);
        res.json(targetBuddy);
    }
    else {
        res.status(500).send("Requested buddy not found");
    }
};

module.exports = {displayByProperty};