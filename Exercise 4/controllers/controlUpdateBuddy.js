let fs = require('fs');
let empId;
let buddies;

const updateBuddy = (req,res) => {
    let data = fs.readFileSync("./cdw_ace23_buddies.json","UTF-8");
    empId = req.params.empFinder;
    buddies = JSON.parse(data);
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            (req.query.nickname) ? buddies[i].nickName = JSON.parse(req.query.nickname) : "";
            (req.query.hobbies) ? buddies[i].hobbies = JSON.parse(req.query.hobbies) : "";
        }
    }

    fs.writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddies));
    res.send("Buddy details updated");
};

module.exports = {updateBuddy};