let express = require('express');
let router = express.Router();
 
//Routing to addNewBuddyController
let addNewBuddyController = require('../controllers/controllerAddNewBuddy');
router.post("/", addNewBuddyController.addNewBuddy);

module.exports = router;