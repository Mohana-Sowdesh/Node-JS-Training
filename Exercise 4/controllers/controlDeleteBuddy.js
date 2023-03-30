let fs = require('fs')
let buddies;

let deleteBuddy = (req,res) => {
    let data = fs.readFileSync("./cdw_ace23_buddies.json","UTF-8");
            
    buddies = JSON.parse(data);
    empId = req.params.empFinder;
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            buddies.splice(i,1);
        }
    }

    fs.writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddies));
    res.send("Buddy deleted"); 
};
module.exports = {deleteBuddy};