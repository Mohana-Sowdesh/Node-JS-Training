let express = require('express');
let router = express.Router();

//Routing to displayByPropertyController
let displayByPropertyController = require('../controllers/controlDisplayByProperty');
router.get("/:id", displayByPropertyController.displayByProperty);

module.exports = router;