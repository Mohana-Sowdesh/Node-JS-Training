let express = require('express');
let router = express.Router();

let deleteBuddyController = require('../controllers/controlDeleteBuddy');
router.delete("/:empFinder", deleteBuddyController.deleteBuddy);

module.exports = router;