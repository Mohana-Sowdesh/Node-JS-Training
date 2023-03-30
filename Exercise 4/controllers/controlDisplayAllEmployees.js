let fs = require('fs');

let displayAllEmployees = ((req, res) => {
    let data = fs.readFileSync("./cdw_ace23_buddies.json","UTF-8"); 
        
    let buddies = JSON.parse(data);
    console.log(buddies);
    res.send(JSON.stringify(buddies));
});

module.exports = {displayAllEmployees};