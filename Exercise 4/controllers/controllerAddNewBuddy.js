const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies = "";

let addNewBuddy = (req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(e){
        console.log(e);
    }

    buddies.push(req.body);
    console.log(req.body);
    
    try {
        //Writing data after adding new buddy
        fileAccess.writeToFile(filePath,buddies);
        res.send("New buddy added");
    }
    catch(e) {
        console.log("Error occurred");
    }
};

module.exports = {addNewBuddy};