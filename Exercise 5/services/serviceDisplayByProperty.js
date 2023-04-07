const displayByProperty = (buddies, empId) => {

    let i=0;
    let flag = false;
    let targetBuddy;
    
    //Traversing the array to find the required buddy
    for(i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId == empId){
            targetBuddy = buddies[i];
            flag = true;
        }
    } 

    res = [flag, targetBuddy];
    return res;
}

module.exports = {displayByProperty};