//Importing express package
let express = require('express');
let app = express();

//Importing file system, dotenv packages
require("dotenv").config();
let cors = require('cors');
const fileAccess = require('./helpers/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
const errLogger = require('./utils/logger');
const messages = require('./modules/constant');

//Code to read body parser data
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

let buddyRouter = require('./routes/buddy');

//Creation of Buddies.json file
app.use("/create", (req,res) => {
    try {
        fileAccess.writeToFile(filePath,[]);
        res.send(messages.fileCreationSuccess);
    }
    catch(err) {
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(500).send(messages.fileCreationError);
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
app.use("/addNewBuddy", buddyRouter);

//Routes a request to list all the buddy's information
app.use("/displayAllBuddies", buddyRouter);

//Routes a request to list a single buddy's information using his employeeId/realName
app.use("/displayByProperty/", buddyRouter);

//Routes a request to update the existing buddy information like nickname, hobbies
app.use("/updateBuddy/", buddyRouter);

//Routes delete request
app.use("/deleteBuddy/", buddyRouter);

app.listen(process.env.PORT);