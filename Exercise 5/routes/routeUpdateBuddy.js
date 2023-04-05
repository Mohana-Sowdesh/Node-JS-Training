let express = require('express');
let router = express.Router();

//Routing to updateBuddyController
let updateBuddyController = require('../controllers/controlUpdateBuddy');
router.put("/:empFinder", updateBuddyController.updateBuddy);

module.exports = router;