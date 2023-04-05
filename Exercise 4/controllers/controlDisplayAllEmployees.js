const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
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
        console.log(e);
    }

    if(fileAccessResponse.length > 0) {
        console.log(buddies);
        //Sending buddies data to browser
        res.send(JSON.stringify(buddies));
    }
    else {
        res.status(500).send("No buddies in file");
    }
});

module.exports = {displayAllEmployees};