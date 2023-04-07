const updateBuddy = (req, buddies, empId) => {
    let flag = false;
    let targetBuddy;

    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            flag = true;
            targetBuddy = buddies[i];
        }
    }

    if(flag==true) {
        (req.query.nickname) ? targetBuddy.nickName = JSON.parse(req.query.nickname) : "";
        (req.query.hobbies) ? targetBuddy.hobbies = JSON.parse(req.query.hobbies) : "";
    }

    let res =[flag, buddies];

    return res;
}

module.exports = {updateBuddy};