const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies;
var flag = false;

let deleteBuddy = (req,res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        console.log(e);
    }

    //Storing employee finder in a variable empId
    empId = req.params.empFinder;

    //Splicing the data of the buddy requested by array splicing
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            console.log(empId);
            buddies.splice(i,1);
            flag = true;
        }
    }

    if(flag==true) {
        try {
            //Writing data to the file after deletion 
            fileAccess.writeToFile(filePath,buddies);
            res.send("Buddy deleted"); 
        }
        catch(e) {
            console.log("Error occurred");
        }
    }
    else {
        res.status(500).send("Buddy not found");
    }
};

module.exports = {deleteBuddy};