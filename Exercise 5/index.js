//Importing express package
let express = require('express');
let app = express();

//Importing file system, dotenv packages
let fs = require('fs');
require("dotenv").config();
let cors = require('cors');

const errLogger = require('./utils/logger').errLogger;

//Code to read body parser data
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

let addNewBuddyRouter = require("./routes/routeAddNewBuddy");
let displayAllEmployeesRouter = require("./routes/routeDisplayAllEmployees");
let displayByPropertyRouter =  require("./routes/routeDisplayByProperty");
let updateBuddyRouter = require("./routes/routeUpdateBuddy");
let deleteBuddyRouter = require("./routes/routeDeleteBuddy");

//Creation of Buddies.json file
app.use("/create", (req,res) => {
    try {
        fileAccess.writeToFile(filePath,[]);
        res.send("File created!!");
    }
    catch(err) {
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        console.log(err);
    } 
});

//CORS policy
app.use(cors(
    {
        origin: ['https://www.w3schools.com'],
        methods: ['get','post', 'put', 'delete'] 
    }
));

//Routes a request to add new buddy information to the existing list
app.use("/addNewBuddy", addNewBuddyRouter);

//Routes a request to list all the buddy's information
app.use("/displayAllEmployees", displayAllEmployeesRouter);

//Routes a request to list a single buddy's information using his employeeId/realName
app.use("/displayByProperty/", displayByPropertyRouter);

//Routes a request to update the existing buddy information like nickname, hobbies
app.use("/updateBuddy/", updateBuddyRouter);

//Routes delete request
app.use("/deleteBuddy/", deleteBuddyRouter);

app.listen(process.env.PORT, () => {
    console.log("Server started at port: " + process.env.PORT);
});