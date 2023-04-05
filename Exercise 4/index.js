//Importing express package
let express = require('express');
let app = express();

//Importing file system
const fileAccess = require('./modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";

const port = 4000;

//Code to read body parser data
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

//Creation of Buddies.json file
app.use("/create", (req,res) => {
    try {
        fileAccess.writeToFile(filePath,[]);
        res.send("File created!!");
    }
    catch(e) {
        console.log(e);
    } 
});

//Routes a request to add new buddy information to the existing list
let addNewBuddyRouter = require("./routes/routeAddNewBuddy");
app.use("/addNewBuddy", addNewBuddyRouter);

//Routes a request to list all the buddy's information
let displayAllEmployeesRouter = require("./routes/routeDisplayAllEmployees");
app.use("/displayAllEmployees", displayAllEmployeesRouter);

//Routes a request to list a single buddy's information using his employeeId/realName
let displayByPropertyRouter =  require("./routes/routeDisplayByProperty");
app.use("/displayByProperty/", displayByPropertyRouter);

//Routes a request to update the existing buddy information like nickname, hobbies
let updateBuddyRouter = require("./routes/routeUpdateBuddy");
app.use("/updateBuddy/", updateBuddyRouter);

//Routes delete request
let deleteBuddyRouter = require("./routes/routeDeleteBuddy");
app.use("/deleteBuddy/", deleteBuddyRouter);

app.listen(port, () => {
    console.log("Server started at port: " + port);
});