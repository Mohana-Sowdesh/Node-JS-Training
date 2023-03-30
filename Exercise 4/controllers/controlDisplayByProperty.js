let fs = require('fs');

const displayByProperty = (req, res) => {
    let data = fs.readFileSync("./cdw_ace23_buddies.json","UTF-8");
    let empId;
    let buddies;
    empId = req.params.id;
    buddies = JSON.parse(data);
    let i=0;
    for(i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId){
            console.log(buddies[i]);
            res.json(buddies[i])
        }
    } 
};

module.exports = {displayByProperty};