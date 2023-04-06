let express = require('express');
let router = express.Router();

//Routing to deleteBuddyController
let deleteBuddyController = require('../controllers/controlDeleteBuddy');
router.delete("/:empFinder", deleteBuddyController.deleteBuddy);

module.exports = router;