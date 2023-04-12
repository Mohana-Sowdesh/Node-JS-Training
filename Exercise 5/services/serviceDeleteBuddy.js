const deleteBuddy = (buddies, empId) => {

    var flag = false;
    
    //Splicing the data of the buddy requested by array splicing
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            buddies.splice(i,1);
            flag = true;
        }
    }
    return flag;
}

module.exports = {deleteBuddy};