const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let empId;
let buddies;
let targetBuddy;
let flag = false;

const updateBuddy = (req,res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        console.log(e);
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
        (req.query.nickname) ? buddies[i].nickName = JSON.parse(req.query.nickname) : "";
        (req.query.hobbies) ? buddies[i].hobbies = JSON.parse(req.query.hobbies) : "";
    }
    else {
        res.status(500).send("Buddy that needs to be updated is not found");
    }

    try {
        //Writing the updated data to file
        fileAccess.writeToFile(filePath,buddies);
        res.send("Buddy details updated");
    }
    catch(e) {
        console.log("Error occurred");
    }
};

module.exports = {updateBuddy};