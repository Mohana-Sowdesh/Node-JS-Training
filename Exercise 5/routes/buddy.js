let express = require('express');
let router = express.Router();

//Importing controller files
let addNewBuddyController = require('../controllers/controllerAddNewBuddy');
let deleteBuddyController = require('../controllers/controlDeleteBuddy');
let displayAllBuddiesController = require('../controllers/controlDisplayAllBuddies');
let updateBuddyController = require('../controllers/controlUpdateBuddy');

//Routing to addNewBuddyController
router.post("/", addNewBuddyController.addNewBuddyController);

//Routing to deleteBuddyController
router.delete("/:empFinder", deleteBuddyController.deleteBuddyController);

//Routing to displayAllEmployeesController
router.get("/", displayAllBuddiesController.displayAllBuddiesController);

//Routing to displayByPropertyController
router.get("/:id", displayAllBuddiesController.displayByPropertyController);

//Routing to updateBuddyController
router.put("/:empFinder", updateBuddyController.updateBuddyController);

module.exports = router;