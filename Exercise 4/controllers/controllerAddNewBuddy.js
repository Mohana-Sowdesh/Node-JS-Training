let fs = require('fs');
let buddies;

let addNewBuddy = (req, res) => {
    let data = fs.readFileSync("./cdw_ace23_buddies.json", "UTF-8");

    buddies = JSON.parse(data);
    buddies.push(req.body);
    console.log(req.body);
    
    fs.writeFileSync("./cdw_ace23_buddies.json", JSON.stringify(buddies));
    res.send("New buddy added");
};

module.exports = {addNewBuddy};